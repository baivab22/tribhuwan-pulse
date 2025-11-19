import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Building2, 
  Users, 
  MessageSquare, 
  BarChart3, 
  FolderKanban,
  TrendingUp,
  CheckCircle,
  Clock,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  DollarSign,
  Target,
  Award,
  Sparkles
} from 'lucide-react';
import DirectorMessage from '@/components/directorMessage';
import WelcomeDirectorate from '@/components/welcomeDirectorate';
import { goals, visionPoints } from './missionVision';
import SummaryDashboard from '@/components/digitalShort.component';

export default function UniversityHomepage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const slides = [
    {
      image: "https://portal.tu.edu.np/medias/saroj_2024_04_01_13_55_36.jpg",
      title: "The University Campus, Kirtipur",
      subtitle: ""
    },
    {
      image: "https://portal.tu.edu.np/medias/2025_07_31_15_51_19.jpg",
      title: "",
      subtitle: ""
    },
    {
      image: "https://portal.tu.edu.np/medias/registraroffice_2023_05_04_08_14_47.png",
      title: "Office Of The Registrar Building",
      subtitle: ""
    },
    {
      image: "https://portal.tu.edu.np/medias/2025_07_11_10_47_17.jpg",
      title: "Tu Senate",
      subtitle: ""
    }
  ];

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [autoPlay, slides.length]);

  const nextSlide = () => {
    setAutoPlay(false);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setAutoPlay(false);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const features = [
    {
      icon: Building2,
      title: "Campus Management",
      description: "Comprehensive data management for all affiliated colleges with real-time updates",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      icon: Users,
      title: "Student Information",
      description: "Centralized student database with enrollment, performance, and tracking systems",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200"
    },
    {
      icon: MessageSquare,
      title: "Feedback System",
      description: "Multi-stakeholder feedback collection and tracking with actionable insights",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    {
      icon: BarChart3,
      title: "Analytics & Reports",
      description: "Advanced analytics for budget, expenditure, and performance monitoring",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200"
    },
    {
      icon: FolderKanban,
      title: "Project Planning",
      description: "Strategic project management with resource allocation and timeline tracking",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200"
    },
    {
      icon: TrendingUp,
      title: "Budget Management",
      description: "Financial planning and expenditure tracking with detailed reporting",
      color: "text-teal-600",
      bgColor: "bg-teal-50",
      borderColor: "border-teal-200"
    }
  ];

  const stats = [
      { icon: Building2, value: "64", label: "Constituent Colleges", color: "text-blue-600" },
    { icon: Building2, value: "989+", label: "Affiliated Colleges", color: "text-blue-600" },
    { icon: GraduationCap, value: "500,000+", label: "Active Students", color: "text-indigo-600" },
    { icon: MessageSquare, value: "1,000+", label: "Feedbacks Processed", color: "text-purple-600" },
    { icon: FolderKanban, value: "500+", label: "Active Projects", color: "text-emerald-600" }
  ];

  const benefits = [
    {
      icon: CheckCircle,
      title: "Unified Platform",
      description: "All university operations in one integrated system"
    },
    {
      icon: Clock,
      title: "Real-Time Updates",
      description: "Instant data synchronization across all departments"
    },
    {
      icon: Target,
      title: "Strategic Planning",
      description: "Data-driven insights for better decision making"
    },
    {
      icon: Award,
      title: "Quality Assurance",
      description: "Maintain high standards with continuous monitoring"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Slider Section */}
      <div className="relative h-[600px] overflow-hidden bg-gray-900">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-10" />
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            {slide.title && (
              <div className="absolute bottom-0 left-0 right-0 z-20 pb-20 flex justify-center">
                <div className="w-[90vw]">
                  <div className="bg-white/95 backdrop-blur-sm p-3 rounded-lg max-w-2xl">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      {slide.title}
                    </h2>
                    {slide.subtitle && (
                      <p className="text-gray-700">
                        {slide.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white p-3 rounded-full transition-all duration-200 shadow-lg"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white p-3 rounded-full transition-all duration-200 shadow-lg"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>
        
        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentSlide(index);
                setAutoPlay(false);
              }}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide 
                  ? 'w-8 h-3 bg-white' 
                  : 'w-3 h-3 bg-white/60 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>

     

      {/* Stats Section */}
      <div className="bg-gray-50 py-12 border-b border-gray-200 flex justify-center">
        <div className="w-[90vw]">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-3">
                    <div className="bg-white p-4 rounded-xl shadow-md">
                      <IconComponent className={`w-8 h-8 ${stat.color}`} />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Welcome Directorate Section */}
      <div className="flex justify-center">
        <div className="w-[90vw]">
          <WelcomeDirectorate/>
        </div>
      </div>


       <SummaryDashboard/>

            <div className="py-20 flex justify-center">
        <div className="w-[90vw]">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-4 h-4" />
              <span className="font-semibold">Our Vision</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Shaping Tomorrow's Leaders</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transforming into a world-class institution that leads Nepal's educational excellence and contributes to global knowledge advancement
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {visionPoints.map((point, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 border-transparent hover:border-blue-200"
              >
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-blue-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
                  <div className="relative w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                    <point.icon className="h-10 w-10 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{point.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{point.description}</p>
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500 leading-relaxed">{point.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white flex justify-center">
        <div className="w-[90vw]">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Management Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to manage university operations efficiently and effectively
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className={`p-6 rounded-xl border-2 ${feature.borderColor} ${feature.bgColor} hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
                >
                  <div className={`w-14 h-14 rounded-lg bg-white flex items-center justify-center mb-4 shadow-sm`}>
                    <IconComponent className={`w-7 h-7 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Vision Section */}

    </div>
  );
}