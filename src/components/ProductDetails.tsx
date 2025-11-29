import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, Share2, Truck, Ruler, RefreshCcw, ChevronDown, Check, Minus, Plus, ShoppingBag } from 'lucide-react';

// --- MOCK PRODUCT DATA ---
const product = {
  id: 1,
  name: "The Royal Navy Italian Wool Suit",
  price: 8499,
  originalPrice: 12999,
  rating: 4.8,
  reviews: 128,
  tag: "BESTSELLER",
  description: "Crafted from the finest Italian wool, this navy suit defines modern elegance. Featuring a slim-fit silhouette, satin-finished lapels, and a breathable lining, it is designed for the gentleman who commands every room.",
  colors: [
    { name: 'Navy', hex: '#1e3a8a' },
    { name: 'Black', hex: '#000000' },
    { name: 'Charcoal', hex: '#374151' }
  ],
  sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  images: [
    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1593032465175-d812032760d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // Detail 1
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // Detail 2
    "https://images.unsplash.com/photo-1617137968427-85924c809a22?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"  // Lifestyle
  ],
  details: [
    { title: "Fabric & Care", content: "100% Super 120s Wool. Dry clean only. Do not bleach. Steam iron low." },
    { title: "Fit & Sizing", content: "Slim fit. Model is 6'1\" wearing size L. Fits true to size." },
    { title: "Shipping & Returns", content: "Free shipping on orders over ₹2000. Easy 7-day returns & exchanges." }
  ]
};

// --- COMPONENT: ACCORDION ITEM ---
const Accordion = ({ title, content, isOpen, onClick }) => (
  <div className="border-b border-slate-100">
    <button onClick={onClick} className="w-full py-4 flex justify-between items-center text-left hover:text-blue-600 transition-colors">
      <span className="font-bold text-sm text-slate-900">{title}</span>
      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }} 
          animate={{ height: 'auto', opacity: 1 }} 
          exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden"
        >
          <p className="text-sm text-slate-500 pb-4 leading-relaxed">{content}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// --- MAIN PAGE COMPONENT ---
