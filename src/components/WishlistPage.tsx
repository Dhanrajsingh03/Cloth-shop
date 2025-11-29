import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ShoppingBag, ArrowRight, Heart, AlertCircle, CheckCircle, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  // Load wishlist from LocalStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('aura_wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  // Helper to show toast
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const removeItem = (id, name) => {
    const updatedList = wishlist.filter(item => item.id !== id);
    setWishlist(updatedList);
    localStorage.setItem('aura_wishlist', JSON.stringify(updatedList));
    showToast(`Removed ${name}`);
  };

  const moveToBag = (id, name) => {
    // Simulate Add to Cart
    const updatedList = wishlist.filter(item => item.id !== id);
    setWishlist(updatedList);
    localStorage.setItem('aura_wishlist', JSON.stringify(updatedList));
    showToast(`Moved ${name} to Bag`);
  };

  const formatPrice = (p) => {
    if (!p) return '';
    const num = typeof p === 'string' ? parseFloat(p.replace(/[^0-9.]/g, '')) : p;
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(num);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pt-20 pb-20">
      
      {/* HEADER */}
      <div className="container mx-auto px-4 lg:px-12 pt-4 md:pt-8 mb-6 md:mb-10">
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-1 md:mb-2 tracking-tight">Your Wardrobe</h1>
        <p className="text-slate-500 text-sm md:text-base font-medium">
          {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved for later
        </p>
      </div>

      <div className="container mx-auto px-4 lg:px-12">
        
        {/* EMPTY STATE */}
        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-slate-100">
              <Heart className="w-8 h-8 md:w-10 md:h-10 text-slate-300 fill-slate-50" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">Your wishlist is empty</h2>
            <p className="text-slate-500 max-w-sm mb-8 text-sm">Explore our latest collection to find something you love.</p>
            <Link to="/collections" className="bg-slate-900 text-white px-8 py-3 md:py-4 rounded-full font-bold text-xs md:text-sm uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg flex items-center gap-2">
              Start Shopping <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          /* GRID (Optimized for Mobile: 2 Cols) */
          <motion.div 
            layout 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6"
          >
            <AnimatePresence>
              {wishlist.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  className="group bg-white rounded-xl md:rounded-2xl overflow-hidden border border-slate-100 hover:border-blue-100 hover:shadow-xl transition-all duration-300 flex flex-col relative"
                >
                  
                  {/* REMOVE BUTTON (Compact) */}
                  <button 
                    onClick={() => removeItem(item.id, item.name)}
                    className="absolute top-2 right-2 z-20 p-1.5 md:p-2 bg-white/80 backdrop-blur-md rounded-full text-slate-400 hover:text-red-500 hover:bg-white transition-all shadow-sm active:scale-95"
                    title="Remove"
                  >
                    <X className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </button>

                  {/* IMAGE */}
                  <Link to={`/product/${item.id}`} className="relative aspect-[4/5] bg-gray-100 overflow-hidden block">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    {/* Simulated Out of Stock Logic */}
                    {item.inStock === false && (
                      <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
                        <span className="bg-slate-900 text-white px-2 py-1 text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-md">Sold Out</span>
                      </div>
                    )}
                  </Link>

                  {/* DETAILS (Responsive Padding) */}
                  <div className="p-3 md:p-4 flex flex-col flex-1">
                    <div className="mb-1 md:mb-2">
                      <p className="text-[9px] md:text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-0.5">{item.category}</p>
                      <Link to={`/product/${item.id}`} className="block">
                        <h3 className="font-bold text-slate-900 text-sm md:text-base leading-tight group-hover:text-blue-700 transition-colors line-clamp-1">{item.name}</h3>
                      </Link>
                    </div>

                    <div className="flex items-baseline gap-1.5 md:gap-2 mb-3 md:mb-4">
                      <span className="text-sm md:text-lg font-bold text-slate-900">{formatPrice(item.price)}</span>
                      {item.oldPrice && <span className="text-[10px] md:text-xs text-slate-400 line-through font-medium">{formatPrice(item.oldPrice)}</span>}
                    </div>

                    {/* ACTION BUTTON (Compact on Mobile) */}
                    <div className="mt-auto">
                      <button 
                        onClick={() => moveToBag(item.id, item.name)}
                        className="w-full py-2 md:py-3 bg-slate-900 text-white rounded-lg font-bold text-[10px] md:text-xs uppercase tracking-wider hover:bg-blue-600 transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5 md:gap-2"
                        disabled={item.inStock === false}
                      >
                        <ShoppingBag className="w-3.5 h-3.5 md:w-4 md:h-4" /> 
                        <span className="md:hidden">Add</span>
                        <span className="hidden md:inline">Move to Bag</span>
                      </button>
                    </div>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

      </div>

      {/* TOAST NOTIFICATION */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 lg:bottom-10 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 backdrop-blur-md text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 text-sm font-bold border border-white/10 whitespace-nowrap"
          >
            <CheckCircle className="w-4 h-4 text-green-400" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default WishlistPage;