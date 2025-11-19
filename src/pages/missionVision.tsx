import React, { useState } from 'react';
import { Target, Eye, Lightbulb, TrendingUp, Globe, BookOpen, Users, Award, GraduationCap, Building2, Sparkles } from 'lucide-react';

  export const goals = [
    { 
      period: "Short-term", 
      focus: "Infrastructure & Systems",
      timeline: "2025-2027",
      items: ["Digital infrastructure", "Quality frameworks", "Faculty training"]
    },
    { 
      period: "Medium-term", 
      focus: "Quality Enhancement",
      timeline: "2027-2029",
      items: ["Curriculum reform", "Research output", "International partnerships"]
    },
    { 
      period: "Long-term", 
      focus: "Global Excellence",
      timeline: "2029-2030",
      items: ["Top 500 ranking", "Innovation hub", "Sustainable growth"]
    }
  ];

    export const visionPoints = [
    {
      icon: Globe,
      title: "Global Recognition",
      description: "Transform TU into a credible, globally recognized institution achieving high international rankings through excellence in teaching, research, and innovation.",
      detail: "We aspire to position Tribhuvan University among the top universities in Asia, fostering international collaborations and creating a vibrant multicultural academic environment that attracts students and faculty from around the world."
    },
    {
      icon: BookOpen,
      title: "Quality Education",
      description: "Provide affordable, quality education with broad access and diversity for all students, ensuring equitable opportunities for learners from all backgrounds.",
      detail: "Our commitment is to maintain accessibility while elevating academic standards, implementing modern pedagogical approaches, and developing programs that meet international quality benchmarks while remaining affordable and inclusive."
    },
    {
      icon: TrendingUp,
      title: "Research Excellence",
      description: "Foster cutting-edge research and innovation to contribute to national and global development through impactful scholarly work.",
      detail: "We aim to establish world-class research centers, encourage interdisciplinary collaboration, and create an ecosystem that supports innovation, entrepreneurship, and knowledge creation that addresses real-world challenges."
    }
  ];

