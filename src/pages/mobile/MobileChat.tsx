import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Camera, Image, Phone, Video, MoreVertical, Paperclip } from 'lucide-react';
import MobileLayout from '../../components/mobile/MobileLayout';

const MobileChat = () => {
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [showAttachments, setShowAttachments] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversation = {
    id: 1,
    name: 'Arjun Mehta',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
    online: true,
    type: 'photographer'
  };

  const messages = [
    {
      id: 1,
      senderId: 'other',
      content: 'Hi! Thanks for your interest in my photography services. I saw your booking request for a wedding shoot.',
      timestamp: '10:30 AM',
      type: 'text'
    },
    {
      id: 2,
      senderId: 'me',
      content: 'Hello! Yes, we\'re looking for a photographer for our wedding on January 20th. Could you tell me more about your packages?',
      timestamp: '10:32 AM',
      type: 'text'
    },
    {
      id: 3,
      senderId: 'other',
      content: 'Absolutely! I have several wedding packages. Let me share some of my recent work with you.',
      timestamp: '10:35 AM',
      type: 'text'
    },
    {
      id: 4,
      senderId: 'other',
      content: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=400',
      timestamp: '10:36 AM',
      type: 'image'
    },
    {
      id: 5,
      senderId: 'other',
      content: 'This was from a recent wedding I shot. I offer full-day coverage starting at ₹25,000 which includes pre-wedding consultation, ceremony and reception coverage, and edited photos delivered within 2 weeks.',
      timestamp: '10:37 AM',
      type: 'text'
    },
    {
      id: 6,
      senderId: 'me',
      content: 'Wow, these photos are beautiful! The lighting and composition are exactly what we\'re looking for.',
      timestamp: '10:40 AM',
      type: 'text'
    },
    {
      id: 7,
      senderId: 'me',
      content: 'What does the package include exactly? And do you have availability on January 20th?',
      timestamp: '10:41 AM',
      type: 'text'
    },
    {
      id: 8,
      senderId: 'other',
      content: 'Great! Yes, I\'m available on January 20th. The package includes:\n\n• 8-10 hours of coverage\n• 500+ edited photos\n• Online gallery for sharing\n• Print release\n• Backup photographer\n\nWould you like to schedule a call to discuss details?',
      timestamp: '10:45 AM',
      type: 'text'
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, you'd send this to your backend
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatMessage = (content: string, type: string) => {
    if (type === 'image') {
      return (
        <img
          src={content}
          alt="Shared image"
          className="max-w-full h-auto rounded-lg"
        />
      );
    }
    
    return content.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        {index < content.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  return (
    <MobileLayout showBottomNav={false} showHeader={false}>
      <div className="flex flex-col h-screen">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/messages')}
                className="p-2 -ml-2 rounded-full hover:bg-gray-100 mr-2"
              >
                <ArrowLeft size={20} className="text-gray-700" />
              </button>
              <div className="relative mr-3">
                <img
                  src={conversation.avatar}
                  alt={conversation.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                {conversation.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              <div>
                <h1 className="font-semibold text-gray-900">{conversation.name}</h1>
                <p className="text-sm text-gray-600">
                  {conversation.online ? 'Online' : 'Last seen recently'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Phone size={20} className="text-gray-600" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Video size={20} className="text-gray-600" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <MoreVertical size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                  msg.senderId === 'me'
                    ? 'bg-sky-500 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <div className="text-sm">
                  {formatMessage(msg.content, msg.type)}
                </div>
                <div
                  className={`text-xs mt-1 ${
                    msg.senderId === 'me' ? 'text-sky-100' : 'text-gray-500'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Attachment Options */}
        {showAttachments && (
          <div className="bg-white border-t border-gray-200 p-4">
            <div className="grid grid-cols-4 gap-4">
              <button className="flex flex-col items-center p-3 bg-gray-50 rounded-xl">
                <Camera size={24} className="text-gray-600 mb-1" />
                <span className="text-xs text-gray-600">Camera</span>
              </button>
              <button className="flex flex-col items-center p-3 bg-gray-50 rounded-xl">
                <Image size={24} className="text-gray-600 mb-1" />
                <span className="text-xs text-gray-600">Gallery</span>
              </button>
              <button className="flex flex-col items-center p-3 bg-gray-50 rounded-xl">
                <Paperclip size={24} className="text-gray-600 mb-1" />
                <span className="text-xs text-gray-600">File</span>
              </button>
              <button className="flex flex-col items-center p-3 bg-gray-50 rounded-xl">
                <Video size={24} className="text-gray-600 mb-1" />
                <span className="text-xs text-gray-600">Video</span>
              </button>
            </div>
          </div>
        )}

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-end space-x-3">
            <button
              onClick={() => setShowAttachments(!showAttachments)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
            >
              <Paperclip size={20} />
            </button>
            
            <div className="flex-1 relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                rows={1}
                className="w-full px-4 py-3 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
                style={{ minHeight: '44px', maxHeight: '120px' }}
              />
            </div>
            
            <button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="p-3 bg-sky-500 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-transform"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default MobileChat;