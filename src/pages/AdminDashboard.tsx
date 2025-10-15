import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useEffect, useMemo, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Category,
  Status,
  Suggestion,
  Department,
  adminDelete,
  adminList,
  adminSummary,
  adminUpdate,
  adminListDepartments,
  adminCreateDepartment,
  adminUpdateDepartment,
  adminDeleteDepartment,
  adminGetDepartment,
  getDepartments,
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
import { 
  Search, 
  Eye, 
  Edit, 
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  FileText, 
  ImageIcon, 
  Plus,
  Building2,
  User,
  Mail,
  Phone
} from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import AdminDashboardForProgress from '@/components/adminDashboardforProgress';
import AdminForCollege from '@/components/adminForCollege';

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

  // Suggestion management state
  const [filters, setFilters] = useState<{ category?: Category; status?: Status; assignedDepartment?: string; q?: string }>({});
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<Suggestion[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [selectedSuggestion, setSelectedSuggestion] = useState<Suggestion | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Department management state
  const [departments, setDepartments] = useState<Department[]>([]);
  const [departmentFilters, setDepartmentFilters] = useState<{ q?: string; isActive?: boolean }>({});
  const [departmentLoading, setDepartmentLoading] = useState(false);
  const [departmentPage, setDepartmentPage] = useState(1);
  const [departmentTotal, setDepartmentTotal] = useState(0);
  const [isCreateDepartmentOpen, setIsCreateDepartmentOpen] = useState(false);
  const [isEditDepartmentOpen, setIsEditDepartmentOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [editingDepartmentId, setEditingDepartmentId] = useState<string | null>(null);

  // Analytics state
  const [summary, setSummary] = useState<{
    byStatus: { _id: Status; count: number }[];
    byCategory: { _id: Category; count: number }[];
    byDepartment: { _id: string; count: number }[];
    monthly: { _id: { year: number; month: number }; count: number }[];
    departmentStats: { total: number; active: number };
    actionStats: { withAction: number; withoutAction: number };
  } | null>(null);

  const [edits, setEdits] = useState<Record<string, Partial<Suggestion>>>({});

  // Form states for department creation/editing
  const [departmentForm, setDepartmentForm] = useState({
    name: '',
    description: '',
    head: '',
    email: '',
    phone: '',
    isActive: true
  });

  // Refs for export functionality
  const analyticsRef = useRef<HTMLDivElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const departmentsRef = useRef<HTMLDivElement>(null);

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
      setEdits({});
      setEditingId(null);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  async function loadDepartments(p = 1) {
    setDepartmentLoading(true);
    try {
      const res = await adminListDepartments({ ...departmentFilters, page: p, limit: 20 });
      setDepartments(res.departments);
      setDepartmentPage(res.page);
      setDepartmentTotal(res.total);
    } catch {
      // ignore
    } finally {
      setDepartmentLoading(false);
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
      loadDepartments(1);
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

  // Department CRUD handlers
  const resetDepartmentForm = () => {
    setDepartmentForm({
      name: '',
      description: '',
      head: '',
      email: '',
      phone: '',
      isActive: true
    });
  };

  const handleCreateDepartment = async () => {
    if (!departmentForm.name.trim()) return;

    try {
      await adminCreateDepartment(departmentForm);
      setIsCreateDepartmentOpen(false);
      resetDepartmentForm();
      await loadDepartments(1);
    } catch (error) {
      console.error('Failed to create department:', error);
    }
  };

  const handleEditDepartment = async (department: Department) => {
    setSelectedDepartment(department);
    setDepartmentForm({
      name: department.name,
      description: department.description || '',
      head: department.head || '',
      email: department.email || '',
      phone: department.phone || '',
      isActive: department.isActive
    });
    setIsEditDepartmentOpen(true);
  };

  const handleUpdateDepartment = async () => {
    if (!selectedDepartment || !departmentForm.name.trim()) return;

    try {
      const departmentId = selectedDepartment._id || selectedDepartment.id!;
      await adminUpdateDepartment(departmentId, departmentForm);
      setIsEditDepartmentOpen(false);
      setSelectedDepartment(null);
      resetDepartmentForm();
      await loadDepartments(departmentPage);
    } catch (error) {
      console.error('Failed to update department:', error);
    }
  };

  const handleDeleteDepartment = async (department: Department) => {
    if (!confirm(`Are you sure you want to delete "${department.name}"? This action may deactivate the department if it has associated suggestions.`)) return;

    try {
      const departmentId = department._id || department.id!;
      await adminDeleteDepartment(departmentId);
      await loadDepartments(departmentPage);
    } catch (error) {
      console.error('Failed to delete department:', error);
    }
  };

  // Get dynamic departments for dropdowns
  const activeDepartments = departments.filter(d => d.isActive);

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

  const exportDepartmentsAsPDF = async () => {
    if (!departmentsRef.current) return;
    
    try {
      const canvas = await html2canvas(departmentsRef.current);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('departments-report.pdf');
    } catch (error) {
      console.error('Error exporting PDF:', error);
    }
  };

  const exportDepartmentsAsImage = async () => {
    if (!departmentsRef.current) return;
    
    try {
      const canvas = await html2canvas(departmentsRef.current);
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = 'departments-report.png';
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
        <div className="flex justify-between items-center mb-4"
        
     
        >
          <TabsList className="grid w-full grid-cols-5"
          
          >
            <TabsTrigger value="manage">{t('admin.suggestionList')}</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="analytics">{t('admin.analytics')}</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="college">College Form</TabsTrigger>
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
            
            <TabsContent value="departments" className="m-0">
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={exportDepartmentsAsPDF}>
                  <FileText className="h-4 w-4 mr-2" />
                  PDF
                </Button>
                <Button variant="outline" size="sm" onClick={exportDepartmentsAsImage}>
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

        {/* Suggestions Management Tab */}
        <TabsContent value="manage" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>{t('admin.filters')}</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-5 gap-4">
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
                <Label>Department</Label>
                <Select
                  value={filters.assignedDepartment || "all"}
                  onValueChange={(v) => setFilters((f) => ({ ...f, assignedDepartment: v === "all" ? undefined : v }))}
                >
                  <SelectTrigger><SelectValue placeholder="All departments" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {activeDepartments.map((d) => <SelectItem key={d._id || d.id} value={d.name}>{d.name}</SelectItem>)}
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
                        <th className="p-3 text-left font-medium">Assigned Department</th>
                        <th className="p-3 text-left font-medium">Assigned To</th>
                        <th className="p-3 text-left font-medium">Description</th>
                        <th className="p-3 text-left font-medium">Action Taken</th>
                        <th className="p-3 text-left font-medium">Created</th>
                        <th className="p-3 text-left font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan={9} className="p-4 text-center">
                            <div className="flex justify-center items-center py-8">
                              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                            </div>
                          </td>
                        </tr>
                      ) : rows.length === 0 ? (
                        <tr>
                          <td colSpan={9} className="p-4 text-center text-muted-foreground">
                            No suggestions found
                          </td>
                        </tr>
                      ) : (
                        rows.map((r) => {
                          const id = (r._id || r.id)!;
                          const e = edits[id] || {};
                          const isEditing = editingId === id;
                          
                          const currentCategory = e.category !== undefined ? e.category : r.category;
                          const currentStatus = e.status !== undefined ? e.status : r.status;
                          const currentDepartment = e.assignedDepartment !== undefined ? e.assignedDepartment : r.assignedDepartment || "";
                          const currentAssignee = e.assignedTo !== undefined ? e.assignedTo : r.assignedTo || "";
                          const currentActionTaken = e.actionTaken !== undefined ? e.actionTaken : r.actionTaken || "";
                          
                          return (
                            <tr key={id} className="border-b hover:bg-muted/30 transition-colors">
                              <td className="p-3 max-w-[120px] truncate font-mono text-xs">{id}</td>
                              <td className="p-3">
                                {isEditing ? (
                                  <Select
                                    value={currentCategory}
                                    onValueChange={(v: Category) => applyEdit(id, { category: v })}
                                  >
                                    <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                      {categories.map((c) => (
                                        <SelectItem key={c} value={c}>{c}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                ) : (
                                  <Badge variant="outline">{r.category}</Badge>
                                )}
                              </td>
                              <td className="p-3">
                                {isEditing ? (
                                  <Select
                                    value={currentStatus}
                                    onValueChange={(v: Status) => applyEdit(id, { status: v as Status })}
                                  >
                                    <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                      {statuses.map((s) => (
                                        <SelectItem key={s} value={s}>{s}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                ) : (
                                  <Badge className={statusColors[r.status]}>
                                    {r.status}
                                  </Badge>
                                )}
                              </td>
                              <td className="p-3">
                                {isEditing ? (
                                  <Select
                                    value={currentDepartment || "none"}
                                    onValueChange={(v) => applyEdit(id, { assignedDepartment: v === "none" ? null : v })}
                                  >
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Select department" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="none">None</SelectItem>
                                      {activeDepartments.map((d) => (
                                        <SelectItem key={d._id || d.id} value={d.name}>{d.name}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                ) : (
                                  <span>{r.assignedDepartment || "-"}</span>
                                )}
                              </td>
                              <td className="p-3">
                                {isEditing ? (
                                  <Input
                                    value={currentAssignee}
                                    onChange={(e) => applyEdit(id, { assignedTo: e.target.value })}
                                    placeholder="Enter assignee name"
                                  />
                                ) : (
                                  <span>{r.assignedTo || "-"}</span>
                                )}
                              </td>
                              <td className="p-3 max-w-[250px]">
                                <div className="line-clamp-2">{r.description}</div>
                              </td>
                              <td className="p-3 max-w-[200px]">
                                {isEditing ? (
                                  <Textarea
                                    value={currentActionTaken}
                                    onChange={(e) => applyEdit(id, { actionTaken: e.target.value })}
                                    placeholder="Describe actions taken..."
                                    rows={2}
                                    className="min-h-[60px]"
                                  />
                                ) : (
                                  <div className="line-clamp-2 text-sm">
                                    {r.actionTaken ? (
                                      <span className="text-green-700 bg-green-50 px-2 py-1 rounded text-xs">
                                        {r.actionTaken}
                                      </span>
                                    ) : (
                                      <span className="text-muted-foreground">No action recorded</span>
                                    )}
                                  </div>
                                )}
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

        {/* Departments Management Tab */}
        <TabsContent value="departments" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Department Management
              </CardTitle>
              <Dialog open={isCreateDepartmentOpen} onOpenChange={setIsCreateDepartmentOpen}>
                <DialogTrigger asChild>
                  <Button onClick={resetDepartmentForm}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Department
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Department</DialogTitle>
                    <DialogDescription>
                      Add a new department to manage suggestions and assignments.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Department Name *</Label>
                      <Input
                        id="name"
                        value={departmentForm.name}
                        onChange={(e) => setDepartmentForm({...departmentForm, name: e.target.value})}
                        placeholder="e.g., Computer Science"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={departmentForm.description}
                        onChange={(e) => setDepartmentForm({...departmentForm, description: e.target.value})}
                        placeholder="Brief description of the department..."
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="head">Department Head</Label>
                        <Input
                          id="head"
                          value={departmentForm.head}
                          onChange={(e) => setDepartmentForm({...departmentForm, head: e.target.value})}
                          placeholder="Dr. John Smith"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={departmentForm.email}
                          onChange={(e) => setDepartmentForm({...departmentForm, email: e.target.value})}
                          placeholder="department@university.edu"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={departmentForm.phone}
                        onChange={(e) => setDepartmentForm({...departmentForm, phone: e.target.value})}
                        placeholder="+1-555-0123"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="isActive"
                        checked={departmentForm.isActive}
                        onCheckedChange={(checked) => setDepartmentForm({...departmentForm, isActive: checked})}
                      />
                      <Label htmlFor="isActive">Active Department</Label>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsCreateDepartmentOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleCreateDepartment} disabled={!departmentForm.name.trim()}>
                        Create Department
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {/* Department Filters */}
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      className="pl-8"
                      value={departmentFilters.q || ''}
                      onChange={(e) => setDepartmentFilters({...departmentFilters, q: e.target.value})}
                      placeholder="Search departments by name, head, or description..."
                    />
                  </div>
                </div>
                <div className="w-full md:w-48">
                  <Select
                    value={departmentFilters.isActive === undefined ? "all" : departmentFilters.isActive.toString()}
                    onValueChange={(v) => setDepartmentFilters({
                      ...departmentFilters, 
                      isActive: v === "all" ? undefined : v === "true"
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="true">Active Only</SelectItem>
                      <SelectItem value="false">Inactive Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={() => loadDepartments(1)} disabled={departmentLoading}>
                  Apply Filters
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setDepartmentFilters({});
                    loadDepartments(1);
                  }}
                  disabled={departmentLoading}
                >
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card ref={departmentsRef}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Departments</CardTitle>
                <div className="text-sm text-muted-foreground">
                  Showing {departments.length} of {departmentTotal} departments
                  {summary && (
                    <span className="ml-2">
                      ({summary.departmentStats.active} active, {summary.departmentStats.total - summary.departmentStats.active} inactive)
                    </span>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="p-3 text-left font-medium">Name</th>
                        <th className="p-3 text-left font-medium">Head</th>
                        <th className="p-3 text-left font-medium">Contact</th>
                        <th className="p-3 text-left font-medium">Status</th>
                        <th className="p-3 text-left font-medium">Description</th>
                        <th className="p-3 text-left font-medium">Created</th>
                        <th className="p-3 text-left font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {departmentLoading ? (
                        <tr>
                          <td colSpan={7} className="p-4 text-center">
                            <div className="flex justify-center items-center py-8">
                              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                            </div>
                          </td>
                        </tr>
                      ) : departments.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="p-4 text-center text-muted-foreground">
                            No departments found
                          </td>
                        </tr>
                      ) : (
                        departments.map((dept) => (
                          <tr key={dept._id || dept.id} className="border-b hover:bg-muted/30 transition-colors">
                            <td className="p-3 font-medium">{dept.name}</td>
                            <td className="p-3">
                              {dept.head ? (
                                <div className="flex items-center gap-2">
                                  <User className="h-4 w-4 text-muted-foreground" />
                                  {dept.head}
                                </div>
                              ) : (
                                <span className="text-muted-foreground">-</span>
                              )}
                            </td>
                            <td className="p-3">
                              <div className="space-y-1">
                                {dept.email && (
                                  <div className="flex items-center gap-2 text-xs">
                                    <Mail className="h-3 w-3" />
                                    <span className="truncate max-w-[150px]">{dept.email}</span>
                                  </div>
                                )}
                                {dept.phone && (
                                  <div className="flex items-center gap-2 text-xs">
                                    <Phone className="h-3 w-3" />
                                    {dept.phone}
                                  </div>
                                )}
                                {!dept.email && !dept.phone && (
                                  <span className="text-muted-foreground text-xs">No contact info</span>
                                )}
                              </div>
                            </td>
                            <td className="p-3">
                              <Badge variant={dept.isActive ? "default" : "secondary"}>
                                {dept.isActive ? "Active" : "Inactive"}
                              </Badge>
                            </td>
                            <td className="p-3 max-w-[200px]">
                              {dept.description ? (
                                <div className="line-clamp-2 text-xs">{dept.description}</div>
                              ) : (
                                <span className="text-muted-foreground text-xs">No description</span>
                              )}
                            </td>
                            <td className="p-3 whitespace-nowrap text-xs">
                              {format(new Date(dept.createdAt), 'MMM dd, yyyy')}
                            </td>
                            <td className="p-3">
                              <div className="flex items-center space-x-2">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleEditDepartment(dept)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleDeleteDepartment(dept)}
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

                {/* Department Pagination */}
                <div className="flex items-center justify-between p-3 border-t">
                  <div className="text-sm text-muted-foreground">
                    Page {departmentPage} of {Math.ceil(departmentTotal / 20)}
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={departmentPage <= 1 || departmentLoading}
                      onClick={() => loadDepartments(departmentPage - 1)}
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={departments.length < 20 || departmentLoading}
                      onClick={() => loadDepartments(departmentPage + 1)}
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

        {/* Analytics Tab */}
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

            {/* Department Analytics */}
            <Card>
              <CardHeader>
                <CardTitle>By Department</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={summary?.byDepartment || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="_id" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#16a34a" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Action Taken Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Action Taken Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {summary?.actionStats?.withAction || 0}
                      </div>
                      <div className="text-sm text-green-600">With Action Taken</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">
                        {summary?.actionStats?.withoutAction || 0}
                      </div>
                      <div className="text-sm text-orange-600">Pending Action</div>
                    </div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {summary?.actionStats ? 
                        Math.round((summary.actionStats.withAction / (summary.actionStats.withAction + summary.actionStats.withoutAction)) * 100) 
                        : 0}%
                    </div>
                    <div className="text-sm text-blue-600">Action Completion Rate</div>
                  </div>
                </div>
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

        <TabsContent value='progress' className="mt-4">
          <AdminDashboardForProgress/>
          </TabsContent> 

                  <TabsContent value='college' className="mt-4">
          <AdminForCollege/>
          </TabsContent> 
         
      </Tabs>

      {/* Edit Department Dialog */}
      <Dialog open={isEditDepartmentOpen} onOpenChange={setIsEditDepartmentOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Department</DialogTitle>
            <DialogDescription>
              Update the department information.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Department Name *</Label>
              <Input
                id="edit-name"
                value={departmentForm.name}
                onChange={(e) => setDepartmentForm({...departmentForm, name: e.target.value})}
                placeholder="e.g., Computer Science"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={departmentForm.description}
                onChange={(e) => setDepartmentForm({...departmentForm, description: e.target.value})}
                placeholder="Brief description of the department..."
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-head">Department Head</Label>
                <Input
                  id="edit-head"
                  value={departmentForm.head}
                  onChange={(e) => setDepartmentForm({...departmentForm, head: e.target.value})}
                  placeholder="Dr. John Smith"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={departmentForm.email}
                  onChange={(e) => setDepartmentForm({...departmentForm, email: e.target.value})}
                  placeholder="department@university.edu"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-phone">Phone</Label>
              <Input
                id="edit-phone"
                value={departmentForm.phone}
                onChange={(e) => setDepartmentForm({...departmentForm, phone: e.target.value})}
                placeholder="+1-555-0123"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="edit-isActive"
                checked={departmentForm.isActive}
                onCheckedChange={(checked) => setDepartmentForm({...departmentForm, isActive: checked})}
              />
              <Label htmlFor="edit-isActive">Active Department</Label>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditDepartmentOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateDepartment} disabled={!departmentForm.name.trim()}>
                Update Department
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Suggestion Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
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
                <div>
                  <Label className="text-sm font-medium">Assigned Department</Label>
                  <p className="text-sm">{selectedSuggestion.assignedDepartment || "-"}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Assigned To</Label>
                  <p className="text-sm">{selectedSuggestion.assignedTo || "-"}</p>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Description</Label>
                <p className="text-sm mt-1 p-3 bg-muted rounded-md whitespace-pre-wrap">
                  {selectedSuggestion.description}
                </p>
              </div>

              {/* Action Taken Section */}
              <div>
                <Label className="text-sm font-medium">Action Taken</Label>
                {selectedSuggestion.actionTaken ? (
                  <div className="mt-1 p-3 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-sm text-green-800 whitespace-pre-wrap">
                      {selectedSuggestion.actionTaken}
                    </p>
                  </div>
                ) : (
                  <div className="mt-1 p-3 bg-orange-50 border border-orange-200 rounded-md">
                    <p className="text-sm text-orange-700">
                      No action has been recorded for this suggestion yet.
                    </p>
                  </div>
                )}
              </div>

              {selectedSuggestion.media && selectedSuggestion.media.length > 0 && (
                <div>
                  <Label className="text-sm font-medium">Attachments ({selectedSuggestion.media.length})</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {selectedSuggestion.media.map((media, index) => (
                      <div key={index} className="border rounded-md p-2">
                        {media.type === 'image' ? (
                     <img 
  // src={media.url ? media.url.replace(/^http:\/\//i, "https://") : ""} 
    src={media.url}
  alt={`Attachment ${index + 1}`}
  className="w-full h-32 object-cover rounded"

    onError={(e) => {
        console.error("Image failed to load:", e.currentTarget.src);
        // Optional: replace with fallback image
        // e.currentTarget.src = "/fallback.png";
      }}
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