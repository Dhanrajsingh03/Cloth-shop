import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Package, MapPin, CreditCard, Settings, LogOut, Heart, ChevronRight, Camera, Plus, Edit2, Trash2, Truck, CheckCircle, ShoppingBag, X, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- MOCK DATA ---
const userProfile = {
  name: 'Rahul Sharma',
  email: 'rahul.sharma@example.com',
  phone: '+91 98765 43210',
  memberSince: 'Jan 2025',
  avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=400&auto=format&fit=crop',
  membership: 'Platinum'
};

const orders = [
  { id: '#ORD-7782', date: 'Oct 24, 2025', total: '₹14,999', status: 'Delivered', items: [
    'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=100&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1617137968427-85924c809a22?q=80&w=100&auto=format&fit=crop'
  ]},
  { id: '#ORD-9921', date: 'Oct 12, 2025', total: '₹2,199', status: 'Processing', items: [
    'https://images.unsplash.com/photo-1596756616499-c8c7f938b8d9?q=80&w=100&auto=format&fit=crop'
  ]},
];

const addresses = [
  { id: 1, type: 'Home', address: '108, Cyber City, DLF Phase 2', city: 'Gurugram', state: 'Haryana', zip: '122002', phone: '+91 98765 43210', isDefault: true },
  { id: 2, type: 'Work', address: 'WeWork, 12th Main Rd, Indiranagar', city: 'Bangalore', state: 'Karnataka', zip: '560008', phone: '+91 98765 43210', isDefault: false },
];

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('orders');
  
  // Safe initialization of wishlist
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('aura_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to load wishlist", e);
      return [];
    }
  });

  // Sync state if localStorage changes elsewhere (optional safety)
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem('aura_wishlist');
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const removeItem = (id) => {
    const updatedList = wishlist.filter(item => item.id !== id);
    setWishlist(updatedList);
    localStorage.setItem('aura_wishlist', JSON.stringify(updatedList));
  };

  const tabs = [
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'payment', label: 'Payment Methods', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const formatPrice = (p) => {
    if (!p) return '';
    const num = typeof p === 'string' ? parseFloat(p.replace(/[^0-9.]/g, '')) : p;
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(num);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      
      {/* 1. HEADER BANNER */}
      <div className="h-64 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-slate-600 opacity-90"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/2"></div>
        <div className="container mx-auto px-4 lg:px-12 h-full flex items-center relative z-10 pt-10">
          <h1 className="text-3xl font-black text-white tracking-tight">My Profile</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-12 -mt-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* --- LEFT SIDE: PROFILE CARD --- */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden sticky top-24">
              <div className="p-8 text-center border-b border-slate-100">
                <div className="relative inline-block mb-4">
                  <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-blue-500 to-purple-500">
                    <img src={userProfile.avatar} alt="Profile" className="w-full h-full object-cover rounded-full border-4 border-white" />
                  </div>
                  <button className="absolute bottom-1 right-1 p-2 bg-slate-900 text-white rounded-full hover:bg-blue-600 transition-colors shadow-lg border-2 border-white">
                    <Camera className="w-3.5 h-3.5" />
                  </button>
                </div>
                <h2 className="text-xl font-bold text-slate-900">{userProfile.name}</h2>
                <p className="text-sm text-slate-500 mb-4">{userProfile.email}</p>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                  <Award className="w-3 h-3 text-yellow-400" /> {userProfile.membership} Member
                </div>
              </div>
              
              <div className="p-4">
                <nav className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all
                        ${activeTab === tab.id 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
                    >
                      <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'fill-current' : ''}`} />
                      {tab.label}
                      {activeTab === tab.id && <ChevronRight className="w-4 h-4 ml-auto" />}
                    </button>
                  ))}
                  <div className="h-px bg-slate-100 my-2"></div>
                  <button className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all">
                    <LogOut className="w-5 h-5" /> Sign Out
                  </button>
                </nav>
              </div>
            </div>
          </div>

          {/* --- RIGHT SIDE: DYNAMIC CONTENT --- */}
          <div className="lg:col-span-8 xl:col-span-9 pt-0 lg:pt-20">
            <AnimatePresence mode="wait">
              
              {/* ORDERS */}
              {activeTab === 'orders' && (
                <motion.div 
                  key="orders"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Recent Orders</h3>
                  {orders.map((order) => (
                    <div key={order.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center hover:shadow-md transition-shadow">
                      <div className="w-20 h-24 bg-slate-100 rounded-xl overflow-hidden shrink-0">
                        {/* Using first item image */}
                        <img src={order.items[0]} alt="Product" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-bold text-slate-900">{order.id}</h4>
                            <p className="text-xs text-slate-500">Ordered on {order.date}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                            ${order.status === 'Delivered' ? 'bg-green-50 text-green-600' : 
                              order.status === 'Processing' ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'}`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <p className="text-sm font-medium text-slate-600">{order.items.length} {order.items.length === 1 ? 'Item' : 'Items'}</p>
                          <p className="font-bold text-slate-900">{order.total}</p>
                        </div>
                      </div>
                      <div className="w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-slate-100 flex md:block">
                        <button className="w-full md:w-auto px-6 py-2.5 border border-slate-200 rounded-lg text-sm font-bold text-slate-700 hover:border-slate-900 hover:text-slate-900 transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* ADDRESSES */}
              {activeTab === 'addresses' && (
                <motion.div 
                  key="addresses"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-slate-900">Saved Addresses</h3>
                    <button className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:underline">
                      <Plus className="w-4 h-4" /> Add New
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {addresses.map((addr) => (
                      <div key={addr.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative group">
                        {addr.isDefault && (
                          <span className="absolute top-4 right-4 text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded uppercase tracking-wide">Default</span>
                        )}
                        <div className="flex items-center gap-2 mb-4">
                          <MapPin className="w-5 h-5 text-slate-400" />
                          <h4 className="font-bold text-slate-900">{addr.type}</h4>
                        </div>
                        <p className="text-sm text-slate-500 leading-relaxed mb-4">
                          {addr.address},<br/>
                          {addr.city}, {addr.state} - {addr.zip}<br/>
                          <span className="text-slate-400 mt-1 block">Phone: {addr.phone}</span>
                        </p>
                        <div className="flex gap-3 pt-4 border-t border-slate-50">
                          <button className="flex-1 py-2 text-xs font-bold text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors flex items-center justify-center gap-2">
                            <Edit2 className="w-3 h-3" /> Edit
                          </button>
                          <button className="flex-1 py-2 text-xs font-bold text-slate-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors flex items-center justify-center gap-2">
                            <Trash2 className="w-3 h-3" /> Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* REAL WISHLIST TAB */}
              {activeTab === 'wishlist' && (
                <motion.div 
                  key="wishlist"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <h3 className="text-xl font-bold text-slate-900 mb-6">My Wishlist</h3>
                  
                  {wishlist.length === 0 ? (
                    <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-slate-200">
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Heart className="w-8 h-8 text-slate-300" />
                      </div>
                      <p className="text-slate-500 mb-4">Your wishlist is empty.</p>
                      <Link to="/collections" className="text-blue-600 font-bold hover:underline">Explore Collections</Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {wishlist.map((item) => (
                        <div key={item.id} className="bg-white p-4 rounded-2xl border border-slate-100 flex gap-4 relative">
                          <button onClick={() => removeItem(item.id)} className="absolute top-2 right-2 p-1.5 bg-slate-50 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                            <X className="w-4 h-4" />
                          </button>
                          <div className="w-20 h-24 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex flex-col justify-center">
                            <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{item.name}</h4>
                            <p className="text-xs text-slate-500 mb-2">{item.category}</p>
                            <span className="font-bold text-slate-900">{formatPrice(item.price)}</span>
                            <Link to={`/product/${item.id}`} className="mt-2 text-xs font-bold text-blue-600 hover:underline">View Product</Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* SETTINGS TAB */}
              {activeTab === 'settings' && (
                <motion.div 
                  key="settings"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="max-w-2xl"
                >
                  <h3 className="text-xl font-bold text-slate-900 mb-6">Personal Information</h3>
                  <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">First Name</label>
                        <input type="text" defaultValue="Rahul" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-medium text-slate-900 focus:outline-none focus:border-blue-500 transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Last Name</label>
                        <input type="text" defaultValue="Sharma" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-medium text-slate-900 focus:outline-none focus:border-blue-500 transition-colors" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Email Address</label>
                      <input type="email" defaultValue="rahul.sharma@example.com" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-medium text-slate-900 focus:outline-none focus:border-blue-500 transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Phone Number</label>
                      <input type="tel" defaultValue="+91 98765 43210" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-medium text-slate-900 focus:outline-none focus:border-blue-500 transition-colors" />
                    </div>
                    
                    <div className="pt-4 flex justify-end">
                      <button className="bg-slate-900 text-white px-8 py-3 rounded-lg font-bold text-sm uppercase tracking-wide hover:bg-blue-600 transition-all shadow-lg">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* PAYMENT (COMING SOON) */}
              {activeTab === 'payment' && (
                <motion.div 
                  key="payment"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-slate-100"
                >
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                    <CreditCard className="w-8 h-8 text-slate-300" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Payment Methods</h3>
                  <p className="text-slate-500 text-sm mt-1">Saved cards and UPI options coming soon.</p>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;