import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Camera } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-6">
              <div className="bg-sky-500 p-2 rounded-lg">
                <Camera className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold ml-3">PhotoClinch</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-sm">
              India's premier photography marketplace connecting clients with professional photographers who understand local culture, traditions, and celebrations.
            </p>
            <div className="flex items-center text-gray-300 mb-2">
              <span className="text-sky-400 mr-2">★</span>
              <span className="text-sm">4.8/5 Rating</span>
            </div>
            <div className="flex items-center text-gray-300">
              <span className="text-sky-400 mr-2">📍</span>
              <span className="text-sm">25+ Indian Cities</span>
            </div>
          </div>
          
          {/* Photography Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Photography Services</h3>
            <ul className="space-y-3 text-gray-300">
              <li><Link to="/photography-services" className="hover:text-sky-400 transition-colors duration-200 text-sm">Wedding Photography</Link></li>
              <li><Link to="/photography-services" className="hover:text-sky-400 transition-colors duration-200 text-sm">Pre-Wedding Shoots</Link></li>
              <li><Link to="/photography-services" className="hover:text-sky-400 transition-colors duration-200 text-sm">Corporate Events</Link></li>
              <li><Link to="/photography-services" className="hover:text-sky-400 transition-colors duration-200 text-sm">Family Portraits</Link></li>
              <li><Link to="/photography-services" className="hover:text-sky-400 transition-colors duration-200 text-sm">Festival Photography</Link></li>
              <li><Link to="/photography-services" className="hover:text-sky-400 transition-colors duration-200 text-sm">Traditional Ceremonies</Link></li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-3 text-gray-300">
              <li><Link to="/about" className="hover:text-sky-400 transition-colors duration-200 text-sm">About PhotoClinch</Link></li>
              <li><Link to="/how-it-works" className="hover:text-sky-400 transition-colors duration-200 text-sm">How It Works</Link></li>
              <li><Link to="/pricing" className="hover:text-sky-400 transition-colors duration-200 text-sm">Pricing</Link></li>
              <li><Link to="/explore" className="hover:text-sky-400 transition-colors duration-200 text-sm">Browse Photographers</Link></li>
              <li><Link to="/post-project" className="hover:text-sky-400 transition-colors duration-200 text-sm">Post a Project</Link></li>
              <li><Link to="/join-photographer" className="hover:text-sky-400 transition-colors duration-200 text-sm">Join as Photographer</Link></li>
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Photography Services in Indian Cities</h3>
            <div className="grid grid-cols-2 gap-2 text-gray-300 text-sm">
              <Link to="/mumbai" className="hover:text-sky-400 transition-colors duration-200">Mumbai</Link>
              <Link to="/delhi" className="hover:text-sky-400 transition-colors duration-200">Delhi NCR</Link>
              <Link to="/bangalore" className="hover:text-sky-400 transition-colors duration-200">Bangalore</Link>
              <Link to="/chennai" className="hover:text-sky-400 transition-colors duration-200">Chennai</Link>
              <Link to="/hyderabad" className="hover:text-sky-400 transition-colors duration-200">Hyderabad</Link>
              <Link to="/pune" className="hover:text-sky-400 transition-colors duration-200">Pune</Link>
              <Link to="/kolkata" className="hover:text-sky-400 transition-colors duration-200">Kolkata</Link>
              <Link to="/ahmedabad" className="hover:text-sky-400 transition-colors duration-200">Ahmedabad</Link>
              <Link to="/jaipur" className="hover:text-sky-400 transition-colors duration-200">Jaipur</Link>
              <Link to="/lucknow" className="hover:text-sky-400 transition-colors duration-200">Lucknow</Link>
              <Link to="/kochi" className="hover:text-sky-400 transition-colors duration-200">Kochi</Link>
              <Link to="/chandigarh" className="hover:text-sky-400 transition-colors duration-200">Chandigarh</Link>
            </div>
          </div>
        </div>
        
        {/* Social Media & Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-4 mb-4 md:mb-0">
              <a href="https://facebook.com" className="text-gray-400 hover:text-sky-400 transition-colors duration-200" target="_blank" rel="noopener noreferrer">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-sky-400 transition-colors duration-200" target="_blank" rel="noopener noreferrer">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-sky-400 transition-colors duration-200" target="_blank" rel="noopener noreferrer">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-sky-400 transition-colors duration-200" target="_blank" rel="noopener noreferrer">
                <Linkedin size={20} />
              </a>
            </div>
            
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-gray-400 text-sm">© 2024 PhotoClinch. All rights reserved. | India's Photography Marketplace</p>
              <div className="flex space-x-4 text-sm">
                <Link to="/privacy" className="text-gray-400 hover:text-sky-400 transition-colors duration-200">Privacy Policy</Link>
                <Link to="/terms" className="text-gray-400 hover:text-sky-400 transition-colors duration-200">Terms of Service</Link>
                <Link to="/contact" className="text-gray-400 hover:text-sky-400 transition-colors duration-200">Contact</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;