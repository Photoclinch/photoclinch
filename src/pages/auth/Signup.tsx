import AuthForm from '../../components/auth/AuthForm';
import { Link, Navigate } from 'react-router-dom';
import { Camera } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Signup = () => {
  const { user, loading } = useAuth();

  // If user is already logged in, redirect to appropriate dashboard
  if (!loading && user) {
    if (user.role === 'photographer') {
      return <Navigate to="/dashboard/photographer" replace />;
    } else if (user.role === 'client') {
      return <Navigate to="/dashboard/client" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-50 flex items-center justify-center py-12 px-6">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 rounded-xl bg-gradient-to-r from-sky-400 to-sky-500 flex items-center justify-center shadow-lg">
              <Camera className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Join PhotoClinch</h2>
          <p className="text-lg text-gray-600">
            Create your account and start your photography journey
          </p>
        </div>
        <AuthForm mode="signup" />
      </div>
    </div>
  );
};

export default Signup;