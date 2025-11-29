import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ShoppingBag, Heart, Star, ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- MOCK DATA (Strictly Men's Accessories) ---
const accessories = [
  { id: 201, name: 'The Chrono Black', category: 'Watches', price: 8999, oldPrice: 12500, rating: 4.9, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1000&auto=format&fit=crop', tag: 'LUXURY' },
  { id: 202, name: 'Oxford Leather Belt', category: 'Belts', price: 2499, oldPrice: 3500, rating: 4.7, image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=1000&auto=format&fit=crop', tag: 'ESSENTIAL' },
  { id: 203, name: 'Aviator Sunglasses', category: 'Eyewear', price: 3999, oldPrice: 5000, rating: 4.6, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1000&auto=format&fit=crop', tag: 'NEW' },
  { id: 204, name: 'Slim Cardholder', category: 'Wallets', price: 1299, oldPrice: 1800, rating: 4.5, image: 'https://images.unsplash.com/photo-1627123424574-181ce5171c98?q=80&w=1000&auto=format&fit=crop', tag: '' },
  { id: 205, name: 'Silk Pocket Square', category: 'Ties', price: 899, oldPrice: 1200, rating: 4.8, image: 'https://images.unsplash.com/photo-1596522354195-e84ae80050d0?q=80&w=1000&auto=format&fit=crop', tag: 'FORMAL' },
  { id: 206, name: 'Silver Cufflinks', category: 'Jewelry', price: 1999, oldPrice: 2500, rating: 4.7, image: 'https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=1000&auto=format&fit=crop', tag: '' },
  { id: 207, name: 'Weekender Duffle', category: 'Bags', price: 6499, oldPrice: 8000, rating: 4.9, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop', tag: 'BESTSELLER' },
  { id: 208, name: 'Gold Signet Ring', category: 'Jewelry', price: 3499, oldPrice: 4500, rating: 4.4, image: 'https://images.unsplash.com/photo-1617038220319-88af15286a77?q=80&w=1000&auto=format&fit=crop', tag: 'TRENDING' },
];

const categoryTiles = [
  { name: 'Watches', image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=800&auto=format&fit=crop', col: 'col-span-2' },
  { name: 'Wallets', image: 'https://images.unsplash.com/photo-1601612753239-2779774643c7?q=80&w=800&auto=format&fit=crop', col: 'col-span-1' },
  { name: 'Eyewear', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop', col: 'col-span-1' },
  { name: 'Belts', image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=800&auto=format&fit=crop', col: 'col-span-2' },
];

// --- COMPONENT: PRODUCT CARD (Consistent Design) ---
const AccessoryCard = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false);
  const formatPrice = (p) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(p);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="group bg-white rounded-xl overflow-hidden border border-slate-100 hover:border-blue-100 hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      <div className="relative aspect-[4/5] bg-slate-50 overflow-hidden">
        {product.tag && (
          <span className="absolute top-2 left-2 z-10 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider">
            {product.tag}
          </span>
        )}
        <button 
          onClick={(e) => { e.preventDefault(); setIsLiked(!isLiked); }}
          className="absolute top-2 right-2 z-20 p-2 bg-white/80 backdrop-blur-sm rounded-full text-slate-400 hover:text-red-500 transition-all shadow-sm"
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
        </button>
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          />
        </Link>
      </div>

      <div className="p-3 flex flex-col flex-1">
        <Link to={`/product/${product.id}`} className="block">
          <div className="flex justify-between items-start mb-1 gap-1">
             <h3 className="text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-blue-700 transition-colors">
               {product.name}
             </h3>
             <div className="flex items-center gap-1 text-yellow-500 text-[10px] font-bold bg-yellow-50 px-1.5 py-0.5 rounded shrink-0">
               <Star className="w-3 h-3 fill-current" /> {product.rating}
             </div>
          </div>
          <p className="text-[10px] text-slate-400 font-medium mb-3 uppercase tracking-wide">{product.category}</p>
          
          <div className="flex items-baseline gap-2 mt-auto">
             <span className="text-sm font-bold text-slate-900">{formatPrice(product.price)}</span>
             <span className="text-[10px] text-slate-400 line-through">{formatPrice(product.oldPrice)}</span>
          </div>
        </Link>
        
        <button className="w-full mt-3 py-2 bg-white border border-slate-200 text-slate-900 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-slate-900 hover:text-white transition-all">
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

// --- MAIN PAGE COMPONENT ---
const AccessoriesPage = () => {
  const [selectedCat, setSelectedCat] = useState('All');

  const filteredProducts = selectedCat === 'All' 
    ? accessories 
    : accessories.filter(p => p.category === selectedCat);

  return (
    <div className="min-h-screen bg-white font-sans pt-20 pb-20">
      
      {/* 1. HERO HEADER (Masculine & Sharp) */}
      <div className="container mx-auto px-4 lg:px-12 py-8">
        <div className="mb-8">
           <span className="text-blue-600 font-bold uppercase tracking-widest text-xs">Men's Essentials</span>
           <h1 className="text-4xl md:text-6xl font-black text-slate-900 mt-2 tracking-tighter">
             UPGRADE YOUR <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-400">EVERYDAY.</span>
           </h1>
        </div>
      </div>

      {/* 3. STICKY FILTER BAR */}
      <div className="sticky top-[68px] z-30 bg-white/95 backdrop-blur-md border-y border-slate-100 mb-8">
        <div className="container mx-auto px-4 lg:px-12 py-3 flex items-center justify-between">
           
           {/* Scrollable Pills */}
           <div className="flex gap-2 overflow-x-auto no-scrollbar w-full md:w-auto">
              <button 
                onClick={() => setSelectedCat('All')} 
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border transition-all whitespace-nowrap
                ${selectedCat === 'All' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'}`}
              >
                All Items
              </button>
              {['Watches', 'Wallets', 'Belts', 'Eyewear', 'Jewelry', 'Ties', 'Bags'].map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setSelectedCat(cat)} 
                  className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border transition-all whitespace-nowrap
                  ${selectedCat === cat ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'}`}
                >
                  {cat}
                </button>
              ))}
           </div>

           {/* Filter Icon (Desktop) */}
           <div className="hidden md:flex gap-2 shrink-0 ml-4">
              <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-full text-xs font-bold hover:bg-slate-50">
                 Sort <ChevronDown className="w-3 h-3" />
              </button>
              <button className="p-1.5 border border-slate-200 rounded-full hover:bg-slate-50">
                 <Filter className="w-3 h-3" />
              </button>
           </div>
        </div>
      </div>

      {/* 4. PRODUCT GRID */}
      <div className="container mx-auto px-4 lg:px-12">
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-8">
           <AnimatePresence>
             {filteredProducts.map((product) => (
               <AccessoryCard key={product.id} product={product} />
             ))}
           </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
           <div className="py-24 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="text-slate-500 font-medium">No items found in this category.</p>
              <button onClick={() => setSelectedCat('All')} className="mt-4 text-slate-900 font-bold border-b border-slate-900 pb-0.5 text-sm">View All Accessories</button>
           </div>
        )}
      </div>

    </div>
  );
};

export default AccessoriesPage;