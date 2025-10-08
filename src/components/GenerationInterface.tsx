import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  RotateCcw, 
  Download, 
  Share, 
  Eye,
  Code,
  Database,
  Server,
  Shield,
  Zap,
  Cloud,
  GitBranch,
  CheckCircle,
  Clock,
  AlertCircle,
  Sparkles
} from 'lucide-react';

interface GenerationStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'running' | 'completed' | 'error';
  icon: any;
  duration?: number;
}

interface GenerationInterfaceProps {
  prompt: string;
  onBack: () => void;
}

const GenerationInterface: React.FC<GenerationInterfaceProps> = ({ prompt, onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(true);
  const [generatedCode, setGeneratedCode] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const steps: GenerationStep[] = [
    {
      id: 'analyze',
      title: 'Analyzing Requirements',
      description: 'Understanding your backend requirements and architecture needs',
      status: 'completed',
      icon: Sparkles,
      duration: 2000
    },
    {
      id: 'architecture',
      title: 'Designing Architecture',
      description: 'Creating optimal backend architecture and component relationships',
      status: 'completed',
      icon: Server,
      duration: 3000
    },
    {
      id: 'database',
      title: 'Setting up Database',
      description: 'Designing database schema and relationships',
      status: 'completed',
      icon: Database,
      duration: 2500
    },
    {
      id: 'api',
      title: 'Generating APIs',
      description: 'Creating RESTful endpoints and GraphQL resolvers',
      status: 'running',
      icon: Code,
      duration: 4000
    },
    {
      id: 'auth',
      title: 'Implementing Authentication',
      description: 'Setting up secure authentication and authorization',
      status: 'pending',
      icon: Shield,
      duration: 3000
    },
    {
      id: 'deployment',
      title: 'Preparing Deployment',
      description: 'Creating Docker containers and deployment configurations',
      status: 'pending',
      icon: Cloud,
      duration: 2000
    },
    {
      id: 'cicd',
      title: 'Setting up CI/CD',
      description: 'Configuring automated testing and deployment pipelines',
      status: 'pending',
      icon: GitBranch,
      duration: 3500
    }
  ];

  useEffect(() => {
    if (isGenerating) {
      const timer = setInterval(() => {
        setCurrentStep(prev => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            setIsGenerating(false);
            return prev;
          }
        });
      }, 3000);

      return () => clearInterval(timer);
    }
  }, [isGenerating, steps.length]);

  const getStepStatus = (index: number): GenerationStep['status'] => {
    if (index < currentStep) return 'completed';
    if (index === currentStep && isGenerating) return 'running';
    if (index === currentStep && !isGenerating) return 'completed';
    return 'pending';
  };

  const getStatusIcon = (status: GenerationStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'running':
        return <Clock className="w-5 h-5 text-yellow-400 animate-spin" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-gray-600" />;
    }
  };

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-main-gradient">
      {/* Header */}
      <div className="border-b border-violet-500/20 bg-dark-950/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-2 rounded-lg bg-violet-900/30 border border-violet-500/30 hover:border-pink-500/30 transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4 text-violet-300" />
              </button>
              <div>
                <h1 className="text-lg font-bold text-white">Generating Backend</h1>
                <p className="text-sm text-gray-400 truncate max-w-md">{prompt}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {!isGenerating && (
                <>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-violet-900/30 border border-violet-500/30 rounded-lg text-violet-300 hover:bg-pink-900/30 hover:border-pink-500/30 transition-all duration-200">
                    <Eye className="w-4 h-4" />
                    <span>Preview</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-violet-900/30 border border-violet-500/30 rounded-lg text-violet-300 hover:bg-pink-900/30 hover:border-pink-500/30 transition-all duration-200">
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-violet-500 to-pink-500 text-white rounded-lg hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-200">
                    <Cloud className="w-4 h-4" />
                    <span>Deploy</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Generation Steps */}
          <div className="lg:col-span-1">
            <div className="bg-dark-950/50 border border-violet-500/20 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Generation Progress</h2>
                <div className="text-sm text-gray-400">
                  {Math.round(progressPercentage)}% Complete
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-dark-800 rounded-full h-2 mb-8">
                <motion.div
                  className="bg-gradient-to-r from-violet-500 to-pink-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              {/* Steps */}
              <div className="space-y-4">
                {steps.map((step, index) => {
                  const status = getStepStatus(index);
                  return (
                    <motion.div
                      key={step.id}
                      className={`flex items-start space-x-4 p-4 rounded-xl transition-all duration-300 ${
                        status === 'running' 
                          ? 'bg-violet-900/20 border border-violet-500/30' 
                          : status === 'completed'
                          ? 'bg-green-900/10 border border-green-500/20'
                          : 'bg-dark-800/30 border border-gray-700/30'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex-shrink-0 mt-1">
                        {getStatusIcon(status)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-medium ${
                          status === 'completed' ? 'text-green-300' :
                          status === 'running' ? 'text-violet-300' :
                          'text-gray-400'
                        }`}>
                          {step.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {step.description}
                        </p>
                        {status === 'running' && (
                          <div className="mt-2">
                            <div className="w-full bg-dark-700 rounded-full h-1">
                              <motion.div
                                className="bg-gradient-to-r from-violet-400 to-pink-400 h-1 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 3, repeat: Infinity }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Code Preview */}
          <div className="lg:col-span-2">
            <div className="bg-dark-950/50 border border-violet-500/20 rounded-2xl overflow-hidden backdrop-blur-sm">
              <div className="flex items-center justify-between p-4 border-b border-violet-500/20">
                <div className="flex items-center space-x-3">
                  <Code className="w-5 h-5 text-violet-400" />
                  <h2 className="text-lg font-semibold text-white">Generated Code</h2>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-96">
                  {/* API Routes */}
                  <div className="bg-dark-900/50 rounded-xl p-4 border border-violet-500/20 overflow-auto">
                    <h3 className="text-sm font-medium text-violet-400 mb-3 flex items-center">
                      <Server className="w-4 h-4 mr-2" />
                      API Routes
                    </h3>
                    <pre className="text-xs text-gray-300 font-mono">
{`// Generated Express.js routes
const express = require('express');
const router = express.Router();

// User routes
router.get('/api/users', async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email', 'name', 'createdAt']
    });
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

router.post('/api/users', async (req, res) => {
  try {
    const { email, name, password } = req.body;
    
    // Validate input
    if (!email || !name || !password) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({
      email,
      name,
      password: hashedPassword
    });
    
    res.status(201).json({ 
      success: true, 
      data: user 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

module.exports = router;`}
                    </pre>
                  </div>

                  {/* Database Schema */}
                  <div className="bg-dark-900/50 rounded-xl p-4 border border-violet-500/20 overflow-auto">
                    <h3 className="text-sm font-medium text-pink-400 mb-3 flex items-center">
                      <Database className="w-4 h-4 mr-2" />
                      Database Schema
                    </h3>
                    <pre className="text-xs text-gray-300 font-mono">
{`-- Generated PostgreSQL schema
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INTEGER DEFAULT 0,
  category_id INTEGER REFERENCES categories(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  total_amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id),
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL
);

-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_order_items_order ON order_items(order_id);`}
                    </pre>
                  </div>
                </div>

                {/* Architecture Overview */}
                <div className="mt-6 p-4 bg-dark-900/30 border border-violet-500/20 rounded-xl">
                  <h3 className="text-sm font-medium text-gray-300 mb-3">Architecture Overview</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { name: 'Express.js API', status: 'Generated', color: 'green' },
                      { name: 'PostgreSQL DB', status: 'Generated', color: 'green' },
                      { name: 'JWT Auth', status: 'In Progress', color: 'yellow' },
                      { name: 'Docker Config', status: 'Pending', color: 'gray' }
                    ].map((component, index) => (
                      <div key={index} className="flex items-center space-x-2 text-xs">
                        <div className={`w-2 h-2 rounded-full ${
                          component.color === 'green' ? 'bg-green-400' :
                          component.color === 'yellow' ? 'bg-yellow-400' : 'bg-gray-400'
                        }`}></div>
                        <span className="text-gray-300">{component.name}</span>
                        <span className={`${
                          component.color === 'green' ? 'text-green-400' :
                          component.color === 'yellow' ? 'text-yellow-400' : 'text-gray-400'
                        }`}>
                          {component.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerationInterface;