import React from 'react';
import { motion } from 'framer-motion';
import { User, Users, Building, Zap, Shield, BarChart3 } from 'lucide-react';

interface UserTypeDetectorProps {
  onUserTypeSelect: (type: 'solo' | 'startup' | 'enterprise') => void;
}

const UserTypeDetector: React.FC<UserTypeDetectorProps> = ({ onUserTypeSelect }) => {
  const userTypes = [
    {
      type: 'solo' as const,
      title: 'Solo Developer',
      description: 'Quick-start wizard, minimal configuration',
      icon: User,
      features: ['Instant deployment', 'Simple templates', 'Basic monitoring', 'Community support'],
      gradient: 'from-violet-500 to-purple-600',
      popular: false
    },
    {
      type: 'startup' as const,
      title: 'Startup Team',
      description: 'Team collaboration features, project templates',
      icon: Users,
      features: ['Team collaboration', 'Advanced templates', 'Real-time monitoring', 'Priority support'],
      gradient: 'from-pink-500 to-violet-600',
      popular: true
    },
    {
      type: 'enterprise' as const,
      title: 'Enterprise',
      description: 'Advanced security, compliance settings, audit logs',
      icon: Building,
      features: ['Enterprise security', 'Compliance tools', 'Audit logs', 'Dedicated support'],
      gradient: 'from-violet-600 to-indigo-700',
      popular: false
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-violet-200 to-pink-200 bg-clip-text text-transparent mb-4"
        >
          Choose Your Development Style
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-gray-300 max-w-2xl mx-auto"
        >
          We'll customize the interface and features based on your needs
        </motion.p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {userTypes.map((userType, index) => (
          <motion.div
            key={userType.type}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative group cursor-pointer"
            onClick={() => onUserTypeSelect(userType.type)}
          >
            {userType.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                <div className="bg-button-gradient text-white text-xs font-medium px-3 py-1 rounded-full">
                  Most Popular
                </div>
              </div>
            )}
            
            <div className={`relative h-full bg-dark-900/50 border-2 border-violet-500/20 rounded-2xl p-8 transition-all duration-300 group-hover:border-pink-500/40 group-hover:shadow-2xl group-hover:shadow-violet-500/20 overflow-hidden`}>
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${userType.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${userType.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <userType.icon className="w-8 h-8 text-white" />
                </div>

                {/* Title and Description */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-300 group-hover:to-pink-300 transition-all duration-300">
                  {userType.title}
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {userType.description}
                </p>

                {/* Features */}
                <div className="space-y-3">
                  {userType.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <div className={`w-2 h-2 bg-gradient-to-r ${userType.gradient} rounded-full`}></div>
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.button
                  className={`w-full mt-8 py-3 px-6 bg-gradient-to-r ${userType.gradient} text-white font-medium rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:shadow-lg`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Started
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-center"
      >
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="flex flex-col items-center space-y-3">
            <div className="w-12 h-12 bg-violet-900/30 rounded-full flex items-center justify-center">
              <Zap className="w-6 h-6 text-violet-400" />
            </div>
            <h4 className="font-semibold text-white">Lightning Fast</h4>
            <p className="text-sm text-gray-400 text-center">Generate complete backends in minutes, not weeks</p>
          </div>
          <div className="flex flex-col items-center space-y-3">
            <div className="w-12 h-12 bg-pink-900/30 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-pink-400" />
            </div>
            <h4 className="font-semibold text-white">Enterprise Security</h4>
            <p className="text-sm text-gray-400 text-center">Built-in security best practices and compliance</p>
          </div>
          <div className="flex flex-col items-center space-y-3">
            <div className="w-12 h-12 bg-violet-900/30 rounded-full flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-violet-400" />
            </div>
            <h4 className="font-semibold text-white">Scalable Architecture</h4>
            <p className="text-sm text-gray-400 text-center">Automatically scales with your application growth</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserTypeDetector;