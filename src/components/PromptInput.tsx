import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, FileText, Github, Database, Zap, Archive, Globe, Lock, Sparkles, Upload, Plus } from 'lucide-react';

const PromptInput: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [currentSuggestion, setCurrentSuggestion] = useState(0);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const suggestions = [
    'a REST API for an e-commerce app',
    'a GraphQL API for a blog platform',
    'a scalable authentication system',
    'a CI/CD pipeline with Docker',
    'a task manager backend with real-time updates',
    'a microservices architecture',
    'a serverless function setup',
    'a database schema for a social media app'
  ];

  const quickActions = [
    { label: 'Generate REST API', icon: Globe, gradient: 'from-violet-500 to-pink-500' },
    { label: 'Database Schema', icon: Database, gradient: 'from-pink-500 to-violet-500' },
    { label: 'Auth System', icon: Lock, gradient: 'from-violet-600 to-pink-400' },
    { label: 'CI/CD Setup', icon: FileText, gradient: 'from-pink-600 to-violet-400' },
    { label: 'Surprise Me 🚀', icon: Sparkles, gradient: 'from-violet-500 via-pink-500 to-violet-500' }
  ];

  const bottomIcons = [
    { icon: Archive, label: 'Upload Zip', action: () => {} },
    { icon: Zap, label: 'Enhance Prompt', action: () => {} },
    { icon: Github, label: 'Connect to GitHub', action: () => {} }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSuggestion((prev) => (prev + 1) % suggestions.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [suggestions.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      console.log('Generating backend:', inputValue);
    }
  };

  const handleQuickAction = (action: string) => {
    setInputValue(`Build me ${action.toLowerCase()}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Main Input Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className={`relative group transition-all duration-300 ${
          isInputFocused 
            ? 'transform scale-[1.02] shadow-2xl shadow-violet-500/25' 
            : 'hover:transform hover:scale-[1.01] hover:shadow-xl hover:shadow-pink-500/15'
        }`}>
          {/* Animated border gradient */}
          <div className="absolute -inset-1 bg-violet-pink rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300 animate-gradient-x"></div>
          
          <div className="relative bg-dark-950/90 backdrop-blur-sm border border-violet-500/30 rounded-2xl p-6 hover:border-pink-500/30 transition-all duration-300">
            {/* Main Input Area */}
            <div className="relative mb-6">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                className="w-full bg-transparent text-white text-lg placeholder-gray-400 outline-none resize-none min-h-[80px] leading-relaxed"
                rows={3}
              />
              
              {/* Animated placeholder for rotating suggestions */}
              {!inputValue && (
                <div className="absolute top-8 left-0 pointer-events-none">
                  <span className="text-lg text-gray-400">Build me </span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentSuggestion}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="text-lg bg-violet-pink bg-clip-text text-transparent"
                    >
                      {suggestions[currentSuggestion]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Bottom Row */}
            <div className="flex items-center justify-between">
              {/* Left Icons */}
              <div className="flex items-center space-x-3">
                {bottomIcons.map((item, index) => (
                  <motion.button
                    key={index}
                    type="button"
                    onClick={item.action}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-violet-900/30 border border-violet-500/30 hover:border-pink-500/30 hover:bg-pink-900/20 transition-all duration-200 group/icon backdrop-blur-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title={item.label}
                  >
                    <item.icon className="w-4 h-4 text-violet-300 group-hover/icon:text-pink-300 transition-colors duration-200" />
                    <span className="text-sm text-violet-300 group-hover/icon:text-pink-300 transition-colors duration-200">
                      {item.label}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Right Side - Public/Private and Generate Button */}
              <div className="flex items-center space-x-3">
                {/* Public/Private Button */}
                <motion.button
                  type="button"
                  onClick={() => setIsPublic(!isPublic)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-violet-900/30 border border-violet-500/30 hover:border-pink-500/30 hover:bg-pink-900/20 transition-all duration-200 backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                >
                  {isPublic ? (
                    <Globe className="w-4 h-4 text-violet-300" />
                  ) : (
                    <Lock className="w-4 h-4 text-pink-300" />
                  )}
                  <span className="text-sm text-violet-300">
                    {isPublic ? 'Public' : 'Private'}
                  </span>
                </motion.button>

                {/* Generate Button */}
                <motion.button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 relative overflow-hidden ${
                    inputValue.trim()
                      ? 'bg-button-gradient text-white hover:shadow-lg hover:shadow-violet-500/25 hover:scale-105'
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                  whileHover={inputValue.trim() ? { scale: 1.05 } : {}}
                  whileTap={inputValue.trim() ? { scale: 0.95 } : {}}
                >
                  <Send className="w-4 h-4" />
                  <span>Generate</span>
                  {inputValue.trim() && (
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-violet-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.form>

      {/* Quick Actions */}
      <motion.div
        className="flex flex-wrap gap-3 justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {quickActions.map((action, index) => (
          <motion.button
            key={index}
            onClick={() => handleQuickAction(action.label)}
            className={`relative group px-6 py-3 rounded-full bg-violet-900/30 border border-violet-500/30 hover:border-pink-500/30 transition-all duration-300 overflow-hidden flex items-center space-x-2 backdrop-blur-sm`}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${action.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
            <div className="relative flex items-center space-x-2">
              <action.icon className="w-4 h-4 text-violet-300 group-hover:text-pink-200 transition-colors duration-300" />
              <span className="text-sm text-violet-300 group-hover:text-pink-200 transition-colors duration-300 whitespace-nowrap">
                {action.label}
              </span>
            </div>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};

export default PromptInput;
