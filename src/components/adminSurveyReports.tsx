import React, { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Loader2,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Pencil,
  Search,
  FilterX,
  Plus,
  RefreshCw,
  Download,
  ArrowUpDown,
  Calendar,
  Building2,
  FileText,
  Users,
} from 'lucide-react';
import { toast } from 'sonner';
import { API_BASE } from '@/lib/api';
import type { SurveyReport } from '@/types';
import SurveyReportForm from './surveyReportForm';

type DialogAction = 'view' | 'approve' | 'reject' | 'edit';
type SortField = 'createdAt' | 'reportYear' | 'collegeName' | 'viewCount';
type SortDirection = 'asc' | 'desc';

interface AdminSurveyReportsProps {
  showCreateForm?: boolean;
}

export const AdminSurveyReports: React.FC<AdminSurveyReportsProps> = ({
  showCreateForm = true,
}) => {
  const [reports, setReports] = useState<SurveyReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<SurveyReport | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogAction, setDialogAction] = useState<DialogAction>('view');
  const [deleteTarget, setDeleteTarget] = useState<SurveyReport | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [remarks, setRemarks] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editForm, setEditForm] = useState({
    collegeName: '',
    reportYear: '',
    description: '',
    status: 'pending',
    remarks: '',
    pdfFile: null as File | null,
  });
  const [stats, setStats] = useState({
    totalReports: 0,
    approvedReports: 0,
    pendingReports: 0,
    rejectedReports: 0,
    totalViews: 0,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [yearFilter, setYearFilter] = useState<'all' | string>('all');
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [showCreatePanel, setShowCreatePanel] = useState(showCreateForm);

  const getAuthHeaders = useCallback(() => ({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  }), []);

  const getErrorMessage = (error: unknown, fallback: string) => {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || fallback;
    }
    return fallback;
  };

  const fetchReports = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE}/api/survey-reports`, {
        params: { limit: 100, page: 1 },
        headers: getAuthHeaders(),
      });

      if (response.data.success) {
        setReports(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
      toast.error('Failed to load reports');
    } finally {
      setIsLoading(false);
    }
  }, [getAuthHeaders]);

  const fetchStats = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/survey-reports/stats/overview`, {
        headers: getAuthHeaders(),
      });

      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  }, [getAuthHeaders]);

  useEffect(() => {
    fetchReports();
    fetchStats();
  }, [fetchReports, fetchStats]);

  const refreshData = useCallback(async () => {
    await Promise.all([fetchReports(), fetchStats()]);
  }, [fetchReports, fetchStats]);

  const openDialog = (report: SurveyReport, action: DialogAction) => {
    setSelectedReport(report);
    setDialogAction(action);
    setRemarks(report.remarks || '');
    setEditForm({
      collegeName: report.collegeName,
      reportYear: report.reportYear,
      description: report.description || '',
      status: report.status,
      remarks: report.remarks || '',
      pdfFile: null,
    });
    setShowDialog(true);
  };

  const openDeleteDialog = (report: SurveyReport) => {
    setDeleteTarget(report);
    setShowDeleteDialog(true);
  };

  const handleApprove = async () => {
    if (!selectedReport?._id) return;
    setIsSubmitting(true);
    try {
      const response = await axios.put(
        `${API_BASE}/api/survey-reports/${selectedReport._id}/approve`,
        { remarks },
        { headers: getAuthHeaders() }
      );

      if (response.data.success) {
        toast.success('Report approved successfully');
        setShowDialog(false);
        await refreshData();
      }
    } catch (error: unknown) {
      console.error('Error approving report:', error);
      toast.error(getErrorMessage(error, 'Failed to approve report'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!selectedReport?._id) return;
    if (!remarks.trim()) {
      toast.error('Remarks are required when rejecting a report');
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await axios.put(
        `${API_BASE}/api/survey-reports/${selectedReport._id}/reject`,
        { remarks },
        { headers: getAuthHeaders() }
      );

      if (response.data.success) {
        toast.success('Report rejected successfully');
        setShowDialog(false);
        await refreshData();
      }
    } catch (error: unknown) {
      console.error('Error rejecting report:', error);
      toast.error(getErrorMessage(error, 'Failed to reject report'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async () => {
    if (!selectedReport?._id) return;
    if (!editForm.collegeName.trim() || !editForm.reportYear.trim()) {
      toast.error('College name and report year are required');
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('collegeName', editForm.collegeName);
      formData.append('reportYear', editForm.reportYear);
      formData.append('description', editForm.description);
      formData.append('status', editForm.status);
      formData.append('remarks', editForm.remarks);
      if (editForm.pdfFile) {
        formData.append('pdfFile', editForm.pdfFile);
      }

      const response = await axios.put(
        `${API_BASE}/api/survey-reports/${selectedReport._id}`,
        formData,
        {
          headers: {
            ...getAuthHeaders(),
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.success) {
        toast.success('Report updated successfully');
        setShowDialog(false);
        await refreshData();
      }
    } catch (error: unknown) {
      console.error('Error updating report:', error);
      toast.error(getErrorMessage(error, 'Failed to update report'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget?._id) return;

    setIsSubmitting(true);
    try {
      const response = await axios.delete(`${API_BASE}/api/survey-reports/${deleteTarget._id}`, {
        headers: getAuthHeaders(),
      });

      if (response.data.success) {
        toast.success('Report deleted successfully');
        setShowDeleteDialog(false);
        setDeleteTarget(null);
        await refreshData();
      }
    } catch (error: unknown) {
      console.error('Error deleting report:', error);
      toast.error(getErrorMessage(error, 'Failed to delete report'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownload = async (report: SurveyReport) => {
    if (!report._id) {
      toast.error('Missing report id');
      return;
    }

    try {
      const response = await axios.get(`${API_BASE}/api/survey-reports/${report._id}/download`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', report.pdfFile?.originalName || `${report.collegeName}-${report.reportYear}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success('PDF downloaded successfully');
    } catch (error: unknown) {
      console.error('Error downloading report PDF:', error);
      toast.error(getErrorMessage(error, 'Failed to download report PDF'));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-600 bg-green-50';
      case 'rejected':
        return 'text-red-600 bg-red-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const availableYears = useMemo(() => {
    return Array.from(new Set(reports.map((report) => report.reportYear))).sort((a, b) => b.localeCompare(a));
  }, [reports]);

  const filteredAndSortedReports = useMemo(() => {
    const filtered = reports.filter((report) => {
      const matchesSearch = report.collegeName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
      const matchesYear = yearFilter === 'all' || report.reportYear === yearFilter;

      return matchesSearch && matchesStatus && matchesYear;
    });

    return filtered.sort((a, b) => {
      const direction = sortDirection === 'asc' ? 1 : -1;

      if (sortField === 'createdAt') {
        return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * direction;
      }

      if (sortField === 'viewCount') {
        return ((a.viewCount || 0) - (b.viewCount || 0)) * direction;
      }

      if (sortField === 'reportYear') {
        return a.reportYear.localeCompare(b.reportYear, undefined, { numeric: true }) * direction;
      }

      return a.collegeName.localeCompare(b.collegeName) * direction;
    });
  }, [reports, searchQuery, sortDirection, sortField, statusFilter, yearFilter]);

  return (
    <div className="w-full space-y-6 p-4">
      <div className="rounded-2xl border border-cyan-100 bg-gradient-to-r from-cyan-50 via-white to-orange-50 p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Campus Survey Report Management</h1>
            <p className="mt-2 text-gray-600">
          {showCreateForm
            ? 'Create, review, edit, and manage survey reports'
            : 'Review, edit, and manage survey reports'}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              onClick={refreshData}
              disabled={isLoading}
              className="gap-2"
            >
              <RefreshCw className="h-4 w-4" /> Refresh
            </Button>
            {showCreateForm && (
              <Button onClick={() => setShowCreatePanel((prev) => !prev)} className="gap-2 bg-cyan-700 hover:bg-cyan-800">
                <Plus className="h-4 w-4" /> {showCreatePanel ? 'Hide Create Form' : 'Add Survey Report'}
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div><p className="text-sm text-gray-600">Total</p><p className="text-3xl font-bold">{stats.totalReports}</p></div>
            <FileText className="h-8 w-8 text-cyan-700" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div><p className="text-sm text-gray-600">Pending</p><p className="text-3xl font-bold text-yellow-600">{stats.pendingReports}</p></div>
            <AlertCircle className="h-8 w-8 text-yellow-600" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div><p className="text-sm text-gray-600">Approved</p><p className="text-3xl font-bold text-green-600">{stats.approvedReports}</p></div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div><p className="text-sm text-gray-600">Rejected</p><p className="text-3xl font-bold text-red-600">{stats.rejectedReports}</p></div>
            <XCircle className="h-8 w-8 text-red-600" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div><p className="text-sm text-gray-600">Views</p><p className="text-3xl font-bold">{stats.totalViews}</p></div>
            <Users className="h-8 w-8 text-gray-700" />
          </CardContent>
        </Card>
      </div>

      {showCreateForm && showCreatePanel ? (
        <div>
          <SurveyReportForm onSuccess={refreshData} />
        </div>
      ) : null}

      <Card className="border-cyan-100">
        <CardHeader>
          <CardTitle className="text-lg">Search & Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
            <div className="md:col-span-2">
              <Label htmlFor="survey-search" className="mb-2 block">Search</Label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="survey-search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by college"
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label className="mb-2 block">Status</Label>
              <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as 'all' | 'pending' | 'approved' | 'rejected')}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-2 block">Year</Label>
              <Select value={yearFilter} onValueChange={(value) => setYearFilter(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {availableYears.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-2 block">Sort</Label>
              <Select value={sortField} onValueChange={(value) => setSortField(value as SortField)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="createdAt">Created Date</SelectItem>
                  <SelectItem value="reportYear">Report Year</SelectItem>
                  <SelectItem value="collegeName">College Name</SelectItem>
                  <SelectItem value="viewCount">View Count</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredAndSortedReports.length}</span> of <span className="font-semibold text-gray-900">{reports.length}</span> reports
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))}
              >
                <ArrowUpDown className="h-4 w-4" /> {sortDirection === 'asc' ? 'Ascending' : 'Descending'}
              </Button>
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                  setYearFilter('all');
                  setSortField('createdAt');
                  setSortDirection('desc');
                }}
              >
                <FilterX className="h-4 w-4" /> Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Survey Reports</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
          ) : filteredAndSortedReports.length === 0 ? (
            <Alert className="border-yellow-200 bg-yellow-50">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                No survey reports found for current filters
              </AlertDescription>
            </Alert>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-gray-100">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left px-4 py-2 text-sm font-semibold text-gray-700">College</th>
                    <th className="text-left px-4 py-2 text-sm font-semibold text-gray-700">Year</th>
                    <th className="text-left px-4 py-2 text-sm font-semibold text-gray-700">Status</th>
                    <th className="text-left px-4 py-2 text-sm font-semibold text-gray-700">Created</th>
                    <th className="text-left px-4 py-2 text-sm font-semibold text-gray-700">Views</th>
                    <th className="text-right px-4 py-2 text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedReports.map((report) => (
                    <tr key={report._id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium">{report.collegeName}</td>
                      <td className="px-4 py-3 text-sm">{report.reportYear}</td>
                      <td className="px-4 py-3 text-sm">
                        <Badge className={`rounded-full border-0 px-3 py-1 text-xs font-semibold ${getStatusColor(report.status)}`}>
                          {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span className="inline-flex items-center gap-1 text-gray-600">
                          <Calendar className="h-3.5 w-3.5" />
                          {new Date(report.createdAt).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">{report.viewCount}</td>
                      <td className="px-4 py-3 text-right text-sm">
                        <div className="flex gap-2 justify-end">
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => openDialog(report, 'view')}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          {report._id ? (
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => window.open(`${API_BASE}/api/survey-reports/${report._id}/pdf`, '_blank')}
                            >
                              <Building2 className="w-4 h-4" />
                            </Button>
                          ) : null}
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => handleDownload(report)}>
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => openDialog(report, 'edit')}>
                            <Pencil className="w-4 h-4" />
                          </Button>

                          {report.status === 'pending' && (
                            <>
                              <Button size="sm" className="h-8 w-8 p-0 bg-green-600 hover:bg-green-700" onClick={() => openDialog(report, 'approve')}>
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="destructive" className="h-8 w-8 p-0" onClick={() => openDialog(report, 'reject')}>
                                <XCircle className="w-4 h-4" />
                              </Button>
                            </>
                          )}

                          <Button size="sm" variant="destructive" className="h-8 w-8 p-0" onClick={() => openDeleteDialog(report)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {dialogAction === 'view' && 'View Report'}
              {dialogAction === 'approve' && 'Approve Report'}
              {dialogAction === 'reject' && 'Reject Report'}
              {dialogAction === 'edit' && 'Edit Report'}
            </DialogTitle>
            <DialogDescription>
              {selectedReport?.collegeName} - {selectedReport?.reportYear}
            </DialogDescription>
          </DialogHeader>

          {dialogAction === 'view' && selectedReport && (
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-semibold">Description</Label>
                <p className="text-gray-600 mt-1">{selectedReport.description || 'No description provided'}</p>
              </div>
              {selectedReport.pdfFile && (
                <Button
                  variant="outline"
                  onClick={() => window.open(`${API_BASE}/api/survey-reports/${selectedReport._id}/pdf`, '_blank')}
                >
                  Open PDF Viewer
                </Button>
              )}
            </div>
          )}

          {(dialogAction === 'approve' || dialogAction === 'reject') && (
            <div className="space-y-2">
              <Label htmlFor="remarks" className="text-sm font-semibold">
                Remarks {dialogAction === 'reject' && <span className="text-red-500">*</span>}
              </Label>
              <Textarea
                id="remarks"
                placeholder="Enter your remarks..."
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                rows={4}
              />
              {dialogAction === 'reject' && !remarks.trim() ? (
                <p className="text-xs text-red-600">Remarks are required before rejecting.</p>
              ) : null}
            </div>
          )}

          {dialogAction === 'edit' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="collegeName">College Name</Label>
                <Input
                  id="collegeName"
                  value={editForm.collegeName}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, collegeName: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reportYear">Report Year</Label>
                <Input
                  id="reportYear"
                  value={editForm.reportYear}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, reportYear: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  rows={3}
                  value={editForm.description}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, description: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={editForm.status}
                  onValueChange={(value) => setEditForm((prev) => ({ ...prev, status: value as 'pending' | 'approved' | 'rejected' }))}
                >
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="editRemarks">Remarks</Label>
                <Textarea
                  id="editRemarks"
                  rows={3}
                  value={editForm.remarks}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, remarks: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pdfFile">Replace PDF (Optional)</Label>
                <Input
                  id="pdfFile"
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => {
                    const nextFile = e.target.files?.[0] || null;
                    setEditForm((prev) => ({ ...prev, pdfFile: nextFile }));
                  }}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            {(dialogAction === 'view' || dialogAction === 'edit' || dialogAction === 'approve' || dialogAction === 'reject') && (
              <Button variant="outline" onClick={() => setShowDialog(false)}>
                Cancel
              </Button>
            )}
            {dialogAction === 'approve' && (
              <Button className="bg-green-600 hover:bg-green-700" onClick={handleApprove} disabled={isSubmitting}>
                {isSubmitting ? 'Approving...' : 'Approve'}
              </Button>
            )}
            {dialogAction === 'reject' && (
              <Button variant="destructive" onClick={handleReject} disabled={isSubmitting || !remarks.trim()}>
                {isSubmitting ? 'Rejecting...' : 'Reject'}
              </Button>
            )}
            {dialogAction === 'edit' && (
              <Button onClick={handleUpdate} disabled={isSubmitting}>
                {isSubmitting ? 'Updating...' : 'Update'}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Survey Report</DialogTitle>
            <DialogDescription>
              This action cannot be undone. The selected report will be removed from active records.
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-lg border border-red-100 bg-red-50 p-3 text-sm text-red-800">
            <p className="font-semibold">{deleteTarget?.collegeName || 'Unknown campus'}</p>
            <p>Report Year: {deleteTarget?.reportYear || 'N/A'}</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isSubmitting}>
              {isSubmitting ? 'Deleting...' : 'Delete Report'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminSurveyReports;
