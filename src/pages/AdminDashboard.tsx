import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect, useMemo, useState } from 'react';
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

const categories: Category[] = ['academic', 'administrative', 'infrastructure', 'other'];
const statuses: Status[] = ['Received', 'In Process', 'Resolved'];

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

  const [summary, setSummary] = useState<{
    byStatus: { _id: Status; count: number }[];
    byCategory: { _id: Category; count: number }[];
    monthly: { _id: { year: number; month: number }; count: number }[];
  } | null>(null);

  const [edits, setEdits] = useState<Record<string, Partial<Suggestion>>>({});

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
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">{t('admin.title')}</h2>

      <Tabs defaultValue="manage">
        <TabsList>
          <TabsTrigger value="manage">{t('admin.suggestionList')}</TabsTrigger>
          <TabsTrigger value="analytics">{t('admin.analytics')}</TabsTrigger>
        </TabsList>

        <TabsContent value="manage" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('admin.filters')}</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-4 gap-3">
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
                <Input value={filters.q || ''} onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))} />
              </div>
              <div className="flex items-end">
                <Button onClick={() => loadList(1)} disabled={loading}>{t('admin.apply')}</Button>
              </div>
            </CardContent>
          </Card>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="p-2">{t('admin.id')}</th>
                  <th className="p-2">{t('admin.category')}</th>
                  <th className="p-2">{t('admin.status')}</th>
                  <th className="p-2">{t('admin.assignedDepartment')}</th>
                  <th className="p-2">{t('admin.assignedTo')}</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => {
                  const id = (r._id || r.id)!;
                  const e = edits[id] || {};
                  return (
                    <tr key={id} className="border-b align-top">
                      <td className="p-2 max-w-[220px] break-words">{id}</td>
                      <td className="p-2">
                        <Select
                          defaultValue={r.category}
                          onValueChange={(v: Category) => applyEdit(id, { category: v })}
                        >
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="p-2">
                        <Select
                          defaultValue={r.status}
                          onValueChange={(v: Status) => applyEdit(id, { status: v as Status })}
                        >
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {statuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="p-2">
                        <Input
                          defaultValue={r.assignedDepartment || ''}
                          onChange={(ev) => applyEdit(id, { assignedDepartment: ev.target.value })}
                        />
                      </td>
                      <td className="p-2">
                        <Input
                          defaultValue={r.assignedTo || ''}
                          onChange={(ev) => applyEdit(id, { assignedTo: ev.target.value })}
                        />
                      </td>
                      <td className="p-2 space-x-2">
                        <Button
                          size="sm"
                          onClick={async () => {
                            const patch: {
                              status?: Status;
                              category?: Category;
                              assignedDepartment?: string | null;
                              assignedTo?: string | null;
                            } = {};
                            if (e.category) patch.category = e.category as Category;
                            if (e.status) patch.status = e.status as Status;
                            if (e.assignedDepartment !== undefined) patch.assignedDepartment = e.assignedDepartment as string | null;
                            if (e.assignedTo !== undefined) patch.assignedTo = e.assignedTo as string | null;
                            if (Object.keys(patch).length === 0) return;
                            await adminUpdate(id, patch);
                            await loadList(page);
                          }}
                        >
                          {t('admin.update')}
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={async () => {
                            await adminDelete(id);
                            await loadList(page);
                          }}
                        >
                          {t('admin.delete')}
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex items-center justify-between mt-3">
              <span className="text-sm text-muted-foreground">
                {rows.length} / {total}
              </span>
              <div className="space-x-2">
                <Button variant="outline" disabled={page <= 1 || loading} onClick={() => loadList(page - 1)}>
                  Prev
                </Button>
                <Button variant="outline" disabled={rows.length + (page - 1) * 20 >= total || loading} onClick={() => loadList(page + 1)}>
                  Next
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="mt-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader><CardTitle>{t('admin.byStatus')}</CardTitle></CardHeader>
              <CardContent className="h-64">
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
              <CardHeader><CardTitle>{t('admin.byCategory')}</CardTitle></CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip />
                    <Legend />
                    <Pie data={summary?.byCategory || []} dataKey="count" nameKey="_id" outerRadius={80} label>
                      {(summary?.byCategory || []).map((_, idx) => (
                        <Cell key={idx} fill={['#2563eb', '#16a34a', '#f59e0b', '#ef4444'][idx % 4]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader><CardTitle>{t('admin.monthlyTrends')}</CardTitle></CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="label" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="count" stroke="#2563eb" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}