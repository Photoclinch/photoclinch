import { ReactNode, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Menu, X, Home, Calendar, MessageSquare, User, Users, Settings, BarChart, LogOut, 
  Briefcase, Image, Bell, UserPlus, CheckSquare, DollarSign, Camera, Search, Heart
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import MobileBottomNav from '../mobile/MobileBottomNav';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const clientLinks = [
    { name: 'Discover', href: '/dashboard/client', icon: Search },
    { name: 'Explore All', href: '/explore', icon: Camera },
    { name: 'My Bookings', href: '/bookings', icon: Calendar },
    { name: 'Messages', href: '/messages', icon: MessageSquare },
    { name: 'Favorites', href: '/favorites', icon: Heart },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  const photographerLinks = [
    { name: 'Dashboard', href: '/dashboard/photographer', icon: Home },
    { name: 'Portfolio', href: '/portfolio', icon: Image },
    { name: 'Bookings', href: '/bookings', icon: Calendar },
    { name: 'Messages', href: '/messages', icon: MessageSquare },
    { name: 'CRM', href: '/crm', icon: Briefcase, submenu: [
      { name: 'Overview', href: '/crm', icon: Home },
      { name: 'Leads', href: '/crm/leads', icon: UserPlus },
      { name: 'Clients', href: '/crm/clients', icon: Users },
      { name: 'Projects', href: '/crm/projects', icon: Calendar },
      { name: 'Tasks', href: '/crm/tasks', icon: CheckSquare },
      { name: 'Revenue', href: '/crm/revenue', icon: DollarSign },
    ]},
    { name: 'Analytics', href: '/analytics', icon: BarChart },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  const adminLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Content', href: '/admin/content', icon: Image },
    { name: 'Reports', href: '/admin/reports', icon: BarChart },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const navLinks = user?.role === 'client' 
    ? clientLinks 
    : user?.role === 'photographer' 
      ? photographerLinks 
      : adminLinks;

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const isActiveLink = (href: string) => {
    if (href === '/crm') {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  const renderNavLink = (link: any, isSubmenu = false) => {
    const isActive = isActiveLink(link.href);
    const LinkIcon = link.icon;
    
    return (
      <Link
        key={link.name}
        to={link.href}
        className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 group ${
          isSubmenu ? 'ml-6 text-sm' : ''
        } ${
          isActive
            ? 'bg-sky-50 text-sky-700 shadow-sm'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        }`}
      >
        <LinkIcon size={20} className={`${isActive ? 'text-sky-600' : 'text-gray-500 group-hover:text-gray-700'} transition-colors duration-200`} />
        <span className="ml-3 font-medium">{link.name}</span>
        {link.name === 'Messages' && (
          <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
            3
          </span>
        )}
      </Link>
    );
  };

  const getDashboardTitle = () => {
    if (user?.role === 'client') {
      return 'Discover Photographers';
    } else if (user?.role === 'photographer') {
      return 'Photographer Dashboard';
    }
    return 'Dashboard';
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar for larger screens */}
      <aside 
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 fixed md:relative z-40 w-64 h-screen bg-white shadow-xl transition-transform duration-300 ease-in-out md:flex flex-col border-r border-gray-200`}
      >
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-brand-primary to-sky-500 p-2 rounded-lg">
              <Camera size={24} className="text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900">PhotoClinch</span>
          </Link>
          <button onClick={toggleSidebar} className="md:hidden text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="py-6 flex-grow overflow-y-auto">
          <nav className="px-4 space-y-2">
            {navLinks.map((link) => (
              <div key={link.name}>
                {renderNavLink(link)}
                {link.submenu && isActiveLink(link.href) && (
                  <div className="mt-2 space-y-1">
                    {link.submenu.map((sublink: any) => renderNavLink(sublink, true))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-200">
          {user && (
            <div className="mb-4 flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-brand-primary to-sky-500 flex items-center justify-center">
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
              <div className="ml-3">
                <p className="font-semibold text-gray-900">{user.firstName} {user.lastName}</p>
                <p className="text-xs text-gray-500 capitalize">{user.role}</p>
              </div>
            </div>
          )}
          <button
            onClick={handleSignOut}
            className="flex w-full items-center px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
          >
            <LogOut size={20} className="text-gray-500" />
            <span className="ml-3 font-medium">Sign out</span>
          </button>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        />
      )}

      {/* Main content */}
      <div className="flex flex-col flex-1 w-full">
        {/* Top header */}
        <header className="bg-white shadow-sm z-10 border-b border-gray-200">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={toggleSidebar}
                className="md:hidden mr-3 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <Menu size={24} />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">
                {getDashboardTitle()}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-500 hover:text-gray-700 relative">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500"></span>
              </button>
              <div className="md:hidden h-8 w-8 rounded-full bg-gradient-to-r from-brand-primary to-sky-500 flex items-center justify-center">
                {user?.avatarUrl ? (
                  <img 
                    src={user.avatarUrl} 
                    alt={`${user.firstName} ${user.lastName}`}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <span className="font-semibold text-white text-xs">
                    {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto bg-gray-50">
          {children}
        </main>

        {/* Mobile navigation for dashboard */}
        <div className="md:hidden">
          <MobileBottomNav />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;