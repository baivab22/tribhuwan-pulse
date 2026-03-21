import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
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
  Download,
  Eye,
  AlertCircle,
  FileText,
  Calendar,
  User,
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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const fetchReports = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE}/api/survey-reports`, {
        params: {
          page,
          limit: itemsPerPage,
          search: searchQuery || undefined,
          reportYear: selectedYear !== 'all' ? selectedYear : undefined,
          status: selectedStatus !== 'all' ? selectedStatus : undefined,
        },
      });

      if (response.data.success) {
        setReports(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
      toast.error('Failed to load survey reports');
    } finally {
      setIsLoading(false);
    }
  }, [page, searchQuery, selectedYear, selectedStatus]);

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

  const handleDownloadPDF = async (report: SurveyReport) => {
    try {
      const response = await axios.get(`${API_BASE}/api/survey-reports/${report._id}/download`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', report.pdfFile?.originalName || 'survey-report.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success('PDF downloaded successfully');
    } catch (error) {
      console.error('Error downloading PDF:', error);
      toast.error('Failed to download PDF');
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Survey Reports</h1>
        <p className="text-base text-gray-600 mt-2">
          {adminMode
            ? 'Manage and review survey reports from all institutions'
            : 'View survey reports from various institutions'}
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters & Search</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="space-y-2">
              <Label htmlFor="search" className="text-base font-semibold">
                Search
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="College name..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setPage(1);
                  }}
                  className="pl-10 h-11 text-base"
                />
              </div>
            </div>

            {/* Year Filter */}
            <div className="space-y-2">
              <Label htmlFor="year" className="text-base font-semibold">
                Report Year
              </Label>
              <Select value={selectedYear} onValueChange={(value) => {
                setSelectedYear(value);
                setPage(1);
              }}>
                <SelectTrigger id="year" className="h-11 text-base">
                  <SelectValue placeholder="All Years" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Status Filter */}
            {adminMode && (
              <div className="space-y-2">
                <Label htmlFor="status" className="text-base font-semibold">
                  Status
                </Label>
                <Select value={selectedStatus} onValueChange={(value) => {
                  setSelectedStatus(value);
                  setPage(1);
                }}>
                  <SelectTrigger id="status" className="h-11 text-base">
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Reset Button */}
            <div className="space-y-2 flex items-end">
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedYear('all');
                  setSelectedStatus('all');
                  setPage(1);
                }}
                className="w-full h-11 text-base"
              >
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports Table/Cards */}
      <div className="space-y-3">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
          </div>
        ) : reports.length === 0 ? (
          <Alert className="border-yellow-200 bg-yellow-50">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              No survey reports found matching your filters
            </AlertDescription>
          </Alert>
        ) : (
          <>
            {reports.map((report) => (
              <Card key={report._id} className="hover:shadow-lg transition-shadow border-gray-200">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-3 mb-3">
                        <FileText className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900">
                            {report.collegeName}
                          </h3>
                          <div className="flex flex-wrap items-center gap-3 mt-2 text-base text-gray-600">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {report.reportYear}
                            </span>
                            <span className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {report.uploadedBy?.name || 'Unknown'}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(report.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      {report.description && (
                        <p className="text-base text-gray-600 mb-3 italic">
                          &quot;{report.description}&quot;
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(
                            report.status
                          )}`}
                        >
                          {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                        </span>
                        <span className="text-xs text-gray-500">
                          📊 {report.viewCount} views
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 flex-shrink-0 w-full md:w-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewPDF(report)}
                        className="flex-1 md:flex-none flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        <span className="hidden sm:inline">View Full Screen</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadPDF(report)}
                        className="flex-1 md:flex-none flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        <span className="hidden sm:inline">Download</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <div className="flex items-center gap-2">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = Math.max(1, page - 2) + i;
                    if (pageNum <= totalPages) {
                      return (
                        <Button
                          key={pageNum}
                          variant={pageNum === page ? 'default' : 'outline'}
                          onClick={() => setPage(pageNum)}
                          className="w-10 h-10 p-0"
                        >
                          {pageNum}
                        </Button>
                      );
                    }
                    return null;
                  })}
                </div>
                <Button
                  variant="outline"
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SurveyReportList;
