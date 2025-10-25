import React, { useState } from 'react';
import { 
  Wifi, Server, BookOpen, Users, Shield, BarChart3, 
  Target, Zap, CheckCircle, ArrowRight, Menu, X,
  Globe, Lock, Monitor, Brain, Database, Video, Layers,
  Cpu, TrendingUp, Award, Lightbulb, Radio
} from 'lucide-react';

export default function DigitalUniversity() {
  const [activeComponent, setActiveComponent] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const components = [
    { id: 'overview', label: 'Overview', icon: Globe },
    { id: 'connectivity', label: 'Connectivity', icon: Wifi },
    { id: 'lms', label: 'LMS', icon: BookOpen },
    { id: 'emis', label: 'EMIS', icon: Server },
    { id: 'resources', label: 'Resources', icon: BarChart3 },
    { id: 'capacity', label: 'Capacity', icon: Brain },
  ];

  const renderContent = () => {
    switch(activeComponent) {
      case 'overview': return <OverviewSection />;
      case 'connectivity': return <ConnectivitySection />;
      case 'lms': return <LMSSection />;
      case 'emis': return <EMISSection />;
      case 'resources': return <ResourcesSection />;
      case 'capacity': return <CapacitySection />;
      default: return <OverviewSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 text-white shadow-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white bg-opacity-20 rounded-xl backdrop-blur">
                <Globe className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Tribhuvan University</h1>
                <p className="text-indigo-100 text-sm font-medium">Digital Transformation 2023-2027</p>
              </div>
            </div>
            <button className="md:hidden p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className={`${mobileMenuOpen ? 'block' : 'hidden'} md:block bg-white shadow-lg border-b border-gray-200`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {components.map((comp) => {
              const Icon = comp.icon;
              return (
                <button
                  key={comp.id}
                  onClick={() => {
                    setActiveComponent(comp.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex flex-col items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
                    activeComponent === comp.id
                      ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-xs font-semibold text-center">{comp.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-900 to-slate-800 text-gray-300 mt-20 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm">TU Digitalization Strategy Plan © 2023-2027 | Planning Division, Kirtipur</p>
        </div>
      </footer>
    </div>
  );
}

function OverviewSection() {
  const goals = [
    { title: 'Vision', desc: 'Create a digitally integrated ecosystem', icon: Target, color: 'from-blue-500 to-cyan-500' },
    { title: 'Mission', desc: 'Enhance academic and administrative processes', icon: Zap, color: 'from-purple-500 to-pink-500' },
    { title: 'Impact', desc: 'Prepare students for digital age challenges', icon: CheckCircle, color: 'from-green-500 to-emerald-500' },
  ];

  const strategies = [
    { title: 'Connectivity', desc: 'Internet & Infrastructure', icon: Wifi, color: 'from-blue-500 to-cyan-500' },
    { title: 'Learning Mgmt', desc: 'LMS & Virtual Learning', icon: BookOpen, color: 'from-purple-500 to-pink-500' },
    { title: 'EMIS & Automation', desc: 'E-governance Solutions', icon: Server, color: 'from-green-500 to-teal-500' },
    { title: 'Digital Resources', desc: 'Interactive Materials', icon: Database, color: 'from-orange-500 to-red-500' },
    { title: 'Capacity Dev', desc: 'Digital Literacy Programs', icon: Brain, color: 'from-indigo-500 to-purple-500' },
    { title: 'Policy & Guidelines', desc: 'Implementation Framework', icon: Shield, color: 'from-yellow-500 to-orange-500' },
  ];

  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-4xl font-bold text-gray-900 mb-8">Strategic Vision</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {goals.map((goal, idx) => {
            const Icon = goal.icon;
            return (
              <div key={idx} className="group">
                <div className={`bg-gradient-to-br ${goal.color} p-8 rounded-2xl text-white h-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white bg-opacity-20 rounded-xl group-hover:scale-110 transition-transform">
                      <Icon size={32} />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2">{goal.title}</h3>
                      <p className="text-white text-opacity-90">{goal.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="text-4xl font-bold text-gray-900 mb-8">Six Strategic Components</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {strategies.map((strategy, idx) => {
            const Icon = strategy.icon;
            return (
              <div key={idx} className="group">
                <div className={`bg-gradient-to-br ${strategy.color} rounded-2xl p-8 text-white h-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden relative`}>
                  <div className="absolute top-0 right-0 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Icon size={120} className="translate-x-8 -translate-y-8" />
                  </div>
                  <div className="relative z-10">
                    <Icon className="mb-4 group-hover:scale-110 transition-transform" size={32} />
                    <h3 className="font-bold text-xl mb-2">{strategy.title}</h3>
                    <p className="text-white text-opacity-90 text-sm">{strategy.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white rounded-2xl p-12 shadow-xl">
        <h2 className="text-3xl font-bold mb-8">Implementation Timeline</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {['2023', '2024', '2025', '2026', '2027'].map((year) => (
            <div key={year} className="group">
              <div className="bg-white bg-opacity-20 backdrop-blur hover:bg-opacity-30 rounded-xl p-6 font-bold text-xl text-center transition-all group-hover:scale-105">
                {year}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function ConnectivitySection() {
  const objectives = [
    { icon: Wifi, text: 'Reliable internet across all campuses' },
    { icon: Server, text: 'Upgrade data centers and infrastructure' },
    { icon: Radio, text: 'Secure Wi-Fi zones at all institutes' },
    { icon: Layers, text: 'Campus-wide intranet services' }
  ];

  const targets = [
    { goal: '100%', desc: 'Broadband Connectivity', icon: Wifi, color: 'from-blue-500 to-cyan-500' },
    { goal: '80%', desc: 'Wi-Fi Coverage', icon: Radio, color: 'from-indigo-500 to-purple-500' },
    { goal: '50%', desc: 'LAN Connected', icon: Layers, color: 'from-purple-500 to-pink-500' },
    { goal: '10%', desc: 'Cloud Migration', icon: Globe, color: 'from-green-500 to-emerald-500' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-bold text-gray-900 mb-2">Connectivity & Infrastructure</h2>
        <p className="text-gray-600 text-lg mb-8">Building robust digital infrastructure across the university</p>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Objectives</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {objectives.map((obj, idx) => {
            const Icon = obj.icon;
            return (
              <div key={idx} className="flex items-center gap-3 p-4 bg-white rounded-xl border-2 border-blue-100 hover:border-blue-400 hover:shadow-lg transition">
                <div className="p-2 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex-shrink-0">
                  <Icon className="text-blue-600" size={20} />
                </div>
                <span className="text-gray-700 font-medium text-sm">{obj.text}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">5-Year Targets</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {targets.map((target, idx) => {
            const Icon = target.icon;
            return (
              <div key={idx} className={`bg-gradient-to-br ${target.color} text-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2`}>
                <Icon className="mb-4 opacity-80" size={36} />
                <div className="text-4xl font-bold mb-2">{target.goal}</div>
                <p className="font-semibold opacity-90">{target.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function LMSSection() {
  const features = [
    { icon: BookOpen, text: 'Course Management' },
    { icon: Users, text: 'Collaboration Tools' },
    { icon: BarChart3, text: 'Assessment & Grading' },
    { icon: Video, text: 'Multimedia Integration' },
    { icon: TrendingUp, text: 'Performance Analytics' },
    { icon: Monitor, text: 'Interactive Content' }
  ];

  const programs = [
    { name: 'Centralized LMS', status: 'Short-term', icon: BookOpen, color: 'from-purple-500 to-pink-500', desc: 'Central hosting at university' },
    { name: 'Self-paced Learning (MOOC)', status: 'Mid-term', icon: Globe, color: 'from-blue-500 to-cyan-500', desc: 'Flexible learning platform' },
    { name: 'Video Conference System', status: 'Short-term', icon: Video, color: 'from-indigo-500 to-purple-500', desc: 'MS Teams integration' },
    { name: 'Virtual Lab Access', status: 'Mid-term', icon: Cpu, color: 'from-green-500 to-emerald-500', desc: 'Cloud-based labs' }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-bold text-gray-900 mb-2">Learning Management System</h2>
        <p className="text-gray-600 text-lg mb-8">Comprehensive platform for digital learning and course delivery</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Platform Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="flex items-center gap-3 p-4 bg-white border-2 border-purple-100 rounded-xl hover:border-purple-400 hover:shadow-lg transition">
                <div className="p-2 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex-shrink-0">
                  <Icon className="text-purple-600" size={20} />
                </div>
                <span className="text-gray-700 font-medium text-sm">{feature.text}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Implementation Programs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {programs.map((prog, idx) => {
            const Icon = prog.icon;
            return (
              <div key={idx} className={`bg-gradient-to-br ${prog.color} text-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2`}>
                <div className="flex items-start justify-between mb-4">
                  <Icon size={32} className="opacity-80" />
                  <span className="text-xs font-bold bg-white bg-opacity-20 px-3 py-1 rounded-full">{prog.status}</span>
                </div>
                <h4 className="font-bold text-xl mb-2">{prog.name}</h4>
                <p className="text-white text-opacity-90">{prog.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function EMISSection() {
  const systems = [
    { name: 'University ERP', icon: Server, desc: 'Central automation for office processes', color: 'from-blue-500 to-cyan-500' },
    { name: 'Personnel System', icon: Users, desc: 'HR data management', color: 'from-purple-500 to-pink-500' },
    { name: 'Financial Mgmt', icon: BarChart3, desc: 'Integrated financial system', color: 'from-green-500 to-emerald-500' },
    { name: 'GIS Planning', icon: Globe, desc: 'Geographic monitoring', color: 'from-orange-500 to-red-500' },
    { name: 'Exam Management', icon: Award, desc: 'Scheduling and grading', color: 'from-indigo-500 to-purple-500' },
    { name: 'Campus ERP', icon: Layers, desc: 'Resource planning', color: 'from-yellow-500 to-orange-500' }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-bold text-gray-900 mb-2">EMIS & Automation</h2>
        <p className="text-gray-600 text-lg">Comprehensive system for data management and decision-making</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {systems.map((sys, idx) => {
          const Icon = sys.icon;
          return (
            <div key={idx} className={`bg-gradient-to-br ${sys.color} text-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2`}>
              <Icon className="mb-4 opacity-80" size={32} />
              <h4 className="font-bold text-xl mb-2">{sys.name}</h4>
              <p className="text-white text-opacity-90">{sys.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <CheckCircle size={28} /> Expected Outcomes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-center gap-3 bg-white bg-opacity-10 px-4 py-3 rounded-lg">
            <CheckCircle className="flex-shrink-0" size={18} />
            <span className="text-sm font-medium">Streamlined processes</span>
          </div>
          <div className="flex items-center gap-3 bg-white bg-opacity-10 px-4 py-3 rounded-lg">
            <CheckCircle className="flex-shrink-0" size={18} />
            <span className="text-sm font-medium">Improved data management</span>
          </div>
          <div className="flex items-center gap-3 bg-white bg-opacity-10 px-4 py-3 rounded-lg">
            <CheckCircle className="flex-shrink-0" size={18} />
            <span className="text-sm font-medium">Enhanced efficiency</span>
          </div>
          <div className="flex items-center gap-3 bg-white bg-opacity-10 px-4 py-3 rounded-lg">
            <CheckCircle className="flex-shrink-0" size={18} />
            <span className="text-sm font-medium">Better integration</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResourcesSection() {
  const resources = [
    { title: 'Interactive Materials', target: '50%', icon: BookOpen, color: 'from-blue-500 to-cyan-500' },
    { title: 'Digital Studios', target: '50', icon: Video, color: 'from-purple-500 to-pink-500' },
    { title: 'Database Access', target: '40%', icon: Database, color: 'from-indigo-500 to-purple-500' },
    { title: 'Anti-plagiarism', target: '100%', icon: Shield, color: 'from-green-500 to-emerald-500' },
    { title: 'Digital Library', target: '100%', icon: BookOpen, color: 'from-orange-500 to-red-500' },
    { title: 'OER Resources', target: '100%', icon: Lightbulb, color: 'from-yellow-500 to-orange-500' }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-bold text-gray-900 mb-2">Digital Learning Resources</h2>
        <p className="text-gray-600 text-lg">Creating interactive and engaging online materials</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((res, idx) => {
          const Icon = res.icon;
          return (
            <div key={idx} className={`bg-gradient-to-br ${res.color} text-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2`}>
              <Icon className="mb-4 opacity-80" size={32} />
              <h4 className="font-bold text-xl mb-2">{res.title}</h4>
              <p className="text-4xl font-bold opacity-90">{res.target}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border-2 border-orange-200 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Lightbulb className="text-orange-600" size={28} /> Key Initiatives
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <Video className="text-orange-600" size={24} />
              <h4 className="font-bold text-gray-900">Regional Visual Studio</h4>
            </div>
            <p className="text-gray-700 text-sm">State-of-the-art facility for cutting-edge digital materials</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <Lock className="text-orange-600" size={24} />
              <h4 className="font-bold text-gray-900">Cost-Sharing Model</h4>
            </div>
            <p className="text-gray-700 text-sm">Affordable e-Resources with plagiarism detection</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <Globe className="text-orange-600" size={24} />
              <h4 className="font-bold text-gray-900">OER Support</h4>
            </div>
            <p className="text-gray-700 text-sm">Supporting Open Educational Resources adoption</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CapacitySection() {
  const programs = [
    { title: 'Digital Literacy', target: '100% Teaching Staff', icon: BookOpen, color: 'from-blue-500 to-cyan-500' },
    { title: 'Non-Teaching Literacy', target: '80% Staff', icon: Users, color: 'from-purple-500 to-pink-500' },
    { title: 'Digital Pedagogy', target: '50% Teachers', icon: Brain, color: 'from-indigo-500 to-purple-500' },
    { title: 'Technical Skills', target: '100% IT Staff', icon: Cpu, color: 'from-green-500 to-emerald-500' }
  ];

  const components = [
    { name: 'Digital Literacy', icon: Lightbulb, desc: 'Foundational skills for using digital tools' },
    { name: 'Digital Pedagogy', icon: BookOpen, desc: 'Integrating technology into teaching' },
    { name: 'Technical Support', icon: Cpu, desc: 'Advanced skills for IT professionals' },
    { name: 'Experience Sharing', icon: Users, desc: 'Workshops and collaborative learning' }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-bold text-gray-900 mb-2">Capacity Development</h2>
        <p className="text-gray-600 text-lg">Enhancing digital skills through comprehensive training programs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {programs.map((prog, idx) => {
          const Icon = prog.icon;
          return (
            <div key={idx} className={`bg-gradient-to-br ${prog.color} text-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2`}>
              <Icon className="mb-4 opacity-80" size={32} />
              <h4 className="font-bold text-xl mb-3">{prog.title}</h4>
              <p className="text-lg font-semibold opacity-90">{prog.target}</p>
            </div>
          );
        })}
      </div>

      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Training Components</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {components.map((comp, idx) => {
            const Icon = comp.icon;
            return (
              <div key={idx} className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition border-l-4 border-indigo-600">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex-shrink-0 mt-1">
                    <Icon className="text-indigo-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm mb-1">{comp.name}</h4>
                    <p className="text-gray-600 text-xs">{comp.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}