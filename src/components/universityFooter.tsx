import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, MessageSquare } from 'lucide-react';

const UniversityFooter = ({ 
  universityName = "EduFeedback",
  brandDescription = "University Feedback makes continuous improvement accessible for thousands of educational institutions.",
  contactEmail = "feedback@university.edu",
  contactPhone = "+1 (555) 123-4567",
  address = "123 University Ave, Education City",
  socialLinks = {
    facebook: "#",
    twitter: "#",
    instagram: "#",
    linkedin: "#",
    youtube: "#"
  },
  customLinks = {}
}) => {

  const defaultLinks = {
    platform: [
      { name: 'Home', href: '/' },
      { name: 'Submit Feedback', href: '/submit' },
      { name: 'Public Feedback', href: '/public' },
      { name: 'Admin Dashboard', href: '/admin' }
    ],
    company: [
      { name: 'About', href: '/about' },
      { name: 'Contact us', href: '/contact' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' }
    ],
    resources: [
      { name: 'Help Center', href: '/help' },
      { name: 'System Guides', href: '/guides' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Support', href: '/support' }
    ]
  };

  const links = { ...defaultLinks, ...customLinks };

  const socialIcons = {
    twitter: Twitter,
    youtube: Youtube,
    instagram: Instagram,
    facebook: Facebook,
    linkedin: Linkedin
  };

  return (
    <footer className="bg-slate-900 text-white relative overflow-hidden">
      {/* Background decoration dots */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-1/4 w-1 h-1 bg-white rounded-full"></div>
        <div className="absolute bottom-40 right-1/3 w-2 h-2 bg-blue-400 rounded-full opacity-60"></div>
        <div className="absolute top-32 right-1/4 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-40"></div>
        <div className="absolute bottom-20 left-1/3 w-1 h-1 bg-white rounded-full opacity-80"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8">
        
        {/* Main Content - All in one row */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Section */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-2">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">{universityName}</h3>
            </div>
            
            <p className="text-slate-300 text-xs leading-relaxed mb-4 max-w-xs">
              {brandDescription}
            </p>

            {/* Social Links */}
            <div className="space-y-2">
              <div className="text-slate-400 text-xs">Follow us</div>
              <div className="flex space-x-2">
                {Object.entries(socialLinks).map(([platform, url]) => {
                  const IconComponent = socialIcons[platform];
                  if (!IconComponent) return null;
                  return (
                    <a
                      key={platform}
                      href={url}
                      className="w-7 h-7 bg-slate-800 hover:bg-slate-700 rounded-full flex items-center justify-center transition-colors duration-200"
                      aria-label={`Follow us on ${platform}`}
                    >
                      <IconComponent className="w-3 h-3 text-slate-300" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wide">Platform</h4>
            <div className="space-y-2">
              {links.platform.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-slate-400 hover:text-white transition-colors duration-200 text-xs"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wide">Company</h4>
            <div className="space-y-2">
              {links.company.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-slate-400 hover:text-white transition-colors duration-200 text-xs"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wide">Resources</h4>
            <div className="space-y-2">
              {links.resources.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-slate-400 hover:text-white transition-colors duration-200 text-xs"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-slate-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-slate-400 text-xs mb-4 md:mb-0">
              © 2024 {universityName}. All rights reserved.
            </div>
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 text-xs text-slate-400">
              <div className="flex items-center">
                <span>📧 {contactEmail}</span>
              </div>
              <div className="flex items-center">
                <span>📞 {contactPhone}</span>
              </div>
              <div className="flex items-center">
                <span>📍 {address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default UniversityFooter;