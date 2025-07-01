import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import { Search, Filter, Star, MapPin, Camera, Users, Award, Heart } from 'lucide-react';

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const categories = [
    { id: 'all', name: 'All Categories', icon: Camera },
    { id: 'wedding', name: 'Wedding', icon: Heart },
    { id: 'portrait', name: 'Portrait', icon: Users },
    { id: 'event', name: 'Event', icon: Award },
    { id: 'commercial', name: 'Commercial', icon: Camera },
    { id: 'fashion', name: 'Fashion', icon: Star },
  ];

  const locations = [
    'All Locations', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune'
  ];

  const photographers = [
    {
      id: 1,
      name: 'Arjun Mehta',
      location: 'Mumbai',
      category: 'Wedding',
      rating: 4.9,
      reviews: 127,
      price: '₹15,000',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
      portfolio: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=400',
      specialties: ['Wedding', 'Pre-wedding', 'Engagement'],
      experience: '8 years',
      verified: true
    },
    {
      id: 2,
      name: 'Priya Sharma',
      location: 'Delhi',
      category: 'Portrait',
      rating: 4.8,
      reviews: 89,
      price: '₹8,000',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
      portfolio: 'https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?auto=compress&cs=tinysrgb&w=400',
      specialties: ['Portrait', 'Fashion', 'Lifestyle'],
      experience: '5 years',
      verified: true
    },
    {
      id: 3,
      name: 'Vikram Singh',
      location: 'Bangalore',
      category: 'Event',
      rating: 4.7,
      reviews: 156,
      price: '₹12,000',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
      portfolio: 'https://images.pexels.com/photos/2174656/pexels-photo-2174656.jpeg?auto=compress&cs=tinysrgb&w=400',
      specialties: ['Corporate Events', 'Conferences', 'Product Launch'],
      experience: '6 years',
      verified: true
    },
    {
      id: 4,
      name: 'Ananya Das',
      location: 'Chennai',
      category: 'Fashion',
      rating: 4.9,
      reviews: 203,
      price: '₹20,000',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300',
      portfolio: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400',
      specialties: ['Fashion', 'Editorial', 'Commercial'],
      experience: '10 years',
      verified: true
    },
    {
      id: 5,
      name: 'Rahul Patel',
      location: 'Pune',
      category: 'Commercial',
      rating: 4.6,
      reviews: 74,
      price: '₹10,000',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300',
      portfolio: 'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=400',
      specialties: ['Product Photography', 'Architecture', 'Real Estate'],
      experience: '7 years',
      verified: true
    },
    {
      id: 6,
      name: 'Kavya Reddy',
      location: 'Hyderabad',
      category: 'Wedding',
      rating: 4.8,
      reviews: 142,
      price: '₹18,000',
      image: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=300',
      portfolio: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=400',
      specialties: ['Traditional Wedding', 'Candid', 'Destination Wedding'],
      experience: '9 years',
      verified: true
    }
  ];

  const filteredPhotographers = photographers.filter(photographer => {
    const matchesSearch = photographer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         photographer.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || photographer.category.toLowerCase() === selectedCategory;
    const matchesLocation = selectedLocation === 'All Locations' || photographer.location === selectedLocation;
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  if (isLoading) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-sky-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading amazing photographers...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-sky-500 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Discover Talented Photographers
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Browse through our curated collection of professional photographers and find the perfect match for your project
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto bg-white rounded-lg p-2 shadow-lg">
              <div className="flex items-center">
                <Search className="h-5 w-5 text-gray-400 ml-3" />
                <input
                  type="text"
                  placeholder="Search photographers, styles, or specialties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none"
                />
                <button className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-md transition-colors">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-gray-600" />
              <span className="font-medium text-gray-900">Filters:</span>
            </div>
            
            <div className="flex flex-wrap gap-4">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              {/* Location Filter */}
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                {locations.map(location => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>

              {/* Price Range Filter */}
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="all">All Prices</option>
                <option value="budget">Under ₹10,000</option>
                <option value="mid">₹10,000 - ₹20,000</option>
                <option value="premium">Above ₹20,000</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.slice(1).map((category, index) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-6 rounded-lg border-2 transition-all duration-300 hover:scale-105 animate-slide-up ${
                    selectedCategory === category.id
                      ? 'border-sky-500 bg-sky-50 text-sky-700'
                      : 'border-gray-200 hover:border-sky-300 hover:bg-sky-50'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <IconComponent className="h-8 w-8 mx-auto mb-2" />
                  <span className="text-sm font-medium">{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Photographers Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredPhotographers.length} Photographers Found
            </h2>
            <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500">
              <option>Sort by Rating</option>
              <option>Sort by Price (Low to High)</option>
              <option>Sort by Price (High to Low)</option>
              <option>Sort by Experience</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPhotographers.map((photographer, index) => (
              <div
                key={photographer.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
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
                      <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                        <Award className="h-3 w-3 mr-1" />
                        Verified
                      </div>
                    )}
                  </div>
                </div>

                {/* Photographer Info */}
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={photographer.image}
                      alt={photographer.name}
                      className="h-12 w-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{photographer.name}</h3>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-1" />
                        {photographer.location}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
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
                        className="px-2 py-1 bg-sky-100 text-sky-700 text-xs rounded-full"
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
                    <Link
                      to={`/photographer/${photographer.id}`}
                      className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-3 rounded-md transition-colors duration-200">
              Load More Photographers
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-sky-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-xl text-sky-100 mb-8">
            Post your requirements and let photographers come to you with custom proposals
          </p>
          <Link
            to="/request-quote"
            className="bg-white text-sky-600 hover:bg-sky-50 px-8 py-3 rounded-md font-medium transition-colors duration-200 inline-block"
          >
            Request Custom Quote
          </Link>
        </div>
      </section>
    </MainLayout>
  );
};

export default Explore;