
import React, { createContext, useState, useContext, useEffect } from 'react';

// Define user type
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'librarian' | 'user';
  avatar?: string;
}

// Define auth context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  isAuthenticated: boolean;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data - in a real app this would come from a backend
const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@library.com',
    role: 'admin',
    avatar: '',
  },
  {
    id: '2',
    name: 'Librarian',
    email: 'librarian@library.com',
    role: 'librarian',
  },
  {
    id: '3',
    name: 'Regular User',
    email: 'user@example.com',
    role: 'user',
  },
];

// Create the auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Check if user is logged in when component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem('libraryUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Find user with matching email
    const matchedUser = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (matchedUser && password === 'password') { // In real app, use proper password validation
      setUser(matchedUser);
      localStorage.setItem('libraryUser', JSON.stringify(matchedUser));
    } else {
      throw new Error('Invalid email or password');
    }
    
    setLoading(false);
  };

  // Logout function
  const logout = (): void => {
    setUser(null);
    localStorage.removeItem('libraryUser');
  };

  // Register function
  const register = async (name: string, email: string, password: string): Promise<void> => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check if email already exists
    const existingUser = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      setLoading(false);
      throw new Error('Email already in use');
    }
    
    // In a real app, would save to backend
    const newUser: User = {
      id: `${MOCK_USERS.length + 1}`,
      name,
      email,
      role: 'user', // Default role for new users
    };
    
    // Add to mock users (would not be needed in real implementation)
    MOCK_USERS.push(newUser);
    
    // Log in the new user
    setUser(newUser);
    localStorage.setItem('libraryUser', JSON.stringify(newUser));
    
    setLoading(false);
  };

  // Provide auth context value
  const value = {
    user,
    loading,
    login,
    logout,
    register,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
