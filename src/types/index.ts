export interface User {
  id: string;
  email: string;
  name: string;
  type: 'solo' | 'startup' | 'enterprise';
  preferences: UserPreferences;
}

export interface UserPreferences {
  uiMode: 'basic' | 'advanced' | 'expert';
  theme: 'dark' | 'light';
  defaultStack: string[];
  notifications: boolean;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  type: 'saas' | 'ecommerce' | 'mobile' | 'api' | 'microservices';
  status: 'draft' | 'generating' | 'ready' | 'deployed' | 'error';
  architecture: BackendComponent[];
  createdAt: Date;
  updatedAt: Date;
  owner: string;
  team?: string[];
  tags: string[];
}

export interface BackendComponent {
  id: string;
  type: 'database' | 'api' | 'auth' | 'storage' | 'queue' | 'cache' | 'monitoring';
  name: string;
  config: Record<string, any>;
  dependencies: string[];
  position: { x: number; y: number };
  status: 'pending' | 'configured' | 'generated' | 'deployed';
}

export interface GenerationRequest {
  prompt: string;
  projectType: Project['type'];
  userType: User['type'];
  requirements: {
    scale: 'small' | 'medium' | 'large' | 'enterprise';
    security: 'basic' | 'enhanced' | 'enterprise';
    compliance: string[];
    integrations: string[];
  };
}

export interface AIResponse {
  components: BackendComponent[];
  architecture: string;
  recommendations: string[];
  estimatedCost: number;
  estimatedTime: string;
  securityScore: number;
}