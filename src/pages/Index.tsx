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
  Award
} from 'lucide-react';
import DirectorMessage from '@/components/directorMessage';
import WelcomeDirectorate from '@/components/welcomeDirectorate';

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
      title: "College Management",
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
    { icon: Building2, value: "250+", label: "Affiliated Colleges", color: "text-blue-600" },
    { icon: GraduationCap, value: "50,000+", label: "Active Students", color: "text-indigo-600" },
    { icon: MessageSquare, value: "15,000+", label: "Feedbacks Processed", color: "text-purple-600" },
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
              <div className="absolute bottom-0 left-0 right-0 z-20 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="bg-white/95 backdrop-blur-sm p-3 rounded-lg  max-w-2xl"
           
                  >
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
      <div className="bg-gray-50 py-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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


      {/* <DirectorMessage/> */}
      <WelcomeDirectorate/>
      

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

      {/* Benefits Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built specifically for higher education institutions with modern technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your University?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of institutions already using our platform to streamline operations and improve outcomes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              Schedule a Demo
            </button>
            <button className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors duration-200 border-2 border-white/20">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      {/* <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-4">About</h3>
              <p className="text-gray-400 text-sm">
                Comprehensive university management system for modern educational institutions.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Features</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>College Management</li>
                <li>Student Information</li>
                <li>Feedback System</li>
                <li>Analytics & Reports</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Documentation</li>
                <li>Support</li>
                <li>Training</li>
                <li>API Reference</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Email: info@university.edu</li>
                <li>Phone: (123) 456-7890</li>
                <li>Address: Kathmandu, Nepal</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 University Management System. All rights reserved.</p>
          </div>
        </div>
      </footer> */}
    </div>
  );
}