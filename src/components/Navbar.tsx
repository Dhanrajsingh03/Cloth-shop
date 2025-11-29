import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingBag, Search, User, Heart, Menu, X, ChevronRight, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Receive onOpenAuth prop to trigger the modal
const Navbar = ({ onOpenAuth }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-focus input when mobile search opens
  useEffect(() => {
    if (showMobileSearch && searchInputRef.current) {
      setTimeout(() => searchInputRef.current.focus(), 100);
    }
  }, [showMobileSearch]);

  // Lock scroll on mobile menu OR search open
  useEffect(() => {
    if (isMobileOpen || showMobileSearch) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileOpen, showMobileSearch]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Collections', path: '/collections' },
    { name: 'Accessories', path: '/accessories' },
    { name: 'About', path: '/About', isRed: true },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b
        ${scrolled 
          ? 'bg-white/95 backdrop-blur-md border-gray-100 shadow-sm py-3' 
          : 'bg-white border-transparent py-4 lg:py-5'
        }`}
      >
        <div className="container mx-auto px-4 lg:px-12 relative flex items-center justify-between">
          
          {/* =======================================
              1. MOBILE SEARCH OVERLAY
          ======================================== */}
          <AnimatePresence>
            {showMobileSearch && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute inset-0 bg-white z-[60] flex items-center px-4 w-full h-full lg:hidden"
              >
                <div className="flex-1 flex items-center h-full">
                  <Search className="w-5 h-5 text-black shrink-0" />
                  <input 
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search..."
                    className="w-full h-full bg-transparent border-none outline-none text-base ml-4 text-slate-900 placeholder:text-gray-400 font-medium"
                  />
                </div>
                <button 
                  onClick={() => setShowMobileSearch(false)}
                  className="p-2 -mr-2 text-slate-400 hover:text-black transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* =======================================
              2. NORMAL NAVBAR CONTENT
          ======================================== */}
          
          {/* LEFT: LOGO */}
          <Link to="/" className={`flex items-center gap-2 z-40 transition-opacity duration-200 ${showMobileSearch ? 'opacity-0' : 'opacity-100'}`}>
            <div className="w-9 h-9 bg-black rounded-lg flex items-center justify-center text-white font-bold text-xl">
              A
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              AURA<span className="text-gray-400">MOD</span>
            </span>
          </Link>

          {/* CENTER: DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2 bg-gray-100/80 p-1.5 rounded-full border border-gray-200/50 backdrop-blur-sm">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => `
                  px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all duration-300
                  ${isActive 
                    ? 'bg-white text-black shadow-sm scale-105' 
                    : 'text-gray-500 hover:text-black hover:bg-white/50'}
                  ${link.isRed ? 'text-red-600 hover:text-red-700' : ''}
                `}
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* RIGHT: ICONS */}
          <div className={`flex items-center gap-1 sm:gap-2 text-slate-800 transition-opacity duration-200 ${showMobileSearch ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            
            {/* Desktop Search Field */}
            <div 
              className={`hidden lg:flex items-center transition-all duration-300 border mr-2
              ${searchFocused 
                ? 'w-64 bg-white border-black ring-2 ring-gray-100 shadow-lg' 
                : 'w-48 bg-gray-50 border-transparent hover:bg-gray-100'}
              rounded-full px-3 py-2`}
            >
              <Search className="w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="bg-transparent border-none outline-none text-sm ml-2 w-full placeholder:text-gray-400 font-medium text-slate-800"
              />
            </div>

            {/* Mobile Search Trigger Icon */}
            <button 
              className="lg:hidden p-2.5 active:scale-95 transition-transform"
              onClick={() => setShowMobileSearch(true)}
            >
              <Search className="w-6 h-6 stroke-[1.5]" />
            </button>

            {/* --- MODIFIED: Desktop Account Button Triggers Popup --- */}
            <button 
              onClick={onOpenAuth} 
              className="hidden md:block p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <User className="w-5 h-5 stroke-[2]" />
            </button>
             <Link to="/profile" className="hidden md:block p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Heart className="w-5 h-5 stroke-[2]" />
            </Link>

            {/* Wishlist Icon */}
            <Link to="/wishlist" className="hidden md:block p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Heart className="w-5 h-5 stroke-[2]" />
            </Link>
            
            {/* Cart Icon */}
            <Link to="/cart" className="relative p-2.5 active:scale-95 transition-transform">
              <ShoppingBag className="w-6 h-6 stroke-[1.5]" />
              <span className="absolute top-1 right-0.5 bg-black text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border-2 border-white">
                2
              </span>
            </Link>
            
            {/* Mobile Menu Trigger */}
            <button 
              className="lg:hidden p-2.5 active:scale-95 transition-transform"
              onClick={() => setIsMobileOpen(true)}
            >
              <Menu className="w-7 h-7 stroke-[1.5]" />
            </button>
          </div>
        </div>
      </nav>

      {/* =======================================
          BACKDROP FOR SEARCH
      ======================================== */}
      <AnimatePresence>
        {showMobileSearch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowMobileSearch(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden top-[60px]"
          />
        )}
      </AnimatePresence>

      {/* =======================================
          MOBILE DRAWER MENU
      ======================================== */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white z-[60] shadow-2xl lg:hidden flex flex-col"
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <span className="text-lg font-bold tracking-tight">MENU</span>
                <button 
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <X className="w-5 h-5 text-slate-800" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <div className="flex flex-col space-y-2">
                  {navLinks.map((link) => (
                    <NavLink 
                      key={link.name}
                      to={link.path}
                      onClick={() => setIsMobileOpen(false)}
                      className={({ isActive }) => `
                        flex justify-between items-center py-4 border-b border-gray-50 group
                        ${isActive ? 'text-black' : 'text-slate-600'}
                      `}
                    >
                      <span className="text-base font-bold tracking-wide">{link.name}</span>
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </NavLink>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-gray-50 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  
                  {/* --- MODIFIED: Mobile Account Button Triggers Popup --- */}
                  <button 
                    onClick={() => { setIsMobileOpen(false); onOpenAuth(); }}
                    className="flex items-center justify-center gap-2 bg-white border border-gray-200 py-3 rounded-xl text-xs font-bold shadow-sm"
                  >
                    <User className="w-4 h-4" /> Account
                  </button>

                  <Link 
                    to="/wishlist" 
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center justify-center gap-2 bg-white border border-gray-200 py-3 rounded-xl text-xs font-bold shadow-sm"
                  >
                    <Heart className="w-4 h-4" /> Wishlist
                  </Link>
                </div>

                {/* --- MODIFIED: Sign In Button Triggers Popup --- */}
                <button 
                  onClick={() => { setIsMobileOpen(false); onOpenAuth(); }}
                  className="w-full flex items-center justify-center gap-2 bg-black text-white py-4 rounded-xl font-bold text-sm tracking-wide hover:opacity-90 transition-opacity"
                >
                  <LogIn className="w-4 h-4" /> Sign In
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;