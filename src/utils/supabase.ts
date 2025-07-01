import { createClient } from '@supabase/supabase-js';
import { User, UserRole } from '../types';

// Initialize the Supabase client with environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a mock client if environment variables are missing
const createMockClient = () => {
  console.warn('Supabase environment variables not found. Using mock client.');
  const mockError = { message: 'Supabase not configured' };
  const mockData = null;

  // Async mock for auth methods
  const asyncMock = (result = { data: mockData, error: mockError }) => Promise.resolve(result);

  // Query builder mock (chainable, async for .single/.maybeSingle)
  const mockQueryBuilder = {
    select: () => mockQueryBuilder,
    insert: () => mockQueryBuilder,
    update: () => mockQueryBuilder,
    delete: () => mockQueryBuilder,
    eq: () => mockQueryBuilder,
    neq: () => mockQueryBuilder,
    gt: () => mockQueryBuilder,
    gte: () => mockQueryBuilder,
    lt: () => mockQueryBuilder,
    lte: () => mockQueryBuilder,
    like: () => mockQueryBuilder,
    ilike: () => mockQueryBuilder,
    is: () => mockQueryBuilder,
    in: () => mockQueryBuilder,
    contains: () => mockQueryBuilder,
    containedBy: () => mockQueryBuilder,
    rangeGt: () => mockQueryBuilder,
    rangeGte: () => mockQueryBuilder,
    rangeLt: () => mockQueryBuilder,
    rangeLte: () => mockQueryBuilder,
    rangeAdjacent: () => mockQueryBuilder,
    overlaps: () => mockQueryBuilder,
    textSearch: () => mockQueryBuilder,
    match: () => mockQueryBuilder,
    not: () => mockQueryBuilder,
    or: () => mockQueryBuilder,
    filter: () => mockQueryBuilder,
    order: () => mockQueryBuilder,
    limit: () => mockQueryBuilder,
    range: () => mockQueryBuilder,
    single: () => asyncMock(),
    maybeSingle: () => asyncMock()
  };

  return {
    auth: {
      signUp: async () => ({ data: mockData, error: mockError }),
      signInWithPassword: async () => ({ data: mockData, error: mockError }),
      signOut: async () => ({ error: null }),
      getUser: async () => ({ data: mockData, error: mockError }),
      getSession: async () => ({ data: mockData, error: mockError }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
    },
    from: () => mockQueryBuilder
  };
};

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createMockClient();

// Auth helpers
export const signUp = async (
  email: string, 
  password: string, 
  firstName: string, 
  lastName: string, 
  role: UserRole,
  phoneNumber?: string,
  acceptMarketing?: boolean
) => {
  try {
    console.log('Creating auth user for:', email);
    
    // First, create the auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          firstName,
          lastName,
          role
        }
      }
    });
    
    if (authError) {
      console.error('Auth signup error:', authError);
      return { data: null, error: authError };
    }

    if (!authData.user) {
      return { data: null, error: { message: 'No user data returned from signup' } };
    }

    console.log('Auth user created, creating profile...');
    
    // Then create the user profile in the users table
    const { data: profileData, error: profileError } = await supabase
      .from('users')
      .insert({
        id: authData.user.id,
        email,
        firstname: firstName,  // Note: lowercase to match database schema
        lastname: lastName,    // Note: lowercase to match database schema
        role,
        phone: phoneNumber || null,
        marketing_consent: acceptMarketing || false,
        terms_accepted_at: new Date().toISOString(),
        privacy_accepted_at: new Date().toISOString()
      })
      .select(`
        id,
        email,
        firstname,
        lastname,
        role,
        avatarurl,
        createdat
      `)
      .single();
    
    if (profileError) {
      console.error('Profile creation error:', profileError);
      return { data: null, error: profileError };
    }
    
    // Transform the data to match our User interface
    const userData: User = {
      id: profileData.id,
      email: profileData.email,
      firstName: profileData.firstname,  // Transform to camelCase
      lastName: profileData.lastname,    // Transform to camelCase
      role: profileData.role,
      avatarUrl: profileData.avatarurl,
      createdAt: profileData.createdat
    };
    
    console.log('Profile created successfully:', userData);
    return { data: userData, error: null };
  } catch (error) {
    console.error('Signup error:', error);
    return { data: null, error: error as any };
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    console.log('Attempting to sign in with:', email);
    
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (authError) {
      console.error('Auth signin error:', authError);
      return { data: null, error: authError };
    }

    if (!authData.user) {
      console.error('No user data returned from signin');
      return { data: null, error: { message: 'No user data returned from signin' } };
    }

    console.log('Auth successful, fetching user profile for:', authData.user.id);
    
    // Get user profile from users table
    const { data: profileData, error: profileError } = await supabase
      .from('users')
      .select(`
        id,
        email,
        firstname,
        lastname,
        role,
        avatarurl,
        createdat
      `)
      .eq('id', authData.user.id)
      .single();
    
    if (profileError) {
      console.error('Profile fetch error:', profileError);
      return { data: null, error: profileError };
    }

    if (!profileData) {
      console.error('No profile data found for user:', authData.user.id);
      return { data: null, error: { message: 'User profile not found' } };
    }

    // Transform the data to match our User interface
    const userData: User = {
      id: profileData.id,
      email: profileData.email,
      firstName: profileData.firstname,  // Transform to camelCase
      lastName: profileData.lastname,    // Transform to camelCase
      role: profileData.role,
      avatarUrl: profileData.avatarurl,
      createdAt: profileData.createdat
    };

    console.log('Profile data fetched successfully:', userData);
    return { data: userData, error: null };
  } catch (error) {
    console.error('Signin error:', error);
    return { data: null, error: error as any };
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    return { error };
  } catch (error) {
    console.error('Signout error:', error);
    return { error: error as any };
  }
};