const ProductDetails = () => {
  const [selectedSize, setSelectedSize] = useState('L');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState(0); // Index of open accordion

  const formatPrice = (p) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(p);

  return (
    <div className="bg-white min-h-screen pt-20 pb-32 lg:pb-20 font-sans">
      
      {/* 1. BREADCRUMBS */}
      <div className="container mx-auto px-4 lg:px-12 py-4">
        <nav className="text-xs text-slate-400 flex items-center gap-2">
          <a href="/" className="hover:text-slate-900">Home</a>
          <span>/</span>
          <a href="/shop" className="hover:text-slate-900">Suits</a>
          <span>/</span>
          <span className="text-slate-900 font-medium truncate max-w-[150px]">{product.name}</span>
        </nav>
      </div>

      <div className="container mx-auto px-4 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        
        {/* =======================
            LEFT: IMAGE GALLERY
        ======================== */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-[4/5] bg-slate-50 rounded-2xl overflow-hidden relative border border-slate-100">
             <motion.img 
               key={activeImage}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 0.5 }}
               src={product.images[activeImage]} 
               alt={product.name} 
               className="w-full h-full object-cover"
             />
             <div className="absolute top-4 left-4">
               <span className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                 {product.tag}
               </span>
             </div>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-3">
             {product.images.map((img, idx) => (
               <button 
                 key={idx} 
                 onClick={() => setActiveImage(idx)}
                 className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-slate-900 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
               >
                 <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
               </button>
             ))}
          </div>
        </div>

        {/* =======================
            RIGHT: DETAILS & ACTIONS
        ======================== */}
        <div className="lg:sticky lg:top-24 h-fit">
          
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl md:text-4xl font-black text-slate-900 mb-2 leading-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-4">
               <div className="flex items-center gap-1 text-yellow-500">
                 <Star className="w-4 h-4 fill-current" />
                 <span className="text-sm font-bold text-slate-900 pt-0.5">{product.rating}</span>
                 <span className="text-xs text-slate-400 font-medium ml-1">({product.reviews} reviews)</span>
               </div>
               <span className="text-xs text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded">In Stock</span>
            </div>
          </div>

          {/* Price */}
          <div className="mb-8 border-b border-slate-100 pb-8">
            <div className="flex items-end gap-3 mb-2">
              <span className="text-3xl font-bold text-slate-900">{formatPrice(product.price)}</span>
              <span className="text-lg text-slate-400 line-through mb-1">{formatPrice(product.originalPrice)}</span>
              <span className="text-sm font-bold text-red-500 mb-1 bg-red-50 px-2 rounded">
                 {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </span>
            </div>
            <p className="text-xs text-slate-500">Inclusive of all taxes. Free shipping applied at checkout.</p>
          </div>

          {/* Color Selector */}
          <div className="mb-6">
            <h4 className="text-sm font-bold text-slate-900 mb-3">Color: <span className="text-slate-500 font-normal">{selectedColor.name}</span></h4>
            <div className="flex gap-3">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${selectedColor.name === color.name ? 'border-slate-900' : 'border-transparent hover:border-slate-300'}`}
                >
                  <div className="w-8 h-8 rounded-full border border-black/10" style={{ backgroundColor: color.hex }}></div>
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
               <h4 className="text-sm font-bold text-slate-900">Size: <span className="text-slate-500 font-normal">{selectedSize}</span></h4>
               <button className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline">
                 <Ruler className="w-3 h-3" /> Size Guide
               </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-10 rounded-lg text-sm font-bold border transition-all
                    ${selectedSize === size 
                      ? 'bg-slate-900 text-white border-slate-900 shadow-lg' 
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Actions (Desktop) */}
          <div className="hidden lg:flex gap-4 mb-8">
             {/* Quantity */}
             <div className="flex items-center border border-slate-200 rounded-xl px-2">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 text-slate-400 hover:text-black"><Minus className="w-4 h-4" /></button>
                <span className="w-8 text-center font-bold text-sm">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-2 text-slate-400 hover:text-black"><Plus className="w-4 h-4" /></button>
             </div>

             {/* Add to Cart */}
             <button className="flex-1 bg-slate-900 text-white py-4 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-blue-700 transition-all shadow-xl shadow-slate-900/20 flex items-center justify-center gap-2">
               <ShoppingBag className="w-4 h-4" /> Add to Cart
             </button>

             {/* Wishlist */}
             <button className="p-4 border border-slate-200 rounded-xl text-slate-400 hover:text-red-500 hover:border-red-200 transition-all">
               <Heart className="w-6 h-6" />
             </button>
          </div>

          {/* Product Description Text */}
          <p className="text-slate-600 text-sm leading-7 mb-8">
            {product.description}
          </p>

          {/* Feature Highlights */}
          <div className="grid grid-cols-2 gap-4 mb-8">
             <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <Truck className="w-5 h-5 text-blue-600" />
                <div className="text-xs">
                   <span className="block font-bold text-slate-900">Free Shipping</span>
                   <span className="text-slate-500">On all orders</span>
                </div>
             </div>
             <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <RefreshCcw className="w-5 h-5 text-blue-600" />
                <div className="text-xs">
                   <span className="block font-bold text-slate-900">Easy Returns</span>
                   <span className="text-slate-500">7 Days Policy</span>
                </div>
             </div>
          </div>

          {/* Accordions */}
          <div className="border-t border-slate-100">
             {product.details.map((item, idx) => (
               <Accordion 
                 key={idx} 
                 title={item.title} 
                 content={item.content} 
                 isOpen={openAccordion === idx} 
                 onClick={() => setOpenAccordion(openAccordion === idx ? null : idx)} 
               />
             ))}
          </div>

        </div>
      </div>

      {/* =======================================
          MOBILE STICKY BOTTOM BAR
      ======================================== */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-4 lg:hidden z-40 flex gap-3 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
         <button className="p-3 border border-slate-200 rounded-xl text-slate-400 hover:text-red-500">
           <Heart className="w-6 h-6" />
         </button>
         <button className="flex-1 bg-slate-900 text-white rounded-xl font-bold text-sm uppercase tracking-wider shadow-lg flex items-center justify-center gap-2">
           Add to Cart • {formatPrice(product.price)}
         </button>
      </div>

    </div>
  );
};

export default ProductDetails;