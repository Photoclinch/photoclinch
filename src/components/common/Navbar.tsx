import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, Camera, User, LogOut, Crown } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleProfileMenu = () => setProfileMenuOpen(!profileMenuOpen);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <img 
                src="/logo.png.png" 
                alt="PhotoClinch Logo" 
                className="h-8 w-8 md:h-10 md:w-10 rounded-lg shadow-sm bg-white p-1 object-contain align-middle mr-2"
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}
              />
              <span className="text-xl font-bold text-gray-900 align-middle" style={{lineHeight: '1.2'}}>
                PhotoClinch
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/photography-services"
              className="text-gray-700 hover:text-sky-600 font-medium transition-colors duration-200"
            >
              Photography Services
            </Link>
            <Link
              to="/explore"
              className="text-gray-700 hover:text-sky-600 font-medium transition-colors duration-200"
            >
              Browse Photographers
            </Link>
            <Link
              to="/how-it-works"
              className="text-gray-700 hover:text-sky-600 font-medium transition-colors duration-200"
            >
              How It Works
            </Link>
            <Link
              to="/pricing"
              className="text-gray-700 hover:text-sky-600 font-medium transition-colors duration-200"
            >
              Pricing
            </Link>
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  className="flex items-center text-sm focus:outline-none group"
                  onClick={toggleProfileMenu}
                >
                  <div className="h-10 w-10 rounded-full bg-sky-500 flex items-center justify-center border-2 border-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {user.avatarUrl ? (
                      <img 
                        src={user.avatarUrl} 
                        alt={`${user.firstName} ${user.lastName}`}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <span className="font-semibold text-white text-sm">
                        {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                      </span>
                    )}
                  </div>
                  <span className="ml-3 text-sm font-medium text-gray-900">{user.firstName}</span>
                </button>

                {profileMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-xl shadow-lg py-2 bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center transition-colors duration-200"
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      <User size={16} className="mr-3 text-gray-400" />
                      Dashboard
                    </Link>
                    {user.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center transition-colors duration-200"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        <Crown size={16} className="mr-3 text-yellow-600" />
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center transition-colors duration-200"
                      onClick={handleSignOut}
                    >
                      <LogOut size={16} className="mr-3 text-gray-400" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/post-project"
                  className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Post Project
                </Link>
                <Link
                  to="/join-photographer"
                  className="border border-sky-500 text-sky-600 hover:bg-sky-50 px-6 py-2 rounded-lg font-medium transition-all duration-300"
                >
                  Join as Photographer
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none transition-colors duration-200"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/photography-services"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-sky-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              Photography Services
            </Link>
            <Link
              to="/explore"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-sky-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              Browse Photographers
            </Link>
            <Link
              to="/how-it-works"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-sky-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              How It Works
            </Link>
            <Link
              to="/pricing"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-sky-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </Link>
            
            <div className="border-t border-gray-200 pt-4 pb-3">
              {user ? (
                <>
                  <div className="flex items-center px-3 mb-3">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-full bg-sky-500 flex items-center justify-center">
                        {user.avatarUrl ? (
                          <img 
                            src={user.avatarUrl} 
                            alt={`${user.firstName} ${user.lastName}`}
                            className="h-12 w-12 rounded-full object-cover"
                          />
                        ) : (
                          <span className="font-semibold text-white">
                            {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-base font-medium text-gray-900">
                        {user.firstName} {user.lastName}
                      </div>
                      <div className="text-sm font-medium text-gray-500">{user.email}</div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Link
                      to="/dashboard"
                      className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-sky-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Link>
                    {user.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-sky-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                        onClick={() => setIsOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-sky-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                      onClick={handleSignOut}
                    >
                      Sign out
                    </button>
                  </div>
                </>
              ) : (
                <div className="space-y-2 px-3">
                  <Link
                    to="/post-project"
                    className="block w-full bg-sky-500 text-white py-3 rounded-lg font-medium text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Post Project
                  </Link>
                  <Link
                    to="/join-photographer"
                    className="block w-full border border-sky-500 text-sky-600 py-3 rounded-lg font-medium text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Join as Photographer
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;