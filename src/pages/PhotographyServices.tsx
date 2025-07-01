import React, { useState, useEffect } from 'react';
import { Search, Filter, Heart, Star, MapPin, Camera, Users, Calendar, Award, Zap } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import MobilePhotographyServices from '../components/mobile/MobilePhotographyServices';

const PhotographyServices = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const categories = [
    { id: 'All', name: 'All', color: 'bg-purple-100 text-purple-700' },
    { id: 'Tamil Wedding', name: 'Tamil Wedding', color: 'bg-pink-100 text-pink-700' },
    { id: 'Kerala Wedding', name: 'Kerala Wedding', color: 'bg-green-100 text-green-700' },
    { id: 'Telugu Wedding', name: 'Telugu Wedding', color: 'bg-blue-100 text-blue-700' },
    { id: 'Kannada Wedding', name: 'Kannada Wedding', color: 'bg-yellow-100 text-yellow-700' },
    { id: 'Traditional Portrait', name: 'Traditional Portrait', color: 'bg-red-100 text-red-700' },
    { id: 'Temple Photography', name: 'Temple Photography', color: 'bg-emerald-100 text-emerald-700' }
  ];

  const featuredPhotographers = [
    {
      id: 1,
      name: 'Rajesh Photography',
      location: 'Chennai, Tamil Nadu',
      speciality: 'Tamil Traditional Weddings',
      rating: 4.9,
      reviews: 187,
      price: '₹45,000',
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face',
      portfolio: [
        'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1594736797933-d0401ba16ae1?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=300&fit=crop'
      ],
      tags: ['Tamil Wedding', 'Traditional', 'Temple Ceremony'],
      verified: true,
      featured: true
    },
    {
      id: 2,
      name: 'Arun Visuals',
      location: 'Kochi, Kerala',
      speciality: 'Kerala Wedding Photography',
      rating: 4.8,
      reviews: 156,
      price: '₹38,000',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      portfolio: [
        'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=300&fit=crop'
      ],
      tags: ['Kerala Wedding', 'Backwater Ceremony', 'Traditional'],
      verified: true,
      featured: true
    },
    {
      id: 3,
      name: 'Venkatesh Studios',
      location: 'Hyderabad, Telangana',
      speciality: 'Telugu Wedding Traditions',
      rating: 4.9,
      reviews: 203,
      price: '₹42,000',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      portfolio: [
        'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1594736797933-d0401ba16ae1?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=300&fit=crop'
      ],
      tags: ['Telugu Wedding', 'Pellikuthuru', 'Traditional'],
      verified: true,
      featured: true
    },
    {
      id: 4,
      name: 'Priya Photography',
      location: 'Bangalore, Karnataka',
      speciality: 'Kannada Wedding Ceremonies',
      rating: 4.7,
      reviews: 134,
      price: '₹35,000',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
      portfolio: [
        'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1594736797933-d0401ba16ae1?w=400&h=300&fit=crop'
      ],
      tags: ['Kannada Wedding', 'Traditional', 'Naandi'],
      verified: true,
      featured: false
    },
    {
      id: 5,
      name: 'Kumar Traditional Arts',
      location: 'Madurai, Tamil Nadu',
      speciality: 'Temple & Traditional Photography',
      rating: 4.8,
      reviews: 178,
      price: '₹28,000',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
      portfolio: [
        'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1594736797933-d0401ba16ae1?w=400&h=300&fit=crop'
      ],
      tags: ['Temple Photography', 'Traditional Portrait', 'Cultural'],
      verified: true,
      featured: true
    },
    {
      id: 6,
      name: 'Deepak Captures',
      location: 'Thiruvananthapuram, Kerala',
      speciality: 'Kerala Traditional Portraits',
      rating: 4.6,
      reviews: 112,
      price: '₹22,000',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face',
      portfolio: [
        'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1594736797933-d0401ba16ae1?w=400&h=300&fit=crop'
      ],
      tags: ['Traditional Portrait', 'Kerala Wedding', 'Saree Photography'],
      verified: true,
      featured: false
    },
    {
      id: 7,
      name: 'Srinivas Wedding Films',
      location: 'Vijayawada, Andhra Pradesh',
      speciality: 'Telugu Wedding Cinematography',
      rating: 4.9,
      reviews: 245,
      price: '₹55,000',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      portfolio: [
        'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1594736797933-d0401ba16ae1?w=400&h=300&fit=crop'
      ],
      tags: ['Telugu Wedding', 'Cinematography', 'Traditional'],
      verified: true,
      featured: true
    },
    {
      id: 8,
      name: 'Lakshmi Traditional Photography',
      location: 'Coimbatore, Tamil Nadu',
      speciality: 'Tamil Brahmin Weddings',
      rating: 4.8,
      reviews: 167,
      price: '₹40,000',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
      portfolio: [
        'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1594736797933-d0401ba16ae1?w=400&h=300&fit=crop'
      ],
      tags: ['Tamil Wedding', 'Brahmin Wedding', 'Traditional Rituals'],
      verified: true,
      featured: false
    }
  ];

  const serviceStats = [
    { icon: Camera, label: 'Indian Photographers', value: '1,200+' },
    { icon: Users, label: 'Weddings Captured', value: '8,500+' },
    { icon: Calendar, label: 'Traditional Ceremonies', value: '12,000+' },
    { icon: Award, label: 'Cultural Heritage Awards', value: '85+' }
  ];

  const filteredPhotographers = featuredPhotographers.filter(photographer => {
    const matchesCategory = activeCategory === 'All' || photographer.tags.includes(activeCategory);
    const matchesSearch = photographer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         photographer.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         photographer.speciality.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Use mobile component for mobile devices
  if (isMobile) {
    return <MobilePhotographyServices />;
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-100">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                India's Premier
                <span className="block bg-gradient-to-r from-sky-200 to-white bg-clip-text text-transparent">
                  Wedding Photographers
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-sky-100 mb-8 max-w-3xl mx-auto">
                Capturing the rich traditions of Tamil, Telugu, Malayalam, and Kannada weddings with authentic cultural storytelling
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto relative">
                <div className="flex items-center bg-white rounded-2xl shadow-2xl overflow-hidden">
                  <Search className="w-6 h-6 text-gray-400 ml-4" />
                  <input
                    type="text"
                    placeholder="Search Tamil, Telugu, Kerala, Kannada weddings..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 px-4 py-4 text-lg focus:outline-none"
                  />
                  <button className="bg-gradient-to-r from-sky-500 to-sky-700 text-white px-8 py-4 font-semibold hover:from-sky-600 hover:to-sky-800 transition-all duration-300">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-sky-400 rounded-full opacity-20 animate-bounce"></div>
          <div className="absolute bottom-10 right-10 w-16 h-16 bg-sky-600 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white rounded-full opacity-30"></div>
        </div>

        {/* Stats Section */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {serviceStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-sky-400 to-sky-600 rounded-full mb-4">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="bg-white sticky top-0 z-40 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Browse by Tradition</h2>
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Filter className="w-5 h-5" />
                <span>Filters</span>
              </button>
            </div>
            
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex-shrink-0 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-sky-500 to-sky-700 text-white shadow-lg transform scale-105'
                      : `${category.color} hover:shadow-md hover:scale-105`
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Photographers Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {activeCategory === 'All' ? 'All Photographers' : `${activeCategory} Photographers`}
              </h3>
              <p className="text-gray-600 mt-1">{filteredPhotographers.length} traditional photographers found</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPhotographers.map((photographer) => (
              <div key={photographer.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-sky-200">
                {/* Photographer Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={photographer.image}
                          alt={photographer.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-sky-200"
                        />
                        {photographer.verified && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                            <Zap className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                          {photographer.name}
                          {photographer.featured && (
                            <Award className="w-4 h-4 text-yellow-500" />
                          )}
                        </h4>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {photographer.location}
                        </p>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <Heart className="w-5 h-5 text-gray-400 hover:text-red-500" />
                    </button>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-700 font-medium">{photographer.speciality}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{photographer.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">({photographer.reviews} reviews)</span>
                      <span className="text-lg font-bold text-green-600 ml-auto">{photographer.price}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {photographer.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-sky-50 text-sky-600 rounded-full text-xs font-medium border border-sky-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Portfolio Grid */}
                <div className="grid grid-cols-3 gap-1 mb-4 px-6">
                  {photographer.portfolio.map((image, index) => (
                    <div key={index} className="aspect-square overflow-hidden rounded-lg">
                      <img
                        src={image}
                        alt={`Portfolio ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="p-6 pt-0">
                  <div className="flex gap-3">
                    <button className="flex-1 bg-gradient-to-r from-sky-500 to-sky-700 text-white py-3 rounded-lg font-semibold hover:from-sky-600 hover:to-sky-800 transition-all duration-300 transform hover:scale-105">
                      View Portfolio
                    </button>
                    <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {filteredPhotographers.length > 0 && (
            <div className="text-center mt-12">
              <button className="px-8 py-4 bg-white border-2 border-sky-500 text-sky-500 rounded-xl font-semibold hover:bg-sky-500 hover:text-white transition-all duration-300 transform hover:scale-105">
                Load More Photographers
              </button>
            </div>
          )}

          {/* No Results */}
          {filteredPhotographers.length === 0 && (
            <div className="text-center py-20">
              <Camera className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No photographers found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
              <button
                onClick={() => {
                  setActiveCategory('All');
                  setSearchQuery('');
                }}
                className="px-6 py-3 bg-gradient-to-r from-sky-500 to-sky-700 text-white rounded-lg font-semibold hover:from-sky-600 hover:to-sky-800 transition-all duration-300"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-sky-600 via-sky-700 to-sky-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Preserve Your Cultural Heritage Forever
              </h2>
              <p className="text-xl text-sky-100 mb-8 max-w-2xl mx-auto">
                Connect with photographers who understand the sacred traditions and rituals of Indian weddings
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-sky-600 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                  Plan Your Wedding
                </button>
                <button className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-sky-600 transition-all duration-300 transform hover:scale-105">
                  Join as Traditional Photographer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PhotographyServices;