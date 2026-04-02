import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  adminCreateCollegeForm,
  adminDeleteCollegeForm,
  adminGetCollegeForm,
  adminListCollegeForms,
  adminUpdateCollegeForm,
  CollegeFormPayload,
  CollegeFormRecord,
} from '@/lib/api';
import provinces from '@/data/provinces.json';
import districts from '@/data/districts.json';
import { Edit, Plus, RefreshCcw, Trash2 } from 'lucide-react';

type FormMode = 'create' | 'edit';

type CampusFormState = {
  id?: string;
  collegeName: string;
  campusType: string;
  establishmentDate: string;
  principalName: string;
  principalContact: string;
  principalEmail: string;
  officialPhone: string;
  officialEmail: string;
  website: string;
  province: string;
  district: string;
  localLevel: string;
  wardNo: string;
};

const CAMPUS_TYPES = [
  'Constituent Campus',
  'Affiliated College',
  'Community Campus',
  'Private College',
];

const PAGE_SIZE = 10;

const emptyForm: CampusFormState = {
  collegeName: '',
  campusType: '',
  establishmentDate: '',
  principalName: '',
  principalContact: '',
  principalEmail: '',
  officialPhone: '',
  officialEmail: '',
  website: '',
  province: '',
  district: '',
  localLevel: '',
  wardNo: '',
};

const toPayload = (form: CampusFormState): CollegeFormPayload => ({
  collegeName: form.collegeName.trim(),
  campusType: form.campusType,
  establishmentDate: form.establishmentDate,
  principalInfo: {
    name: form.principalName.trim(),
    contactNumber: form.principalContact.trim() || undefined,
    email: form.principalEmail.trim() || undefined,
  },
  contactInfo: {
    officialPhone: form.officialPhone.trim() || undefined,
    officialEmail: form.officialEmail.trim() || undefined,
    website: form.website.trim() || undefined,
  },
  location: {
    province: form.province,
    district: form.district,
    localLevel: form.localLevel.trim(),
    wardNo: Number(form.wardNo),
  },
});

const toFormState = (record: CollegeFormRecord): CampusFormState => ({
  id: record._id,
  collegeName: record.collegeName || '',
  campusType: record.campusType || '',
  establishmentDate: record.establishmentDate ? record.establishmentDate.slice(0, 10) : '',
  principalName: record.principalInfo?.name || '',
  principalContact: record.principalInfo?.contactNumber || '',
  principalEmail: record.principalInfo?.email || '',
  officialPhone: record.contactInfo?.officialPhone || '',
  officialEmail: record.contactInfo?.officialEmail || '',
  website: record.contactInfo?.website || '',
  province: record.location?.province || '',
  district: record.location?.district || '',
  localLevel: record.location?.localLevel || '',
  wardNo: record.location?.wardNo?.toString() || '',
});

