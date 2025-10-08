import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Sparkles, 
  Code, 
  Database, 
  Shield, 
  Zap, 
  Globe,
  Upload,
  Mic,
  Image,
  FileText,
  Plus,
  ArrowRight,
  Wand2,
  Layers,
  Server,
  Lock,
  Cloud,
  GitBranch,
  Settings,
  Play
} from 'lucide-react';

interface ModernPromptInputProps {
  onGenerate: (prompt: string, options: any) => void;
}

const ModernPromptInput: React.FC<ModernPromptInputProps> = ({ onGenerate }) => {
  const [prompt, setPrompt] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const templates = [
    {
      id: 'ecommerce',
      title: 'E-commerce Platform',
      description: 'Complete online store with payments',
      icon: Globe,
      gradient: 'from-emerald-500 to-teal-600',
      prompt: 'Build me a complete e-commerce platform with user authentication, product catalog, shopping cart, payment processing with Stripe, order management, and admin dashboard'
    },
    {
      id: 'saas',
      title: 'SaaS Application',
      description: 'Multi-tenant SaaS with subscriptions',
      icon: Layers,
      gradient: 'from-blue-500 to-indigo-600',
      prompt: 'Create a SaaS application backend with multi-tenant architecture, subscription management, user roles, API rate limiting, and analytics dashboard'
    },
    {
      id: 'social',
      title: 'Social Platform',
      description: 'Social media with real-time features',
      icon: Zap,
      gradient: 'from-pink-500 to-rose-600',
      prompt: 'Build a social media platform with user profiles, posts, comments, likes, real-time notifications, messaging, and content moderation'
    },
    {
      id: 'api',
      title: 'REST API',
      description: 'Scalable API with documentation',
      icon: Server,
      gradient: 'from-violet-500 to-purple-600',
      prompt: 'Create a RESTful API with authentication, CRUD operations, data validation, rate limiting, API documentation, and monitoring'
    }
  ];

  const quickActions = [
    { icon: Database, label: 'Add Database', action: () => appendToPrompt('with PostgreSQL database') },
    { icon: Shield, label: 'Add Auth', action: () => appendToPrompt('with JWT authentication') },
    { icon: Cloud, label: 'Add Storage', action: () => appendToPrompt('with file storage') },
    { icon: Zap, label: 'Add Cache', action: () => appendToPrompt('with Redis caching') },
    { icon: Lock, label: 'Add Security', action: () => appendToPrompt('with advanced security') },
    { icon: GitBranch, label: 'Add CI/CD', action: () => appendToPrompt('with CI/CD pipeline') }
  ];

  const appendToPrompt = (text: string) => {
    setPrompt(prev => prev ? `${prev} ${text}` : text);
    setIsExpanded(true);
  };

  const handleTemplateSelect = (template: any) => {
    setPrompt(template.prompt);
    setSelectedTemplate(template.id);
    setIsExpanded(true);
  };

  const handleSubmit = () => {
    if (prompt.trim()) {
      onGenerate(prompt, { template: selectedTemplate });
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [prompt]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Main Input Container */}
      <motion.div
        layout
        className="relative group"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Animated Border */}
        <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-pink-600 to-violet-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 animate-gradient-x"></div>
        
        <div className="relative bg-dark-950/90 backdrop-blur-xl border border-violet-500/20 rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-violet-500/10">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Wand2 className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">AI Backend Generator</h3>
                <p className="text-xs text-gray-400">Describe your backend and watch it come to life</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="p-2 rounded-lg bg-violet-900/30 border border-violet-500/30 hover:border-pink-500/30 transition-all duration-200"
              >
                <Settings className="w-4 h-4 text-violet-300" />
              </button>
            </div>
          </div>

          {/* Main Input Area */}
          <div className="p-6">
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onFocus={() => setIsExpanded(true)}
                placeholder="Describe your backend application... (e.g., 'Build me an e-commerce platform with user authentication, product catalog, and payment processing')"
                className="w-full bg-transparent text-white text-lg placeholder-gray-400 outline-none resize-none min-h-[60px] max-h-[200px] leading-relaxed"
                style={{ height: 'auto' }}
              />
              
              {/* Floating Action Buttons */}
              <div className="absolute right-0 top-0 flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-lg bg-violet-900/30 border border-violet-500/30 hover:border-pink-500/30 transition-all duration-200"
                  title="Voice Input"
                >
                  <Mic className="w-4 h-4 text-violet-300" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-lg bg-violet-900/30 border border-violet-500/30 hover:border-pink-500/30 transition-all duration-200"
                  title="Upload File"
                >
                  <Upload className="w-4 h-4 text-violet-300" />
                </motion.button>
              </div>
            </div>

            {/* Quick Actions */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 space-y-4"
                >
                  <div className="flex flex-wrap gap-2">
                    {quickActions.map((action, index) => (
                      <motion.button
                        key={index}
                        onClick={action.action}
                        className="flex items-center space-x-2 px-3 py-2 bg-violet-900/20 border border-violet-500/20 rounded-full text-violet-300 hover:bg-pink-900/20 hover:border-pink-500/20 hover:text-pink-300 transition-all duration-200 text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <action.icon className="w-3 h-3" />
                        <span>{action.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Sparkles className="w-4 h-4 text-violet-400" />
                  <span>AI-Powered</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Zap className="w-4 h-4 text-pink-400" />
                  <span>5min Generation</span>
                </div>
              </div>
              
              <motion.button
                onClick={handleSubmit}
                disabled={!prompt.trim()}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  prompt.trim()
                    ? 'bg-gradient-to-r from-violet-500 to-pink-500 text-white hover:shadow-lg hover:shadow-violet-500/25 hover:scale-105'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
                whileHover={prompt.trim() ? { scale: 1.05 } : {}}
                whileTap={prompt.trim() ? { scale: 0.95 } : {}}
              >
                <Play className="w-4 h-4" />
                <span>Generate Backend</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Template Gallery */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-8"
      >
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">Start with a Template</h3>
          <p className="text-gray-400">Choose a pre-built architecture or describe your own</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              onClick={() => handleTemplateSelect(template)}
              className={`relative group cursor-pointer p-6 rounded-xl border transition-all duration-300 hover:scale-105 ${
                selectedTemplate === template.id
                  ? 'bg-violet-900/30 border-violet-500/50'
                  : 'bg-dark-900/30 border-violet-500/20 hover:border-pink-500/30'
              }`}
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${template.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <template.icon className="w-6 h-6 text-white" />
              </div>
              
              <h4 className="font-semibold text-white mb-2">{template.title}</h4>
              <p className="text-sm text-gray-400 mb-4">{template.description}</p>
              
              <div className="flex items-center text-xs text-violet-400 group-hover:text-pink-400 transition-colors duration-300">
                <span>Use Template</span>
                <ArrowRight className="w-3 h-3 ml-1" />
              </div>

              {selectedTemplate === template.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 w-6 h-6 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full flex items-center justify-center"
                >
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Advanced Options */}
      <AnimatePresence>
        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 p-6 bg-dark-900/30 border border-violet-500/20 rounded-xl"
          >
            <h4 className="text-white font-semibold mb-4">Advanced Options</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Deployment Target</label>
                <select className="w-full bg-dark-800 border border-violet-500/30 rounded-lg px-3 py-2 text-white">
                  <option>AWS</option>
                  <option>Google Cloud</option>
                  <option>Azure</option>
                  <option>Vercel</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Database</label>
                <select className="w-full bg-dark-800 border border-violet-500/30 rounded-lg px-3 py-2 text-white">
                  <option>PostgreSQL</option>
                  <option>MongoDB</option>
                  <option>MySQL</option>
                  <option>Supabase</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Framework</label>
                <select className="w-full bg-dark-800 border border-violet-500/30 rounded-lg px-3 py-2 text-white">
                  <option>Node.js + Express</option>
                  <option>Next.js API</option>
                  <option>Python + FastAPI</option>
                  <option>Go + Gin</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModernPromptInput;