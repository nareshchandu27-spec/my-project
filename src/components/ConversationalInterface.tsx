import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, Code, Database, Shield, Zap } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  components?: any[];
}

interface ConversationalInterfaceProps {
  onArchitectureUpdate: (components: any[]) => void;
}

const ConversationalInterface: React.FC<ConversationalInterfaceProps> = ({ onArchitectureUpdate }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hi! I'm your AI backend architect. Let's build something amazing together. What kind of application are you creating?",
      timestamp: new Date(),
      suggestions: [
        "E-commerce platform with user accounts",
        "Social media app with real-time features",
        "SaaS dashboard with analytics",
        "Mobile app backend with push notifications"
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(content);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
      
      if (aiResponse.components) {
        onArchitectureUpdate(aiResponse.components);
      }
    }, 1500);
  };

  const generateAIResponse = (userInput: string): Message => {
    // Simulate intelligent AI responses based on input
    const responses = [
      {
        content: "Great choice! For an e-commerce platform, I recommend starting with a REST API, PostgreSQL database, Redis for caching, and JWT authentication. Would you like me to add payment processing and inventory management?",
        suggestions: ["Yes, add Stripe integration", "Include inventory tracking", "Add email notifications", "Set up admin dashboard"],
        components: [
          { type: 'api', name: 'REST API', status: 'configured' },
          { type: 'database', name: 'PostgreSQL', status: 'configured' },
          { type: 'cache', name: 'Redis', status: 'configured' },
          { type: 'auth', name: 'JWT Auth', status: 'configured' }
        ]
      },
      {
        content: "Perfect! I've added Stripe for payments and inventory management. Your backend now includes user authentication, product catalog, order processing, and payment handling. Should we add real-time notifications for order updates?",
        suggestions: ["Add WebSocket notifications", "Include email templates", "Set up order tracking", "Add analytics dashboard"],
        components: [
          { type: 'api', name: 'REST API', status: 'generated' },
          { type: 'database', name: 'PostgreSQL', status: 'generated' },
          { type: 'auth', name: 'JWT Auth', status: 'generated' },
          { type: 'payment', name: 'Stripe Integration', status: 'configured' },
          { type: 'inventory', name: 'Inventory System', status: 'configured' }
        ]
      }
    ];

    return {
      id: Date.now().toString(),
      type: 'ai',
      content: responses[Math.floor(Math.random() * responses.length)].content,
      timestamp: new Date(),
      suggestions: responses[0].suggestions,
      components: responses[0].components
    };
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  return (
    <div className="flex flex-col h-full bg-dark-950/50 backdrop-blur-sm border border-violet-500/20 rounded-2xl">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-violet-500/20">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-button-gradient rounded-full flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white">AI Backend Architect</h3>
            <p className="text-xs text-gray-400">Designing your perfect backend</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-green-400">Online</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                <div className={`flex items-start space-x-3 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === 'user' 
                      ? 'bg-violet-600' 
                      : 'bg-button-gradient'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div className={`rounded-2xl p-4 ${
                    message.type === 'user'
                      ? 'bg-violet-600 text-white'
                      : 'bg-dark-800 text-gray-100 border border-violet-500/20'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <p className="text-xs opacity-60 mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>

                {/* Suggestions */}
                {message.suggestions && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 flex flex-wrap gap-2"
                  >
                    {message.suggestions.map((suggestion, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="px-3 py-2 text-xs bg-violet-900/30 border border-violet-500/30 rounded-full text-violet-300 hover:bg-pink-900/30 hover:border-pink-500/30 hover:text-pink-300 transition-all duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {suggestion}
                      </motion.button>
                    ))}
                  </motion.div>
                )}

                {/* Component Preview */}
                {message.components && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 p-3 bg-dark-900/50 border border-violet-500/20 rounded-lg"
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <Sparkles className="w-4 h-4 text-violet-400" />
                      <span className="text-xs text-violet-400 font-medium">Generated Components</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {message.components.map((component, index) => (
                        <div key={index} className="flex items-center space-x-2 p-2 bg-dark-800/50 rounded">
                          {component.type === 'database' && <Database className="w-3 h-3 text-blue-400" />}
                          {component.type === 'api' && <Code className="w-3 h-3 text-green-400" />}
                          {component.type === 'auth' && <Shield className="w-3 h-3 text-orange-400" />}
                          {component.type === 'cache' && <Zap className="w-3 h-3 text-yellow-400" />}
                          <span className="text-xs text-gray-300">{component.name}</span>
                          <div className={`w-2 h-2 rounded-full ${
                            component.status === 'generated' ? 'bg-green-400' : 'bg-yellow-400'
                          }`}></div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-button-gradient rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-dark-800 border border-violet-500/20 rounded-2xl p-4">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-violet-500/20">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (inputValue.trim()) {
              handleSendMessage(inputValue);
            }
          }}
          className="flex items-center space-x-3"
        >
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Describe what you want to add or modify..."
              className="w-full bg-dark-800 border border-violet-500/30 rounded-full px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-pink-500/50 transition-colors duration-200"
            />
          </div>
          <motion.button
            type="submit"
            disabled={!inputValue.trim() || isTyping}
            className={`p-3 rounded-full transition-all duration-200 ${
              inputValue.trim() && !isTyping
                ? 'bg-button-gradient text-white hover:shadow-lg hover:shadow-violet-500/25'
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
            whileHover={inputValue.trim() && !isTyping ? { scale: 1.05 } : {}}
            whileTap={inputValue.trim() && !isTyping ? { scale: 0.95 } : {}}
          >
            <Send className="w-4 h-4" />
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default ConversationalInterface;