const AdminForCollege = () => {
  const [rows, setRows] = useState<CollegeFormRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const [search, setSearch] = useState('');
  const [district, setDistrict] = useState('all');
  const [status, setStatus] = useState('all');
  const [campusType, setCampusType] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<FormMode>('create');
  const [form, setForm] = useState<CampusFormState>(emptyForm);

  const districtOptions = useMemo(() => {
    return [...new Set(districts.map((d) => d.name))].sort((a, b) => a.localeCompare(b));
  }, []);

  const loadRows = async (targetPage = page) => {
    setLoading(true);
    setError('');
    try {
      const response = await adminListCollegeForms({
        page: targetPage,
        limit: PAGE_SIZE,
        search: search.trim() || undefined,
        district: district === 'all' ? undefined : district,
        formStatus: status === 'all' ? undefined : status,
        campusType: campusType === 'all' ? undefined : campusType,
      });

      if (!response.success) {
        setError('Failed to load campus forms.');
        return;
      }

      setRows(response.data);
      setPage(response.pagination.currentPage);
      setTotalPages(response.pagination.totalPages || 1);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load campus forms.';
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
    setStatus('all');
    setCampusType('all');
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
      const response = await adminGetCollegeForm(id);
      if (!response.success) {
        setError('Unable to open record for editing.');
        return;
      }
      setMode('edit');
      setForm(toFormState(response.data));
      setOpen(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to open record for editing.';
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  const validate = () => {
    if (!form.collegeName.trim()) return 'College/Campus name is required.';
    if (!form.campusType) return 'Campus type is required.';
    if (!form.establishmentDate) return 'Establishment date is required.';
    if (!form.principalName.trim()) return 'Principal name is required.';
    if (!form.province) return 'Province is required.';
    if (!form.district) return 'District is required.';
    if (!form.localLevel.trim()) return 'Local level is required.';
    if (!form.wardNo || Number.isNaN(Number(form.wardNo)) || Number(form.wardNo) < 1) {
      return 'Valid ward number is required.';
    }
    return '';
  };

  const onSubmit = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSaving(true);
    setError('');
    setNotice('');

    try {
      const payload = toPayload(form);
      if (mode === 'create') {
        await adminCreateCollegeForm(payload);
        setNotice('Campus form created successfully.');
      } else if (form.id) {
        await adminUpdateCollegeForm(form.id, payload);
        setNotice('Campus form updated successfully.');
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
    const ok = window.confirm('Delete this campus form? This action cannot be undone.');
    if (!ok) return;

    setSaving(true);
    setError('');
    setNotice('');
    try {
      await adminDeleteCollegeForm(id);
      setNotice('Campus form deleted successfully.');
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
          <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
            <Input
              placeholder="Search by campus name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <Select value={district} onValueChange={setDistrict}>
              <SelectTrigger>
                <SelectValue placeholder="District" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All districts</SelectItem>
                {districtOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Submitted">Submitted</SelectItem>
                <SelectItem value="Under Review">Under Review</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            <Select value={campusType} onValueChange={setCampusType}>
              <SelectTrigger>
                <SelectValue placeholder="Campus type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                {CAMPUS_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Button className="w-full" onClick={() => loadRows(1)} disabled={loading}>
                Apply
              </Button>
              <Button variant="outline" onClick={resetFilters} disabled={loading}>
                <RefreshCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          {notice ? <p className="text-sm text-emerald-600">{notice}</p> : null}

          <div className="overflow-x-auto rounded-md border">
            <table className="min-w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="p-3 text-left">Campus Name</th>
                  <th className="p-3 text-left">District</th>
                  <th className="p-3 text-left">Province</th>
                  <th className="p-3 text-left">Principal</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td className="p-4 text-center" colSpan={6}>
                      Loading campus records...
                    </td>
                  </tr>
                ) : rows.length === 0 ? (
                  <tr>
                    <td className="p-4 text-center text-muted-foreground" colSpan={6}>
                      No campus records found.
                    </td>
                  </tr>
                ) : (
                  rows.map((row) => (
                    <tr key={row._id} className="border-t">
                      <td className="p-3 font-medium">{row.collegeName}</td>
                      <td className="p-3">{row.location?.district || '-'}</td>
                      <td className="p-3">{row.location?.province || '-'}</td>
                      <td className="p-3">{row.principalInfo?.name || '-'}</td>
                      <td className="p-3">{row.formStatus || '-'}</td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openEdit(row._id)}
                            disabled={saving}
                          >
                            <Edit className="mr-1 h-4 w-4" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => onDelete(row._id)}
                            disabled={saving}
                          >
                            <Trash2 className="mr-1 h-4 w-4" />
                            Delete
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
            <p className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1 || loading}
                onClick={() => loadRows(page - 1)}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages || loading}
                onClick={() => loadRows(page + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>{mode === 'create' ? 'Create Campus Record' : 'Update Campus Record'}</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Campus Name *</Label>
              <Input value={form.collegeName} onChange={(e) => setForm((p) => ({ ...p, collegeName: e.target.value }))} />
            </div>

            <div className="space-y-2">
              <Label>Campus Type *</Label>
              <Select value={form.campusType} onValueChange={(value) => setForm((p) => ({ ...p, campusType: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select campus type" />
                </SelectTrigger>
                <SelectContent>
                  {CAMPUS_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Establishment Date *</Label>
              <Input type="date" value={form.establishmentDate} onChange={(e) => setForm((p) => ({ ...p, establishmentDate: e.target.value }))} />
            </div>

            <div className="space-y-2">
              <Label>Principal Name *</Label>
              <Input value={form.principalName} onChange={(e) => setForm((p) => ({ ...p, principalName: e.target.value }))} />
            </div>

            <div className="space-y-2">
              <Label>Principal Contact</Label>
              <Input value={form.principalContact} onChange={(e) => setForm((p) => ({ ...p, principalContact: e.target.value }))} />
            </div>

            <div className="space-y-2">
              <Label>Principal Email</Label>
              <Input type="email" value={form.principalEmail} onChange={(e) => setForm((p) => ({ ...p, principalEmail: e.target.value }))} />
            </div>

            <div className="space-y-2">
              <Label>Province *</Label>
              <Select value={form.province} onValueChange={(value) => setForm((p) => ({ ...p, province: value, district: '' }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select province" />
                </SelectTrigger>
                <SelectContent>
                  {provinces.map((province) => (
                    <SelectItem key={province.name} value={province.name}>
                      {province.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>District *</Label>
              <Select value={form.district} onValueChange={(value) => setForm((p) => ({ ...p, district: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select district" />
                </SelectTrigger>
                <SelectContent>
                  {districts
                    .filter((d) => (form.province ? d.province_id.toString() === provinces.find((p) => p.name === form.province)?.province_id.toString() : true))
                    .map((d) => (
                      <SelectItem key={d.name} value={d.name}>
                        {d.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Local Level *</Label>
              <Input value={form.localLevel} onChange={(e) => setForm((p) => ({ ...p, localLevel: e.target.value }))} />
            </div>

            <div className="space-y-2">
              <Label>Ward No *</Label>
              <Input type="number" min={1} value={form.wardNo} onChange={(e) => setForm((p) => ({ ...p, wardNo: e.target.value }))} />
            </div>

            <div className="space-y-2">
              <Label>Official Phone</Label>
              <Input value={form.officialPhone} onChange={(e) => setForm((p) => ({ ...p, officialPhone: e.target.value }))} />
            </div>

            <div className="space-y-2">
              <Label>Official Email</Label>
              <Input type="email" value={form.officialEmail} onChange={(e) => setForm((p) => ({ ...p, officialEmail: e.target.value }))} />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Website</Label>
              <Input value={form.website} onChange={(e) => setForm((p) => ({ ...p, website: e.target.value }))} placeholder="https://..." />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button onClick={onSubmit} disabled={saving}>
              {saving ? 'Saving...' : mode === 'create' ? 'Create' : 'Update'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminForCollege;
