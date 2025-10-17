import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import PublicResolved from './pages/PublicResolved';
import AdminDashboard from './pages/AdminDashboard';
import './i18n';
import { useTranslation } from 'react-i18next';
import { getStoredUser, logout } from './lib/api';
import { useEffect, useState } from 'react';
import SubmitPage from './pages/Submit';
import { setLanguage } from './i18n';
import RegisterPage from './pages/Register';
import UniversityFooter from './components/universityFooter';
import { toast } from 'sonner';
import { 
  Home, 
  Send, 
  Eye, 
  Settings, 
  UserPlus, 
  LogOut, 
  Menu, 
  X, 
  Globe,
  User,
  MessageSquare,
  ChevronDown,
  FileText
} from 'lucide-react';
import CollegeDataForm from './pages/collegeForm';
import { useIsMobile } from './hooks/use-mobile';
import FeedbackPage from './pages/Feedback';
// import {ProgressReportForm} from './pages/ProgressForm';
import { ProgressReport } from './types';
import ProgressForm from './pages/ProgressForm';
import TUVision2030 from './pages/missionVision';
import DigitalUniversity from './pages/digital';

const queryClient = new QueryClient();

function Header() {
  const { t, i18n } = useTranslation();
  const [user, setUser] = useState(getStoredUser());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [feedbackMenuOpen, setFeedbackMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onStorage = () => setUser(getStoredUser());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  async function onLogout() {
    await logout();
    setUser(null);
    navigate('/');
    setIsMobileMenuOpen(false);
    setUserMenuOpen(false);
  }



   const [isSubmitting, setIsSubmitting] = useState(false);



  const mainNavigationItems = [
    { path: '/', label: t('nav.home'), icon: Home },

    { path: '/admin', label: t('nav.admin'), icon: Settings },
    { path: '/college-form', label: 'College Form', icon: FileText },
        { path: '/progress-form', label: 'Progress Form', icon: FileText },
              { path: '/mission-vision', label: 'Mission Vision', icon: FileText },
              { path: '/digital-university', label: 'Digital University', icon: FileText },

              

  ];

  const feedbackItems = [
    { path: '/submit', label: 'Submit a Feedback', icon: Send },
    { path: '/feedback-status', label: 'Track Feedback', icon: MessageSquare },
        { path: '/public', label: 'Public Transparency', icon: Eye },

        
  ];

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const isMobile = useIsMobile();

  return (
    <>
      {/* Top Bar with Logo */}
 <div className="bg-white border-b border-gray-100">
<div className="w-[90vw] mx-auto px-8 sm:px-10 lg:px-10">
    <div
      className="flex items-center justify-between"
      style={{ minHeight: isMobile ? '80px' : '96px' }}
    >
      {/* Logo Section */}
      <Link
        to="/"
        className="flex items-center gap-3 hover:opacity-90 transition-opacity duration-200"
      >
        <img
          src="https://portal.tu.edu.np/medias/Tulogo_2024_02_25_10_03_06.png"
          alt="Tribhuvan University Logo"
          className={`${isMobile ? 'h-12' : 'h-16'} w-auto`}
        />
        <div className="flex flex-col leading-tight text-indigo-900 justify-start">
          {/* Line 1 */}
          <div
            className={`${
              isMobile ? 'text-base' : 'text-xl'
            } font-bold text-center`}
          >
            Tribhuvan University
          </div>
          {/* Line 2 */}
          <div
            className={`${
              isMobile ? 'text-sm' : 'text-lg'
            } font-semibold  text-indigo-800`}
          >
            Planning Directorate
          </div>
          {/* Line 3 */}
          <div
            className={`${
              isMobile ? 'text-xs' : 'text-sm'
            }  text-gray-600`}
          >
            Kirtipur, Kathmandu, Nepal
          </div>
        </div>
      </Link>

      {/* Desktop - Language & User Menu */}
      <div className="hidden lg:flex items-center space-x-3">
        <Select
          defaultValue={i18n.language}
          onValueChange={(v) => setLanguage(v)}
        >
          <SelectTrigger className="w-[130px] border-gray-200 hover:border-indigo-300 focus:border-indigo-500 rounded-lg">
            <Globe className="w-4 h-4 mr-2 text-gray-500" />
            <SelectValue placeholder={t('nav.language')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">🇺🇸 English</SelectItem>
            <SelectItem value="ne">🇳🇵 नेपाली</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Mobile Controls */}
      <div className="lg:hidden flex items-center space-x-2">
        <Select
          defaultValue={i18n.language}
          onValueChange={(v) => setLanguage(v)}
        >
          <SelectTrigger className="w-[50px] border-gray-200 p-2 hover:border-indigo-300 transition-colors duration-200 rounded-lg">
            <Globe className="w-4 h-4 text-gray-500" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">🇺🇸 EN</SelectItem>
            <SelectItem value="ne">🇳🇵 NE</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`
            p-2 rounded-lg transition-all duration-300 transform z-60 relative
            ${
              isMobileMenuOpen
                ? 'bg-indigo-100 text-indigo-600 rotate-180 scale-110'
                : 'hover:bg-gray-100 hover:scale-105'
            }
          `}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </Button>
      </div>
    </div>
  </div>
</div>


      {/* Horizontal Navigation Bar - Desktop Only */}
      <nav className="hidden lg:block bg-gradient-to-r from-indigo-600 to-indigo-700 shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center space-x-1">
              {mainNavigationItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = isActivePath(item.path);
                return (
                  <Link key={item.path} to={item.path}>
                    <Button
                      variant="ghost"
                      className={`
                        flex items-center gap-2 px-5 py-2.5 text-sm font-medium transition-all duration-200 rounded-lg relative
                        ${isActive 
                          ? 'bg-white text-black hover:bg-white' 
                          : 
                          'text-white'
                        }
                      `}
                    >
                      <IconComponent className="w-4 h-4" />
                      {item.label}
                      {/* {isActive && (
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-indigo-700 rounded-t-full" />
                      )} */}
                    </Button>
                  </Link>
                );
              })}

              {/* Feedback Dropdown */}
              <div className="relative">
                <Button
                  variant="ghost"
                  onClick={() => setFeedbackMenuOpen(!feedbackMenuOpen)}
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                >
                  <MessageSquare className="w-4 h-4" />
                  Feedback
                  <ChevronDown className={`w-3 h-3 ml-1 transition-transform duration-200 ${feedbackMenuOpen ? 'rotate-180' : ''}`} />
                </Button>
                
                {feedbackMenuOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setFeedbackMenuOpen(false)}
                    />
                    <div className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-20">
                      {/* <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Feedback Options
                      </div> */}
                      <div className="border-t border-gray-100 my-1" />
                      {feedbackItems.map((item) => {
                        const IconComponent = item.icon;
                        return (
                          <Link 
                            key={item.path} 
                            to={item.path}
                            onClick={() => setFeedbackMenuOpen(false)}
                          >
                            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-150">
                              <IconComponent className="w-4 h-4" />
                              {item.label}
                            </button>
                          </Link>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <div className={`
        lg:hidden fixed inset-0 z-40 bg-white transform transition-all duration-300 ease-out
        ${isMobileMenuOpen 
          ? 'opacity-100 translate-x-0 visible' 
          : 'opacity-0 translate-x-full invisible'
        }
      `}>
        <div className="relative h-full flex flex-col">
          <div style={{ height: isMobile ? '80px' : '96px' }} className="flex-shrink-0"></div>
          
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <div className="max-w-sm mx-auto space-y-2">
              {/* Main Navigation */}
              {mainNavigationItems.map((item, index) => {
                const IconComponent = item.icon;
                const isActive = isActivePath(item.path);
                return (
                  <Link key={item.path} to={item.path}>
                    <div 
                      className={`
                        transform transition-all duration-300 ease-out
                        ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}
                      `}
                      style={{ transitionDelay: isMobileMenuOpen ? `${index * 60}ms` : '0ms' }}
                    >
                      <div className={`
                        w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                        ${isActive ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-700 hover:bg-gray-100'}
                      `}>
                        <div className={`
                          w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200
                          ${isActive ? 'bg-white/20' : 'bg-gray-100 text-gray-600'}
                        `}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className="text-base font-medium">{item.label}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}

              {/* Feedback Section */}
              <div className="pt-4 pb-2">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-2">
                  Feedback
                </div>
              </div>


              
              {feedbackItems.map((item, index) => {
                const IconComponent = item.icon;
                const delayIndex = mainNavigationItems.length + index;
                return (
                  <Link key={item.path} to={item.path}>
                    <div
                      className={`
                        transform transition-all duration-300 ease-out
                        ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}
                      `}
                      style={{ transitionDelay: isMobileMenuOpen ? `${delayIndex * 60}ms` : '0ms' }}
                    >
                      <div className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-gray-700 hover:bg-gray-100">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className="text-base font-medium">{item.label}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}

              {/* Account Section */}
              <div className="pt-4 border-t border-gray-200 mt-4">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-2">
                  Account
                </div>
              </div>

              {user ? (
                <div 
                  className={`
                    transform transition-all duration-300 ease-out
                    ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}
                  `}
                  style={{ 
                    transitionDelay: isMobileMenuOpen ? `${(mainNavigationItems.length + feedbackItems.length) * 60}ms` : '0ms' 
                  }}
                >
                  <div className="mb-3 px-4 py-3 bg-indigo-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold text-lg">
                        {user.username?.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-900 truncate">{user.username}</div>
                        <div className="text-xs text-gray-500 truncate">{user.email}</div>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-red-600 hover:bg-red-50"
                  >
                    <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                      <LogOut className="w-5 h-5" />
                    </div>
                    <span className="text-base font-medium">{t('nav.logout')}</span>
                  </button>
                </div>
              ) : (
                <Link to="/register">
                  <div
                    className={`
                      transform transition-all duration-300 ease-out
                      ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}
                    `}
                    style={{ 
                      transitionDelay: isMobileMenuOpen ? `${(mainNavigationItems.length + feedbackItems.length) * 60}ms` : '0ms' 
                    }}
                  >
                    <div className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-gray-700 hover:bg-gray-100">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center">
                        <UserPlus className="w-5 h-5" />
                      </div>
                      <span className="text-base font-medium">Register</span>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          </div>

          <div className="flex-shrink-0 flex justify-center pb-6">
            <div 
              className={`
                w-12 h-0.5 bg-gray-300 rounded-full transform transition-all duration-500
                ${isMobileMenuOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
              `}
              style={{ 
                transitionDelay: isMobileMenuOpen ? `${(mainNavigationItems.length + feedbackItems.length + 1) * 60}ms` : '0ms' 
              }}
            />
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-30 transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}

const App = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);


    // const API_BASE_URL = 'http://localhost:4000/api/progress';
    const API_BASE_URL='https://feedbackbackend-4.onrender.com/api/progress';
  
    const handleFormSubmit = async (data: ProgressReport) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success('Progress report submitted successfully!');
        // setActiveTab('dashboard');
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to submit report');
      }
    } catch (error) {
      console.error('Error submitting report:', error);
      toast.error('Failed to submit report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return(
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50/30">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/submit" element={<SubmitPage />} />
              <Route path="/feedback-status" element={<FeedbackPage />} />
              <Route path="/public" element={<PublicResolved />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/college-form" element={<CollegeDataForm />} />
                       <Route path="/progress-form" element={   <ProgressForm onSubmit={handleFormSubmit} isLoading={isSubmitting} /> } />
                            <Route path="/mission-vision" element={<TUVision2030 /> } />
                            <Route path="/digital-university" element={<DigitalUniversity /> } />

                            
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <UniversityFooter />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
)};

export default App;