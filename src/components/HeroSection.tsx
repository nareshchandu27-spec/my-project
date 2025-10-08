import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ModernPromptInput from './ModernPromptInput';
import { Sparkles, Zap, Shield, Code, Database, Cloud, GitBranch, Users, Clock, DollarSign } from 'lucide-react';

interface HeroSectionProps {
  onGenerate: (prompt: string, options: any) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onGenerate }) => {
  const [stats] = useState([
    { label: 'Backends Generated', value: '12,847', icon: Database },
    { label: 'Time Saved', value: '2.3M hrs', icon: Clock },
    { label: 'Developers', value: '8,429', icon: Users },
    { label: 'Cost Reduced', value: '89%', icon: DollarSign }
  ]);

  const features = [
    {
      icon: Sparkles,
      title: 'AI-Powered Generation',
      description: 'Describe your backend in plain English and watch it come to life'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Complete backend in under 5 minutes, not weeks'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Built-in security best practices and compliance'
    },
    {
      icon: Code,
      title: 'Production Ready',
      description: 'Clean, scalable code that follows industry standards'
    }
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-20">
      <div className="max-w-7xl mx-auto w-full">
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-violet-900/20 border border-violet-500/30 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span className="text-sm text-violet-300 font-medium">World's First AI Backend Generator</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-violet-200 to-pink-200 bg-clip-text text-transparent">
              Backend in
            </span>
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-violet-400 bg-clip-text text-transparent animate-gradient-x">
              Minutes, Not Months
            </span>
          </h1>
          
          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Generate complete backends with databases, APIs, authentication, and deployment pipelines from a single prompt.
            <span className="block mt-2 bg-gradient-to-r from-violet-300 to-pink-300 bg-clip-text text-transparent">
              The future of backend development is here.
            </span>
          </motion.p>
        </motion.div>

        {/* Modern Prompt Input */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <ModernPromptInput onGenerate={onGenerate} />
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 rounded-xl bg-dark-900/30 border border-violet-500/20 backdrop-blur-sm hover:border-pink-500/30 transition-all duration-300"
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: 'rgba(139, 92, 246, 0.15)',
                borderColor: 'rgba(236, 72, 153, 0.4)'
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-xl bg-dark-900/30 border border-violet-500/20 backdrop-blur-sm hover:border-pink-500/30 transition-all duration-300 group"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: 'rgba(139, 92, 246, 0.1)'
              }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-300 group-hover:to-pink-300 transition-all duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-16 text-center"
        >
          <div className="flex items-center justify-center space-x-8 text-gray-400">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-sm">SOC 2 Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Cloud className="w-4 h-4 text-blue-400" />
              <span className="text-sm">99.9% Uptime</span>
            </div>
            <div className="flex items-center space-x-2">
              <GitBranch className="w-4 h-4 text-violet-400" />
              <span className="text-sm">Git Integration</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm">Auto-scaling</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;