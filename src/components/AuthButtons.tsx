import React from 'react';
import { motion } from 'framer-motion';
import { Github, Mail } from 'lucide-react';

const AuthButtons: React.FC = () => {
  const authProviders = [
    {
      name: 'Google',
      icon: '🔍',
      gradient: 'from-violet-600 via-pink-500 to-violet-600',
      hoverEffect: 'hover:shadow-violet-500/25'
    },
    {
      name: 'GitHub',
      icon: Github,
      gradient: 'from-gray-800 via-violet-700 to-gray-800',
      hoverEffect: 'hover:shadow-pink-500/25'
    },
    {
      name: 'Email',
      icon: Mail,
      gradient: 'from-pink-600 via-violet-500 to-pink-600',
      hoverEffect: 'hover:shadow-violet-500/25'
    }
  ];

  return (
    <motion.div
      className="w-full max-w-md mx-auto space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold bg-gradient-to-r from-white via-violet-200 to-pink-200 bg-clip-text text-transparent mb-2">
          Ready to build your backend?
        </h3>
        <p className="text-gray-300 text-sm">
          Sign in to save your projects and access advanced features
        </p>
      </div>

      <div className="space-y-3">
        {authProviders.map((provider, index) => (
          <motion.button
            key={provider.name}
            className={`w-full flex items-center justify-center space-x-3 p-4 rounded-xl bg-gradient-to-r ${provider.gradient} text-white font-medium transition-all duration-300 hover:scale-105 ${provider.hoverEffect} hover:shadow-lg relative overflow-hidden group`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center space-x-3">
              {typeof provider.icon === 'string' ? (
                <span className="text-xl">{provider.icon}</span>
              ) : (
                <provider.icon className="w-5 h-5" />
              )}
              <span>Continue with {provider.name}</span>
            </div>
          </motion.button>
        ))}
      </div>

      <div className="text-center mt-6">
        <p className="text-xs text-gray-400">
          By signing in, you agree to our{' '}
          <a href="#" className="text-violet-400 hover:text-pink-400 transition-colors duration-200">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-pink-400 hover:text-violet-400 transition-colors duration-200">
            Privacy Policy
          </a>
        </p>
      </div>
    </motion.div>
  );
};

export default AuthButtons;
