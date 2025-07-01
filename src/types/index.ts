export type UserRole = 'client' | 'photographer' | 'admin';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatarUrl?: string;
  phone?: string;
  createdAt: string;
}

export interface PhotographerProfile extends User {
  bio: string;
  specialties: string[];
  location: string;
  experience: number;
  hourlyRate?: number;
  portfolioItems: PortfolioItem[];
}

export interface ClientProfile extends User {
  company?: string;
  location: string;
}

export interface PortfolioItem {
  id: string;
  photographerId: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  tags: string[];
  createdAt: string;
}

export interface Booking {
  id: string;
  clientId: string;
  photographerId: string;
  status: 'requested' | 'confirmed' | 'canceled' | 'completed';
  eventType: string;
  startDate: string;
  endDate: string;
  location: string;
  budget: number;
  notes?: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  attachmentUrl?: string;
  read: boolean;
  createdAt: string;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: ChatMessage;
  createdAt: string;
}

export interface Lead {
  id: string;
  photographerId: string;
  clientId: string;
  status: 'new' | 'contacted' | 'negotiating' | 'converted' | 'lost';
  source: string;
  notes?: string;
  createdAt: string;
}