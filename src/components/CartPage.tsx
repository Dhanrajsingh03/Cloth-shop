import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, ShoppingBag, CreditCard, Tag, MapPin, Check, Truck, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- MOCK ADDRESSES ---
const mockAddresses = [
  { id: 1, type: 'Home', address: '108, Cyber City, DLF Phase 2', city: 'Gurugram', state: 'Haryana', zip: '122002', phone: '+91 98765 43210' },
  { id: 2, type: 'Work', address: 'WeWork, 12th Main Rd, Indiranagar', city: 'Bangalore', state: 'Karnataka', zip: '560008', phone: '+91 98765 43210' },
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('aura_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (e) {
      console.error("Failed to parse cart from local storage", e);
      return [];
    }
  });
  
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState(mockAddresses[0].id);

  useEffect(() => {
    localStorage.setItem('aura_cart', JSON.stringify(cartItems));
    window.dispatchEvent(new Event("storage"));
  }, [cartItems]);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 2000 ? 0 : 150;
  const total = subtotal - discount + shipping;

  const updateQuantity = (id, change) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'aura20') {
      setDiscount(Math.round(subtotal * 0.2));
      alert('Coupon Applied: 20% Off!');
    } else {
      alert('Invalid Coupon Code');
    }
  };

  const formatPrice = (p) => {
    if (p === undefined || p === null) return '';
    const num = typeof p === 'string' ? parseFloat(p.replace(/[^0-9.]/g, '')) : p;
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(num);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pt-24 pb-32 lg:pb-20">
      
      {/* PAGE HEADER */}
      <div className="container mx-auto px-4 lg:px-12 mb-8">
        <div className="flex items-end gap-4">
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter">Shopping Bag</h1>
          <span className="text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">({cartItems.length} Items)</span>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-12">
        
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-[2rem] border border-slate-100 shadow-sm">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="w-8 h-8 text-slate-300" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Your bag is empty</h2>
            <p className="text-slate-500 max-w-xs mb-8 text-sm">Start your journey with our latest collections.</p>
            <Link to="/collections" className="bg-slate-900 text-white px-10 py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg flex items-center gap-2">
              Start Shopping <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            
            {/* --- LEFT COLUMN: ITEMS --- */}
            <div className="flex-1">
              
              {/* CART ITEMS LIST */}
              <div className="space-y-4">
                <AnimatePresence>
                  {cartItems.map((item) => (
                    <motion.div 
                      layout
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                      className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex gap-4 md:gap-6 relative group"
                    >
                      {/* Image */}
                      <Link to={`/product/${item.id}`} className="w-24 h-32 md:w-32 md:h-40 bg-gray-100 rounded-xl overflow-hidden shrink-0 block group">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </Link>

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1">{item.category}</p>
                            <Link to={`/product/${item.id}`} className="block">
                              <h3 className="font-bold text-slate-900 text-base md:text-lg leading-tight mb-1 hover:text-blue-600 transition-colors">{item.name}</h3>
                            </Link>
                            <p className="text-xs text-slate-500 font-medium">
                              Size: {item.size || 'M'} • Color: {item.color || 'Standard'}
                            </p>
                          </div>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-slate-300 hover:text-red-500 transition p-2 hover:bg-red-50 rounded-full"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex justify-between items-end mt-4">
                          <div className="flex items-center gap-4">
                             <div className="flex items-center border border-slate-200 rounded-lg h-9 px-1">
                                <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-full flex items-center justify-center text-slate-400 hover:text-slate-900"><Minus className="w-3 h-3" /></button>
                                <span className="w-6 text-center text-xs font-bold text-slate-900">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-full flex items-center justify-center text-slate-400 hover:text-slate-900"><Plus className="w-3 h-3" /></button>
                             </div>
                          </div>
                          <div className="text-right">
                             <p className="text-lg font-bold text-slate-900">{formatPrice(item.price * item.quantity)}</p>
                             {item.quantity > 1 && <span className="text-[10px] text-slate-400 font-medium">{formatPrice(item.price)} each</span>}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Delivery Note */}
              <div className="mt-6 flex items-center gap-3 text-sm text-slate-500 bg-white border border-slate-100 p-4 rounded-xl shadow-sm">
                 <Truck className="w-5 h-5 text-blue-600" />
                 <span>Free express delivery on all orders above ₹2000</span>
              </div>

              {/* Trust Badge */}
              <div className="mt-4 flex items-center gap-2 p-4 bg-blue-50/50 rounded-xl border border-blue-100 text-blue-700 text-xs font-bold">
                <ShieldCheck className="w-4 h-4" />
                Secure Checkout • 30-Day Returns • Official Warranty
              </div>

            </div>

            {/* --- RIGHT COLUMN: CHECKOUT PANEL (Sticky) --- */}
            <div className="w-full lg:w-[400px] lg:sticky lg:top-28">
              <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100">
                
                {/* 1. SHIPPING ADDRESS SELECTOR */}
                <div className="mb-8">
                   <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <MapPin className="w-3 h-3" /> Shipping To
                      </h3>
                      <Link to="/profile" className="text-[10px] font-bold text-blue-600 hover:text-blue-800 transition-colors">CHANGE</Link>
                   </div>
                   
                   <div className="space-y-3">
                      {mockAddresses.map((addr) => (
                        <div 
                          key={addr.id}
                          onClick={() => setSelectedAddress(addr.id)}
                          className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all group
                            ${selectedAddress === addr.id 
                              ? 'border-blue-600 bg-blue-50/30' 
                              : 'border-slate-100 hover:border-slate-300 bg-white'}`}
                        >
                          <div className="flex justify-between items-start">
                             <div>
                               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block mb-1">{addr.type}</span>
                               <p className="text-sm font-bold text-slate-900 leading-snug pr-6">
                                 {addr.address}, {addr.city}
                               </p>
                               <p className="text-xs text-slate-500 mt-1">{addr.zip}</p>
                             </div>
                             {selectedAddress === addr.id && (
                               <CheckCircle className="w-5 h-5 text-blue-600 shrink-0" />
                             )}
                          </div>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="w-full h-px bg-slate-100 mb-8"></div>
                
                {/* 2. ORDER SUMMARY */}
                <h2 className="text-lg font-black text-slate-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-8 text-sm">
                  <div className="flex justify-between text-slate-500">
                    <span>Subtotal</span>
                    <span className="font-bold text-slate-900">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Shipping</span>
                    <span className="font-bold text-slate-900">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span className="font-bold">- {formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-lg">
                    <span className="font-bold text-slate-900">Total</span>
                    <span className="font-bold text-2xl text-slate-900">{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Promo Input */}
                <div className="mb-8">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        type="text" 
                        placeholder="Promo Code" 
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500 transition uppercase font-bold"
                      />
                    </div>
                    <button 
                      onClick={handleApplyPromo}
                      className="bg-slate-900 text-white px-4 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-slate-800 transition"
                    >
                      Apply
                    </button>
                  </div>
                </div>

                <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 group hidden lg:flex">
                  Proceed to Payment <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <div className="mt-6 flex justify-center gap-3 opacity-40 grayscale">
                   <div className="h-6 w-10 bg-slate-100 rounded flex items-center justify-center border border-slate-200"><CreditCard className="w-4 h-4 text-slate-600" /></div>
                   <div className="h-6 w-10 bg-slate-100 rounded flex items-center justify-center border border-slate-200"><span className="text-[8px] font-bold text-slate-600">UPI</span></div>
                   <div className="h-6 w-10 bg-slate-100 rounded flex items-center justify-center border border-slate-200"><span className="text-[8px] font-bold text-slate-600">VISA</span></div>
                </div>

              </div>
            </div>

          </div>
        )}

      </div>

      {/* MOBILE STICKY TOTAL */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-4 lg:hidden z-40 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
           <div className="flex gap-4 items-center">
              <div className="flex-1">
                 <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-0.5">Total to Pay</p>
                 <p className="text-xl font-black text-slate-900 leading-none">{formatPrice(total)}</p>
              </div>
              <button className="bg-slate-900 text-white px-8 py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs hover:bg-blue-600 transition-all shadow-lg flex items-center justify-center gap-2">
                Pay Now <ArrowRight className="w-4 h-4" />
              </button>
           </div>
        </div>
      )}

    </div>
  );
};

export default CartPage;