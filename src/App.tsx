import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import PromptInput from './components/PromptInput';
import AuthButtons from './components/AuthButtons';
import AnimatedBackground from './components/AnimatedBackground';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-main-gradient text-white relative overflow-hidden">
        {/* Animated Background */}
        <AnimatedBackground />
        
        {/* Header */}
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />

        {/* Main Content */}
        <main className="relative z-10">
          {/* Hero Section */}
          <section className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-20">
            <div className="max-w-6xl mx-auto text-center space-y-8">
              {/* Main Heading */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
                  <span className="bg-gradient-to-r from-white via-pink-200 to-violet-200 bg-clip-text text-transparent">
                    Backend in
                  </span>
                  <br />
                  <span className="bg-violet-pink bg-clip-text text-transparent animate-gradient-x">
                    Minutes, Not Months
                  </span>
                </h1>
                
                <motion.p
                  className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Generate databases, APIs, auth, and CI/CD pipelines instantly from a single prompt.
                  <span className="block mt-2 bg-gradient-to-r from-violet-300 to-pink-300 bg-clip-text text-transparent">
                    Backend development made effortless.
                  </span>
                </motion.p>
              </motion.div>

              {/* Main Prompt Input */}
              <div className="mt-12">
                <PromptInput />
              </div>

              {/* Features Preview */}
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                {[
                  { label: 'REST & GraphQL APIs', value: '< 5 min' },
                  { label: 'Database Schema', value: '< 2 min' },
                  { label: 'Authentication', value: '< 3 min' },
                  { label: 'CI/CD Pipeline', value: '< 10 min' }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center p-6 rounded-xl bg-card-gradient border border-violet-500/20 backdrop-blur-sm hover:border-pink-500/30 transition-all duration-300"
                    whileHover={{ 
                      scale: 1.05, 
                      backgroundColor: 'rgba(139, 92, 246, 0.15)',
                      borderColor: 'rgba(236, 72, 153, 0.4)'
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-2xl font-bold bg-violet-pink bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-300 mt-2">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Auth Section */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-violet-950/30">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-violet-200 to-pink-200 bg-clip-text text-transparent">
                    Ready to transform your backend development?
                  </h2>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Join thousands of developers who are already building faster, more scalable backends with BackendFlow. 
                    From idea to production in minutes, not months.
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                    <span className="flex items-center">
                      <span className="text-violet-400 mr-2">✨</span>
                      No credit card required
                    </span>
                    <span className="flex items-center">
                      <span className="text-pink-400 mr-2">🚀</span>
                      Deploy instantly
                    </span>
                    <span className="flex items-center">
                      <span className="text-violet-400 mr-2">🔒</span>
                      Enterprise-grade security
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <AuthButtons />
                </motion.div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default App;
