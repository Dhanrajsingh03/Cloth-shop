import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// --- IMPORT COMPONENTS ---
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CardSection from './components/Cards';
import CollectionPage from './components/Collection';
import ProductDetails from './components/ProductDetails';
import AuthModal from './components/AuthPage'; // Import the Modal
import Footer from './components/Footer';
import AccessoriesPage from './components/AccessoriesPage';
import AboutPage from './components/AboutPage';
import WishlistPage from './components/WishlistPage';
import CartPage from './components/CartPage';
import ProfilePage from './components/ProfilePage';

// Helper: Scroll To Top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  // State to manage the Auth Pop-up visibility
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <Router>
      <ScrollToTop />
      
      <div className="font-sans antialiased text-slate-900 bg-white selection:bg-blue-100 selection:text-blue-900 flex flex-col min-h-screen">
        
        {/* Pass state setter to Navbar */}
        <Navbar onOpenAuth={() => setIsAuthOpen(true)} />
        
        <main className="flex-grow">
          <Routes>
            
            {/* HOME PAGE */}
            <Route path="/" element={
              <>
                <Hero />
                <CardSection />
              </>
            } />

            {/* COLLECTION / SHOP PAGES */}
            <Route path="/shop" element={<CollectionPage />} />
            <Route path="/collections" element={<CollectionPage />} />
            <Route path="/sale" element={<CollectionPage />} />

            {/* PRODUCT DETAILS */}
            <Route path="/product/:id" element={<ProductDetails />} />
            {/* ACCESSORIES PAGE */}
            <Route path="/accessories" element={<AccessoriesPage />} />
            {/* ABOUT PAGE */}
            <Route path="/about" element={<AboutPage />} />
            {/* WISHLIST PAGE */}
            <Route path="/wishlist" element={<WishlistPage />} />
            {/* CART PAGE */}
            <Route path="/cart" element={<CartPage />} />
            {/* PROFILE PAGE */}
            <Route path="/profile" element={<ProfilePage />} />

            {/* 404 PAGE */}
            <Route path="*" element={
              <div className="min-h-[60vh] flex flex-col items-center justify-center">
                <h1 className="text-6xl font-black text-slate-200 mb-4">404</h1>
                <p className="text-slate-500 font-bold">Page not found</p>
              </div>
            } />

          </Routes>
        </main>

        <Footer />

        {/* Global Auth Modal Overlay */}
        <AuthModal 
          isOpen={isAuthOpen} 
          onClose={() => setIsAuthOpen(false)} 
        />
        
      </div>
    </Router>
  );
};

export default App;