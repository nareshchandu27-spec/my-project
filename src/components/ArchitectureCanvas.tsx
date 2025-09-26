import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Code, Shield, Zap, Cloud, Monitor, GitBranch, DollarSign, Clock, AlertTriangle } from 'lucide-react';

interface Component {
  id: string;
  type: string;
  name: string;
  position: { x: number; y: number };
  status: 'pending' | 'configured' | 'generated' | 'deployed';
  connections: string[];
  metrics?: {
    cost: number;
    performance: number;
    security: number;
  };
}

interface ArchitectureCanvasProps {
  components: Component[];
  onComponentUpdate: (components: Component[]) => void;
}

const ArchitectureCanvas: React.FC<ArchitectureCanvasProps> = ({ components, onComponentUpdate }) => {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [draggedComponent, setDraggedComponent] = useState<string | null>(null);
  const [showMetrics, setShowMetrics] = useState(true);

  const getComponentIcon = (type: string) => {
    const icons = {
      database: Database,
      api: Code,
      auth: Shield,
      cache: Zap,
      storage: Cloud,
      monitoring: Monitor,
      queue: GitBranch
    };
    return icons[type as keyof typeof icons] || Code;
  };

  const getComponentColor = (type: string) => {
    const colors = {
      database: 'from-blue-500 to-blue-600',
      api: 'from-green-500 to-green-600',
      auth: 'from-orange-500 to-orange-600',
      cache: 'from-yellow-500 to-yellow-600',
      storage: 'from-purple-500 to-purple-600',
      monitoring: 'from-red-500 to-red-600',
      queue: 'from-indigo-500 to-indigo-600'
    };
    return colors[type as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'border-gray-500',
      configured: 'border-yellow-500',
      generated: 'border-green-500',
      deployed: 'border-blue-500'
    };
    return colors[status as keyof typeof colors];
  };

  const handleComponentDrag = useCallback((componentId: string, newPosition: { x: number; y: number }) => {
    const updatedComponents = components.map(comp =>
      comp.id === componentId ? { ...comp, position: newPosition } : comp
    );
    onComponentUpdate(updatedComponents);
  }, [components, onComponentUpdate]);

  const calculateTotalMetrics = () => {
    const totals = components.reduce(
      (acc, comp) => ({
        cost: acc.cost + (comp.metrics?.cost || 0),
        performance: acc.performance + (comp.metrics?.performance || 0),
        security: Math.min(acc.security, comp.metrics?.security || 100)
      }),
      { cost: 0, performance: 0, security: 100 }
    );

    return {
      ...totals,
      performance: totals.performance / components.length || 0
    };
  };

  const renderConnection = (from: Component, to: Component) => {
    const fromCenter = {
      x: from.position.x + 75,
      y: from.position.y + 50
    };
    const toCenter = {
      x: to.position.x + 75,
      y: to.position.y + 50
    };

    return (
      <motion.line
        key={`${from.id}-${to.id}`}
        x1={fromCenter.x}
        y1={fromCenter.y}
        x2={toCenter.x}
        y2={toCenter.y}
        stroke="url(#connectionGradient)"
        strokeWidth="2"
        strokeDasharray="5,5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
    );
  };

  const totalMetrics = calculateTotalMetrics();

  return (
    <div className="relative w-full h-full bg-dark-950/30 border border-violet-500/20 rounded-2xl overflow-hidden">
      {/* Metrics Panel */}
      {showMetrics && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 left-4 right-4 z-10 bg-dark-900/90 backdrop-blur-sm border border-violet-500/20 rounded-xl p-4"
        >
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-1">
                <DollarSign className="w-4 h-4 text-green-400" />
                <span className="text-sm text-gray-300">Est. Cost</span>
              </div>
              <div className="text-lg font-bold text-green-400">${totalMetrics.cost}/mo</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-1">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-gray-300">Performance</span>
              </div>
              <div className="text-lg font-bold text-yellow-400">{totalMetrics.performance.toFixed(0)}%</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-1">
                <Shield className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-gray-300">Security</span>
              </div>
              <div className="text-lg font-bold text-blue-400">{totalMetrics.security}%</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-1">
                <Clock className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-gray-300">Deploy Time</span>
              </div>
              <div className="text-lg font-bold text-purple-400">~5min</div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Canvas */}
      <div className="relative w-full h-full p-4" style={{ paddingTop: showMetrics ? '120px' : '20px' }}>
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
          
          {/* Render connections */}
          {components.map(component => 
            component.connections.map(connectionId => {
              const connectedComponent = components.find(c => c.id === connectionId);
              return connectedComponent ? renderConnection(component, connectedComponent) : null;
            })
          )}
        </svg>

        {/* Components */}
        <AnimatePresence>
          {components.map((component) => {
            const Icon = getComponentIcon(component.type);
            return (
              <motion.div
                key={component.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                drag
                dragMomentum={false}
                onDragEnd={(_, info) => {
                  const newPosition = {
                    x: Math.max(0, component.position.x + info.offset.x),
                    y: Math.max(0, component.position.y + info.offset.y)
                  };
                  handleComponentDrag(component.id, newPosition);
                }}
                className={`absolute cursor-move group`}
                style={{
                  left: component.position.x,
                  top: component.position.y
                }}
                whileHover={{ scale: 1.05 }}
                whileDrag={{ scale: 1.1, zIndex: 50 }}
              >
                <div
                  className={`w-32 h-20 bg-gradient-to-br ${getComponentColor(component.type)} rounded-xl border-2 ${getStatusColor(component.status)} shadow-lg backdrop-blur-sm relative overflow-hidden`}
                  onClick={() => setSelectedComponent(component.id)}
                >
                  {/* Status indicator */}
                  <div className={`absolute top-2 right-2 w-3 h-3 rounded-full ${
                    component.status === 'deployed' ? 'bg-green-400' :
                    component.status === 'generated' ? 'bg-blue-400' :
                    component.status === 'configured' ? 'bg-yellow-400' : 'bg-gray-400'
                  } animate-pulse`}></div>

                  {/* Icon and name */}
                  <div className="flex flex-col items-center justify-center h-full text-white p-2">
                    <Icon className="w-6 h-6 mb-1" />
                    <span className="text-xs font-medium text-center leading-tight">{component.name}</span>
                  </div>

                  {/* Hover overlay with metrics */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-xl flex flex-col justify-center items-center text-white text-xs space-y-1"
                  >
                    {component.metrics && (
                      <>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="w-3 h-3" />
                          <span>${component.metrics.cost}/mo</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Zap className="w-3 h-3" />
                          <span>{component.metrics.performance}%</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Shield className="w-3 h-3" />
                          <span>{component.metrics.security}%</span>
                        </div>
                      </>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Empty state */}
        {components.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <Cloud className="w-16 h-16 mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">No Components Yet</h3>
            <p className="text-sm text-center">Start a conversation with the AI to generate your backend architecture</p>
          </div>
        )}
      </div>

      {/* Component Details Panel */}
      <AnimatePresence>
        {selectedComponent && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="absolute top-0 right-0 w-80 h-full bg-dark-900/95 backdrop-blur-sm border-l border-violet-500/20 p-6 overflow-y-auto"
          >
            {(() => {
              const component = components.find(c => c.id === selectedComponent);
              if (!component) return null;
              
              const Icon = getComponentIcon(component.type);
              
              return (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 bg-gradient-to-br ${getComponentColor(component.type)} rounded-lg flex items-center justify-center`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{component.name}</h3>
                        <p className="text-sm text-gray-400 capitalize">{component.type}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedComponent(null)}
                      className="text-gray-400 hover:text-white"
                    >
                      ×
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Status</h4>
                      <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs ${
                        component.status === 'deployed' ? 'bg-green-900/30 text-green-400' :
                        component.status === 'generated' ? 'bg-blue-900/30 text-blue-400' :
                        component.status === 'configured' ? 'bg-yellow-900/30 text-yellow-400' :
                        'bg-gray-900/30 text-gray-400'
                      }`}>
                        <div className={`w-2 h-2 rounded-full ${
                          component.status === 'deployed' ? 'bg-green-400' :
                          component.status === 'generated' ? 'bg-blue-400' :
                          component.status === 'configured' ? 'bg-yellow-400' : 'bg-gray-400'
                        }`}></div>
                        <span className="capitalize">{component.status}</span>
                      </div>
                    </div>

                    {component.metrics && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-300 mb-3">Metrics</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-400">Monthly Cost</span>
                            <span className="text-sm text-green-400 font-medium">${component.metrics.cost}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-400">Performance</span>
                            <span className="text-sm text-yellow-400 font-medium">{component.metrics.performance}%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-400">Security Score</span>
                            <span className="text-sm text-blue-400 font-medium">{component.metrics.security}%</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Connections</h4>
                      <div className="space-y-2">
                        {component.connections.length > 0 ? (
                          component.connections.map(connectionId => {
                            const connectedComponent = components.find(c => c.id === connectionId);
                            return connectedComponent ? (
                              <div key={connectionId} className="flex items-center space-x-2 text-sm text-gray-400">
                                <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
                                <span>{connectedComponent.name}</span>
                              </div>
                            ) : null;
                          })
                        ) : (
                          <p className="text-sm text-gray-500">No connections</p>
                        )}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-violet-500/20">
                      <button className="w-full bg-button-gradient text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-200">
                        Configure Component
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ArchitectureCanvas;