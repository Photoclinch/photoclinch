/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        // PhotoClinch Brand Colors
        brand: {
          primary: '#00BFFF',      // Sky Blue - main brand color
          navy: '#1B1F3B',         // Dark Navy - text and headings
          white: '#FFFFFF',        // White - clean backgrounds
          gray: '#F5F7FA',         // Light Gray - section backgrounds
          mint: '#00E6A0',         // Mint Green - success/confirmation
          purple: '#C3B1E1',       // Light Purple - secondary accents
        },
        // Keep existing color system but update primary to match brand
        primary: {
          50: '#e6f7ff',
          100: '#b3ecff',
          200: '#80e1ff',
          300: '#4dd6ff',
          400: '#1acbff',
          500: '#00BFFF',  // Brand Sky Blue
          600: '#00a6e6',
          700: '#008ccc',
          800: '#0073b3',
          900: '#005999',
        },
        sky: {
          50: '#e6f7ff',
          100: '#b3ecff',
          200: '#80e1ff',
          300: '#4dd6ff',
          400: '#1acbff',
          500: '#00BFFF',  // Brand Sky Blue
          600: '#00a6e6',
          700: '#008ccc',
          800: '#0073b3',
          900: '#005999',
        },
        gray: {
          50: '#F5F7FA',   // Brand Light Gray
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#1B1F3B',  // Brand Dark Navy
        },
        success: {
          50: '#e6fff5',
          100: '#b3ffe6',
          200: '#80ffd6',
          300: '#4dffc7',
          400: '#1affb8',
          500: '#00E6A0',  // Brand Mint Green
          600: '#00cc90',
          700: '#00b380',
          800: '#009970',
          900: '#008060',
        },
        purple: {
          50: '#f5f2ff',
          100: '#ebe5ff',
          200: '#d6ccff',
          300: '#C3B1E1',  // Brand Light Purple
          400: '#b399ff',
          500: '#9f80ff',
          600: '#8b66ff',
          700: '#774dff',
          800: '#6333ff',
          900: '#4f1aff',
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'premium': '0 10px 40px rgba(0, 0, 0, 0.1)',
        'premium-lg': '0 20px 60px rgba(0, 0, 0, 0.15)',
        'glow': '0 0 30px rgba(0, 191, 255, 0.3)',
        'brand': '0 4px 20px rgba(0, 191, 255, 0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'slide-in-left': 'slideInLeft 0.8s ease-out',
        'slide-in-right': 'slideInRight 0.8s ease-out',
        'scale-in': 'scaleIn 0.6s ease-out',
        'pulse-gentle': 'pulse 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};