export default function TUVision2030() {
  const [activeTab, setActiveTab] = useState('vision');



  const missionPoints = [
    {
      icon: Users,
      title: "Structural Transformation",
      description: "Restructure into a central university with autonomous schools and campuses for enhanced governance, accountability, and operational efficiency.",
      detail: "This transformation involves decentralizing decision-making, empowering constituent campuses, establishing specialized schools, and creating a more agile administrative structure that responds quickly to academic and societal needs."
    },
    {
      icon: Award,
      title: "Academic Excellence",
      description: "Enhance quality through comprehensive curriculum updates, adaptive pedagogy, state-of-the-art facilities, and continuous faculty development.",
      detail: "We're committed to revising curricula to meet industry demands, integrating technology in teaching, upgrading laboratories and libraries, and providing ongoing professional development opportunities for our academic staff."
    },
    {
      icon: Lightbulb,
      title: "Innovation & Systems",
      description: "Implement efficient examination systems, modern infrastructure, digital transformation, and quality assurance mechanisms for 21st-century learning.",
      detail: "This includes transitioning to online examination systems, developing smart classrooms, establishing robust quality assurance frameworks, and creating digital learning platforms that enhance student experience and outcomes."
    }
  ];

  const challenges = [
    { text: "Over 300,000 students across 1000+ campuses", impact: "Coordination complexity" },
    { text: "Organizational complexity and quality assurance", impact: "Standards variation" },
    { text: "Program relevance and examination inefficiencies", impact: "Graduate employability" },
    { text: "Outdated pedagogy and limited resources", impact: "Learning outcomes" }
  ];



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-blue-900 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)'
        }}></div>
        
        {/* Decorative Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }}></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Logo and Title */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
                {/* TU Logo Placeholder */}
                <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-2xl">
                  <GraduationCap className="w-16 h-16 text-blue-900" />
                </div>
                <div>
                  <div className="inline-block mb-2 px-4 py-1 bg-white bg-opacity-20 rounded-full backdrop-blur-sm">
                    <span className="text-sm font-semibold">Established 1959</span>
                  </div>
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Tribhuvan University
              </h1>
              <p className="text-2xl md:text-3xl font-light mb-4 text-blue-200">Vision 2030</p>
              <p className="text-lg text-blue-100 max-w-2xl">
                Transforming Nepal's oldest and largest university into a globally recognized center of academic excellence, innovation, and research
              </p>
            </div>
            
            {/* Hero Image */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-400 rounded-3xl blur-2xl opacity-30"></div>
                <div className="relative bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-8 border border-white border-opacity-20 shadow-2xl">
                  <Building2 className="w-full h-48 text-white opacity-80" />
                  <div className="mt-4 text-center">
                    <p className="text-sm text-blue-100">Campus Network Across Nepal</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">500K+</div>
              <div className="text-sm text-gray-600">Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-1">1000+</div>
              <div className="text-sm text-gray-600">Campuses</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">65+</div>
              <div className="text-sm text-gray-600">Years Legacy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600 mb-1">2030</div>
              <div className="text-sm text-gray-600">Vision Target</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="bg-white rounded-2xl shadow-xl p-2 flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => setActiveTab('vision')}
            className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === 'vision'
                ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Eye className="inline-block mr-2 h-5 w-5" />
            Vision
          </button>
          <button
            onClick={() => setActiveTab('mission')}
            className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === 'mission'
                ? 'bg-indigo-600 text-white shadow-lg transform scale-105'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Target className="inline-block mr-2 h-5 w-5" />
            Mission
          </button>
          <button
            onClick={() => setActiveTab('challenges')}
            className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === 'challenges'
                ? 'bg-purple-600 text-white shadow-lg transform scale-105'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Lightbulb className="inline-block mr-2 h-5 w-5" />
            Strategy
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        {activeTab === 'vision' && (
          <div className="space-y-12">
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
        )}

        {activeTab === 'mission' && (
          <div className="space-y-12">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-4">
                <Target className="w-4 h-4" />
                <span className="font-semibold">Our Mission</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Three Pillars of Transformation</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Strategic initiatives driving comprehensive reform across governance, academics, and innovation
              </p>
            </div>
            
            <div className="space-y-8">
              {missionPoints.map((point, idx) => (
                <div
                  key={idx}
                  className="group bg-white rounded-3xl p-8 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-blue-100 hover:border-purple-200"
                >
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="absolute inset-0 bg-purple-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
                        <div className="relative w-20 h-20 bg-purple-600 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                          <point.icon className="h-10 w-10 text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <h3 className="text-3xl font-bold text-gray-900">{point.title}</h3>
                        <div className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-semibold rounded-full">
                          Pillar {idx + 1}
                        </div>
                      </div>
                      <p className="text-lg text-gray-700 leading-relaxed mb-4">{point.description}</p>
                      <div className="bg-white bg-opacity-60 rounded-xl p-4 backdrop-blur-sm">
                        <p className="text-gray-600 leading-relaxed">{point.detail}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'challenges' && (
          <div className="space-y-12">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full mb-4">
                <Lightbulb className="w-4 h-4" />
                <span className="font-semibold">Strategic Roadmap</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">From Challenges to Excellence</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Addressing current challenges with actionable goals and a timeline-driven transformation strategy
              </p>
            </div>

            {/* Challenges */}
            <div className="bg-red-50 rounded-3xl p-8 md:p-10 shadow-xl border-2 border-red-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">Key Challenges</h3>
                  <p className="text-gray-600">Areas requiring immediate attention and strategic intervention</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {challenges.map((challenge, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mt-1">
                        <span className="text-red-600 font-bold text-sm">{idx + 1}</span>
                      </div>
                      <div>
                        <p className="text-gray-800 font-medium mb-2">{challenge.text}</p>
                        <div className="inline-block px-3 py-1 bg-red-50 text-red-600 text-xs font-semibold rounded-full">
                          Impact: {challenge.impact}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Goals Timeline */}
            <div className="bg-indigo-600 rounded-3xl p-8 md:p-10 shadow-2xl text-white">
              <h3 className="text-3xl font-bold mb-3 text-center">Implementation Timeline</h3>
              <p className="text-center text-blue-100 mb-8">Phased approach to achieving Vision 2030 goals</p>
              <div className="grid md:grid-cols-3 gap-6">
                {goals.map((goal, idx) => (
                  <div key={idx} className="bg-white bg-opacity-20 backdrop-blur-md rounded-2xl p-6 hover:bg-opacity-30 transition-all hover:transform hover:-translate-y-2 border border-white border-opacity-30">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl font-bold">{idx + 1}</div>
                      <div className="px-3 py-1 bg-white bg-opacity-30 rounded-full text-sm font-semibold">
                        {goal.timeline}
                      </div>
                    </div>
                    <h4 className="text-2xl font-bold mb-2">{goal.period}</h4>
                    <p className="text-blue-100 mb-4 text-lg">{goal.focus}</p>
                    <ul className="space-y-2">
                      {goal.items.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Expected Outcomes */}
            <div className="bg-green-50 rounded-3xl p-8 md:p-10 shadow-xl border-2 border-green-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">Expected Outcomes</h3>
                  <p className="text-gray-600">Transformative results by 2030</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h4 className="font-bold text-lg text-gray-900 mb-2">Academic Excellence</h4>
                  <p className="text-gray-600">Internationally accredited programs with enhanced employability and research output</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h4 className="font-bold text-lg text-gray-900 mb-2">Global Ranking</h4>
                  <p className="text-gray-600">Position among top 500 universities worldwide with strong regional presence</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h4 className="font-bold text-lg text-gray-900 mb-2">Infrastructure</h4>
                  <p className="text-gray-600">State-of-the-art facilities, digital platforms, and sustainable campus development</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h4 className="font-bold text-lg text-gray-900 mb-2">Innovation Hub</h4>
                  <p className="text-gray-600">Thriving ecosystem for research, entrepreneurship, and industry collaboration</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4">Join Our Transformation Journey</h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
              Together, we're building a future where Tribhuvan University stands among the world's finest institutions, leading innovation and excellence in higher education
            </p>
            <button className="bg-white text-gray-900 px-10 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-all shadow-2xl hover:shadow-3xl hover:transform hover:scale-105">
              Learn More About Vision 2030
            </button>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
            <p>© 2025 Tribhuvan University. Established 1959 | Nepal's Premier Educational Institution</p>
          </div>
        </div>
      </div>
    </div>
  );
}