import React, { useState, useEffect } from 'react';
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
import { Loader2, Search, ChevronRight, AlertCircle, MapPin, Building2 } from 'lucide-react';
import { toast } from 'sonner';
import { API_BASE } from '@/lib/api';
import { CollegeFormData } from '@/types';

interface CampusFormFillupProps {
  onNavigateToForm?: (formId: string) => void;
}

export const CampusFormFillup: React.FC<CampusFormFillupProps> = ({ onNavigateToForm }) => {
  const [filteredForms, setFilteredForms] = useState<CollegeFormData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchForms = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${API_BASE}/api/college-forms`, {
          params: {
            page,
            limit: itemsPerPage,
            search: searchQuery || undefined,
            formStatus: selectedStatus !== 'all' ? selectedStatus : undefined,
            district: selectedDistrict !== 'all' ? selectedDistrict : undefined
          }
        });

        if (response.data.success) {
          setTotalPages(response.data.pagination.totalPages);
          setFilteredForms(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching forms:', error);
        toast.error('Failed to load campus forms');
      } finally {
        setIsLoading(false);
      }
    };

    fetchForms();
  }, [page, searchQuery, selectedStatus, selectedDistrict]);

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'submitted':
        return 'bg-blue-100 text-blue-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    return status?.charAt(0).toUpperCase() + status?.slice(1).toLowerCase();
  };

  return (
    <div className="w-full space-y-6 p-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Campus Form Database</h1>
        <p className="text-gray-600 mt-2">Browse and manage existing campus form submissions</p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters & Search</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="space-y-2">
              <Label htmlFor="search" className="text-sm font-semibold">
                Search College
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search by name..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setPage(1);
                  }}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="space-y-2">
              <Label htmlFor="status" className="text-sm font-semibold">
                Form Status
              </Label>
              <Select value={selectedStatus} onValueChange={(value) => {
                setSelectedStatus(value);
                setPage(1);
              }}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Submitted">Submitted</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* District Filter */}
            <div className="space-y-2">
              <Label htmlFor="district" className="text-sm font-semibold">
                District
              </Label>
              <Select value={selectedDistrict} onValueChange={(value) => {
                setSelectedDistrict(value);
                setPage(1);
              }}>
                <SelectTrigger id="district">
                  <SelectValue placeholder="All Districts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Districts</SelectItem>
                  <SelectItem value="Kathmandu">Kathmandu</SelectItem>
                  <SelectItem value="Bhaktapur">Bhaktapur</SelectItem>
                  <SelectItem value="Lalitpur">Lalitpur</SelectItem>
                  <SelectItem value="Morang">Morang</SelectItem>
                  <SelectItem value="Pokhara">Pokhara</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Reset Filters */}
            <div className="space-y-2 flex items-end">
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedStatus('all');
                  setSelectedDistrict('all');
                  setPage(1);
                }}
                className="w-full"
              >
                Reset Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Forms List */}
      <div className="space-y-3">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
          </div>
        ) : filteredForms.length === 0 ? (
          <Alert className="border-yellow-200 bg-yellow-50">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              No campus forms found matching your filters
            </AlertDescription>
          </Alert>
        ) : (
          <>
            {filteredForms.map((form) => (
              <Card key={form._id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Building2 className="w-5 h-5 text-indigo-600" />
                        <h3 className="text-lg font-semibold text-gray-900">
                          {form.collegeName}
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3 text-sm">
                        <div className="text-gray-600">
                          <span className="font-medium">Campus Type:</span> {form.campusType || 'N/A'}
                        </div>
                        <div className="text-gray-600 flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {form.location?.district}, {form.location?.province}
                        </div>
                        <div className="text-gray-600">
                          <span className="font-medium">Principal:</span> {form.principalInfo?.name || 'N/A'}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                            form.formStatus
                          )}`}
                        >
                          {getStatusText(form.formStatus)}
                        </span>
                        <span className="text-xs text-gray-500">
                          Last updated: {form.updatedAt ? new Date(form.updatedAt).toLocaleDateString() : 'N/A'}
                        </span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      onClick={() => onNavigateToForm?.(form._id || '')}
                      className="flex items-center gap-2"
                    >
                      View <ChevronRight className="w-4 h-4" />
                    </Button>
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
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <Button
                      key={pageNum}
                      variant={pageNum === page ? 'default' : 'outline'}
                      onClick={() => setPage(pageNum)}
                      className="w-10 h-10 p-0"
                    >
                      {pageNum}
                    </Button>
                  ))}
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

export default CampusFormFillup;
