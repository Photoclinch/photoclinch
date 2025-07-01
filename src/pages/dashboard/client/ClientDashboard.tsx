import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { Search, Filter, Star, MapPin, Camera, Heart, Calendar, MessageSquare, TrendingUp, Users } from 'lucide-react';
import DashboardLayout from '../../../components/layout/DashboardLayout';

interface Photographer {
  id: string;
  name: string;
  location: string;
  category: string;
  rating: number;
  reviews: number;
  price: string;
  image: string;
  portfolio: string;
  specialties: string[];
  verified: boolean;
  featured: boolean;
}

const ClientDashboard = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [loading, setLoading] = useState(true);
  const [photographers, setPhotographers] = useState<Photographer[]>([]);

  // Mock data - replace with actual Supabase queries
  const mockPhotographers: Photographer[] = [
    {
      id: '1',
      name: 'Arjun Mehta',
      location: 'Mumbai',
      category: 'Wedding',
      rating: 4.9,
      reviews: 127,
      price: '₹15,000',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
      portfolio: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=400',
      specialties: ['Wedding', 'Pre-wedding', 'Engagement'],
      verified: true,
      featured: true
    },
    {
      id: '2',
      name: 'Priya Sharma',
      location: 'Delhi',
      category: 'Portrait',
      rating: 4.8,
      reviews: 89,
      price: '₹8,000',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
      portfolio: 'https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?auto=compress&cs=tinysrgb&w=400',
      specialties: ['Portrait', 'Fashion', 'Lifestyle'],
      verified: true,
      featured: true
    },
    {
      id: '3',
      name: 'Vikram Singh',
      location: 'Bangalore',
      category: 'Event',
      rating: 4.7,
      reviews: 156,
      price: '₹12,000',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
      portfolio: 'https://images.pexels.com/photos/2174656/pexels-photo-2174656.jpeg?auto=compress&cs=tinysrgb&w=400',
      specialties: ['Corporate Events', 'Conferences', 'Product Launch'],
      verified: true,
      featured: false
    },
    {
      id: '4',
      name: 'Ananya Das',
      location: 'Chennai',
      category: 'Fashion',
      rating: 4.9,
      reviews: 203,
      price: '₹20,000',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300',
      portfolio: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400',
      specialties: ['Fashion', 'Editorial', 'Commercial'],
      verified: true,
      featured: true
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'wedding', name: 'Wedding' },
    { id: 'portrait', name: 'Portrait' },
    { id: 'event', name: 'Event' },
    { id: 'commercial', name: 'Commercial' },
    { id: 'fashion', name: 'Fashion' },
  ];

  const locations = [
    'All Locations', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune'
  ];

  const stats = [
    { name: 'Bookings', value: '3', icon: Calendar, color: 'bg-blue-100 text-blue-600' },
    { name: 'Favorites', value: '12', icon: Heart, color: 'bg-red-100 text-red-600' },
    { name: 'Messages', value: '5', icon: MessageSquare, color: 'bg-green-100 text-green-600' },
    { name: 'Reviews', value: '8', icon: Star, color: 'bg-yellow-100 text-yellow-600' },
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setPhotographers(mockPhotographers);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredPhotographers = photographers.filter(photographer => {
    const matchesSearch = photographer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         photographer.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || photographer.category.toLowerCase() === selectedCategory;
    const matchesLocation = selectedLocation === 'All Locations' || photographer.location === selectedLocation;
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const featuredPhotographers = photographers.filter(p => p.featured);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-brand-primary to-blue-600 rounded-xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-blue-100 mb-4">
            Discover amazing photographers for your next project
          </p>
          <div className="flex items-center text-blue-100">
            <TrendingUp size={16} className="mr-2" />
            <span className="text-sm">500+ verified photographers available</span>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Find Your Perfect Photographer</h2>
          
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search photographers, styles, or specialties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
            >
              {locations.map(location => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>

            <select className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary">
              <option>All Prices</option>
              <option>Under ₹10,000</option>
              <option>₹10,000 - ₹20,000</option>
              <option>Above ₹20,000</option>
            </select>
          </div>
        </div>

        {/* Featured Photographers */}
        {featuredPhotographers.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Featured Photographers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPhotographers.slice(0, 3).map((photographer) => (
                <div key={photographer.id} className="group cursor-pointer">
                  <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                    <img
                      src={photographer.portfolio}
                      alt={`${photographer.name}'s work`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute top-3 right-3">
                      <div className="bg-brand-mint text-white px-2 py-1 rounded-full text-xs font-medium">
                        Featured
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center mb-2">
                    <img
                      src={photographer.image}
                      alt={photographer.name}
                      className="h-10 w-10 rounded-full object-cover mr-3"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{photographer.name}</h3>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin size={14} className="mr-1" />
                        {photographer.location}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star size={14} className="text-yellow-400 fill-current mr-1" />
                      <span className="text-sm text-gray-600">{photographer.rating}</span>
                    </div>
                    <span className="font-semibold text-gray-900">{photographer.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Photographers */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              {filteredPhotographers.length} Photographers Found
            </h2>
            <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary">
              <option>Sort by Rating</option>
              <option>Sort by Price (Low to High)</option>
              <option>Sort by Price (High to Low)</option>
              <option>Sort by Experience</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotographers.map((photographer) => (
              <div
                key={photographer.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                {/* Portfolio Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={photographer.portfolio}
                    alt={`${photographer.name}'s work`}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    {photographer.verified && (
                      <div className="bg-brand-mint text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                        <Camera className="h-3 w-3 mr-1" />
                        Verified
                      </div>
                    )}
                  </div>
                  <button className="absolute top-4 left-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                    <Heart size={16} className="text-gray-600" />
                  </button>
                </div>

                {/* Photographer Info */}
                <div className="p-4">
                  <div className="flex items-center mb-3">
                    <img
                      src={photographer.image}
                      alt={photographer.name}
                      className="h-12 w-12 rounded-full object-cover mr-3"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{photographer.name}</h3>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin size={14} className="mr-1" />
                        {photographer.location}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={`${
                            i < Math.floor(photographer.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {photographer.rating} ({photographer.reviews} reviews)
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {photographer.specialties.slice(0, 2).map((specialty, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-brand-gray text-brand-primary text-xs rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                    {photographer.specialties.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{photographer.specialties.length - 2} more
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-lg font-bold text-gray-900">{photographer.price}</span>
                      <span className="text-sm text-gray-600">/session</span>
                    </div>
                    <div className="flex space-x-2">
                      <Link
                        to={`/photographer/${photographer.id}`}
                        className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                      >
                        View Profile
                      </Link>
                      <Link
                        to={`/book/${photographer.id}`}
                        className="px-3 py-2 bg-brand-primary text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-8">
            <button className="bg-brand-primary hover:bg-blue-600 text-white px-8 py-3 rounded-lg transition-colors duration-200">
              Load More Photographers
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClientDashboard;