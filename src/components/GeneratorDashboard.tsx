import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ConversationalInterface from './ConversationalInterface';
import ArchitectureCanvas from './ArchitectureCanvas';
import UserTypeDetector from './UserTypeDetector';
import { useUserType } from '../hooks/useUserType';
import { Layers, MessageSquare, Settings, Code, Database, Zap, Monitor } from 'lucide-react';

const GeneratorDashboard: React.FC = () => {
  const { user, uiMode, setUiMode } = useUserType();
  const [activeTab, setActiveTab] = useState<'chat' | 'canvas' | 'code'>('chat');
  const [showUserTypeSelector, setShowUserTypeSelector] = useState(!user);
  const [components, setComponents] = useState<any[]>([]);

  const handleUserTypeSelect = (type: 'solo' | 'startup' | 'enterprise') => {
    setShowUserTypeSelector(false);
    // In real app, this would update user preferences
  };

  const handleArchitectureUpdate = (newComponents: any[]) => {
    // Convert AI components to canvas components with positions
    const canvasComponents = newComponents.map((comp, index) => ({
      ...comp,
      id: comp.id || `comp-${Date.now()}-${index}`,
      position: { 
        x: 100 + (index % 3) * 200, 
        y: 100 + Math.floor(index / 3) * 150 
      },
      connections: [],
      metrics: {
        cost: Math.floor(Math.random() * 100) + 10,
        performance: Math.floor(Math.random() * 40) + 60,
        security: Math.floor(Math.random() * 20) + 80
      }
    }));
    setComponents(canvasComponents);
  };

  const tabs = [
    { id: 'chat', label: 'AI Chat', icon: MessageSquare },
    { id: 'canvas', label: 'Architecture', icon: Layers },
    { id: 'code', label: 'Generated Code', icon: Code }
  ];

  const uiModes = [
    { id: 'basic', label: 'Basic', description: 'Simple interface' },
    { id: 'advanced', label: 'Advanced', description: 'More features' },
    { id: 'expert', label: 'Expert', description: 'Full control' }
  ];

  if (showUserTypeSelector) {
    return (
      <div className="min-h-screen bg-main-gradient flex items-center justify-center p-4">
        <UserTypeDetector onUserTypeSelect={handleUserTypeSelect} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-main-gradient">
      {/* Header */}
      <div className="border-b border-violet-500/20 bg-dark-950/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-button-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-white via-violet-200 to-pink-200 bg-clip-text text-transparent">
                  BackendFlow Generator
                </h1>
              </div>
            </div>

            {/* UI Mode Selector */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-dark-900/50 rounded-lg p-1">
                {uiModes.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setUiMode(mode.id as any)}
                    className={`px-3 py-1 text-xs rounded-md transition-all duration-200 ${
                      uiMode === mode.id
                        ? 'bg-button-gradient text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
              
              <button className="p-2 rounded-lg bg-violet-900/30 border border-violet-500/30 hover:border-pink-500/30 transition-all duration-200">
                <Settings className="w-4 h-4 text-violet-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-140px)]">
          {/* Left Sidebar - Tabs */}
          <div className="col-span-2">
            <div className="space-y-2">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-button-gradient text-white shadow-lg shadow-violet-500/25'
                      : 'bg-dark-900/30 text-gray-400 hover:text-white hover:bg-dark-800/50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Quick Stats */}
            {uiMode !== 'basic' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 space-y-4"
              >
                <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Components</span>
                    <span className="text-white font-medium">{components.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Est. Cost</span>
                    <span className="text-green-400 font-medium">
                      ${components.reduce((acc, comp) => acc + (comp.metrics?.cost || 0), 0)}/mo
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Status</span>
                    <span className="text-yellow-400 font-medium">Configuring</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Main Content Area */}
          <div className="col-span-10">
            <AnimatePresence mode="wait">
              {activeTab === 'chat' && (
                <motion.div
                  key="chat"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="h-full"
                >
                  <ConversationalInterface onArchitectureUpdate={handleArchitectureUpdate} />
                </motion.div>
              )}

              {activeTab === 'canvas' && (
                <motion.div
                  key="canvas"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="h-full"
                >
                  <ArchitectureCanvas 
                    components={components} 
                    onComponentUpdate={setComponents}
                  />
                </motion.div>
              )}

              {activeTab === 'code' && (
                <motion.div
                  key="code"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="h-full bg-dark-950/50 border border-violet-500/20 rounded-2xl p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">Generated Code</h2>
                    <div className="flex items-center space-x-2">
                      <button className="px-4 py-2 bg-violet-900/30 border border-violet-500/30 rounded-lg text-violet-300 hover:bg-pink-900/30 hover:border-pink-500/30 transition-all duration-200">
                        Download
                      </button>
                      <button className="px-4 py-2 bg-button-gradient text-white rounded-lg hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-200">
                        Deploy
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                    <div className="bg-dark-900/50 rounded-xl p-4 border border-violet-500/20">
                      <h3 className="text-sm font-medium text-gray-400 mb-3">API Routes</h3>
                      <pre className="text-xs text-gray-300 overflow-auto">
{`// Generated API routes
app.get('/api/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.post('/api/users', async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});`}
                      </pre>
                    </div>
                    
                    <div className="bg-dark-900/50 rounded-xl p-4 border border-violet-500/20">
                      <h3 className="text-sm font-medium text-gray-400 mb-3">Database Schema</h3>
                      <pre className="text-xs text-gray-300 overflow-auto">
{`-- Generated database schema
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);`}
                      </pre>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratorDashboard;