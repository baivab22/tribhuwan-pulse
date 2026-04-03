import { useEffect, useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { createEvent, deleteEvent, EventItem, listAdminEvents, updateEvent } from '@/lib/api';
import { CalendarDays, ImagePlus, Pencil, Star, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

type ModalMode = 'create' | 'edit';

type FormState = {
  title: string;
  shortDescription: string;
  description: string;
  eventDate: string;
  location: string;
  category: string;
  status: 'draft' | 'published';
  isFeatured: boolean;
};

const CLOUDINARY_CLOUD_NAME = 'dpipulbgm';
const CLOUDINARY_UPLOAD_PRESET = 'tu_reports';
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

const initialForm: FormState = {
  title: '',
  shortDescription: '',
  description: '',
  eventDate: '',
  location: '',
  category: 'General',
  status: 'published',
  isFeatured: false,
};

const AdminEvents = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'published'>('all');

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<ModalMode>('create');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(initialForm);

  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [removedImages, setRemovedImages] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / limit)), [total, limit]);

  const resetForm = () => {
    setForm(initialForm);
    setExistingImages([]);
    setRemovedImages([]);
    setNewImages([]);
    setEditingId(null);
  };

  const loadEvents = async (targetPage = page) => {
    setLoading(true);
    try {
      const response = await listAdminEvents({
        page: targetPage,
        limit,
        q: query.trim() || undefined,
        status: statusFilter === 'all' ? undefined : statusFilter,
      });
      setEvents(response.events);
      setTotal(response.total);
      setPage(response.page);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load events';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreateOpen = () => {
    setMode('create');
    resetForm();
    setOpen(true);
  };

  const handleEditOpen = (event: EventItem) => {
    setMode('edit');
    setEditingId(event._id);
    setForm({
      title: event.title,
      shortDescription: event.shortDescription || '',
      description: event.description,
      eventDate: event.eventDate ? new Date(event.eventDate).toISOString().slice(0, 10) : '',
      location: event.location || '',
      category: event.category || 'General',
      status: event.status,
      isFeatured: event.isFeatured,
    });
    setExistingImages(event.images || []);
    setRemovedImages([]);
    setNewImages([]);
    setOpen(true);
  };

  const validateForm = () => {
    if (!form.title.trim()) return 'Title is required';
    if (!form.description.trim()) return 'Description is required';
    if (!form.eventDate) return 'Event date is required';
    return '';
  };

  const onFileChange = (fileList: FileList | null) => {
    if (!fileList) return;
    const files = Array.from(fileList);
    setNewImages((prev) => [...prev, ...files].slice(0, 10));
  };

  const removeNewImage = (name: string) => {
    setNewImages((prev) => prev.filter((f) => f.name !== name));
  };

  const removeExistingImage = (url: string) => {
    setRemovedImages((prev) => [...prev, url]);
  };

  const uploadImageToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    const response = await fetch(CLOUDINARY_UPLOAD_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to upload ${file.name}`);
    }

    const result = await response.json();
    if (!result.secure_url) {
      throw new Error(`Cloudinary did not return a secure URL for ${file.name}`);
    }

    return result.secure_url as string;
  };

  const onSave = async () => {
    const validationMessage = validateForm();
    if (validationMessage) {
      toast.error(validationMessage);
      return;
    }

    setSaving(true);
    try {
      const uploadedImageUrls = await Promise.all(newImages.map((file) => uploadImageToCloudinary(file)));

      const retainedImages = existingImages.filter((img) => !removedImages.includes(img));
      const payload = {
        title: form.title.trim(),
        shortDescription: form.shortDescription.trim(),
        description: form.description.trim(),
        eventDate: form.eventDate,
        location: form.location.trim(),
        category: form.category.trim(),
        status: form.status,
        isFeatured: form.isFeatured,
        images: mode === 'edit' ? [...retainedImages, ...uploadedImageUrls] : uploadedImageUrls,
      };

      if (mode === 'create') {
        await createEvent(payload);
        toast.success('Event created successfully');
      } else if (editingId) {
        await updateEvent(editingId, payload);
        toast.success('Event updated successfully');
      }

      setOpen(false);
      resetForm();
      loadEvents(page);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to save event';
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (id: string) => {
    const shouldDelete = window.confirm('Delete this event?');
    if (!shouldDelete) return;

    try {
      await deleteEvent(id);
      toast.success('Event deleted');
      loadEvents(page);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete event';
      toast.error(message);
    }
  };

  return (
    <div className="space-y-5">
      <Card className="border-0 shadow-xl bg-gradient-to-br from-slate-50 to-white">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <CardTitle className="text-2xl">Event Manager</CardTitle>
            <Button onClick={handleCreateOpen} className="bg-slate-900 hover:bg-slate-700">
              <ImagePlus className="w-4 h-4 mr-2" />
              Create Event
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <Input
              placeholder="Search events"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Select value={statusFilter} onValueChange={(v: 'all' | 'draft' | 'published') => setStatusFilter(v)}>
              <SelectTrigger>
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => loadEvents(1)} disabled={loading}>Apply</Button>
            <Button
              variant="outline"
              onClick={() => {
                setQuery('');
                setStatusFilter('all');
                loadEvents(1);
              }}
              disabled={loading}
            >
              Reset
            </Button>
          </div>

          <div className="rounded-xl border border-slate-200 overflow-hidden">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="p-3 text-left">Title</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Category</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Images</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="p-5 text-center">Loading events...</td>
                  </tr>
                ) : events.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-5 text-center text-slate-500">No events found.</td>
                  </tr>
                ) : (
                  events.map((event) => (
                    <tr key={event._id} className="border-t border-slate-200 hover:bg-slate-50">
                      <td className="p-3">
                        <div className="font-semibold text-slate-900">{event.title}</div>
                        <div className="text-xs text-slate-500 line-clamp-1">{event.shortDescription || event.description}</div>
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <div className="flex items-center gap-1 text-slate-700">
                          <CalendarDays className="w-4 h-4" />
                          {new Date(event.eventDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="p-3">{event.category || 'General'}</td>
                      <td className="p-3">
                        <Badge variant={event.status === 'published' ? 'default' : 'secondary'}>
                          {event.status}
                        </Badge>
                        {event.isFeatured ? <Badge className="ml-2 bg-amber-500"><Star className="w-3 h-3 mr-1" />Featured</Badge> : null}
                      </td>
                      <td className="p-3">{event.images?.length || 0}</td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleEditOpen(event)}>
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => onDelete(event._id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-sm text-slate-500">Page {page} of {totalPages}</p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" disabled={page <= 1} onClick={() => loadEvents(page - 1)}>
                Previous
              </Button>
              <Button size="sm" variant="outline" disabled={page >= totalPages} onClick={() => loadEvents(page + 1)}>
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{mode === 'create' ? 'Create Event' : 'Edit Event'}</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label>Title *</Label>
              <Input value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Short Description</Label>
              <Input
                value={form.shortDescription}
                onChange={(e) => setForm((p) => ({ ...p, shortDescription: e.target.value }))}
                placeholder="One-line summary for cards"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Description *</Label>
              <Textarea
                rows={6}
                value={form.description}
                onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label>Event Date *</Label>
              <Input type="date" value={form.eventDate} onChange={(e) => setForm((p) => ({ ...p, eventDate: e.target.value }))} />
            </div>

            <div className="space-y-2">
              <Label>Location</Label>
              <Input value={form.location} onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))} />
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Input value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))} />
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={form.status} onValueChange={(v: 'draft' | 'published') => setForm((p) => ({ ...p, status: v }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.isFeatured}
                  onChange={(e) => setForm((p) => ({ ...p, isFeatured: e.target.checked }))}
                />
                Mark as featured
              </Label>
            </div>

            {existingImages.length > 0 ? (
              <div className="md:col-span-2 space-y-2">
                <Label>Existing Images</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {existingImages
                    .filter((img) => !removedImages.includes(img))
                    .map((img) => (
                      <div key={img} className="relative rounded-lg overflow-hidden border">
                        <img src={img} alt="Event" className="h-24 w-full object-cover" />
                        <Button
                          type="button"
                          size="sm"
                          variant="destructive"
                          className="absolute right-1 top-1 h-6 px-2"
                          onClick={() => removeExistingImage(img)}
                        >
                          X
                        </Button>
                      </div>
                    ))}
                </div>
              </div>
            ) : null}

            <div className="space-y-2 md:col-span-2">
              <Label>Upload Images</Label>
              <Input type="file" accept="image/*" multiple onChange={(e) => onFileChange(e.target.files)} />
              {newImages.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                  {newImages.map((file) => (
                    <div key={file.name} className="rounded-lg border p-2 text-xs flex items-center justify-between gap-2">
                      <span className="line-clamp-1">{file.name}</span>
                      <Button type="button" size="sm" variant="outline" onClick={() => removeNewImage(file.name)}>
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-2">
            <Button variant="outline" onClick={() => setOpen(false)} disabled={saving}>Cancel</Button>
            <Button onClick={onSave} disabled={saving}>{saving ? 'Saving...' : 'Save Event'}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminEvents;
