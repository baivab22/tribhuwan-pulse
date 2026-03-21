import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
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
} from 'lucide-react';
import { toast } from 'sonner';
import { API_BASE } from '@/lib/api';
import type { SurveyReport } from '@/types';
import SurveyReportForm from './surveyReportForm';

type DialogAction = 'view' | 'approve' | 'reject' | 'edit';

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

  const getAuthHeaders = useCallback(() => ({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  }), []);

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
    } catch (error) {
      console.error('Error approving report:', error);
      toast.error('Failed to approve report');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!selectedReport?._id) return;
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
    } catch (error) {
      console.error('Error rejecting report:', error);
      toast.error('Failed to reject report');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async () => {
    if (!selectedReport?._id) return;
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
    } catch (error) {
      console.error('Error updating report:', error);
      toast.error('Failed to update report');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (reportId: string) => {
    if (!confirm('Are you sure you want to delete this report?')) return;
    try {
      const response = await axios.delete(`${API_BASE}/api/survey-reports/${reportId}`, {
        headers: getAuthHeaders(),
      });

      if (response.data.success) {
        toast.success('Report deleted successfully');
        await refreshData();
      }
    } catch (error) {
      console.error('Error deleting report:', error);
      toast.error('Failed to delete report');
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

  return (
    <div className="w-full space-y-6 p-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Survey Report Management</h1>
        <p className="text-gray-600 mt-2">
          {showCreateForm
            ? 'Create, review, edit, and manage survey reports'
            : 'Review, edit, and manage survey reports'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card><CardContent className="p-6"><p className="text-sm text-gray-600">Total</p><p className="text-3xl font-bold">{stats.totalReports}</p></CardContent></Card>
        <Card><CardContent className="p-6"><p className="text-sm text-gray-600">Pending</p><p className="text-3xl font-bold text-yellow-600">{stats.pendingReports}</p></CardContent></Card>
        <Card><CardContent className="p-6"><p className="text-sm text-gray-600">Approved</p><p className="text-3xl font-bold text-green-600">{stats.approvedReports}</p></CardContent></Card>
        <Card><CardContent className="p-6"><p className="text-sm text-gray-600">Rejected</p><p className="text-3xl font-bold text-red-600">{stats.rejectedReports}</p></CardContent></Card>
        <Card><CardContent className="p-6"><p className="text-sm text-gray-600">Views</p><p className="text-3xl font-bold">{stats.totalViews}</p></CardContent></Card>
      </div>

      {showCreateForm ? (
        <div>
          <SurveyReportForm onSuccess={refreshData} />
        </div>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>All Survey Reports</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
          ) : reports.length === 0 ? (
            <Alert className="border-yellow-200 bg-yellow-50">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">No survey reports found</AlertDescription>
            </Alert>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left px-4 py-2 text-sm font-semibold text-gray-700">College</th>
                    <th className="text-left px-4 py-2 text-sm font-semibold text-gray-700">Year</th>
                    <th className="text-left px-4 py-2 text-sm font-semibold text-gray-700">Status</th>
                    <th className="text-left px-4 py-2 text-sm font-semibold text-gray-700">Uploaded By</th>
                    <th className="text-left px-4 py-2 text-sm font-semibold text-gray-700">Views</th>
                    <th className="text-right px-4 py-2 text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((report) => (
                    <tr key={report._id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm">{report.collegeName}</td>
                      <td className="px-4 py-3 text-sm">{report.reportYear}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(report.status)}`}>
                          {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">{report.uploadedBy?.name || 'N/A'}</td>
                      <td className="px-4 py-3 text-sm">{report.viewCount}</td>
                      <td className="px-4 py-3 text-right text-sm">
                        <div className="flex gap-2 justify-end">
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => openDialog(report, 'view')}>
                            <Eye className="w-4 h-4" />
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

                          <Button size="sm" variant="destructive" className="h-8 w-8 p-0" onClick={() => report._id && handleDelete(report._id)}>
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
              <div>
                <Label className="text-sm font-semibold">Uploaded By</Label>
                <p className="text-gray-600 mt-1">{selectedReport.uploadedBy?.name || 'Unknown'}</p>
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
              <Button variant="destructive" onClick={handleReject} disabled={isSubmitting}>
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
    </div>
  );
};

export default AdminSurveyReports;
