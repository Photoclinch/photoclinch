import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, User, Camera } from 'lucide-react';

interface AuthFormProps {
  mode: 'login' | 'signup';
}

const AuthForm = ({ mode }: AuthFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState<'client' | 'photographer'>('client');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptMarketing, setAcceptMarketing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { signIn, signUp, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return; // Prevent double submission
    
    setIsSubmitting(true);
    
    try {
      if (mode === 'login') {
        await signIn(email, password);
      } else {
        if (!acceptTerms) {
          alert('You must accept the Terms of Service and Privacy Policy to create an account.');
          return;
        }
        await signUp(email, password, firstName, lastName, role, phoneNumber, acceptMarketing);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isFormLoading = loading || isSubmitting;

  return (
    <div className="card-elevated p-8 max-w-md w-full animate-scale-in">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
        {mode === 'login' ? 'Welcome back' : 'Create your account'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {mode === 'signup' && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input-field"
                  disabled={isFormLoading}
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input-field"
                  disabled={isFormLoading}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">I am a:</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  disabled={isFormLoading}
                  className={`flex flex-col items-center px-6 py-4 border-2 rounded-lg focus:outline-none transition-all duration-200 font-medium ${
                    role === 'client'
                      ? 'bg-sky-50 border-brand-primary text-brand-primary'
                      : 'border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                  } ${isFormLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => setRole('client')}
                >
                  <User size={24} className="mb-2" />
                  Client
                </button>
                <button
                  type="button"
                  disabled={isFormLoading}
                  className={`flex flex-col items-center px-6 py-4 border-2 rounded-lg focus:outline-none transition-all duration-200 font-medium ${
                    role === 'photographer'
                      ? 'bg-sky-50 border-brand-primary text-brand-primary'
                      : 'border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                  } ${isFormLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => setRole('photographer')}
                >
                  <Camera size={24} className="mb-2" />
                  Photographer
                </button>
              </div>
            </div>
          </>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            placeholder="Enter your email"
            disabled={isFormLoading}
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field pr-12"
              placeholder={mode === 'login' ? 'Enter your password' : 'Create a password'}
              disabled={isFormLoading}
              required
            />
            <button
              type="button"
              disabled={isFormLoading}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none disabled:opacity-50"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {mode === 'signup' && (
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number <span className="text-gray-500 text-xs">(Optional)</span>
            </label>
            <input
              id="phoneNumber"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="input-field"
              placeholder="Enter your phone number"
              disabled={isFormLoading}
            />
            <p className="text-xs text-gray-500 mt-1">
              Used for booking confirmations and urgent communications only
            </p>
          </div>
        )}

        {mode === 'signup' && (
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start space-x-3">
              <input
                id="acceptTerms"
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="mt-1 h-4 w-4 text-brand-primary focus:ring-brand-primary border-gray-300 rounded"
                disabled={isFormLoading}
                required
              />
              <label htmlFor="acceptTerms" className="text-sm text-gray-700 leading-tight">
                I agree to the{' '}
                <Link to="/terms" className="text-brand-primary hover:text-blue-600 underline" target="_blank">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-brand-primary hover:text-blue-600 underline" target="_blank">
                  Privacy Policy
                </Link>
                . I understand how my personal data will be used.
              </label>
            </div>
            
            <div className="flex items-start space-x-3">
              <input
                id="acceptMarketing"
                type="checkbox"
                checked={acceptMarketing}
                onChange={(e) => setAcceptMarketing(e.target.checked)}
                className="mt-1 h-4 w-4 text-brand-primary focus:ring-brand-primary border-gray-300 rounded"
                disabled={isFormLoading}
              />
              <label htmlFor="acceptMarketing" className="text-sm text-gray-600 leading-tight">
                I would like to receive updates about new features, photography tips, and special offers <span className="text-gray-500">(Optional)</span>
              </label>
            </div>
          </div>
        )}

        {mode === 'login' && (
          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm text-brand-primary hover:text-blue-600 font-medium"
            >
              Forgot your password?
            </Link>
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          isLoading={isFormLoading}
          disabled={isFormLoading}
          className="mt-8"
        >
          {isFormLoading 
            ? (mode === 'login' ? 'Signing In...' : 'Creating Account...') 
            : (mode === 'login' ? 'Sign In' : 'Create Account')
          }
        </Button>
      </form>

      <div className="mt-8 text-center">
        {mode === 'login' ? (
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-brand-primary hover:text-blue-600 font-semibold">
              Sign up
            </Link>
          </p>
        ) : (
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-primary hover:text-blue-600 font-semibold">
              Sign in
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;