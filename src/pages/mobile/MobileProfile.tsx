import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Camera, Edit, Settings, Star, Award, MapPin, Phone, Mail, LogOut, ChevronRight } from 'lucide-react';
import MobileLayout from '../../components/mobile/MobileLayout';

const MobileProfile = () => {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  const stats = user?.role === 'photographer' 
    ? [
        { label: 'Projects', value: '24', icon: Camera },
        { label: 'Rating', value: '4.9', icon: Star },
        { label: 'Reviews', value: '127', icon: Award },
      ]
    : [
        { label: 'Bookings', value: '8', icon: Camera },
        { label: 'Reviews', value: '12', icon: Star },
        { label: 'Favorites', value: '25', icon: Award },
      ];

  const menuItems = [
    { icon: Edit, label: 'Edit Profile', href: '/profile/edit' },
    { icon: Settings, label: 'Settings', href: '/settings' },
    { icon: Star, label: 'Reviews & Ratings', href: '/reviews' },
    { icon: Award, label: 'Achievements', href: '/achievements' },
    { icon: Phone, label: 'Support', href: '/support' },
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <MobileLayout title="Profile">
      <div className="flex flex-col h-full">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-sky-500 to-blue-600 text-white p-6">
          <div className="flex items-center">
            <div className="relative">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                {user?.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold text-white">
                    {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                  </span>
                )}
              </div>
              <button className="absolute bottom-0 right-0 w-6 h-6 bg-white text-sky-500 rounded-full flex items-center justify-center">
                <Camera size={14} />
              </button>
            </div>
            
            <div className="ml-4 flex-1">
              <h1 className="text-xl font-bold">
                {user?.firstName} {user?.lastName}
              </h1>
              <p className="text-sky-100 capitalize mb-2">
                {user?.role}
              </p>
              <div className="flex items-center text-sky-100">
                <MapPin size={14} className="mr-1" />
                <span className="text-sm">Mumbai, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white -mt-6 mx-4 rounded-xl shadow-sm p-4 mb-6">
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <stat.icon size={20} className="text-sky-600" />
                </div>
                <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-white border-b border-gray-200 mx-4 rounded-t-xl">
          {['profile', 'activity'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 text-center font-medium capitalize ${
                activeTab === tab
                  ? 'text-sky-500 border-b-2 border-sky-500'
                  : 'text-gray-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 bg-white mx-4 rounded-b-xl overflow-y-auto">
          {activeTab === 'profile' && (
            <div className="p-4 space-y-4">
              {/* Contact Info */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Contact Information</h3>
                <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                  <Mail size={20} className="text-gray-400 mr-3" />
                  <span className="text-gray-700">{user?.email}</span>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                  <Phone size={20} className="text-gray-400 mr-3" />
                  <span className="text-gray-700">+91 98765 43210</span>
                </div>
              </div>

              {/* Menu Items */}
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900 mb-3">Account</h3>
                {menuItems.map((item, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center">
                      <item.icon size={20} className="text-gray-600 mr-3" />
                      <span className="text-gray-900">{item.label}</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                  </button>
                ))}
              </div>

              {/* Sign Out */}
              <button
                onClick={handleSignOut}
                className="w-full flex items-center justify-center p-4 bg-red-50 text-red-600 rounded-xl font-medium active:scale-95 transition-transform"
              >
                <LogOut size={20} className="mr-2" />
                Sign Out
              </button>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="p-4 space-y-4">
              <h3 className="font-semibold text-gray-900">Recent Activity</h3>
              
              {/* Activity Items */}
              <div className="space-y-3">
                {[
                  { action: 'Completed booking', detail: 'Wedding photography with Arjun Mehta', time: '2 hours ago' },
                  { action: 'Left review', detail: 'Rated Priya Sharma 5 stars', time: '1 day ago' },
                  { action: 'New booking', detail: 'Portrait session scheduled', time: '3 days ago' },
                  { action: 'Profile updated', detail: 'Added new profile photo', time: '1 week ago' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start p-3 bg-gray-50 rounded-xl">
                    <div className="w-2 h-2 bg-sky-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.detail}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  );
};

export default MobileProfile;