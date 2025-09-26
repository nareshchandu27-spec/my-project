import { useState, useEffect } from 'react';
import { User } from '../types';

export const useUserType = () => {
  const [user, setUser] = useState<User | null>(null);
  const [uiMode, setUiMode] = useState<'basic' | 'advanced' | 'expert'>('basic');

  useEffect(() => {
    // Simulate user detection logic
    const detectUserType = () => {
      // In real app, this would analyze user behavior, project complexity, etc.
      const mockUser: User = {
        id: '1',
        email: 'user@example.com',
        name: 'John Doe',
        type: 'startup', // This would be dynamically determined
        preferences: {
          uiMode: 'advanced',
          theme: 'dark',
          defaultStack: ['nodejs', 'postgresql', 'redis'],
          notifications: true
        }
      };
      setUser(mockUser);
      setUiMode(mockUser.preferences.uiMode);
    };

    detectUserType();
  }, []);

  const upgradeUIMode = () => {
    const modes: Array<'basic' | 'advanced' | 'expert'> = ['basic', 'advanced', 'expert'];
    const currentIndex = modes.indexOf(uiMode);
    if (currentIndex < modes.length - 1) {
      setUiMode(modes[currentIndex + 1]);
    }
  };

  return { user, uiMode, setUiMode, upgradeUIMode };
};