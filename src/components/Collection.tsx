import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Filter, ChevronDown, Heart, Star, ShoppingBag, Search, CheckCircle } from 'lucide-react';

// --- MOCK DATA ---
const allProducts = [
  { id: 1, name: 'Royal Blue Suit', category: 'Suits', price: '₹8,499', oldPrice: '₹12,999', rating: 4.9, image: 'https://images.unsplash.com/photo-1593032465175-d812032760d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', tag: '30% OFF' },
  { id: 2, name: 'Navy Sherwani', category: 'Ethnic', price: '₹14,999', oldPrice: '₹18,500', rating: 5.0, image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', tag: 'BESTSELLER' },
  { id: 3, name: 'Linen Shirt', category: 'Shirts', price: '₹2,199', oldPrice: '₹3,200', rating: 4.6, image: 'https://images.unsplash.com/photo-1596756616499-c8c7f938b8d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', tag: 'NEW' },
  { id: 4, name: 'Classic Tuxedo', category: 'Suits', price: '₹9,799', oldPrice: '₹11,000', rating: 4.8, image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', tag: 'HOT' },
  { id: 5, name: 'Beige Kurta Set', category: 'Ethnic', price: '₹3,499', oldPrice: '₹5,000', rating: 4.7, image: 'https://images.unsplash.com/photo-1597983073493-88cd357a28e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', tag: 'FESTIVE' },
  { id: 6, name: 'Checkered Blazer', category: 'Suits', price: '₹5,999', oldPrice: '₹8,000', rating: 4.5, image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', tag: 'SALE' },
  { id: 7, name: 'Silk Nehru Jacket', category: 'Ethnic', price: '₹4,299', oldPrice: '₹6,500', rating: 4.8, image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', tag: 'TRENDING' },
  { id: 8, name: 'White Formal Shirt', category: 'Shirts', price: '₹1,899', oldPrice: '₹2,500', rating: 4.4, image: 'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', tag: '' },
];

const categories = ['All', 'Suits', 'Ethnic', 'Shirts', 'Blazers', 'Trousers'];

// --- PRODUCT CARD ---
const ProductCard = ({ product, onToggleWishlist, onAddToCart }) => {
  const [isLiked, setIsLiked] = useState(() => {
    const saved = localStorage.getItem('aura_wishlist');
    if (saved) {
      const list = JSON.parse(saved);
      return list.some(item => item.id === product.id);
    }
    return false;
  });

  const handleHeartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const newState = !isLiked;
    setIsLiked(newState);
    
    const saved = localStorage.getItem('aura_wishlist');
    let list = saved ? JSON.parse(saved) : [];

    if (newState) {
      if (!list.some(item => item.id === product.id)) {
        list.push(product);
      }
    } else {
      list = list.filter(item => item.id !== product.id);
    }
    localStorage.setItem('aura_wishlist', JSON.stringify(list));

    if (onToggleWishlist) {
      onToggleWishlist(product.name, newState);
    }
  };

  const handleAddToCartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const formatPrice = (p) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(typeof p === 'string' ? parseFloat(p.replace(/[^0-9.]/g, '')) : p);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-blue-100 flex flex-col relative"
    >
      {/* Image Area */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
        
        {product.tag && (
          <div className="absolute top-2 left-2 z-10 pointer-events-none">
            <span className={`text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-wider text-white shadow-sm ${product.tag.includes('OFF') || product.tag === 'SALE' ? 'bg-red-500' : 'bg-blue-600'}`}>
              {product.tag}
            </span>
          </div>
        )}

        <button 
          onClick={handleHeartClick}
          className="absolute top-2 right-2 z-20 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm text-slate-400 hover:text-red-500 transition active:scale-95 group-active:scale-90"
        >
          <Heart 
            className={`w-4 h-4 transition-colors duration-300 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} 
          />
        </button>

        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          />
        </Link>
      </div>

      {/* Info Area */}
      <div className="p-3 md:p-4 flex flex-col flex-1">
        <Link to={`/product/${product.id}`} className="block group-hover:text-blue-600 transition-colors">
          <div className="flex justify-between items-start gap-1 mb-1">
            <h3 className="font-bold text-slate-900 text-sm md:text-base leading-tight line-clamp-1">
              {product.name}
            </h3>
            <div className="flex items-center gap-1 bg-yellow-50 px-1.5 py-0.5 rounded text-yellow-600 shrink-0">
               <Star className="w-3 h-3 fill-current" />
               <span className="text-[10px] font-bold">{product.rating}</span>
            </div>
          </div>
          
          <p className="text-[10px] md:text-xs text-slate-400 mb-2">{product.category}</p>

          <div className="flex items-baseline gap-2 mt-auto">
            <span className="text-sm md:text-lg font-bold text-slate-900">{product.price}</span>
            <span className="text-[10px] md:text-xs text-slate-400 line-through">{product.oldPrice}</span>
          </div>
        </Link>
        
        {/* ADD TO CART BUTTON (WIRED UP) */}
        <button 
          onClick={handleAddToCartClick}
          className="w-full mt-3 py-2 bg-slate-900 text-white rounded-lg font-bold text-xs md:text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition shadow-lg shadow-slate-200 active:scale-95"
        >
          <ShoppingBag className="w-3.5 h-3.5" /> Add
        </button>
      </div>
    </motion.div>
  );
};

// --- MAIN PAGE ---
const CollectionPage = () => {
  const [selectedCat, setSelectedCat] = useState('All');
  const [isScrolled, setIsScrolled] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // --- NEW: ADD TO CART LOGIC ---
  const handleAddToCart = (product) => {
    const savedCart = localStorage.getItem('aura_cart');
    let cart = savedCart ? JSON.parse(savedCart) : [];
    
    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    
    // Parse price string to number for storage
    const priceNum = typeof product.price === 'string' ? parseFloat(product.price.replace(/[^0-9.]/g, '')) : product.price;
    const oldPriceNum = typeof product.oldPrice === 'string' ? parseFloat(product.oldPrice.replace(/[^0-9.]/g, '')) : product.oldPrice;

    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += 1;
    } else {
      cart.push({ 
        ...product, 
        price: priceNum,
        originalPrice: oldPriceNum,
        quantity: 1, 
        size: 'M', // Default
        color: 'Standard' // Default
      });
    }
    
    localStorage.setItem('aura_cart', JSON.stringify(cart));
    
    // Dispatch storage event to update other components if they listen
    window.dispatchEvent(new Event("storage"));
    
    showToast(`Added ${product.name} to Bag`);
  };

  const handleWishlistToggle = (productName, isAdded) => {
    showToast(`${isAdded ? 'Added' : 'Removed'} ${productName} ${isAdded ? 'to' : 'from'} Wishlist`);
  };

  const filteredProducts = selectedCat === 'All' 
    ? allProducts 
    : allProducts.filter(p => p.category === selectedCat);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20 pt-20">
      
      {/* 1. PAGE HEADER */}
      <div className="container mx-auto px-4 md:px-12 pt-8 pb-6">
        <div className="relative md:hidden mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search collection..." className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500 transition" />
        </div>
      </div>

      {/* 2. STICKY FILTER BAR */}
      <div className={`sticky top-[60px] z-30 bg-slate-50/95 backdrop-blur-md transition-shadow duration-300 ${isScrolled ? 'shadow-md border-b border-slate-200' : ''}`}>
        <div className="container mx-auto px-4 md:px-12 py-3 md:py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0 w-full md:w-auto mask-gradient">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className={`whitespace-nowrap px-5 py-2 rounded-full text-xs md:text-sm font-bold transition-all duration-300 border
                    ${selectedCat === cat 
                      ? 'bg-slate-900 text-white border-slate-900 shadow-lg scale-105' 
                      : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400 hover:text-slate-900'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="hidden md:flex gap-2 shrink-0">
               <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-bold text-slate-700 hover:border-slate-400 transition">
                  Sort by <ChevronDown className="w-4 h-4" />
               </button>
               <button className="p-2 bg-white border border-slate-200 rounded-full text-slate-700 hover:bg-slate-100 transition">
                  <Filter className="w-4 h-4" />
               </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. PRODUCT GRID */}
      <div className="container mx-auto px-4 md:px-12 py-8">
        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-8"
        >
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onToggleWishlist={handleWishlistToggle}
                onAddToCart={handleAddToCart} // Pass the handler
              />
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 font-medium">No products found in this category.</p>
            <button onClick={() => setSelectedCat('All')} className="mt-4 text-blue-600 font-bold text-sm hover:underline">Clear Filters</button>
          </div>
        )}

        <div className="mt-16 text-center">
           <button className="px-8 py-3 bg-white border border-slate-300 text-slate-900 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-sm hover:shadow-lg">
             Load More Products
           </button>
        </div>
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

export default CollectionPage;