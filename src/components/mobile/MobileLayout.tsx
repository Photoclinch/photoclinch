import { ReactNode } from 'react';
import MobileBottomNav from './MobileBottomNav';
import MobileHeader from './MobileHeader';

interface MobileLayoutProps {
  children: ReactNode;
  title?: string;
  showHeader?: boolean;
  showBottomNav?: boolean;
  headerActions?: ReactNode;
  className?: string;
}

const MobileLayout = ({ 
  children, 
  title, 
  showHeader = true, 
  showBottomNav = true,
  headerActions,
  className = ''
}: MobileLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {showHeader && (
        <MobileHeader title={title} actions={headerActions} />
      )}
      
      <main className={`flex-1 ${showBottomNav ? 'pb-20' : ''} ${className}`}>
        {children}
      </main>
      
      {showBottomNav && <MobileBottomNav />}
    </div>
  );
};

export default MobileLayout;