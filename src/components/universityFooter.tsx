import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Settings, 
  FileText, 
  TrendingUp, 
  Target, 
  Building, 
  Send, 
  MessageSquare, 
  Eye, 
  UserPlus,
  GraduationCap,
  ExternalLink,
  MapPin // Changed from Map to avoid conflict
} from 'lucide-react';

export const UniversityFooter = () => {
  const { t, i18n } = useTranslation();
  const isMobile = useIsMobile();
  const navigate=useNavigate();

  const quickLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/admin', label: 'Admin Dashboard', icon: Settings },
    { path: '/college-form', label: 'Campus Form', icon: FileText },
    { path: '/progress-form', label: 'Progress Form', icon: TrendingUp },
    { path: '/mission-vision', label: 'TU Vision 2030', icon: Target },
    { path: '/digital-university', label: 'digitallization', icon: Building },
    { path: '/submit', label: 'Submit Feedback', icon: Send },
    { path: '/feedback-status', label: 'Track Feedback', icon: MessageSquare },
    { path: '/public', label: 'Public Transparency', icon: Eye },
    { path: '/register', label: 'Register', icon: UserPlus },
  ];

  const externalLinks = [
    { 
      label: 'UGC Nepal', 
      url: 'https://www.ugcnepal.edu.np/',
      icon: ExternalLink
    },
    { 
      label: 'TUGIS', 
      url: 'https://gis.tu.edu.np/',
      icon: MapPin // Changed from Map to MapPin
    },
    { 
      label: 'MOEST', 
      url: 'https://moest.gov.np/',
      icon: GraduationCap
    }
  ];

 const institutesFaculties = [
    { name: "Institute of Medicine", url: "https://iom.tu.edu.np" },
    { name: "Institute of Forestry", url: "https://ioff.tu.edu.np" },
    { name: "Institute of Agriculture and Animal Science", url: "https://iaas.tu.edu.np" },
    { name: "Institute of Science and Technology", url: "https://iost.tu.edu.np" },
    { name: "Institute of Engineering", url: "https://ioe.tu.edu.np" },
    { name: "Faculty of Humanities and Social Sciences", url: "https://fohss.tu.edu.np" },
    { name: "Faculty of Education", url: "https://foe.tu.edu.np" },
    { name: "Faculty of Law", url: "https://fol.tu.edu.np" },
    { name: "Faculty of Management", url: "https://fom.tu.edu.np" },
    { name: "Ayurveda Teaching Hospital, Kirtipur", url: "https://ath.tu.edu.np" }
  ];

  const contactInfo = [
    { label: "Phone", value: "+977-1-4330437" },
    { label: "Email", value: "director.pd@tu.edu.np" },
    { label: "Address", value: "Kirtipur, Kathmandu, Nepal" }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-indigo-900 text-white ">
      {/* Main Footer Content */}
      <div className=" px-4 py-12 mb-3 pb-3 max-w-[90vw] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* University Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://portal.tu.edu.np/medias/Tulogo_2024_02_25_10_03_06.png"
                alt="Tribhuvan University Logo"
                className="h-12 w-auto"
              />
              <div>
                <h3 className="text-lg font-bold text-white">Tribhuvan University</h3>
                <p className="text-sm text-gray-300">Planning Directorate</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-4">
     The Planning Directorate serves as one of the key directorates under the Office of the Vice Chancellor at Tribhuvan University. It functions as the central secretariat of the university, responsible for strategic planning, policy development, and institutional coordination. The directorate plays a vital role in shaping the university's academic and administrative direction through comprehensive planning and implementation oversight.
            </p>
            <div className="space-y-2">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center text-sm text-gray-300">
                  <span className="font-medium text-white mr-2">{item.label}:</span>
                  {item.value}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold mb-4 text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              Quick Links
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-gray-300 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2 py-1"
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Institutes & Faculties */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold mb-4 text-white flex items-center gap-2">
              <Building className="w-5 h-5" />
              Institutes & Faculties
            </h3>
            <div className="space-y-2">
              {institutesFaculties.map((institute, index) => (
                <div
                  key={index}
                  className="text-gray-300 hover:text-white text-sm transition-colors duration-200 py-1 cursor-pointer"
                  onClick={()=>{
                    window.open(institute.url, '_blank');
                  }}
                >
                  {institute.name}
                </div>
              ))}
            </div>
          </div>

          {/* Social & External Links */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold mb-4 text-white">Connect With Us</h3>
            <div className="space-y-4">
              {/* Social Media Links */}
              <div className="flex space-x-3">
                <a 
                  href="https://www.facebook.com/tribhuvan.viswavidyalaya/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-indigo-600 hover:bg-indigo-500 p-2 rounded-lg transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a 
                  href="https://x.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-indigo-600 hover:bg-indigo-500 p-2 rounded-lg transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>

              {/* External Links */}
              <div className="space-y-2">
                <h4 className="font-semibold text-white mb-2">Important Links</h4>
                {externalLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2 py-1"
                  >
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Latest Updates */}
              <div className="bg-indigo-800/30 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">Latest Updates</h4>
                <p className="text-sm text-gray-300">
                  Stay informed about the latest developments in higher education and university initiatives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} Tribhuvan University. All rights reserved.
            </div>

            {/* Policy Links */}
  

            {/* Developer Credit */}
            <div className="flex items-center space-x-2">
              <span className="text-slate-500 text-xs">Developed by</span>
              <div className="flex items-center bg-slate-800 px-3 py-1 rounded-lg">
                <div className="w-15 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded mr-2 flex items-center justify-center">
                  <img 
                    src="/nsoft.jpeg" 
                    alt="Nsoft Innovations" 
                    className="h-8 w-auto object-contain"
                  />
                </div>
              </div>
              <a 
                href="https://nsoftInnovation.com.np" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 text-xs"
              >
                nsoftInnovation.com.np
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default UniversityFooter;