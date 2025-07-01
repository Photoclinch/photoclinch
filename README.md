# PhotoClinch - India's Premier Photography Platform

A modern, responsive web application connecting clients with professional photographers, videographers, and editors across India.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Service Categories**: Photography, Videography, and Editing services
- **Smart Matching**: AI-powered professional matching system
- **Real-time Forms**: Supabase integration for instant data storage
- **User Authentication**: Secure login/signup with Supabase Auth
- **Professional Dashboard**: CRM tools for photographers
- **Client Portal**: Easy booking and project management

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (Database, Auth, Real-time)
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Notifications**: React Hot Toast
- **Charts**: Recharts
- **Deployment**: Netlify

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd photoclinch
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=https://qmwedcrediosaplcdruo.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtd2VkY3JlZGlvc2FwbGNkcnVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMzc4ODgsImV4cCI6MjA2NDgxMzg4OH0.hyhyN-VqgWFvLD1NQRMLSjom_TWVhKUxEN_ciIhBN3k
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

## 🗄️ Database Setup

The application uses Supabase as the backend. The required tables are:

### user_requirements
Stores client service requests with the following fields:
- `id` (uuid, primary key)
- `name` (text)
- `email` (text)
- `phone` (text)
- `location` (text)
- `service_type` (text: 'photography', 'videography', 'editing')
- `preferred_date` (date, nullable)
- `budget` (text)
- `description` (text, nullable)
- `urgency` (text: 'urgent', 'soon', 'flexible', 'planning')
- `created_at` (timestamp)

### users
Stores user profiles:
- `id` (uuid, primary key, references auth.users)
- `email` (text, unique)
- `firstname` (text)
- `lastname` (text)
- `role` (text: 'client', 'photographer', 'admin')
- `avatarurl` (text, nullable)
- `createdat` (timestamp)

## 🚀 Deployment

### Deploy to Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   
   [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/your-username/photoclinch)

3. **Set environment variables in Netlify**
   - Go to Site settings > Environment variables
   - Add the same environment variables from your `.env` file

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Upload the `dist` folder** to your hosting provider

## 🔧 Environment Variables

Create a `.env` file with the following variables:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📱 Mobile Responsiveness

The application is built with a mobile-first approach:
- Responsive navigation with mobile hamburger menu
- Touch-friendly buttons and forms
- Optimized images and loading states
- Progressive Web App (PWA) capabilities

## 🎨 Design System

- **Colors**: Blue primary (#3B82F6), with gray and green accents
- **Typography**: Poppins font family
- **Spacing**: 8px grid system
- **Components**: Reusable UI components with consistent styling

## 🔐 Authentication

- Supabase Auth integration
- Role-based access control (Client, Photographer, Admin)
- Protected routes and user sessions
- Secure password handling

## 📊 Features Overview

### For Clients
- Browse service categories
- Submit detailed requirements
- Get matched with professionals
- View portfolios and reviews
- Secure booking system

### For Photographers
- Professional dashboard
- CRM tools for lead management
- Portfolio showcase
- Revenue tracking
- Client communication tools

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email support@photoclinch.com or join our Slack channel.

---

Built with ❤️ by the PhotoClinch team