import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useEffect, useMemo, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Category,
  Status,
  Suggestion,
  adminDelete,
  adminList,
  adminSummary,
  adminUpdate,
  getStoredUser,
  isAdmin,
  login
} from '@/lib/api';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell
} from 'recharts';
import { format } from 'date-fns';
import { Search, Eye, Edit, Trash2, ChevronLeft, ChevronRight, Download, FileText, ImageIcon } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const categories: Category[] = ['academic', 'administrative', 'infrastructure', 'other'];
const statuses: Status[] = ['Received', 'In Process', 'Resolved'];

// Status badge colors mapping
const statusColors: Record<Status, string> = {
  'Received': 'bg-blue-100 text-blue-800',
  'In Process': 'bg-yellow-100 text-yellow-800',
  'Resolved': 'bg-green-100 text-green-800'
};

export default function AdminDashboard() {
  const { t } = useTranslation();
  const [user, setUser] = useState(getStoredUser());
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const [filters, setFilters] = useState<{ category?: Category; status?: Status; q?: string }>({});
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<Suggestion[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [selectedSuggestion, setSelectedSuggestion] = useState<Suggestion | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [summary, setSummary] = useState<{
    byStatus: { _id: Status; count: number }[];
    byCategory: { _id: Category; count: number }[];
    monthly: { _id: { year: number; month: number }; count: number }[];
  } | null>(null);

  const [edits, setEdits] = useState<Record<string, Partial<Suggestion>>>({});

  // Refs for export functionality
  const analyticsRef = useRef<HTMLDivElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  async function onLogin() {
    setLoginLoading(true);
    setLoginError(null);
    try {
      const res = await login(email.trim(), password);
      if (res.user.role !== 'admin') {
        setLoginError('Not an admin account');
      } else {
        setUser(res.user);
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Login failed';
      setLoginError(msg);
    } finally {
      setLoginLoading(false);
    }
  }

  function applyEdit(id: string, patch: Partial<Suggestion>) {
    setEdits((prev) => ({ ...prev, [id]: { ...(prev[id] || {}), ...patch } }));
  }

  async function loadList(p = 1) {
    setLoading(true);
    try {
      const res = await adminList({ ...filters, page: p, limit: 20 });
      setRows(res.suggestions);
      setPage(res.page);
      setTotal(res.total);
      // Clear edits when loading new data
      setEdits({});
      setEditingId(null);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  async function loadSummary() {
    try {
      const s = await adminSummary();
      setSummary(s);
    } catch {
      // ignore
    }
  }

  useEffect(() => {
    if (isAdmin()) {
      loadList(1);
      loadSummary();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const monthlyData = useMemo(() => {
    if (!summary) return [];
    return summary.monthly.map((m) => ({
      label: `${m._id.year}-${String(m._id.month).padStart(2, '0')}`,
      count: m.count
    }));
  }, [summary]);

  const handleViewDetails = (suggestion: Suggestion) => {
    setSelectedSuggestion(suggestion);
    setIsDetailOpen(true);
  };

  const handleEdit = (id: string) => {
    setEditingId(id === editingId ? null : id);
  };

  const handleSaveEdit = async (id: string) => {
    const patch = edits[id];
    if (!patch || Object.keys(patch).length === 0) return;
    
    try {
      await adminUpdate(id, patch);
      setEditingId(null);
      // Reload to get fresh data
      await loadList(page);
    } catch (error) {
      console.error('Failed to update suggestion:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this suggestion?')) return;
    
    try {
      await adminDelete(id);
      await loadList(page);
    } catch (error) {
      console.error('Failed to delete suggestion:', error);
    }
  };

  // Export functions
  const exportAnalyticsAsPDF = async () => {
    if (!analyticsRef.current) return;
    
    try {
      const canvas = await html2canvas(analyticsRef.current);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('analytics-report.pdf');
    } catch (error) {
      console.error('Error exporting PDF:', error);
    }
  };

  const exportAnalyticsAsImage = async () => {
    if (!analyticsRef.current) return;
    
    try {
      const canvas = await html2canvas(analyticsRef.current);
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = 'analytics-report.png';
      link.click();
    } catch (error) {
      console.error('Error exporting image:', error);
    }
  };

  const exportSuggestionsAsPDF = async () => {
    if (!suggestionsRef.current) return;
    
    try {
      const canvas = await html2canvas(suggestionsRef.current);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('suggestions-report.pdf');
    } catch (error) {
      console.error('Error exporting PDF:', error);
    }
  };

  const exportSuggestionsAsImage = async () => {
    if (!suggestionsRef.current) return;
    
    try {
      const canvas = await html2canvas(suggestionsRef.current);
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = 'suggestions-report.png';
      link.click();
    } catch (error) {
      console.error('Error exporting image:', error);
    }
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="max-w-md mx-auto px-4 py-10">
        <Card>
          <CardHeader>
            <CardTitle>{t('admin.loginTitle')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <Label>{t('admin.email')}</Label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@university.edu" />
            </div>
            <div className="space-y-2">
              <Label>{t('admin.password')}</Label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {loginError ? <p className="text-sm text-red-600">{loginError}</p> : null}
            <Button onClick={onLogin} disabled={loginLoading || !email || !password}>
              {loginLoading ? '...' : t('admin.login')}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">{t('admin.title')}</h2>
        <div className="text-sm text-muted-foreground">
          Welcome, {user.name}
        </div>
      </div>

      <Tabs defaultValue="manage">
        <div className="flex justify-between items-center mb-4">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="manage">{t('admin.suggestionList')}</TabsTrigger>
            <TabsTrigger value="analytics">{t('admin.analytics')}</TabsTrigger>
          </TabsList>
          
          <div className="flex space-x-2">
            <TabsContent value="manage" className="m-0">
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={exportSuggestionsAsPDF}>
                  <FileText className="h-4 w-4 mr-2" />
                  PDF
                </Button>
                <Button variant="outline" size="sm" onClick={exportSuggestionsAsImage}>
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Image
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="analytics" className="m-0">
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={exportAnalyticsAsPDF}>
                  <FileText className="h-4 w-4 mr-2" />
                  PDF
                </Button>
                <Button variant="outline" size="sm" onClick={exportAnalyticsAsImage}>
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Image
                </Button>
              </div>
            </TabsContent>
          </div>
        </div>

        <TabsContent value="manage" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>{t('admin.filters')}</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <Label>{t('admin.category')}</Label>
                <Select
                  value={filters.category || "all"}
                  onValueChange={(v) => setFilters((f) => ({ ...f, category: v === "all" ? undefined : v as Category }))}
                >
                  <SelectTrigger><SelectValue placeholder={t('common.select')} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label>{t('admin.status')}</Label>
                <Select
                  value={filters.status || "all"}
                  onValueChange={(v) => setFilters((f) => ({ ...f, status: v === "all" ? undefined : v as Status }))}
                >
                  <SelectTrigger><SelectValue placeholder={t('common.select')} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    {statuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label>{t('admin.query')}</Label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    className="pl-8" 
                    value={filters.q || ''} 
                    onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))} 
                    placeholder="Search suggestions..."
                  />
                </div>
              </div>
              <div className="flex items-end space-x-2">
                <Button onClick={() => loadList(1)} disabled={loading}>
                  {t('admin.apply')}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setFilters({});
                    loadList(1);
                  }}
                  disabled={loading}
                >
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card ref={suggestionsRef}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Suggestion Management</CardTitle>
                <div className="text-sm text-muted-foreground">
                  Showing {rows.length} of {total} suggestions
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="p-3 text-left font-medium">ID</th>
                        <th className="p-3 text-left font-medium">Category</th>
                        <th className="p-3 text-left font-medium">Status</th>
                        <th className="p-3 text-left font-medium">Description</th>
                        <th className="p-3 text-left font-medium">Created</th>
                        <th className="p-3 text-left font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan={6} className="p-4 text-center">
                            <div className="flex justify-center items-center py-8">
                              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                            </div>
                          </td>
                        </tr>
                      ) : rows.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="p-4 text-center text-muted-foreground">
                            No suggestions found
                          </td>
                        </tr>
                      ) : (
                        rows.map((r) => {
                          const id = (r._id || r.id)!;
                          const e = edits[id] || {};
                          const isEditing = editingId === id;
                          
                          return (
                            <tr key={id} className="border-b hover:bg-muted/30 transition-colors">
                              <td className="p-3 max-w-[120px] truncate font-mono text-xs">{id}</td>
                              <td className="p-3">
                                {isEditing ? (
                                  <Select
                                    defaultValue={r.category}
                                    onValueChange={(v: Category) => applyEdit(id, { category: v })}
                                  >
                                    <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                      {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                                    </SelectContent>
                                  </Select>
                                ) : (
                                  <Badge variant="outline">{r.category}</Badge>
                                )}
                              </td>
                              <td className="p-3">
                                {isEditing ? (
                                  <Select
                                    defaultValue={r.status}
                                    onValueChange={(v: Status) => applyEdit(id, { status: v as Status })}
                                  >
                                    <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                      {statuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                                    </SelectContent>
                                  </Select>
                                ) : (
                                  <Badge className={statusColors[r.status]}>
                                    {r.status}
                                  </Badge>
                                )}
                              </td>
                              <td className="p-3 max-w-[300px]">
                                <div className="line-clamp-2">{r.description}</div>
                              </td>
                              <td className="p-3 whitespace-nowrap">
                                {format(new Date(r.createdAt), 'MMM dd, yyyy')}
                              </td>
                              <td className="p-3">
                                <div className="flex items-center space-x-2">
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleViewDetails(r)}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  {isEditing ? (
                                    <>
                                      <Button
                                        size="sm"
                                        onClick={() => handleSaveEdit(id)}
                                      >
                                        Save
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => setEditingId(null)}
                                      >
                                        Cancel
                                      </Button>
                                    </>
                                  ) : (
                                    <>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => handleEdit(id)}
                                      >
                                        <Edit className="h-4 w-4" />
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => handleDelete(id)}
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
                
                {/* Pagination */}
                <div className="flex items-center justify-between p-3 border-t">
                  <div className="text-sm text-muted-foreground">
                    Page {page} of {Math.ceil(total / 20)}
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={page <= 1 || loading}
                      onClick={() => loadList(page - 1)}
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={rows.length < 20 || loading}
                      onClick={() => loadList(page + 1)}
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-4">
          <div ref={analyticsRef} className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('admin.byStatus')}</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={summary?.byStatus || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="_id" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#2563eb" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('admin.byCategory')}</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip />
                    <Legend />
                    <Pie 
                      data={summary?.byCategory || []} 
                      dataKey="count" 
                      nameKey="_id" 
                      cx="50%" 
                      cy="50%" 
                      outerRadius={80} 
                      label 
                    >
                      {(summary?.byCategory || []).map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={['#2563eb', '#16a34a', '#f59e0b', '#ef4444'][index % 4]} 
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>{t('admin.monthlyTrends')}</CardTitle>
              </CardHeader>
              <CardContent className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="label" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="count" stroke="#2563eb" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Suggestion Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Suggestion Details</DialogTitle>
            <DialogDescription>
              Complete information for this suggestion
            </DialogDescription>
          </DialogHeader>
          
          {selectedSuggestion && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">ID</Label>
                  <p className="text-sm font-mono">{selectedSuggestion._id || selectedSuggestion.id}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Category</Label>
                  <Badge variant="outline">{selectedSuggestion.category}</Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <Badge className={statusColors[selectedSuggestion.status]}>
                    {selectedSuggestion.status}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">Created</Label>
                  <p className="text-sm">
                    {format(new Date(selectedSuggestion.createdAt), 'PPP pp')}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Last Updated</Label>
                  <p className="text-sm">
                    {format(new Date(selectedSuggestion.updatedAt), 'PPP pp')}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Anonymous</Label>
                  <p className="text-sm">{selectedSuggestion.anonymous ? 'Yes' : 'No'}</p>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Description</Label>
                <p className="text-sm mt-1 p-3 bg-muted rounded-md whitespace-pre-wrap">
                  {selectedSuggestion.description}
                </p>
              </div>

              {selectedSuggestion.assignedDepartment && (
                <div>
                  <Label className="text-sm font-medium">Assigned Department</Label>
                  <p className="text-sm">{selectedSuggestion.assignedDepartment}</p>
                </div>
              )}

              {selectedSuggestion.assignedTo && (
                <div>
                  <Label className="text-sm font-medium">Assigned To</Label>
                  <p className="text-sm">{selectedSuggestion.assignedTo}</p>
                </div>
              )}

              {selectedSuggestion.media && selectedSuggestion.media.length > 0 && (
                <div>
                  <Label className="text-sm font-medium">Attachments ({selectedSuggestion.media.length})</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {selectedSuggestion.media.map((media, index) => (
                      <div key={index} className="border rounded-md p-2">
                        {media.type === 'image' ? (
                          <img 
                            src={media.url} 
                            alt={`Attachment ${index + 1}`}
                            className="w-full h-32 object-cover rounded"
                          />
                        ) : (
                          <video 
                            src={media.url}
                            className="w-full h-32 object-cover rounded"
                            controls
                          />
                        )}
                        <p className="text-xs mt-1 truncate">{media.filename}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}