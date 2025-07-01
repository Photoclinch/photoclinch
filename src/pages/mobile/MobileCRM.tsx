import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Calendar, DollarSign, TrendingUp, Plus, Search, Filter } from 'lucide-react';
import MobileLayout from '../../components/mobile/MobileLayout';

const MobileCRM = () => {
  const [activeTab, setActiveTab] = useState('leads');
  const [searchTerm, setSearchTerm] = useState('');

  const stats = [
    { label: 'Active Leads', value: '12', icon: Users, color: 'bg-blue-500' },
    { label: 'This Month', value: '₹45K', icon: DollarSign, color: 'bg-green-500' },
    { label: 'Bookings', value: '8', icon: Calendar, color: 'bg-purple-500' },
    { label: 'Conversion', value: '67%', icon: TrendingUp, color: 'bg-orange-500' },
  ];

  const leads = [
    {
      id: 1,
      name: 'Priya Sharma',
      email: 'priya@email.com',
      phone: '+91 98765 43210',
      eventType: 'Wedding',
      status: 'new',
      value: '₹25,000',
      date: '2025-01-15',
      source: 'Website'
    },
    {
      id: 2,
      name: 'Vikram Singh',
      email: 'vikram@email.com',
      phone: '+91 87654 32109',
      eventType: 'Corporate Event',
      status: 'contacted',
      value: '₹15,000',
      date: '2025-01-18',
      source: 'Referral'
    },
    {
      id: 3,
      name: 'Ananya Das',
      email: 'ananya@email.com',
      phone: '+91 76543 21098',
      eventType: 'Portrait',
      status: 'qualified',
      value: '₹8,000',
      date: '2025-01-20',
      source: 'Social Media'
    },
  ];

  const clients = [
    {
      id: 1,
      name: 'Arjun Mehta',
      email: 'arjun@email.com',
      phone: '+91 98765 43210',
      totalProjects: 3,
      lifetimeValue: '₹75,000',
      lastProject: '2024-12-15',
      status: 'active'
    },
    {
      id: 2,
      name: 'Kavya Reddy',
      email: 'kavya@email.com',
      phone: '+91 87654 32109',
      totalProjects: 1,
      lifetimeValue: '₹25,000',
      lastProject: '2024-11-20',
      status: 'active'
    },
  ];

  const projects = [
    {
      id: 1,
      title: 'Wedding Photography - Arjun & Priya',
      client: 'Arjun Mehta',
      status: 'in_progress',
      startDate: '2025-01-20',
      amount: '₹25,000',
      progress: 60
    },
    {
      id: 2,
      title: 'Corporate Event - Tech Summit',
      client: 'Vikram Singh',
      status: 'confirmed',
      startDate: '2025-01-25',
      amount: '₹15,000',
      progress: 20
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-green-100 text-green-800';
      case 'contacted':
        return 'bg-blue-100 text-blue-800';
      case 'qualified':
        return 'bg-purple-100 text-purple-800';
      case 'confirmed':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_progress':
        return 'bg-orange-100 text-orange-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'leads':
        return (
          <div className="space-y-4">
            {leads.map((lead) => (
              <div key={lead.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{lead.name}</h3>
                    <p className="text-sm text-gray-600">{lead.eventType}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(lead.status)}`}>
                    {lead.status}
                  </span>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <p>📧 {lead.email}</p>
                  <p>📱 {lead.phone}</p>
                  <p>📅 {new Date(lead.date).toLocaleDateString()}</p>
                  <p>💰 {lead.value}</p>
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex-1 bg-sky-500 text-white py-2 rounded-lg text-sm font-medium active:scale-95 transition-transform">
                    Contact
                  </button>
                  <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium active:scale-95 transition-transform">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        );

      case 'clients':
        return (
          <div className="space-y-4">
            {clients.map((client) => (
              <div key={client.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{client.name}</h3>
                    <p className="text-sm text-gray-600">{client.totalProjects} projects</p>
                  </div>
                  <span className="text-lg font-bold text-gray-900">{client.lifetimeValue}</span>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <p>📧 {client.email}</p>
                  <p>📱 {client.phone}</p>
                  <p>📅 Last project: {new Date(client.lastProject).toLocaleDateString()}</p>
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex-1 bg-sky-500 text-white py-2 rounded-lg text-sm font-medium active:scale-95 transition-transform">
                    Message
                  </button>
                  <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium active:scale-95 transition-transform">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{project.title}</h3>
                    <p className="text-sm text-gray-600">{project.client}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(project.status)}`}>
                    {project.status.replace('_', ' ')}
                  </span>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <p>📅 {new Date(project.startDate).toLocaleDateString()}</p>
                  <p>💰 {project.amount}</p>
                  
                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-sky-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex-1 bg-sky-500 text-white py-2 rounded-lg text-sm font-medium active:scale-95 transition-transform">
                    Update
                  </button>
                  <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium active:scale-95 transition-transform">
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <MobileLayout title="CRM">
      <div className="flex flex-col h-full">
        {/* Stats */}
        <div className="bg-white p-4 border-b border-gray-200">
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-8 h-8 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <stat.icon size={16} className="text-white" />
                  </div>
                  <span className="text-lg font-bold text-gray-900">{stat.value}</span>
                </div>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-4 border-b border-gray-200">
          <div className="flex space-x-3">
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <button className="p-3 bg-gray-50 rounded-xl">
              <Filter size={20} className="text-gray-600" />
            </button>
            <button className="p-3 bg-sky-500 text-white rounded-xl">
              <Plus size={20} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-white border-b border-gray-200">
          {['leads', 'clients', 'projects'].map((tab) => (
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
        <div className="flex-1 overflow-y-auto p-4">
          {renderTabContent()}
        </div>
      </div>
    </MobileLayout>
  );
};

export default MobileCRM;