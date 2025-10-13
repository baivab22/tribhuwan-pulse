import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Crown, Target, GraduationCap, Users, Lightbulb } from 'lucide-react';

const DirectorMessage = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      {/* Floating Icons */}
      <div className="absolute top-20 left-10 opacity-20 animate-float">
        <Crown className="w-8 h-8 text-yellow-400" />
      </div>
      <div className="absolute top-40 right-20 opacity-20 animate-float delay-500">
        <Target className="w-6 h-6 text-blue-400" />
      </div>
      <div className="absolute bottom-40 left-20 opacity-20 animate-float delay-1000">
        <GraduationCap className="w-7 h-7 text-green-400" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-20 animate-float delay-1500">
        <Users className="w-6 h-6 text-pink-400" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-20">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 rounded-full border border-white/10 mb-6">
            <Lightbulb className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-semibold text-white/80">Director's Vision</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Message From
            <span className="block bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">
              The Director
            </span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-pink-400 mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Welcome Card */}
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-8 hover:border-white/20 transition-all duration-500">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-yellow-400/10 rounded-2xl border border-yellow-400/20">
                  <Quote className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Welcome to the Planning Directorate
                  </h2>
                  <p className="text-lg text-white/60">
                    Tribhuvan University
                  </p>
                </div>
              </div>
              
              <div className="space-y-6 text-white/80 leading-relaxed">
                <p className="text-lg">
                  It is my honor to welcome you to the Planning Directorate of Tribhuvan University, 
                  the guiding arm of Nepal's largest and most prestigious academic institution.
                </p>
                
                <p>
                  At the heart of our mission lies a commitment to strategic growth, innovation, 
                  and excellence, as we steer the university toward achieving its{' '}
                  <span className="text-yellow-400 font-semibold">Vision 2030</span>.
                </p>
              </div>
            </div>

            {/* Mission Highlights */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-4 text-center hover:border-blue-400/30 transition-all duration-300">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-blue-400" />
                </div>
                <p className="text-sm text-white/70">Strategic Vision</p>
              </div>
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-4 text-center hover:border-green-400/30 transition-all duration-300">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <GraduationCap className="w-6 h-6 text-green-400" />
                </div>
                <p className="text-sm text-white/70">Academic Excellence</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Role Description */}
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-lg rounded-3xl border border-purple-500/20 p-8">
              <h3 className="text-xl font-bold text-white mb-4">Our Pivotal Role</h3>
              <div className="space-y-4 text-white/80">
                <p>
                  Our role is pivotal in shaping TU's future—driving academic reforms, 
                  advancing digital transformation, enhancing infrastructure, and ensuring 
                  quality education that meets global standards.
                </p>
                
                <p>
                  By fostering collaboration and embracing innovation, we are committed to 
                  creating a resilient and dynamic academic environment that empowers students, 
                  faculty, and researchers alike.
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-6">
              <p className="text-lg text-white text-center mb-4">
                <span className="text-yellow-400 font-semibold">Together,</span> let us take this transformative journey
              </p>
              <p className="text-white/70 text-center text-sm">
                To shape a globally renowned institution that upholds the values of knowledge, 
                inclusivity, and progress.
              </p>
            </div>

            {/* Director Signature */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center pt-8 border-t border-white/10"
            >
              <div className="mb-4">
                <h4 className="text-2xl font-bold text-white mb-1">
                  Laxmi Kanta Sharma, PhD
                </h4>
                <p className="text-white/60 text-sm">
                  Director, Planning Directorate
                </p>
                <p className="text-white/40 text-sm">
                  Tribhuvan University
                </p>
              </div>
              
              {/* Signature Line */}
              <div className="inline-block">
                <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mb-2" />
                <div className="text-xs text-white/40 italic">Director's Signature</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Vision 2030 Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-8 right-8"
        >
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-slate-900 px-6 py-3 rounded-full font-bold text-sm shadow-2xl shadow-yellow-400/25">
            Vision 2030
          </div>
        </motion.div>
      </div>

      {/* Animated background dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/10 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default DirectorMessage;