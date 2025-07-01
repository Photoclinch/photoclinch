import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Star, MapPin, Heart, Camera } from 'lucide-react';
import MobileLayout from '../../components/mobile/MobileLayout';

const MobileExplore = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'wedding', name: 'Wedding' },
    { id: 'portrait', name: 'Portrait' },
    { id: 'event', name: 'Event' },
    { id: 'commercial', name: 'Commercial' },
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
      verified: true,
      liked: false
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
      verified: true,
      liked: true
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
      verified: true,
      liked: false
    },
  ];

  const filteredPhotographers = photographers.filter(photographer => {
    const matchesSearch = photographer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || photographer.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <MobileLayout title="Explore">
      <div className="flex flex-col h-full">
        {/* Search Header */}
        <div className="bg-white p-4 border-b border-gray-200">
          <div className="relative mb-4">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search photographers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
          
          {/* Category Filter */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-sky-500 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Photographers List */}
        <div className="flex-1 p-4 space-y-4">
          {filteredPhotographers.map((photographer) => (
            <div key={photographer.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Portfolio Image */}
              <div className="relative h-48">
                <img
                  src={photographer.portfolio}
                  alt={`${photographer.name}'s work`}
                  className="w-full h-full object-cover"
                />
                <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                  <Heart 
                    size={16} 
                    className={photographer.liked ? 'text-red-500 fill-current' : 'text-gray-600'} 
                  />
                </button>
                {photographer.verified && (
                  <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Verified
                  </div>
                )}
              </div>

              {/* Photographer Info */}
              <div className="p-4">
                <div className="flex items-center mb-3">
                  <img
                    src={photographer.image}
                    alt={photographer.name}
                    className="w-12 h-12 rounded-full object-cover mr-3"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{photographer.name}</h3>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin size={14} className="mr-1" />
                      {photographer.location}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">{photographer.price}</div>
                    <div className="text-xs text-gray-500">per session</div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="flex items-center mr-2">
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
                    <span className="text-sm text-gray-600">
                      {photographer.rating} ({photographer.reviews})
                    </span>
                  </div>
                  <span className="px-2 py-1 bg-sky-100 text-sky-700 text-xs rounded-full">
                    {photographer.category}
                  </span>
                </div>

                <div className="flex space-x-3">
                  <Link
                    to={`/portfolio/${photographer.id}`}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl text-center font-medium active:scale-95 transition-transform"
                  >
                    View Portfolio
                  </Link>
                  <Link
                    to={`/booking/${photographer.id}`}
                    className="flex-1 bg-sky-500 text-white py-3 rounded-xl text-center font-medium active:scale-95 transition-transform"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
};

export default MobileExplore;