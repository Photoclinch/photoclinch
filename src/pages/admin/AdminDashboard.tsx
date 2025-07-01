import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getAllUsers, updateUserProfile, deleteUser } from '../../utils/supabase';
import { User, UserRole } from '../../types';
import { Users, Mail, Phone, Calendar, Edit3, Trash2, Save, X, UserCheck, Crown } from 'lucide-react';
import toast from 'react-hot-toast';

interface EditingUser extends User {
  isEditing?: boolean;
}

const AdminDashboard = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<EditingUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | UserRole>('all');
  const [editingUser, setEditingUser] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await getAllUsers();
      
      if (error) {
        toast.error('Failed to fetch users');
        console.error('Error fetching users:', error);
        return;
      }
      
      setUsers(data || []);
    } catch (error) {
      toast.error('Failed to fetch users');
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (userId: string) => {
    setEditingUser(userId);
  };

  const handleCancel = () => {
    setEditingUser(null);
    fetchUsers(); // Refresh to reset any changes
  };

  const handleSave = async (userId: string) => {
    const userToUpdate = users.find(u => u.id === userId);
    if (!userToUpdate) return;

    try {
      const updates = {
        firstname: userToUpdate.firstName,
        lastname: userToUpdate.lastName,
        email: userToUpdate.email,
        phone: userToUpdate.phone || '',
        role: userToUpdate.role
      };

      const { data, error } = await updateUserProfile(userId, updates);
      
      if (error) {
        toast.error('Failed to update user');
        return;
      }
      
      toast.success('User updated successfully');
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      toast.error('Failed to update user');
      console.error('Error updating user:', error);
    }
  };

  const handleDelete = async (userId: string, userName: string) => {
    if (!window.confirm(`Are you sure you want to delete user "${userName}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const { error } = await deleteUser(userId);
      
      if (error) {
        toast.error('Failed to delete user');
        return;
      }
      
      toast.success('User deleted successfully');
      fetchUsers();
    } catch (error) {
      toast.error('Failed to delete user');
      console.error('Error deleting user:', error);
    }
  };

  const handleInputChange = (userId: string, field: keyof User, value: string) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId 
          ? { ...user, [field]: value }
          : user
      )
    );
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.phone && user.phone.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    
    return matchesSearch && matchesRole;
  });

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return <Crown className="w-4 h-4 text-yellow-600" />;
      case 'photographer':
        return <UserCheck className="w-4 h-4 text-brand-primary" />;
      case 'client':
        return <Users className="w-4 h-4 text-gray-600" />;
      default:
        return <Users className="w-4 h-4 text-gray-600" />;
    }
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'photographer':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'client':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-brand-gray flex items-center justify-center">
        <div className="text-center">
          <Crown className="w-16 h-16 text-brand-primary mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-brand-navy mb-2">Access Denied</h1>
          <p className="text-gray-600">You need admin privileges to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-gray">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Crown className="w-8 h-8 text-brand-primary" />
              <div>
                <h1 className="text-3xl font-bold text-brand-navy">Admin Dashboard</h1>
                <p className="text-gray-600">Manage PhotoClinch users and data</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Total Users</p>
              <p className="text-2xl font-bold text-brand-primary">{users.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-brand-navy mb-2">
                Search Users
              </label>
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                className="input-field"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="md:w-48">
              <label className="block text-sm font-medium text-brand-navy mb-2">
                Filter by Role
              </label>
              <select
                className="input-field"
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value as 'all' | UserRole)}
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="photographer">Photographer</option>
                <option value="client">Client</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { 
              title: 'Total Users', 
              count: users.length, 
              color: 'bg-brand-primary', 
              icon: Users 
            },
            { 
              title: 'Photographers', 
              count: users.filter(u => u.role === 'photographer').length, 
              color: 'bg-brand-mint', 
              icon: UserCheck 
            },
            { 
              title: 'Clients', 
              count: users.filter(u => u.role === 'client').length, 
              color: 'bg-brand-purple', 
              icon: Users 
            },
            { 
              title: 'Admins', 
              count: users.filter(u => u.role === 'admin').length, 
              color: 'bg-yellow-500', 
              icon: Crown 
            }
          ].map((stat) => (
            <div key={stat.title} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-brand-navy">{stat.count}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-brand-navy">Users ({filteredUsers.length})</h2>
          </div>
          
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary mx-auto"></div>
              <p className="text-gray-600 mt-2">Loading users...</p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="p-8 text-center">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No users found matching your criteria.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((userItem) => (
                    <tr key={userItem.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-brand-primary flex items-center justify-center">
                              <span className="text-white font-medium">
                                {userItem.firstName.charAt(0)}{userItem.lastName.charAt(0)}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            {editingUser === userItem.id ? (
                              <div className="space-y-1">
                                <input
                                  type="text"
                                  className="text-sm font-medium text-brand-navy border rounded px-2 py-1"
                                  value={userItem.firstName}
                                  onChange={(e) => handleInputChange(userItem.id, 'firstName', e.target.value)}
                                />
                                <input
                                  type="text"
                                  className="text-sm text-gray-500 border rounded px-2 py-1"
                                  value={userItem.lastName}
                                  onChange={(e) => handleInputChange(userItem.id, 'lastName', e.target.value)}
                                />
                              </div>
                            ) : (
                              <div>
                                <div className="text-sm font-medium text-brand-navy">
                                  {userItem.firstName} {userItem.lastName}
                                </div>
                                <div className="text-sm text-gray-500">ID: {userItem.id.slice(0, 8)}...</div>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {editingUser === userItem.id ? (
                          <select
                            className="border rounded px-2 py-1 text-sm"
                            value={userItem.role}
                            onChange={(e) => handleInputChange(userItem.id, 'role', e.target.value)}
                          >
                            <option value="client">Client</option>
                            <option value="photographer">Photographer</option>
                            <option value="admin">Admin</option>
                          </select>
                        ) : (
                          <div className="flex items-center space-x-2">
                            {getRoleIcon(userItem.role)}
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getRoleBadgeColor(userItem.role)}`}>
                              {userItem.role.charAt(0).toUpperCase() + userItem.role.slice(1)}
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {editingUser === userItem.id ? (
                          <div className="space-y-1">
                            <div className="flex items-center space-x-1">
                              <Mail className="w-4 h-4 text-gray-400" />
                              <input
                                type="email"
                                className="text-sm text-brand-navy border rounded px-2 py-1 flex-1"
                                value={userItem.email}
                                onChange={(e) => handleInputChange(userItem.id, 'email', e.target.value)}
                              />
                            </div>
                            <div className="flex items-center space-x-1">
                              <Phone className="w-4 h-4 text-gray-400" />
                              <input
                                type="tel"
                                className="text-sm text-gray-500 border rounded px-2 py-1 flex-1"
                                value={userItem.phone || ''}
                                onChange={(e) => handleInputChange(userItem.id, 'phone', e.target.value)}
                                placeholder="Phone number"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <div className="flex items-center space-x-1">
                              <Mail className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-brand-navy">{userItem.email}</span>
                            </div>
                            {userItem.phone && (
                              <div className="flex items-center space-x-1">
                                <Phone className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-500">{userItem.phone}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-500">
                            {new Date(userItem.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {editingUser === userItem.id ? (
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleSave(userItem.id)}
                              className="p-1 text-green-600 hover:text-green-800 transition-colors"
                              title="Save changes"
                            >
                              <Save className="w-4 h-4" />
                            </button>
                            <button
                              onClick={handleCancel}
                              className="p-1 text-gray-600 hover:text-gray-800 transition-colors"
                              title="Cancel"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleEdit(userItem.id)}
                              className="p-1 text-brand-primary hover:text-blue-700 transition-colors"
                              title="Edit user"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(userItem.id, `${userItem.firstName} ${userItem.lastName}`)}
                              className="p-1 text-red-600 hover:text-red-800 transition-colors"
                              title="Delete user"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
