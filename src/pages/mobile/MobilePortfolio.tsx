import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Camera, Heart, Share, MessageSquare } from 'lucide-react';
import MobileLayout from '../../components/mobile/MobileLayout';

const MobilePortfolio = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('portfolio');
  const [liked, setLiked] = useState(false);

  // Mock data - replace with actual API call
  const photographer = {
    id: 1,
    name: 'Arjun Mehta',
    location: 'Mumbai, India',
    rating: 4.9,
    reviews: 127,
    price: '₹15,000',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
    bio: 'Professional wedding and portrait photographer with 8+ years of experience. Specializing in candid moments and artistic compositions.',
    specialties: ['Wedding', 'Portrait', 'Pre-wedding'],
    experience: '8 years',
    verified: true,
    portfolio: [
      'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/2174656/pexels-photo-2174656.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=400',
    ]
  };

  const reviews = [
    {
      id: 1,
      name: 'Priya Sharma',
      rating: 5,
      comment: 'Amazing photographer! Captured our wedding beautifully.',
      date: '2 weeks ago',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: 2,
      name: 'Vikram Singh',
      rating: 5,
      comment: 'Professional and creative. Highly recommended!',
      date: '1 month ago',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100'
    }
  ];

  const headerActions = (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => setLiked(!liked)}
        className="p-2 rounded-full bg-white/90"
      >
        <Heart 
          size={20} 
          className={liked ? 'text-red-500 fill-current' : 'text-gray-600'} 
        />
      </button>
      <button className="p-2 rounded-full bg-white/90">
        <Share size={20} className="text-gray-600" />
      </button>
    </div>
  );

  return (
    <MobileLayout showBottomNav={false} showHeader={false}>
      <div className="flex flex-col h-screen">
        {/* Hero Image with Header */}
        <div className="relative h-80">
          <img
            src={photographer.portfolio[0]}
            alt={photographer.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 pt-12">
            <Link to="/explore" className="p-2 rounded-full bg-white/90">
              <ArrowLeft size={20} className="text-gray-700" />
            </Link>
            {headerActions}
          </div>

          {/* Photographer Info Overlay */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center mb-2">
              <img
                src={photographer.image}
                alt={photographer.name}
                className="w-16 h-16 rounded-full border-2 border-white mr-4"
              />
              <div className="flex-1">
                <div className="flex items-center">
                  <h1 className="text-2xl font-bold mr-2">{photographer.name}</h1>
                  {photographer.verified && (
                    <div className="bg-green-500 w-6 h-6 rounded-full flex items-center justify-center">
                      <Camera size={12} className="text-white" />
                    </div>
                  )}
                </div>
                <div className="flex items-center text-white/90">
                  <MapPin size={16} className="mr-1" />
                  <span>{photographer.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white">
          {/* Stats */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex items-center mr-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${
                        i < Math.floor(photographer.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {photographer.rating} ({photographer.reviews} reviews)
                </span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{photographer.price}</div>
                <div className="text-sm text-gray-500">per session</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            {['portfolio', 'about', 'reviews'].map((tab) => (
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
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'portfolio' && (
              <div className="p-4">
                <div className="grid grid-cols-2 gap-3">
                  {photographer.portfolio.map((image, index) => (
                    <div key={index} className="aspect-square rounded-xl overflow-hidden">
                      <img
                        src={image}
                        alt={`Portfolio ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'about' && (
              <div className="p-4 space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">About</h3>
                  <p className="text-gray-600 leading-relaxed">{photographer.bio}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {photographer.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Experience</h3>
                  <p className="text-gray-600">{photographer.experience}</p>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="p-4 space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center mb-3">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{review.name}</h4>
                        <div className="flex items-center">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} size={14} className="text-yellow-400 fill-current" />
                          ))}
                          <span className="text-gray-500 text-sm ml-2">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex space-x-3">
            <Link
              to={`/chat/${photographer.id}`}
              className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl text-center font-medium flex items-center justify-center active:scale-95 transition-transform"
            >
              <MessageSquare size={20} className="mr-2" />
              Message
            </Link>
            <Link
              to={`/booking/${photographer.id}`}
              className="flex-1 bg-sky-500 text-white py-4 rounded-xl text-center font-medium active:scale-95 transition-transform"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default MobilePortfolio;