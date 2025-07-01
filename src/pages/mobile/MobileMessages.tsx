import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Camera, Clock } from 'lucide-react';
import MobileLayout from '../../components/mobile/MobileLayout';

const MobileMessages = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const conversations = [
    {
      id: 1,
      name: 'Arjun Mehta',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
      lastMessage: 'Thanks for booking! Looking forward to your wedding shoot.',
      timestamp: '2 min ago',
      unread: 2,
      online: true,
      type: 'photographer'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
      lastMessage: 'I can do the portrait session on Saturday. What time works for you?',
      timestamp: '1 hour ago',
      unread: 0,
      online: false,
      type: 'photographer'
    },
    {
      id: 3,
      name: 'Vikram Singh',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
      lastMessage: 'The event photos are ready for download!',
      timestamp: '3 hours ago',
      unread: 1,
      online: true,
      type: 'photographer'
    },
    {
      id: 4,
      name: 'Maya Patel',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300',
      lastMessage: 'Could you share some more details about the commercial shoot?',
      timestamp: '1 day ago',
      unread: 0,
      online: false,
      type: 'photographer'
    },
    {
      id: 5,
      name: 'PhotoClinch Support',
      avatar: 'https://images.pexels.com/photos/3379943/pexels-photo-3379943.jpeg?auto=compress&cs=tinysrgb&w=300',
      lastMessage: 'How was your experience with your recent booking?',
      timestamp: '2 days ago',
      unread: 0,
      online: true,
      type: 'support'
    },
  ];

  const filteredConversations = conversations.filter(conversation =>
    conversation.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatTimestamp = (timestamp: string) => {
    // In a real app, you'd format this properly
    return timestamp;
  };

  return (
    <MobileLayout title="Messages">
      <div className="flex flex-col h-full">
        {/* Search */}
        <div className="bg-white p-4 border-b border-gray-200">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Camera size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No conversations yet
              </h3>
              <p className="text-gray-600 mb-6">
                Start a conversation with a photographer to see messages here
              </p>
              <Link
                to="/explore"
                className="bg-sky-500 text-white px-6 py-3 rounded-xl font-medium active:scale-95 transition-transform"
              >
                Find Photographers
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredConversations.map((conversation) => (
                <Link
                  key={conversation.id}
                  to={`/chat/${conversation.id}`}
                  className="flex items-center p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                >
                  {/* Avatar */}
                  <div className="relative mr-3">
                    <img
                      src={conversation.avatar}
                      alt={conversation.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {conversation.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {conversation.name}
                      </h3>
                      <div className="flex items-center">
                        <span className="text-xs text-gray-500 mr-2">
                          {formatTimestamp(conversation.timestamp)}
                        </span>
                        {conversation.unread > 0 && (
                          <div className="w-5 h-5 bg-sky-500 text-white text-xs rounded-full flex items-center justify-center">
                            {conversation.unread}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <p className="text-sm text-gray-600 truncate flex-1">
                        {conversation.lastMessage}
                      </p>
                      {conversation.type === 'photographer' && (
                        <Camera size={14} className="text-gray-400 ml-2 flex-shrink-0" />
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex space-x-3">
            <Link
              to="/explore"
              className="flex-1 bg-sky-500 text-white py-3 rounded-xl font-medium text-center active:scale-95 transition-transform"
            >
              Find Photographers
            </Link>
            <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium active:scale-95 transition-transform">
              <Search size={20} />
            </button>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default MobileMessages;