import React, { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Loader2,
  Search,
  Eye,
  AlertCircle,
  FilterX,
  ArrowUpDown,
  Calendar,
} from 'lucide-react';
import { toast } from 'sonner';
import { API_BASE } from '@/lib/api';
import { SurveyReport } from '@/types';

interface SurveyReportListProps {
  adminMode?: boolean;
}

export const SurveyReportList: React.FC<SurveyReportListProps> = ({
  adminMode = false,
}) => {
  const [reports, setReports] = useState<SurveyReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<SurveyReport | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('all');
  const [sortField, setSortField] = useState<'createdAt' | 'reportYear' | 'collegeName' | 'viewCount'>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const fetchReports = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE}/api/survey-reports`, {
        params: {
          page: 1,
          limit: 100,
        },
      });

      if (response.data.success) {
        setReports(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
      toast.error('Failed to load survey reports');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const handleViewPDF = (report: SurveyReport) => {
    if (!report._id) {
      toast.error('Report id is missing');
      return;
    }

    const pdfUrl = `${API_BASE}/api/survey-reports/${report._id}/pdf`;
    const newTab = window.open(pdfUrl, '_blank', 'noopener,noreferrer');
    if (!newTab) {
      toast.error('Please allow pop-ups to open PDF in a new tab');
    }
  };

  const getStatusBadgeColor = (status: string) => {
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

  const availableYears = useMemo(
    () => Array.from(new Set(reports.map((report) => report.reportYear))).sort((a, b) => b.localeCompare(a)),
    [reports]
  );

  const filteredAndSortedReports = useMemo(() => {
    const filtered = reports.filter((report) => {
      const matchesSearch =
        report.collegeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (report.uploadedBy?.name || '').toLowerCase().includes(searchQuery.toLowerCase());

      const matchesYear = selectedYear === 'all' || report.reportYear === selectedYear;
      return matchesSearch && matchesYear;
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
  }, [reports, searchQuery, selectedYear, sortDirection, sortField]);

  const openViewDialog = (report: SurveyReport) => {
    setSelectedReport(report);
    setShowDialog(true);
  };

  return (
    <div className="w-full space-y-6 p-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Survey Reports</h1>
        <p className="mt-2 text-gray-600">
          {adminMode
            ? 'Manage and review survey reports from all institutions'
            : 'View survey reports from various institutions in read-only mode'}
        </p>
      </div>

      <Card className="border-cyan-100">
        <CardHeader>
          <CardTitle className="text-lg">Search & Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
            <div className="md:col-span-2">
              <Label htmlFor="search" className="mb-2 block">Search</Label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="survey-search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by college or uploader"
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label className="mb-2 block">Year</Label>
              <Select value={selectedYear} onValueChange={(value) => setSelectedYear(value)}>
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
              <Select
                value={sortField}
                onValueChange={(value) =>
                  setSortField(value as 'createdAt' | 'reportYear' | 'collegeName' | 'viewCount')
                }
              >
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
              Showing <span className="font-semibold text-gray-900">{filteredAndSortedReports.length}</span> of{' '}
              <span className="font-semibold text-gray-900">{reports.length}</span> reports
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
                  setSelectedYear('all');
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
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">College</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Year</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Uploaded By</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Created</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Views</th>
                  <th className="px-4 py-2 text-right text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedReports.map((report) => (
                  <tr key={report._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium">{report.collegeName}</td>
                    <td className="px-4 py-3 text-sm">{report.reportYear}</td>
                    <td className="px-4 py-3 text-sm">
                      <Badge
                        className={`rounded-full border-0 px-3 py-1 text-xs font-semibold ${getStatusBadgeColor(
                          report.status
                        )}`}
                      >
                        {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm">{report.uploadedBy?.name || 'N/A'}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className="inline-flex items-center gap-1 text-gray-600">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(report.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">{report.viewCount}</td>
                    <td className="px-4 py-3 text-right text-sm">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => openViewDialog(report)}
                          title="View details"
                        >
                          <Eye className="w-4 h-4" />
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
            <DialogTitle>View Report</DialogTitle>
            <DialogDescription>
              {selectedReport?.collegeName} - {selectedReport?.reportYear}
            </DialogDescription>
          </DialogHeader>

          {selectedReport ? (
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-semibold">Description</Label>
                <p className="mt-1 text-gray-600">{selectedReport.description || 'No description provided'}</p>
              </div>
              <div>
                <Label className="text-sm font-semibold">Uploaded By</Label>
                <p className="mt-1 text-gray-600">{selectedReport.uploadedBy?.name || 'Unknown'}</p>
              </div>
              <div>
                <Label className="text-sm font-semibold">Status</Label>
                <p className="mt-1 text-gray-600">
                  {selectedReport.status.charAt(0).toUpperCase() + selectedReport.status.slice(1)}
                </p>
              </div>
            </div>
          ) : null}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Close
            </Button>
            {selectedReport?._id ? (
              <Button onClick={() => handleViewPDF(selectedReport)}>
                Open PDF Viewer
              </Button>
            ) : null}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SurveyReportList;
