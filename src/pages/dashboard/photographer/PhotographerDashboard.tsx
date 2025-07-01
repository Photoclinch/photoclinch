import { useEffect, useState } from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { useAuth } from '../../../context/AuthContext';
import { Calendar, MessageSquare, Users, DollarSign, TrendingUp, BarChart2, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const PhotographerDashboard = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // For demo purposes, we'll just simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const stats = [
    { name: 'Bookings', value: '12', change: '+33%', icon: Calendar, color: 'bg-blue-100 text-blue-600' },
    { name: 'Leads', value: '24', change: '+20%', icon: Users, color: 'bg-green-100 text-green-600' },
    { name: 'Messages', value: '18', change: '+12%', icon: MessageSquare, color: 'bg-purple-100 text-purple-600' },
    { name: 'Revenue', value: '₹45,000', change: '+25%', icon: DollarSign, color: 'bg-orange-100 text-orange-600' },
  ];

  // Sample data for charts
  const revenueData = [
    { month: 'Jan', amount: 12000 },
    { month: 'Feb', amount: 19000 },
    { month: 'Mar', amount: 15000 },
    { month: 'Apr', amount: 22000 },
    { month: 'May', amount: 32000 },
    { month: 'Jun', amount: 28000 },
    { month: 'Jul', amount: 45000 },
  ];

  const upcomingBookings = [
    { id: '1', client: 'Anjali Mehta', date: '2025-07-15', time: '10:00 AM', type: 'Wedding Shoot', location: 'Juhu Beach, Mumbai' },
    { id: '2', client: 'Vikram Singh', date: '2025-07-18', time: '2:00 PM', type: 'Product Photography', location: 'Studio 7, Delhi' },
    { id: '3', client: 'Neha Sharma', date: '2025-07-22', time: '11:30 AM', type: 'Family Portrait', location: 'City Park, Bangalore' },
  ];

  const recentLeads = [
    { id: '1', name: 'Arjun Kumar', inquiry: 'Wedding photography package inquiry', date: '2025-07-05', status: 'New' },
    { id: '2', name: 'Riya Patel', inquiry: 'Corporate event coverage', date: '2025-07-04', status: 'Contacted' },
    { id: '3', name: 'Sanjay Verma', inquiry: 'E-commerce product shoot', date: '2025-07-03', status: 'New' },
  ];

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="mt-2 text-gray-600">
            Here's an overview of your photography business.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
              <div className="mt-2">
                <span className="text-xs font-medium text-green-600">{stat.change}</span>
                <span className="text-xs text-gray-500"> from last month</span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                <TrendingUp size={20} className="mr-2 text-blue-600" />
                Revenue Overview
              </h2>
              <select className="text-sm border rounded-md px-2 py-1 bg-gray-50">
                <option>Last 7 months</option>
                <option>Last 12 months</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={revenueData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="amount" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                <BarChart2 size={20} className="mr-2 text-blue-600" />
                Booking Analytics
              </h2>
              <select className="text-sm border rounded-md px-2 py-1 bg-gray-50">
                <option>By Category</option>
                <option>By Location</option>
              </select>
            </div>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Weddings</span>
                  <span className="text-sm font-medium text-gray-900">45%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-blue-600 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Portraits</span>
                  <span className="text-sm font-medium text-gray-900">30%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-green-500 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Events</span>
                  <span className="text-sm font-medium text-gray-900">15%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-orange-500 rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Commercial</span>
                  <span className="text-sm font-medium text-gray-900">10%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-purple-500 rounded-full" style={{ width: '10%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Bookings */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <Calendar size={20} className="mr-2 text-blue-600" />
              Upcoming Bookings
            </h2>
            <Link to="/dashboard/photographer/bookings" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View all →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {upcomingBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{booking.client}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-900">{new Date(booking.date).toLocaleDateString('en-IN')}</div>
                      <div className="text-gray-500 text-sm">{booking.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                        {booking.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {booking.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <Link to={`/dashboard/photographer/bookings/${booking.id}`} className="text-blue-600 hover:text-blue-900 font-medium">
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Leads */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <Users size={20} className="mr-2 text-blue-600" />
              Recent Leads
            </h2>
            <Link to="/dashboard/photographer/crm" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View all →
            </Link>
          </div>
          <div className="space-y-4">
            {recentLeads.map((lead) => (
              <div key={lead.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{lead.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{lead.inquiry}</p>
                    <div className="flex items-center mt-2">
                      <Clock size={14} className="text-gray-400" />
                      <span className="text-xs text-gray-500 ml-1">{new Date(lead.date).toLocaleDateString('en-IN')}</span>
                    </div>
                  </div>
                  <div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      lead.status === 'New' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {lead.status}
                    </span>
                  </div>
                </div>
                <div className="mt-3 flex justify-end space-x-2">
                  <button className="px-3 py-1 text-sm rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">
                    Message
                  </button>
                  <Link 
                    to={`/dashboard/photographer/crm/leads/${lead.id}`}
                    className="px-3 py-1 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PhotographerDashboard;