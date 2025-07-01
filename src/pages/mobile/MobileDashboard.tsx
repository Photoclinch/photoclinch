import { useAuth } from '../../context/AuthContext';
import { Camera, Calendar, Users, DollarSign, TrendingUp, Star, Clock, ArrowRight } from 'lucide-react';
import MobileLayout from '../../components/mobile/MobileLayout';
import { Link } from 'react-router-dom';

const MobileDashboard = () => {
  const { user } = useAuth();

  const quickActions = user?.role === 'photographer' 
    ? [
        { name: 'View Leads', href: '/crm', icon: Users, color: 'bg-blue-500' },
        { name: 'Manage Portfolio', href: '/portfolio', icon: Camera, color: 'bg-purple-500' },
        { name: 'Check Revenue', href: '/crm', icon: DollarSign, color: 'bg-green-500' },
        { name: 'Messages', href: '/messages', icon: Calendar, color: 'bg-orange-500' },
      ]
    : [
        { name: 'Find Photographers', href: '/explore', icon: Camera, color: 'bg-blue-500' },
        { name: 'My Bookings', href: '/bookings', icon: Calendar, color: 'bg-purple-500' },
        { name: 'Messages', href: '/messages', icon: Users, color: 'bg-green-500' },
        { name: 'Favorites', href: '/favorites', icon: Star, color: 'bg-orange-500' },
      ];

  const stats = user?.role === 'photographer'
    ? [
        { label: 'Active Leads', value: '12', icon: Users },
        { label: 'This Month', value: '₹45K', icon: DollarSign },
        { label: 'Bookings', value: '8', icon: Calendar },
        { label: 'Rating', value: '4.9', icon: Star },
      ]
    : [
        { label: 'Bookings', value: '3', icon: Calendar },
        { label: 'Favorites', value: '12', icon: Star },
        { label: 'Messages', value: '5', icon: Users },
        { label: 'Spent', value: '₹25K', icon: DollarSign },
      ];

  const recentActivity = user?.role === 'photographer'
    ? [
        { title: 'New lead from Priya Sharma', subtitle: 'Wedding photography inquiry', time: '2 hours ago', type: 'lead' },
        { title: 'Booking confirmed', subtitle: 'Corporate event - Tech Corp', time: '1 day ago', type: 'booking' },
        { title: 'Payment received', subtitle: '₹15,000 from Arjun Mehta', time: '2 days ago', type: 'payment' },
      ]
    : [
        { title: 'Booking confirmed', subtitle: 'Wedding shoot with Ravi Kumar', time: '2 hours ago', type: 'booking' },
        { title: 'New message', subtitle: 'From photographer Maya Singh', time: '4 hours ago', type: 'message' },
        { title: 'Review submitted', subtitle: 'Rated Arjun Mehta 5 stars', time: '1 day ago', type: 'review' },
      ];

  return (
    <MobileLayout title="Dashboard">
      <div className="p-4 space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-sky-100 mb-4">
            {user?.role === 'photographer' 
              ? 'Manage your photography business'
              : 'Find amazing photographers for your projects'
            }
          </p>
          <div className="flex items-center text-sky-100">
            <Clock size={16} className="mr-2" />
            <span className="text-sm">Last active: Today</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <stat.icon size={20} className="text-gray-400" />
                <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
              </div>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.href}
                className="bg-white rounded-xl p-4 shadow-sm active:scale-95 transition-transform"
              >
                <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center mb-3`}>
                  <action.icon size={24} className="text-white" />
                </div>
                <p className="font-medium text-gray-900">{action.name}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            <Link to="/activity" className="text-sky-500 text-sm font-medium">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">
                      {activity.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {activity.subtitle}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {activity.time}
                    </p>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${
                    activity.type === 'lead' ? 'bg-blue-500' :
                    activity.type === 'booking' ? 'bg-green-500' :
                    activity.type === 'payment' ? 'bg-purple-500' :
                    activity.type === 'message' ? 'bg-orange-500' :
                    'bg-yellow-500'
                  }`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        {user?.role === 'client' && (
          <div className="bg-sky-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Need a photographer?
            </h3>
            <p className="text-gray-600 mb-4">
              Browse our verified photographers and book instantly
            </p>
            <Link
              to="/explore"
              className="inline-flex items-center bg-sky-500 text-white px-6 py-3 rounded-xl font-medium active:scale-95 transition-transform"
            >
              Explore Photographers
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default MobileDashboard;