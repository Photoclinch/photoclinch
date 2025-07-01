import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Search } from 'lucide-react';

interface MobileHeaderProps {
  title?: string;
  showBack?: boolean;
  actions?: ReactNode;
  className?: string;
}

const MobileHeader = ({ title, showBack = false, actions, className = '' }: MobileHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className={`sticky top-0 z-50 bg-white border-b border-gray-200 ${className}`}>
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          {showBack && (
            <button
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-700" />
            </button>
          )}
          {title && (
            <h1 className="text-lg font-semibold text-gray-900 ml-2">
              {title}
            </h1>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {actions}
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;