export const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    return { data, error };
  } catch (error) {
    console.error('Get current user error:', error);
    return { data: null, error: error as any };
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select(`
        id,
        email,
        firstname,
        lastname,
        role,
        avatarurl,
        createdat,
        phone
      `)
      .eq('id', userId)
      .single();
    
    if (error || !data) {
      return { data: null, error };
    }

    // Transform the data to match our User interface
    const userData: User = {
      id: data.id,
      email: data.email,
      firstName: data.firstname,  // Transform to camelCase
      lastName: data.lastname,    // Transform to camelCase
      role: data.role,
      avatarUrl: data.avatarurl,
      createdAt: data.createdat,
      phone: data.phone
    };
    
    return { data: userData, error: null };
  } catch (error) {
    console.error('Get user profile error:', error);
    return { data: null, error: error as any };
  }
};

export const getSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    return { data, error };
  } catch (error) {
    console.error('Get session error:', error);
    return { data: null, error: error as any };
  }
};

// Photographer queries
export const getPhotographers = async (filters?: {
  location?: string;
  category?: string;
  featured?: boolean;
}) => {
  let query = supabase
    .from('photographers')
    .select(`
      *,
      users!photographers_user_id_fkey (
        firstname,
        lastname,
        email,
        avatarurl
      )
    `);

  if (filters?.location && filters.location !== 'All Locations') {
    query = query.eq('location', filters.location);
  }

  if (filters?.category && filters.category !== 'all') {
    query = query.contains('specialties', [filters.category]);
  }

  if (filters?.featured) {
    query = query.eq('featured', true);
  }

  const { data, error } = await query.order('rating', { ascending: false });
  
  return { data, error };
};

export const getPhotographerById = async (id: string) => {
  const { data, error } = await supabase
    .from('photographers')
    .select(`
      *,
      users!photographers_user_id_fkey (
        firstname,
        lastname,
        email,
        avatarurl
      )
    `)
    .eq('id', id)
    .single();
  
  return { data, error };
};

// Booking queries
export const getBookings = async (userId: string, userRole: UserRole) => {
  const column = userRole === 'photographer' ? 'photographer_id' : 'client_id';
  
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq(column, userId)
    .order('created_at', { ascending: false });
  
  return { data, error };
};

// CRM queries for photographers
export const getLeads = async (photographerId: string) => {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .eq('photographer_id', photographerId)
    .order('created_at', { ascending: false });
  
  return { data, error };
};

export const getClients = async (photographerId: string) => {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('photographer_id', photographerId)
    .order('created_at', { ascending: false });
  
  return { data, error };
};

export const getProjects = async (photographerId: string) => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('photographer_id', photographerId)
    .order('created_at', { ascending: false });
  
  return { data, error };
};

export const getRevenue = async (photographerId: string) => {
  const { data, error } = await supabase
    .from('revenue_tracking')
    .select('*')
    .eq('photographer_id', photographerId)
    .order('created_at', { ascending: false });
  
  return { data, error };
};

// Admin functions
export const getAllUsers = async () => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select(`
        id,
        email,
        firstname,
        lastname,
        role,
        avatarurl,
        createdat,
        phone
      `)
      .order('createdat', { ascending: false });
    
    if (error) {
      console.error('Error fetching all users:', error);
      return { data: null, error };
    }
    
    // Transform the data to match our User interface
    const usersData = data?.map(user => ({
      id: user.id,
      email: user.email,
      firstName: user.firstname,
      lastName: user.lastname,
      role: user.role,
      avatarUrl: user.avatarurl,
      createdAt: user.createdat,
      phone: user.phone
    })) || [];
    
    return { data: usersData, error: null };
  } catch (error) {
    console.error('Get all users error:', error);
    return { data: null, error: error as any };
  }
};

export const updateUserProfile = async (userId: string, updates: Partial<{
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  role: UserRole;
}>) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select(`
        id,
        email,
        firstname,
        lastname,
        role,
        avatarurl,
        createdat,
        phone
      `)
      .single();
    
    if (error) {
      console.error('Error updating user profile:', error);
      return { data: null, error };
    }
    
    // Transform the data to match our User interface
    const userData = {
      id: data.id,
      email: data.email,
      firstName: data.firstname,
      lastName: data.lastname,
      role: data.role,
      avatarUrl: data.avatarurl,
      createdAt: data.createdat,
      phone: data.phone
    };
    
    return { data: userData, error: null };
  } catch (error) {
    console.error('Update user profile error:', error);
    return { data: null, error: error as any };
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', userId);
    
    if (error) {
      console.error('Error deleting user:', error);
      return { error };
    }
    
    return { error: null };
  } catch (error) {
    console.error('Delete user error:', error);
    return { error: error as any };
  }
};
