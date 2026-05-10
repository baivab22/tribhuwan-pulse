import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  adminCreateCampusRecord,
  adminDeleteCampusRecord,
  adminGetCampusRecord,
  adminUpdateCampusRecord,
  CampusListItem,
  CampusListPayload,
  listCampusRecords,
} from '@/lib/api';
import districts from '@/data/districts.json';
import { Edit, ExternalLink, MapPin, Plus, RefreshCcw, Trash2 } from 'lucide-react';

type FormMode = 'create' | 'edit';

type CampusFormState = {
  id?: string;
  SN: string;
  campusname: string;
  localAddress: string;
  District: string;
  fullAddress: string;
  principlename: string;
  contactNumber: string;
  emailAddress: string;
  location: string;
  collegeType: string;
};

const PAGE_SIZE = 12;

const emptyForm: CampusFormState = {
  SN: '',
  campusname: '',
  localAddress: '',
  District: '',
  fullAddress: '',
  principlename: '',
  contactNumber: '',
  emailAddress: '',
  location: '',
  collegeType: '',
};

const toFormState = (record: CampusListItem): CampusFormState => ({
  id: record._id,
  SN: String(record.SN || ''),
  campusname: record.campusname || '',
  localAddress: record.localAddress || '',
  District: record.District || '',
  fullAddress: record.fullAddress || '',
  principlename: record.principlename || '',
  contactNumber: record.contactNumber || '',
  emailAddress: record.emailAddress || '',
  location: record.location || '',
  collegeType: record.collegeType || '',
});

const toPayload = (form: CampusFormState): CampusListPayload => ({
  SN: form.SN ? Number(form.SN) : undefined,
  campusname: form.campusname.trim(),
  localAddress: form.localAddress.trim() || undefined,
  District: form.District.trim(),
  fullAddress: form.fullAddress.trim() || undefined,
  principlename: form.principlename.trim() || undefined,
  contactNumber: form.contactNumber.trim() || undefined,
  emailAddress: form.emailAddress.trim() || undefined,
  location: form.location.trim(),
  collegeType: form.collegeType.trim() || undefined,
});

const isValidHttpUrl = (value: string) => {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};

const getCampusMapUrl = (campus: Pick<CampusFormState | CampusListItem, 'campusname' | 'fullAddress' | 'District' | 'location'>) => {
  const location = campus.location?.trim();
  if (location && isValidHttpUrl(location)) {
    return location;
  }

  const query = [campus.campusname, campus.fullAddress, campus.District, 'Nepal']
    .filter(Boolean)
    .join(', ');

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
};

