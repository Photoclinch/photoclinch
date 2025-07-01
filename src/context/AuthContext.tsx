import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { User, UserRole } from '../types';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstName: string, lastName: string, role: UserRole, phoneNumber?: string, acceptMarketing?: boolean) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration - replace with your actual authentication logic
const mockUsers: User[] = [
  {
    id: '1',
    email: 'photographer@example.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'photographer',
    phoneNumber: '123-456-7890',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    email: 'client@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    role: 'client',
    phoneNumber: '098-765-4321',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = () => {
      try {
        console.log('Initializing auth...');
        setLoading(true);

        // Check for existing session in memory storage (no localStorage in artifacts)
        // In a real application, you would check localStorage or sessionStorage
        const storedUserData = sessionStorage.getItem('user');
        const storedToken = sessionStorage.getItem('authToken');
        
        if (storedUserData && storedToken) {
          console.log('Found existing session');
          const userData = JSON.parse(storedUserData);
          
          // Validate token expiry
          const tokenExpiry = sessionStorage.getItem('tokenExpiry');
          if (tokenExpiry && new Date().getTime() < parseInt(tokenExpiry)) {
            console.log('Valid session found:', userData);
            setUser(userData);
          } else {
            console.log('Session expired, clearing storage');
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('authToken');
            sessionStorage.removeItem('tokenExpiry');
            setUser(null);
          }
        } else {
          console.log('No active session found');
          setUser(null);
        }
      } catch (error: any) {
        console.error('Auth initialization error:', {
          message: error?.message || 'Unknown error',
          stack: error?.stack
        });
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      console.log('Starting sign in process for:', email);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user in mock data (replace with actual API call)
      const foundUser = mockUsers.find(u => u.email === email);
      
      if (!foundUser) {
        toast.error('User not found');
        return;
      }
      
      // In a real app, you'd validate the password with your backend
      if (password !== 'password123') {
        toast.error('Invalid password');
        return;
      }

      console.log('Authentication successful');
      
      // Generate mock token (replace with actual JWT from your backend)
      const token = `mock-jwt-token-${Date.now()}`;
      const expiry = new Date().getTime() + (24 * 60 * 60 * 1000); // 24 hours
      
      // Store user and token
      sessionStorage.setItem('user', JSON.stringify(foundUser));
      sessionStorage.setItem('authToken', token);
      sessionStorage.setItem('tokenExpiry', expiry.toString());
      
      setUser(foundUser);
      toast.success('Signed in successfully');
      
      // Role-based redirect
      if (foundUser.role === 'photographer') {
        console.log('Redirecting photographer to dashboard');
        navigate('/dashboard/photographer');
      } else if (foundUser.role === 'client') {
        console.log('Redirecting client to dashboard');
        navigate('/dashboard/client');
      } else {
        console.log('Redirecting to default dashboard');
        navigate('/dashboard');
      }
      
    } catch (error: any) {
      console.error('Sign in error:', {
        message: error?.message,
        stack: error?.stack
      });
      toast.error(error?.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (
    email: string, 
    password: string, 
    firstName: string, 
    lastName: string, 
    role: UserRole,
    phoneNumber?: string,
    acceptMarketing?: boolean
  ) => {
    try {
      setLoading(true);
      console.log('Starting sign up process for:', email, 'as', role);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check if user already exists
      const existingUser = mockUsers.find(u => u.email === email);
      if (existingUser) {
        toast.error('User with this email already exists');
        return;
      }
      
      // Create new user object
      const newUser: User = {
        id: (mockUsers.length + 1).toString(),
        email,
        firstName,
        lastName,
        role,
        phoneNumber,
        acceptMarketing: acceptMarketing || false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // In a real app, you'd send this to your backend API
      mockUsers.push(newUser);
      
      console.log('User created successfully:', newUser);
      toast.success('Account created successfully! You can now sign in.');
      navigate('/login');
      
    } catch (error: any) {
      console.error('Sign up error:', {
        message: error?.message,
        stack: error?.stack
      });
      toast.error(error?.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      console.log('Starting sign out process');
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Clear stored authentication data
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('authToken');
      sessionStorage.removeItem('tokenExpiry');
      
      setUser(null);
      toast.success('Signed out successfully');
      navigate('/');
      
    } catch (error: any) {
      console.error('Sign out error:', {
        message: error?.message,
        stack: error?.stack
      });
      toast.error(error?.message || 'Failed to sign out');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};