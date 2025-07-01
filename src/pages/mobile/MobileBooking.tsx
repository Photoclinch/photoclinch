import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, Camera, Users, DollarSign } from 'lucide-react';
import MobileLayout from '../../components/mobile/MobileLayout';

const MobileBooking = () => {
  const { photographerId } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    eventType: '',
    date: '',
    time: '',
    duration: '',
    location: '',
    guests: '',
    budget: '',
    description: '',
    addOns: []
  });

  const photographer = {
    id: 1,
    name: 'Arjun Mehta',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
    basePrice: 15000,
    rating: 4.9
  };

  const eventTypes = [
    { id: 'wedding', name: 'Wedding', icon: '💒', price: 25000 },
    { id: 'portrait', name: 'Portrait', icon: '👤', price: 8000 },
    { id: 'event', name: 'Event', icon: '🎉', price: 12000 },
    { id: 'commercial', name: 'Commercial', icon: '🏢', price: 20000 },
    { id: 'family', name: 'Family', icon: '👨‍👩‍👧‍👦', price: 10000 },
    { id: 'maternity', name: 'Maternity', icon: '🤱', price: 12000 },
  ];

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
    '05:00 PM', '06:00 PM', '07:00 PM'
  ];

  const durations = [
    { value: '2', label: '2 hours', multiplier: 1 },
    { value: '4', label: '4 hours', multiplier: 1.5 },
    { value: '6', label: '6 hours', multiplier: 2 },
    { value: '8', label: '8 hours', multiplier: 2.5 },
    { value: 'full', label: 'Full day', multiplier: 3 },
  ];

  const addOns = [
    { id: 'editing', name: 'Premium Editing', price: 5000 },
    { id: 'prints', name: 'Photo Prints', price: 3000 },
    { id: 'album', name: 'Photo Album', price: 8000 },
    { id: 'video', name: 'Highlight Video', price: 15000 },
  ];

  const calculateTotal = () => {
    const selectedEventType = eventTypes.find(type => type.id === bookingData.eventType);
    const selectedDuration = durations.find(dur => dur.value === bookingData.duration);
    const selectedAddOns = addOns.filter(addon => bookingData.addOns.includes(addon.id));
    
    let total = selectedEventType ? selectedEventType.price : 0;
    if (selectedDuration) {
      total *= selectedDuration.multiplier;
    }
    total += selectedAddOns.reduce((sum, addon) => sum + addon.price, 0);
    
    return total;
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit booking
      console.log('Booking submitted:', bookingData);
      navigate('/bookings');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate(-1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return bookingData.eventType;
      case 2:
        return bookingData.date && bookingData.time && bookingData.duration;
      case 3:
        return bookingData.location && bookingData.guests;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              What type of photography do you need?
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {eventTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setBookingData({ ...bookingData, eventType: type.id })}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    bookingData.eventType === type.id
                      ? 'border-sky-500 bg-sky-50'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="text-2xl mb-2">{type.icon}</div>
                  <div className="font-medium text-gray-900">{type.name}</div>
                  <div className="text-sm text-gray-600">₹{type.price.toLocaleString()}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">
              When do you need the photography?
            </h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                value={bookingData.date}
                onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time
              </label>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setBookingData({ ...bookingData, time })}
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      bookingData.time === time
                        ? 'bg-sky-500 text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration
              </label>
              <div className="space-y-2">
                {durations.map((duration) => (
                  <button
                    key={duration.value}
                    onClick={() => setBookingData({ ...bookingData, duration: duration.value })}
                    className={`w-full p-3 rounded-xl border-2 text-left transition-all ${
                      bookingData.duration === duration.value
                        ? 'border-sky-500 bg-sky-50'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="font-medium">{duration.label}</div>
                    <div className="text-sm text-gray-600">
                      {duration.multiplier}x base price
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Tell us about your event
            </h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                value={bookingData.location}
                onChange={(e) => setBookingData({ ...bookingData, location: e.target.value })}
                placeholder="Enter event location"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of guests
              </label>
              <select
                value={bookingData.guests}
                onChange={(e) => setBookingData({ ...bookingData, guests: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="">Select guest count</option>
                <option value="1-10">1-10 people</option>
                <option value="11-25">11-25 people</option>
                <option value="26-50">26-50 people</option>
                <option value="51-100">51-100 people</option>
                <option value="100+">100+ people</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Special requirements (optional)
              </label>
              <textarea
                value={bookingData.description}
                onChange={(e) => setBookingData({ ...bookingData, description: e.target.value })}
                placeholder="Any special requests or details..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Add-ons (optional)
              </label>
              <div className="space-y-2">
                {addOns.map((addon) => (
                  <label
                    key={addon.id}
                    className="flex items-center p-3 bg-white border border-gray-200 rounded-xl"
                  >
                    <input
                      type="checkbox"
                      checked={bookingData.addOns.includes(addon.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setBookingData({
                            ...bookingData,
                            addOns: [...bookingData.addOns, addon.id]
                          });
                        } else {
                          setBookingData({
                            ...bookingData,
                            addOns: bookingData.addOns.filter(id => id !== addon.id)
                          });
                        }
                      }}
                      className="mr-3 w-4 h-4 text-sky-500 rounded focus:ring-sky-500"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{addon.name}</div>
                      <div className="text-sm text-gray-600">+₹{addon.price.toLocaleString()}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Confirm your booking
            </h2>
            
            {/* Photographer Info */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center">
                <img
                  src={photographer.image}
                  alt={photographer.name}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{photographer.name}</h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="flex items-center">
                      ⭐ {photographer.rating}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Summary */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Booking Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Event Type:</span>
                  <span className="font-medium">
                    {eventTypes.find(type => type.id === bookingData.eventType)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date & Time:</span>
                  <span className="font-medium">{bookingData.date} at {bookingData.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">
                    {durations.find(dur => dur.value === bookingData.duration)?.label}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium">{bookingData.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Guests:</span>
                  <span className="font-medium">{bookingData.guests}</span>
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Price Breakdown</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Base Price:</span>
                  <span>₹{eventTypes.find(type => type.id === bookingData.eventType)?.price.toLocaleString()}</span>
                </div>
                {bookingData.addOns.map(addonId => {
                  const addon = addOns.find(a => a.id === addonId);
                  return (
                    <div key={addonId} className="flex justify-between">
                      <span>{addon?.name}:</span>
                      <span>₹{addon?.price.toLocaleString()}</span>
                    </div>
                  );
                })}
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>₹{calculateTotal().toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <MobileLayout showBottomNav={false} showHeader={false}>
      <div className="flex flex-col h-screen">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <button onClick={handleBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100">
              <ArrowLeft size={20} className="text-gray-700" />
            </button>
            <h1 className="text-lg font-semibold">Book Photographer</h1>
            <div className="w-8"></div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Step {currentStep} of 4</span>
              <span className="text-sm text-gray-600">{Math.round((currentStep / 4) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-sky-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {renderStep()}
        </div>

        {/* Bottom Actions */}
        <div className="bg-white border-t border-gray-200 p-4">
          <button
            onClick={handleNext}
            disabled={!isStepValid()}
            className="w-full bg-sky-500 text-white py-4 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-transform"
          >
            {currentStep === 4 ? 'Confirm Booking' : 'Continue'}
          </button>
          {currentStep === 4 && (
            <p className="text-center text-sm text-gray-600 mt-2">
              Total: ₹{calculateTotal().toLocaleString()}
            </p>
          )}
        </div>
      </div>
    </MobileLayout>
  );
};

export default MobileBooking;