const AdminCampusList = () => {
  const [rows, setRows] = useState<CampusListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const [search, setSearch] = useState('');
  const [district, setDistrict] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<FormMode>('create');
  const [form, setForm] = useState<CampusFormState>(emptyForm);

  const districtOptions = useMemo(() => {
    const names = districts.map((d) => d.name);
    return [...new Set(names)].sort((a, b) => a.localeCompare(b));
  }, []);

  const campusTypeOptions = ['Community', 'Govt', 'Private', 'Public'];

  const loadRows = async (targetPage = page) => {
    setLoading(true);
    setError('');
    try {
      const response = await listCampusRecords({
        page: targetPage,
        limit: PAGE_SIZE,
        search: search.trim() || undefined,
        district: district === 'all' ? undefined : district,
      });

      setRows(response.campuses);
      setPage(response.page);
      setTotalPages(response.pagination?.totalPages || 1);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load campus records.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRows(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetFilters = () => {
    setSearch('');
    setDistrict('all');
    setPage(1);
    loadRows(1);
  };

  const openCreate = () => {
    setMode('create');
    setForm(emptyForm);
    setOpen(true);
  };

  const openEdit = async (id: string) => {
    setSaving(true);
    setError('');
    try {
      const response = await adminGetCampusRecord(id);
      if (!response.success) {
        setError('Unable to open campus record.');
        return;
      }
      setMode('edit');
      setForm(toFormState(response.data));
      setOpen(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to open campus record.';
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  const validate = () => {
    if (!form.campusname.trim()) return 'Campus name is required.';
    if (!form.District.trim()) return 'District is required.';
    if (form.SN && (!Number.isFinite(Number(form.SN)) || Number(form.SN) <= 0)) return 'SN must be a positive number.';
    if (form.location.trim() && !isValidHttpUrl(form.location.trim())) return 'Google Map location must start with http:// or https://.';
    return '';
  };

  const onSubmit = async () => {
    const validation = validate();
    if (validation) {
      setError(validation);
      return;
    }

    setSaving(true);
    setError('');
    setNotice('');

    try {
      const payload = toPayload(form);
      if (mode === 'create') {
        await adminCreateCampusRecord(payload);
        setNotice('Campus record created successfully.');
      } else if (form.id) {
        await adminUpdateCampusRecord(form.id, payload);
        setNotice('Campus record updated successfully.');
      }

      setOpen(false);
      setForm(emptyForm);
      await loadRows(page);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Save failed. Please try again.';
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (id: string) => {
    const ok = window.confirm('Delete this campus record?');
    if (!ok) return;

    setSaving(true);
    setError('');
    setNotice('');
    try {
      await adminDeleteCampusRecord(id);
      setNotice('Campus record deleted successfully.');
      await loadRows(page);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Delete failed. Please try again.';
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between gap-3">
            <CardTitle>Campus List Admin (CRUD)</CardTitle>
            <Button onClick={openCreate}>
              <Plus className="mr-2 h-4 w-4" />
              Add Campus
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
            <Input
              placeholder="Search by campus/principal/district"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <Select value={district} onValueChange={setDistrict}>
              <SelectTrigger>
                <SelectValue placeholder="District" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All districts</SelectItem>
                {districtOptions.map((name) => (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button onClick={() => loadRows(1)} disabled={loading}>Apply</Button>
            <Button variant="outline" onClick={resetFilters} disabled={loading}>
              <RefreshCcw className="h-4 w-4" />
            </Button>
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          {notice ? <p className="text-sm text-emerald-600">{notice}</p> : null}

          <div className="overflow-x-auto rounded-md border">
            <table className="min-w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="p-3 text-left">SN</th>
                  <th className="p-3 text-left">Campus Name</th>
                  <th className="p-3 text-left">Type</th>
                  <th className="p-3 text-left">District</th>
                  <th className="p-3 text-left">Map</th>
                  <th className="p-3 text-left">Principal</th>
                  <th className="p-3 text-left">Contact</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td className="p-4 text-center" colSpan={8}>Loading campus records...</td>
                  </tr>
                ) : rows.length === 0 ? (
                  <tr>
                    <td className="p-4 text-center text-muted-foreground" colSpan={8}>No campus records found.</td>
                  </tr>
                ) : (
                  rows.map((row) => (
                    <tr key={row._id} className="border-t">
                      <td className="p-3">{row.SN}</td>
                      <td className="p-3 font-medium">{row.campusname}</td>
                      <td className="p-3">{row.collegeType || '-'}</td>
                      <td className="p-3">{row.District || '-'}</td>
                      <td className="p-3">
                        {row.location ? (
                          <a
                            href={getCampusMapUrl(row)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-primary hover:underline"
                          >
                            Map
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        ) : (
                          <span className="text-muted-foreground">Not set</span>
                        )}
                      </td>
                      <td className="p-3">{row.principlename || '-'}</td>
                      <td className="p-3">{row.contactNumber || '-'}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => openEdit(row._id)}
                            disabled={saving}
                            aria-label={`Edit ${row.campusname}`}
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="destructive"
                            onClick={() => onDelete(row._id)}
                            disabled={saving}
                            aria-label={`Delete ${row.campusname}`}
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Page {page} of {totalPages}</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={page <= 1 || loading} onClick={() => loadRows(page - 1)}>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled={page >= totalPages || loading} onClick={() => loadRows(page + 1)}>
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{mode === 'create' ? 'Create Campus Record' : 'Update Campus Record'}</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="space-y-2">
              <Label>SN (optional)</Label>
              <Input type="number" min={1} value={form.SN} onChange={(e) => setForm((p) => ({ ...p, SN: e.target.value }))} />
            </div>

            <div className="space-y-2">
              <Label>Campus Name *</Label>
              <Input value={form.campusname} onChange={(e) => setForm((p) => ({ ...p, campusname: e.target.value }))} />
            </div>

            <div className="space-y-2">
              <Label>District *</Label>
              <Select value={form.District} onValueChange={(value) => setForm((p) => ({ ...p, District: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select district" />
                </SelectTrigger>
                <SelectContent>
                  {districtOptions.map((name) => (
                    <SelectItem key={name} value={name}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Campus Type</Label>
              <Select value={form.collegeType || undefined} onValueChange={(value) => setForm((p) => ({ ...p, collegeType: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select campus type" />
                </SelectTrigger>
                <SelectContent>
                  {campusTypeOptions.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Local Address</Label>
              <Input value={form.localAddress} onChange={(e) => setForm((p) => ({ ...p, localAddress: e.target.value }))} />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Full Address</Label>
              <Input value={form.fullAddress} onChange={(e) => setForm((p) => ({ ...p, fullAddress: e.target.value }))} />
            </div>

            <div className="space-y-2">
              <Label>Principal Name</Label>
              <Input value={form.principlename} onChange={(e) => setForm((p) => ({ ...p, principlename: e.target.value }))} />
            </div>

            <div className="space-y-2">
              <Label>Contact Number</Label>
              <Input value={form.contactNumber} onChange={(e) => setForm((p) => ({ ...p, contactNumber: e.target.value }))} />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Email Address</Label>
              <Input type="email" value={form.emailAddress} onChange={(e) => setForm((p) => ({ ...p, emailAddress: e.target.value }))} />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Google Map Location</Label>
              <div className="flex gap-2">
                <Input
                  type="url"
                  placeholder="https://maps.app.goo.gl/..."
                  value={form.location}
                  onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  disabled={!form.location.trim() || !isValidHttpUrl(form.location.trim())}
                  onClick={() => window.open(getCampusMapUrl(form), '_blank', 'noopener,noreferrer')}
                  aria-label="Open Google Map location"
                  title="Open location"
                >
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>
              {form.location.trim() && !isValidHttpUrl(form.location.trim()) ? (
                <p className="text-xs text-red-600">Enter a full map URL beginning with http:// or https://.</p>
              ) : null}
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-2">
            <Button variant="outline" onClick={() => setOpen(false)} disabled={saving}>Cancel</Button>
            <Button onClick={onSubmit} disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCampusList;
