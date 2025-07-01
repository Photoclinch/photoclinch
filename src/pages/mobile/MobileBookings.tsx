import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Camera, MessageSquare, Star } from 'lucide-react';
import MobileLayout from '../../components/mobile/MobileLayout';
import { useAuth } from '../../context/AuthContext';

const MobileBookings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('upcoming');

  const bookings = [
    {
      id: 1,
      photographerName: 'Arjun Mehta',
      photographerImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
      eventType: 'Wedding Photography',
      date: '2025-01-20',
      time: '10:00 AM',
      location: 'Juhu Beach, Mumbai',
      status: 'confirmed',
      price: '₹25,000',
      rating: 4.9
    },
    {
      id: 2,
      photographerName: 'Priya Sharma',
      photographerImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
      eventType: 'Portrait Session',
      date: '2025-01-15',
      time: '2:00 PM',
      location: 'Central Park, Delhi',
      status: 'pending',
      price: '₹8,000',
      rating: 4.8
    },
    {
      id: 3,
      photographerName: 'Vikram Singh',
      photographerImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
      eventType: 'Corporate Event',
      date: '2024-12-28',
      time: '11:00 AM',
      location: 'Tech Park, Bangalore',
      status: 'completed',
      price: '₹12,000',
      rating: 4.7
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const bookingDate = new Date(booking.date);
    const today = new Date();
    
    switch (activeTab) {
      case 'upcoming':
        return bookingDate >= today && booking.status !== 'completed';
      case 'past':
        return bookingDate < today || booking.status === 'completed';
      case 'pending':
        return booking.status === 'pending';
      default:
        return true;
    }
  });

  return (
    <MobileLayout title="My Bookings">
      <div className="flex flex-col h-full">
        {/* Tabs */}
        <div className="bg-white border-b border-gray-200">
          <div className="flex">
            {['upcoming', 'past', 'pending'].map((tab) => (
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
                {tab === 'pending' && (
                  <span className="ml-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {bookings.filter(b => b.status === 'pending').length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Bookings List */}
        <div className="flex-1 overflow-y-auto">
          {filteredBookings.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <Calendar size={64} className="text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No {activeTab} bookings
              </h3>
              <p className="text-gray-600 mb-6">
                {activeTab === 'upcoming' 
                  ? "You don't have any upcoming bookings yet."
                  : activeTab === 'past'
                  ? "You don't have any past bookings."
                  : "You don't have any pending bookings."
                }
              </p>
              {activeTab === 'upcoming' && (
                <Link
                  to="/explore"
                  className="bg-sky-500 text-white px-6 py-3 rounded-xl font-medium active:scale-95 transition-transform"
                >
                  Find Photographers
                </Link>
              )}
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {filteredBookings.map((booking) => (
                <div key={booking.id} className="bg-white rounded-xl shadow-sm border border-gray-200">
                  {/* Header */}
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <img
                          src={booking.photographerImage}
                          alt={booking.photographerName}
                          className="w-12 h-12 rounded-full mr-3"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {booking.photographerName}
                          </h3>
                          <div className="flex items-center text-sm text-gray-600">
                            <Star size={14} className="text-yellow-400 fill-current mr-1" />
                            {booking.rating}
                          </div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>
                    
                    <h4 className="font-medium text-gray-900 mb-2">
                      {booking.eventType}
                    </h4>
                  </div>

                  {/* Details */}
                  <div className="p-4 space-y-3">
                    <div className="flex items-center text-gray-600">
                      <Calendar size={16} className="mr-3" />
                      <span>{new Date(booking.date).toLocaleDateString('en-IN', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <Clock size={16} className="mr-3" />
                      <span>{booking.time}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <MapPin size={16} className="mr-3" />
                      <span>{booking.location}</span>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <span className="text-lg font-bold text-gray-900">
                        {booking.price}
                      </span>
                      <div className="flex space-x-2">
                        <Link
                          to={`/chat/${booking.id}`}
                          className="p-2 bg-gray-100 rounded-lg active:scale-95 transition-transform"
                        >
                          <MessageSquare size={16} className="text-gray-600" />
                        </Link>
                        <Link
                          to={`/portfolio/${booking.id}`}
                          className="p-2 bg-gray-100 rounded-lg active:scale-95 transition-transform"
                        >
                          <Camera size={16} className="text-gray-600" />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-4 border-t border-gray-100">
                    {booking.status === 'pending' && (
                      <div className="flex space-x-3">
                        <button className="flex-1 bg-red-500 text-white py-3 rounded-xl font-medium active:scale-95 transition-transform">
                          Cancel
                        </button>
                        <button className="flex-1 bg-sky-500 text-white py-3 rounded-xl font-medium active:scale-95 transition-transform">
                          Confirm
                        </button>
                      </div>
                    )}
                    
                    {booking.status === 'confirmed' && (
                      <div className="flex space-x-3">
                        <Link
                          to={`/chat/${booking.id}`}
                          className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium text-center active:scale-95 transition-transform"
                        >
                          Message
                        </Link>
                        <button className="flex-1 bg-sky-500 text-white py-3 rounded-xl font-medium active:scale-95 transition-transform">
                          View Details
                        </button>
                      </div>
                    )}
                    
                    {booking.status === 'completed' && (
                      <div className="flex space-x-3">
                        <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium active:scale-95 transition-transform">
                          Download Photos
                        </button>
                        <button className="flex-1 bg-sky-500 text-white py-3 rounded-xl font-medium active:scale-95 transition-transform">
                          Leave Review
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  );
};

export default MobileBookings;