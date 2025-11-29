import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react';

const AuthPage = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 1. BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          >
            {/* 2. MODAL CARD */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-4xl h-auto md:h-[550px] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative"
            >
              
              {/* CLOSE BUTTON */}
              <button 
                onClick={onClose} 
                className="absolute top-4 right-4 z-20 p-2 bg-white/50 backdrop-blur rounded-full hover:bg-black hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              {/* LEFT SIDE: IMAGE */}
              <div className="hidden md:block w-1/2 relative bg-black">
                <motion.img 
                  key={isLogin ? 'login-img' : 'signup-img'}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  src={isLogin 
                    ? "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1000&auto=format&fit=crop" 
                    : "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1000&auto=format&fit=crop"
                  }
                  alt="Auth" 
                  className="absolute inset-0 w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                
                <div className="absolute bottom-10 left-10 text-white z-10">
                  <h2 className="text-3xl font-black mb-2">AURA<span className="text-blue-500">MOD</span></h2>
                  <p className="text-white/70 text-sm leading-relaxed max-w-xs">
                    {isLogin ? "Welcome back. Your wardrobe is waiting." : "Join the revolution of modern tailoring."}
                  </p>
                </div>
              </div>

              {/* RIGHT SIDE: FORM */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
                
                <div className="mb-6 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-slate-900 mb-1">
                    {isLogin ? "Sign In" : "Create Account"}
                  </h3>
                  <p className="text-slate-500 text-sm">
                    {isLogin ? "Access your saved items and orders." : "Get started with your free account."}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <button className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition text-sm font-bold text-slate-700">
                    <span className="text-lg">G</span> Google
                  </button>
                  <button className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition text-sm font-bold text-slate-700">
                    <span className="text-lg"></span> Apple
                  </button>
                </div>

                <div className="relative flex items-center justify-center mb-6">
                   <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
                   <span className="relative bg-white px-3 text-[10px] font-bold text-slate-400 uppercase">Or continue with</span>
                </div>

                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  
                  {!isLogin && (
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input type="text" placeholder="Full Name" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all" />
                    </div>
                  )}

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="email" placeholder="Email Address" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all" />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Password" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-10 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all" 
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-black">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  <button className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-bold uppercase tracking-wider text-sm hover:bg-blue-700 transition-all shadow-lg flex items-center justify-center gap-2">
                    {isLogin ? "Sign In" : "Sign Up"}
                    <ArrowRight className="w-4 h-4" />
                  </button>

                </form>

                <div className="mt-6 text-center text-sm text-slate-500">
                  {isLogin ? "Not a member?" : "Already a member?"}
                  <button onClick={() => setIsLogin(!isLogin)} className="ml-2 font-bold text-blue-600 hover:underline">
                    {isLogin ? "Join Now" : "Sign In"}
                  </button>
                </div>

              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthPage;