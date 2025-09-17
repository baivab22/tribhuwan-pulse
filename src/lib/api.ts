import axios from 'axios';

/* ===========================
   Types
=========================== */
export type Role = 'student' | 'teacher' | 'staff' | 'alumni' | 'admin';
export type Category = 'academic' | 'administrative' | 'infrastructure' | 'other';
export type Status = 'Received' | 'In Process' | 'Resolved';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface Suggestion {
  _id?: string;
  id?: string;
  user?: string;
  anonymous: boolean;
  category: Category;
  description: string;
  status: Status;
  assignedDepartment?: string | null;
  assignedTo?: string | null;
  media?: {
    type: 'image' | 'video';
    url: string;
    filename: string;
    mimetype: string;
    size: number;
  }[];
  createdAt: string;
  updatedAt: string;
  actionTaken?: string;
}

export interface Department {
  _id?: string;
  id?: string;
  name: string;
  description?: string;
  head?: string;
  email?: string;
  phone?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/* ===========================
   Storage Helpers
=========================== */
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

function getToken(): string | null {
  try {
    return localStorage.getItem('token');
  } catch {
    return null;
  }
}

function setToken(token: string | null) {
  try {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  } catch {}
}

export function getStoredUser(): User | null {
  try {
    const raw = localStorage.getItem('user');
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

export function setStoredUser(user: User | null) {
  try {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  } catch {}
}

export function isAdmin(): boolean {
  const u = getStoredUser();
  return !!u && u.role === 'admin';
}

/* ===========================
   Axios Instance
=========================== */
const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use(config => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  res => res,
  err => {
    const msg = err.response?.data?.message || err.message;
    return Promise.reject(new Error(msg));
  }
);

/* ===========================
   Auth Services
=========================== */
export interface LoginResp {
  user: User;
  token: string;
}

// POST /api/auth/login
export async function login(email: string, password: string) {
  const { data } = await api.post<LoginResp>('/api/auth/login', { email, password });
  setToken(data.token);
  setStoredUser(data.user);
  return data;
}

// POST /api/auth/register
export async function register(name: string, email: string, password: string, role?: Role) {
  const { data } = await api.post<LoginResp>('/api/auth/register', { name, email, password, role });
  setToken(data.token);
  setStoredUser(data.user);
  return data;
}

// POST /api/auth/logout
export async function logout() {
  try {
    await api.post('/api/auth/logout');
  } catch {}
  setToken(null);
  setStoredUser(null);
}

/* ===========================
   Department Services
=========================== */

// GET /api/departments (public - only active departments)
export async function getDepartments() {
  const { data } = await api.get<{ departments: Department[] }>('/api/departments');
  return data;
}

/* ===========================
   Suggestion Services
=========================== */

// POST /api/suggestions (multipart/form-data)
export async function createSuggestionWithMedia(form: FormData) {
  const { data } = await api.post<{ suggestion: Suggestion }>('/api/suggestions', form, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return data;
}

// POST /api/suggestions (JSON body)
export async function createSuggestion(params: {
  category: Category;
  description: string;
  anonymous: boolean;
  assignedDepartment?: string;
}) {
  const { data } = await api.post<{ suggestion: Suggestion }>('/api/suggestions', params);
  return data;
}

// GET /api/suggestions/my
export async function mySuggestions() {
  const { data } = await api.get<{ suggestions: Suggestion[] }>('/api/suggestions/my');
  return data;
}

// GET /api/suggestions/track/:id
export async function trackSuggestion(id: string) {
  const { data } = await api.get<{
    suggestion: { id: string; status: Status; category: Category; createdAt: string; updatedAt: string };
  }>(`/api/suggestions/track/${id}`);
  return data;
}

// GET /api/public/resolved
export async function listResolved(page = 1, limit = 10) {
  const { data } = await api.get<{ page: number; limit: number; total: number; suggestions: Suggestion[] }>(
    '/api/public/resolved',
    { params: { page, limit } }
  );
  return data;
}

/* ===========================
   Admin Department Services
=========================== */

// GET /api/admin/departments
export async function adminListDepartments(params: {
  q?: string;
  isActive?: boolean;
  page?: number;
  limit?: number;
} = {}) {
  const { data } = await api.get<{ 
    page: number; 
    limit: number; 
    total: number; 
    departments: Department[] 
  }>('/api/admin/departments', { params });
  return data;
}

// POST /api/admin/departments
export async function adminCreateDepartment(params: {
  name: string;
  description?: string;
  head?: string;
  email?: string;
  phone?: string;
  isActive?: boolean;
}) {
  const { data } = await api.post<{ department: Department }>('/api/admin/departments', params);
  return data;
}

// GET /api/admin/departments/:id
export async function adminGetDepartment(id: string) {
  const { data } = await api.get<{ department: Department }>(`/api/admin/departments/${id}`);
  return data;
}

// PUT /api/admin/departments/:id
export async function adminUpdateDepartment(
  id: string,
  updates: Partial<Pick<Department, 'name' | 'description' | 'head' | 'email' | 'phone' | 'isActive'>>
) {
  const { data } = await api.put<{ department: Department }>(`/api/admin/departments/${id}`, updates);
  return data;
}

// DELETE /api/admin/departments/:id
export async function adminDeleteDepartment(id: string) {
  const { data } = await api.delete<{ message: string; department?: Department }>(`/api/admin/departments/${id}`);
  return data;
}

/* ===========================
   Admin Suggestion Services
=========================== */

// GET /api/admin/suggestions
export async function adminList(params: {
  category?: Category;
  status?: Status;
  assignedDepartment?: string;
  q?: string;
  from?: string;
  to?: string;
  page?: number;
  limit?: number;
}) {
  const { data } = await api.get<{ page: number; limit: number; total: number; suggestions: Suggestion[] }>(
    '/api/admin/suggestions',
    { params }
  );
  return data;
}

// PATCH /api/admin/suggestions/:id
export async function adminUpdate(
  id: string,
  updates: Partial<Pick<Suggestion, 'status' | 'category' | 'assignedDepartment' | 'assignedTo'>>
) {
  const { data } = await api.patch<{ suggestion: Suggestion }>(`/api/admin/suggestions/${id}`, updates);
  return data;
}

// DELETE /api/admin/suggestions/:id
export async function adminDelete(id: string) {
  const { data } = await api.delete<{ message: string }>(`/api/admin/suggestions/${id}`);
  return data;
}

// GET /api/admin/reports/summary
export async function adminSummary() {
  const { data } = await api.get<{
    byStatus: { _id: Status; count: number }[];
    byCategory: { _id: Category; count: number }[];
    byDepartment: { _id: string; count: number }[];
    monthly: { _id: { year: number; month: number }; count: number }[];
    departmentStats: { total: number; active: number };
  }>('/api/admin/reports/summary');
  return data;
}

/* ===========================
   Extra (Optional for future)
=========================== */

// ⚠️ Not implemented in backend yet, but useful to have:
export async function getSuggestionById(id: string) {
  const { data } = await api.get<{ suggestion: Suggestion }>(`/api/admin/suggestions/${id}`);
  return data;
}