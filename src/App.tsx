import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
// import Submit from './pages/Submit';
import PublicResolved from './pages/PublicResolved';
import AdminDashboard from './pages/AdminDashboard';
import './i18n';
import { useTranslation } from 'react-i18next';
// import { setLanguage } from './i18n';
import { getStoredUser, logout } from './lib/api';
import { useEffect, useState } from 'react';
// import { setLanguage } from './i18n';
import SubmitPage from './pages/submit';
import { setLanguage } from './i18n';
import RegisterPage from './pages/register';
import UniversityFooter from './components/universityFooter';

const queryClient = new QueryClient();

function Header() {
  const { t, i18n } = useTranslation();
  const [user, setUser] = useState(getStoredUser());
  const navigate = useNavigate();

  useEffect(() => {
    const onStorage = () => setUser(getStoredUser());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  async function onLogout() {
    await logout();
    setUser(null);
    navigate('/');
  }

  return (
    <header className="border-b bg-white/70 backdrop-blur sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
        <Link to="/" className="font-bold text-lg">
          {/* {t('appTitle')} */}




          <img src="public/TUImage.png" alt="Logo" width={120} height={100} />
        </Link>
        <nav className="ml-auto flex items-center gap-2">
          <Link to="/"><Button variant="ghost">{t('nav.home')}</Button></Link>
          <Link to="/submit"><Button variant="ghost">Submit a Feedback</Button></Link>
          <Link to="/public"><Button variant="ghost">{t('nav.public')}</Button></Link>
          <Link to="/admin"><Button variant="ghost">{t('nav.admin')}</Button></Link>
          <Link to="/register"><Button variant="ghost">Register</Button></Link>

          <Select
            defaultValue={i18n.language}
            onValueChange={(v: 'en' | 'ne') => {
              setLanguage(v);
            }}
          >
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder={t('nav.language')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="ne">नेपाली</SelectItem>
            </SelectContent>
          </Select>

          {user ? (
            <Button variant="outline" onClick={onLogout}>{t('nav.logout')}</Button>
          ) : null}
        </nav>
      </div>
    </header>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/submit" element={<SubmitPage />} />
          <Route path="/public" element={<PublicResolved />} />
           <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <UniversityFooter/>
      </BrowserRouter>

      
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;