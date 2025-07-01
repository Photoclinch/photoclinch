import { ReactNode } from 'react';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import MobileBottomNav from '../mobile/MobileBottomNav';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <div className="md:hidden">
        <MobileBottomNav />
      </div>
    </div>
  );
};

export default MainLayout;