import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import { adminList, trackSuggestion } from '@/lib/api';
import { Link } from 'react-router-dom';
import { 
  MessageSquare, 
  Search, 
  Users, 
  TrendingUp, 
  Shield, 
  Camera, 
  Globe, 
  Smartphone, 
  BarChart3, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  Target,
  ChevronRight,
  Star,
  Eye,
  Send,
  FileText,
  Activity,
  AlertCircle,
  User,
  UserCheck,
  GraduationCap,
  Building,
  Settings,
  Bell,
  ChartBar,
  Languages,
  Lock,
  Zap,
  FileImage,
  Mail,
  Smartphone as Phone,
  ArrowDown,
  ExternalLink,
  Calendar
} from 'lucide-react';
import EnhancedTrackingCard from '@/components/SearchSuggest';
import SuggestionCard from '@/components/suggestionCard';

export default function HomePage() {
  const { t } = useTranslation();
  const [trackId, setTrackId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | {
    id: string;
    status: string;
    category: string;
    createdAt: string;
    updatedAt: string;
  }>(null);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  async function onTrack() {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await trackSuggestion(trackId.trim());
      setResult(data.suggestion);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(t('home.notFound'));
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  const stats = [
    { icon: MessageSquare, label: "Active Suggestions", value: "1,247", trend: "+12%" },
    { icon: Users, label: "Community Members", value: "8,934", trend: "+8%" },
    { icon: CheckCircle2, label: "Resolved Issues", value: "892", trend: "+15%" },
    { icon: TrendingUp, label: "Response Rate", value: "94%", trend: "+2%" }
  ];

  const userRoles = [
    {
      icon: GraduationCap,
      title: "Students",
      description: "Submit feedback on academics, facilities, and student life. Track your suggestions and see real changes.",
      permissions: ["Submit suggestions", "Track status", "View public board"],
      color: "from-violet-500 to-purple-600"
    },
    {
      icon: UserCheck,
      title: "Faculty & Staff",
      description: "Share insights on administrative processes, teaching resources, and workplace improvements.",
      permissions: ["Submit suggestions", "Department collaboration", "Advanced tracking"],
      color: "from-emerald-500 to-teal-600"
    },
    {
      icon: Building,
      title: "Alumni",
      description: "Contribute your experience to help improve the university for future generations.",
      permissions: ["Submit suggestions", "Alumni network access", "Impact visibility"],
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Settings,
      title: "Administrators",
      description: "Manage all suggestions, assign to departments, analyze trends, and drive institutional change.",
      permissions: ["Full dashboard access", "Analytics & reports", "Status management"],
      color: "from-blue-500 to-indigo-600"
    }
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Submit Your Suggestion",
      description: "Choose your category (Academic, Administrative, Infrastructure) and submit anonymously or with your identity.",
      icon: Send,
      color: "from-pink-500 to-rose-500"
    },
    {
      step: "02",
      title: "Track Progress",
      description: "Receive a unique ID to track your suggestion through stages: Received → In Process → Resolved.",
      icon: Activity,
      color: "from-blue-500 to-cyan-500"
    },
    {
      step: "03",
      title: "Admin Review",
      description: "Our Planning Directorate reviews, categorizes, and assigns suggestions to relevant departments.",
      icon: UserCheck,
      color: "from-emerald-500 to-green-500"
    },
    {
      step: "04",
      title: "Implementation",
      description: "Watch your ideas come to life with status updates and see resolved suggestions on our public board.",
      icon: CheckCircle2,
      color: "from-violet-500 to-purple-500"
    }
  ];

  const coreFeatures = [
    {
      icon: MessageSquare,
      title: "Smart Categorization",
      description: "Automatically categorize suggestions into Academic, Administrative, Infrastructure, and Student Life.",
      color: "from-blue-600 to-indigo-600",
      bgColor: "from-blue-50 to-indigo-50"
    },
    {
      icon: Shield,
      title: "Anonymous Submissions",
      description: "Submit feedback without revealing your identity while maintaining complete privacy and security.",
      color: "from-emerald-600 to-teal-600",
      bgColor: "from-emerald-50 to-teal-50"
    },
    {
      icon: Activity,
      title: "Real-time Tracking",
      description: "Monitor your suggestion's journey with live status updates and transparent progress reporting.",
      color: "from-purple-600 to-violet-600",
      bgColor: "from-purple-50 to-violet-50"
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Comprehensive insights with trend analysis, impact metrics, and data-driven decision making.",
      color: "from-orange-600 to-red-600",
      bgColor: "from-orange-50 to-red-50"
    },
    {
      icon: Bell,
      title: "Email Notifications",
      description: "Stay informed with automatic email updates when your suggestion status changes.",
      color: "from-indigo-600 to-blue-600",
      bgColor: "from-indigo-50 to-blue-50"
    },
    {
      icon: Eye,
      title: "Public Transparency",
      description: "View resolved suggestions and their impact on the community through our public board.",
      color: "from-teal-600 to-cyan-600",
      bgColor: "from-teal-50 to-cyan-50"
    }
  ];
  const [publicSuggestions, setPublicSuggestions] = useState<any[]>([]);
  const [loadingPublic, setLoadingPublic] = useState(true);


const fetchPublicSuggestions = async () => {
  try {
    setLoadingPublic(true);
    const data = await adminList({ 
      limit: 3,
      page: 1
    });

    // Transform API response into UI format
    const mappedSuggestions = data.suggestions.map((s: any, index: number) => {
      return {
        id: `SUG-${100000 + index + 1}`, // Generate readable ID
        title: s.description || "No title provided",
        category: s.category || "General",
        status: s.status || "Pending",
        impact: s.impact || "Impact not available", // If you don’t have it yet
        resolvedDate: s.updatedAt 
          ? new Date(s.updatedAt).toLocaleDateString() 
          : "Not resolved",
        department: s.assignedDepartment || "Unassigned",
        resolutionTime: s.createdAt && s.updatedAt 
          ? `${Math.ceil(
              (new Date(s.updatedAt).getTime() - new Date(s.createdAt).getTime()) / 
              (1000 * 60 * 60 * 24)
            )} days`
          : "N/A",
          actionTaken: s.actionTaken || "No action yet"
      };
    });

    setPublicSuggestions(mappedSuggestions);
  } catch (error) {
    console.error('Failed to fetch public suggestions:', error);
  } finally {
    setLoadingPublic(false);
  }
};


  useEffect(() => {

    fetchPublicSuggestions();

  }, []);

  // Sample public suggestions data
  // const publicSuggestions = [
  //   {
  //     id: "SUG-123457",
  //     title: "Extended Library Hours During Exams",
  //     category: "Academic",
  //     status: "Resolved",
  //     impact: "Library hours extended from 10 PM to 2 AM during exam weeks. 89% increase in late-night library usage.",
  //     resolvedDate: "1/25/2024",
  //     department: "Academic Affairs",
  //     resolutionTime: "15 days"
  //   },
  //   {
  //     id: "SUG-123458",
  //     title: "Install More Bike Racks Near Dormitories",
  //     category: "Infrastructure",
  //     status: "Resolved",
  //     impact: "Added 50 new bike racks across campus. Reduced bike theft by 40% and improved campus mobility.",
  //     resolvedDate: "1/15/2024",
  //     department: "Facilities Management",
  //     resolutionTime: "12 days"
  //   },
  //   {
  //     id: "SUG-123459",
  //     title: "Online Course Registration System",
  //     category: "Administrative",
  //     status: "Resolved",
  //     impact: "New digital system reduced registration time by 70% and eliminated long queues during enrollment.",
  //     resolvedDate: "1/10/2024",
  //     department: "IT Services",
  //     resolutionTime: "45 days"
  //   }
  // ];




  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Implemented': 
      case 'Resolved': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'In Progress': 
      case 'In Process': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Under Review': 
      case 'Received': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Approved': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Academic': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Infrastructure': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Administrative': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className=" bg-gradient-to-br from-slate-50 via-white to-blue-50 font-inter "
    style={{ }}
    >
      {/* Enhanced Hero Section */}
<section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 min-h-[80dvh] flex items-center">


  
  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      {/* Left Content - Main Call to Action */}
      <div className={`space-y-8 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
        <div className="space-y-6">

          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight font-poppins">
            Your Voice,
            <span className=" block mt-2">
              Our Action
            </span>
          </h1>
          
          <p className="text-xl text-purple-100 leading-relaxed max-w-xl font-inter">
            Connect students, faculty, staff, and alumni with administration. 
            Share feedback anonymously, track progress in real-time, and create meaningful changes.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/submit" className="flex-1">
<Button className="bg-[#3ab2ea99] text-white px-8 py-6 h-16 text-lg font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg">

                <Send className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                Submit Feedback
            </Button> 

         
          </Link>
          
     
        </div>

    
      </div>

      {/* Right Side - Enhanced Tracking Card */}
      <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
        <EnhancedTrackingCard />
      </div>
    </div>
  </div>
</section>


     

      {/* Recent Success Stories Section */}
      <section className="py-16 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4 font-poppins">
              Recent Feedback by publilc
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-inter">
              See how your community suggestions create real impact and meaningful changes across campus.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {publicSuggestions.map((suggestion, index) =>    {   return (
  <SuggestionCard suggestion={suggestion}/>
            )})}
          </div>
          
          <div className="text-center mt-8">
            <Link to="/public">
              <Button 
                variant="outline" 
                className="border-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50 rounded-xl transform hover:scale-105 transition-all duration-300 font-semibold px-8 py-3 font-inter"
              >
                View All Submitted Suggestion
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* User Roles Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6 font-poppins">
              Built for Every Member of Your University
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-inter">
              Different roles, different needs. Our platform adapts to serve students, faculty, staff, alumni, and administrators.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {userRoles.map((role, index) => {
              const IconComponent = role.icon;
              return (
                <Card 
                  key={role.title} 
                  className="border-0 shadow-xl bg-white hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group"
                  style={{ 
                    animationDelay: `${index * 200}ms`,
                  }}
                >
                  <CardHeader className="text-center pb-4 relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${role.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    <div className={`relative w-20 h-20 bg-gradient-to-br ${role.color} rounded-3xl flex items-center justify-center mx-auto mb-4 transform group-hover:rotate-12 transition-transform duration-300`}>
                      <IconComponent className="w-10 h-10 text-white" />
                    </div>
                    <CardTitle className="relative text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-300 font-poppins">
                      {role.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 font-inter">
                      {role.description}
                    </p>
                    <div className="space-y-2">
                      {role.permissions.map((permission, idx) => (
                        <div key={idx} className="flex items-center text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-300 font-inter">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500 mr-2 flex-shrink-0 animate-pulse" />
                          {permission}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl animate-bounce"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 font-poppins">
              How It Works
            </h2>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto font-inter">
              A simple, transparent process from suggestion to implementation. Track every step of your feedback journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={step.step} className="text-center relative group">
                  {index < howItWorks.length - 1 && (
                    <div className="hidden lg:block absolute top-16 left-full w-full h-1 bg-gradient-to-r from-white/30 to-transparent -translate-x-1/2">
                      <ArrowRight className="w-6 h-6 text-white/70 absolute -top-2.5 right-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full p-1 animate-pulse" />
                    </div>
                  )}
                  <div className="relative transform group-hover:scale-110 transition-all duration-300">
                    <div className={`w-32 h-32 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center mx-auto mb-6 relative shadow-2xl group-hover:shadow-3xl transition-shadow duration-300`}>
                      <IconComponent className="w-12 h-12 text-white animate-bounce" />
                      <span className="absolute -top-3 -right-3 w-10 h-10 bg-white text-gray-800 rounded-full flex items-center justify-center text-sm font-bold border-4 border-white/50 animate-pulse font-poppins">
                        {step.step}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-yellow-300 transition-colors duration-300 font-poppins">
                      {step.title}
                    </h3>
                    <p className="text-purple-100 text-sm leading-relaxed group-hover:text-white transition-colors duration-300 font-inter">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-800 to-indigo-600 bg-clip-text text-transparent mb-6 font-poppins">
              Powerful Features for Effective Feedback
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-inter">
              Everything you need to share feedback, track progress, and create meaningful change in your university.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card 
                  key={feature.title} 
                  className="border-0 shadow-lg bg-white hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  <CardHeader className="pb-4 relative">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-4 transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-300 font-poppins">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 relative">
                    <p className="text-gray-600 leading-relaxed text-sm group-hover:text-gray-700 transition-colors duration-300 font-inter">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Custom CSS and Fonts */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700;800&display=swap');
        
        .font-inter {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        .font-poppins {
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 1s ease-out 0.3s both;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .group:hover .group-hover\\:rotate-12 {
          transform: rotate(12deg);
        }
        
        .group:hover .group-hover\\:scale-110 {
          transform: scale(1.1);
        }
        
        .group:hover .group-hover\\:translate-x-1 {
          transform: translateX(0.25rem);
        }
      `}</style>
    </div>)
  
}