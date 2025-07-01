import React, { useState } from 'react';
import { Search, Filter, Heart, Star, MapPin, Camera, Phone, MessageCircle, Calendar, Award } from 'lucide-react';

const MobilePhotographyServices = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'All', name: 'All', icon: '📸' },
    { id: 'Wedding', name: 'Wedding', icon: '💒' },
    { id: 'Portrait', name: 'Portrait', icon: '🤳' },
    { id: 'Event', name: 'Event', icon: '🎉' },
    { id: 'Product', name: 'Product', icon: '📦' },
    { id: 'Fashion', name: 'Fashion', icon: '👗' },
    { id: 'Nature', name: 'Nature', icon: '🌿' }
  ];

  const photographers = [
    {
      id: 1,
      name: 'Arjun Mehta',
      location: 'Mumbai, Maharashtra',
      speciality: 'Wedding Photography',
      rating: 4.9,
      reviews: 127,
      price: '₹25,000',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=200&fit=crop',
      tags: ['Wedding', 'Traditional', 'Candid'],
      verified: true,
      responseTime: '2 hours',
      completedProjects: 150
    },
    {
      id: 2,
      name: 'Priya Sharma',
      location: 'Delhi, NCR',
      speciality: 'Portrait & Fashion',
      rating: 4.8,
      reviews: 89,
      price: '₹15,000',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      coverImage: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=200&fit=crop',
      tags: ['Portrait', 'Fashion', 'Editorial'],
      verified: true,
      responseTime: '1 hour',
      completedProjects: 89
    },
    {
      id: 3,
      name: 'Ravi Krishnan',
      location: 'Bangalore, Karnataka',
      speciality: 'Product Photography',
      rating: 4.7,
      reviews: 156,
      price: '₹8,000',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      coverImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=200&fit=crop',
      tags: ['Product', 'Commercial', 'E-commerce'],
      verified: true,
      responseTime: '30 mins',
      completedProjects: 200
    }
  ];

  const filteredPhotographers = photographers.filter(photographer => {
    const matchesCategory = activeCategory === 'All' || photographer.tags.includes(activeCategory);
    const matchesSearch = photographer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         photographer.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         photographer.speciality.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <div className="px-4 py-6">
          <h1 className="text-2xl font-bold text-center mb-4">
            Find Top Photographers
          </h1>
          
          {/* Mobile Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search photographers or cities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
          </div>

          {/* Mobile Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xl font-bold">2,500+</div>
              <div className="text-sm opacity-90">Photographers</div>
            </div>
            <div>
              <div className="text-xl font-bold">15K+</div>
              <div className="text-sm opacity-90">Happy Clients</div>
            </div>
            <div>
              <div className="text-xl font-bold">8K+</div>
              <div className="text-sm opacity-90">Events</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Category Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <h2 className="font-semibold text-gray-900">Categories</h2>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-orange-600 text-sm"
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
        
        <div className="flex gap-2 px-4 pb-3 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category.id
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Photographers List */}
      <div className="px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">
            {filteredPhotographers.length} Photographers Found
          </h3>
        </div>

        <div className="space-y-4">
          {filteredPhotographers.map((photographer) => (
            <div key={photographer.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Cover Image */}
              <div className="relative h-32">
                <img
                  src={photographer.coverImage}
                  alt="Portfolio"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <button className="p-2 bg-white rounded-full shadow-lg">
                    <Heart className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Photographer Info */}
              <div className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="relative">
                    <img
                      src={photographer.image}
                      alt={photographer.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-orange-200"
                    />
                    {photographer.verified && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                        <Award className="w-2 h-2 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{photographer.name}</h4>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {photographer.location}
                    </p>
                    <p className="text-sm text-orange-600 font-medium">{photographer.speciality}</p>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">{photographer.price}</div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-600">{photographer.rating} ({photographer.reviews})</span>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {photographer.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Quick Stats */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Responds in {photographer.responseTime}
                  </span>
                  <span>{photographer.completedProjects} projects completed</span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors">
                    View Portfolio
                  </button>
                  <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Phone className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <MessageCircle className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {filteredPhotographers.length > 0 && (
          <div className="text-center mt-6">
            <button className="px-6 py-3 bg-white border border-orange-500 text-orange-500 rounded-lg font-medium hover:bg-orange-50 transition-colors">
              Load More Photographers
            </button>
          </div>
        )}

        {/* No Results */}
        {filteredPhotographers.length === 0 && (
          <div className="text-center py-12">
            <Camera className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No photographers found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="px-6 py-3 bg-orange-500 text-white rounded-lg font-medium"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Mobile CTA Section */}
      <div className="bg-gradient-to-r from-orange-600 to-red-700 text-white px-4 py-8 mx-4 mb-6 rounded-xl">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Ready to Get Started?</h2>
          <p className="text-orange-100 mb-4">
            Post your project and get quotes from top photographers
          </p>
          <div className="space-y-3">
            <button className="w-full bg-white text-orange-600 py-3 rounded-lg font-semibold">
              Post Your Project
            </button>
            <button className="w-full border-2 border-white text-white py-3 rounded-lg font-semibold">
              Join as Photographer
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Spacing for Mobile Navigation */}
      <div className="h-20"></div>
    </div>
  );
};

export default MobilePhotographyServices;
