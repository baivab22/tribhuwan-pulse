import { useScrollToTop } from '@/hooks/useScrollToTop';
import React, { useEffect, useMemo, useState } from 'react';
import { Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import provinces from '../data/provinces.json';
import districts from '../data/districts.json';
import { listCampusRecords, CampusListItem } from '@/lib/api';

type ProvinceOptionSource = {
  province_id: number;
  name: string;
};

type DistrictOptionSource = {
  province_id: number;
  name: string;
};

const ITEMS_PER_PAGE = 15;

const CampusList: React.FC = () => {
  useScrollToTop();
  const [selectedCampus, setSelectedCampus] = useState<CampusListItem | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [province, setProvince] = useState<string>('all');
  const [district, setDistrict] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [allCampuses, setAllCampuses] = useState<CampusListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setLoading(true);
    setError('');

    const loadCampuses = async () => {
      try {
        const response = await listCampusRecords({
          page: 1,
          limit: 10000,
        });

        setAllCampuses(response.campuses);
      } catch {
        setAllCampuses([]);
        setError('Unable to load campus list right now.');
      } finally {
        setLoading(false);
      }
    };

    loadCampuses();
  }, []);

  // Province options
  const provinceOptions = useMemo(() => {
    const provinceData = provinces as ProvinceOptionSource[];
    return [
      { value: 'all', label: 'All Provinces' },
      ...provinceData.map((p) => ({ value: p.province_id.toString(), label: p.name }))
    ];
  }, []);

  // District options filtered by selected province
  const districtOptions = useMemo(() => {
    const districtData = districts as DistrictOptionSource[];
    let filtered = districtData;
    if (province !== 'all') {
      filtered = districtData.filter((d) => d.province_id.toString() === province);
    }
    const opts = filtered.map((d) => ({ value: d.name, label: d.name }));
    return [{ value: 'all', label: 'All Districts' }, ...opts];
  }, [province]);

  const filtered = useMemo(() => {
    return allCampuses.filter((c) => {
      const districtObj = (districts as DistrictOptionSource[]).find((d) => d.name === c.District);
      const campusProvinceId = districtObj ? districtObj.province_id.toString() : null;
      const provinceMatch = province === 'all' || campusProvinceId === province;
      const districtMatch = district === 'all' || c.District === district;
      const searchMatch = search.trim() === '' || (c.campusname || '').toLowerCase().includes(search.trim().toLowerCase());
      return provinceMatch && districtMatch && searchMatch;
    });
  }, [allCampuses, district, province, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleView = (campus: CampusListItem) => {
    setSelectedCampus(campus);
    setDialogOpen(true);
  };

  const handleDistrictChange = (value: string) => {
    setDistrict(value);
    setPage(1);
  };

  const handleProvinceChange = (value: string) => {
    setProvince(value);
    setDistrict('all'); // Reset district when province changes
    setPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">Campus List</h1>

      {/* Filter & Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-4 items-center">
        <div className="w-full md:w-64">
          <Select value={province} onValueChange={handleProvinceChange}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Province" />
            </SelectTrigger>
            <SelectContent>
              {provinceOptions.map((p) => (
                <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full md:w-64">
          <Select value={district} onValueChange={handleDistrictChange}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by District" />
            </SelectTrigger>
            <SelectContent>
              {districtOptions.map((d) => (
                <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full md:w-72">
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Search by campus name..."
            value={search}
            onChange={e => handleSearchChange(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl shadow-lg bg-white w-full min-w-[1100px]">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-indigo-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">SN</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Campus Name</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">District</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Address</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Principal</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Contact</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {loading
              ? Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                  <tr key={i}>
                    <td colSpan={7} className="px-4 py-3">
                      <Skeleton className="h-6 w-full" />
                    </td>
                  </tr>
                ))
              : error
              ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-red-500">{error}</td>
                </tr>
              )
              : paginated.length === 0
              ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-500">No campuses found.</td>
                </tr>
              )
              : paginated.map((campus, idx: number) => (
                  <tr key={campus._id} className="hover:bg-indigo-50 transition">
                    <td className="px-4 py-3 text-sm text-gray-600">{campus.SN || (page - 1) * ITEMS_PER_PAGE + idx + 1}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{campus.campusname || '-'}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{campus.District || '-'}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{campus.fullAddress || '-'}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{campus.principlename || '-'}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{campus.contactNumber || '-'}</td>
                    <td className="px-4 py-3">
                      <button
                        className="p-2 rounded-full hover:bg-indigo-100 text-indigo-600 transition"
                        onClick={() => handleView(campus)}
                        aria-label="View Details"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-gray-600">
          Page {page} of {totalPages || 1}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1 || loading}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages || loading}
          >
            Next
          </Button>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Campus Details</DialogTitle>
          </DialogHeader>
          {selectedCampus && (
            <div className="space-y-2 text-gray-800">
              <div><span className="font-semibold">Campus Name:</span> {selectedCampus.campusname || '-'}</div>
              <div><span className="font-semibold">District:</span> {selectedCampus.District || '-'}</div>
              <div><span className="font-semibold">Address:</span> {selectedCampus.fullAddress || '-'}</div>
              <div><span className="font-semibold">Principal:</span> {selectedCampus.principlename || '-'}</div>
              <div><span className="font-semibold">Contact Number:</span> {selectedCampus.contactNumber || '-'}</div>
              <div><span className="font-semibold">Email:</span> {selectedCampus.emailAddress || '-'}</div>
              <div><span className="font-semibold">Local Address:</span> {selectedCampus.localAddress || '-'}</div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CampusList;
