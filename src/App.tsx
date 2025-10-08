import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import GenerationInterface from './components/GenerationInterface';
import AnimatedBackground from './components/AnimatedBackground';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [currentView, setCurrentView] = useState<'home' | 'generating'>('home');
  const [currentPrompt, setCurrentPrompt] = useState('');

  const handleGenerate = (prompt: string, options: any) => {
    setCurrentPrompt(prompt);
    setCurrentView('generating');
  };

  const handleBack = () => {
    setCurrentView('home');
    setCurrentPrompt('');
  };

  if (currentView === 'generating') {
    return <GenerationInterface prompt={currentPrompt} onBack={handleBack} />;
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-main-gradient text-white relative overflow-hidden">
        {/* Animated Background */}
        <AnimatedBackground />
        
        {/* Header */}
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />

        {/* Main Content */}
        <main className="relative z-10">
          <HeroSection onGenerate={handleGenerate} />
        </main>
      </div>
    </div>
  );
};

export default App;
