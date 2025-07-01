import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Calendar, MessageSquare, User, Briefcase, Heart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const MobileBottomNav = () => {
  const location = useLocation();
  const { user } = useAuth();

  if (!user) return null;

  const getNavItems = () => {
    if (user.role === 'photographer') {
      return [
        { name: 'Home', href: '/dashboard/photographer', icon: Home },
        { name: 'CRM', href: '/crm', icon: Briefcase },
        { name: 'Bookings', href: '/bookings', icon: Calendar },
        { name: 'Messages', href: '/messages', icon: MessageSquare },
        { name: 'Profile', href: '/profile', icon: User },
      ];
    } else {
      return [
        { name: 'Discover', href: '/dashboard/client', icon: Home },
        { name: 'Explore', href: '/explore', icon: Search },
        { name: 'Bookings', href: '/bookings', icon: Calendar },
        { name: 'Messages', href: '/messages', icon: MessageSquare },
        { name: 'Profile', href: '/profile', icon: User },
      ];
    }
  };

  const navItems = getNavItems();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href || 
                          (item.href !== '/dashboard/photographer' && item.href !== '/dashboard/client' && location.pathname.startsWith(item.href));
          const IconComponent = item.icon;
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
                isActive
                  ? 'text-brand-primary'
                  : 'text-gray-500 active:text-gray-700'
              }`}
            >
              <IconComponent size={20} />
              <span className="text-xs font-medium">{item.name}</span>
              {item.name === 'Messages' && (
                <div className="absolute top-1 right-1/4 w-2 h-2 bg-red-500 rounded-full"></div>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;