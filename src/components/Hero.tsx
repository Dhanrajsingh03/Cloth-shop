import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag, Percent, Star } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 overflow-hidden flex flex-col justify-center pt-28 pb-10 lg:pt-0 lg:pb-0">
      
      {/* 1. BACKGROUND DECOR (Different & Clean) */}
      {/* Abstract Shape Top Left */}
      <div className="absolute top-0 left-0 w-full lg:w-1/2 h-1/2 bg-blue-100/30 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      {/* Abstract Shape Bottom Right */}
      <div className="absolute bottom-0 right-0 w-full lg:w-1/2 h-1/2 bg-blue-200/20 blur-[120px] rounded-full translate-x-1/3 translate-y-1/3"></div>

      <div className="container mx-auto px-5 lg:px-12 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center relative z-10">
        
        {/* =======================
            LEFT: TEXT CONTENT
        ======================== */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white border border-blue-100 px-4 py-1.5 rounded-full mb-6 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            <span className="text-slate-600 text-[10px] lg:text-xs font-bold uppercase tracking-widest">
              New Festive Drop '25
            </span>
          </div>

          {/* Headline - Responsive Text Size */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-slate-900 leading-[1.1] mb-6 tracking-tight font-sans">
            The Modern <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500">
              Indian Man.
            </span>
          </h1>

          <p className="text-slate-500 text-base lg:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 mb-8 font-medium">
            Discover a fusion of royal heritage and contemporary cuts. Premium Kurtas, Jackets & Suits made for you.
          </p>

          {/* Buttons - Centered on Mobile, Left on Desktop */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button className="flex items-center justify-center gap-3 px-8 py-4 bg-blue-900 text-white rounded-xl font-bold text-sm tracking-wide hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/20 active:scale-95">
              Shop Collection <ShoppingBag className="w-4 h-4" />
            </button>
            <button className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold text-sm tracking-wide hover:border-blue-600 hover:text-blue-600 transition-all active:scale-95">
              View Lookbook <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Trust Rating */}
          <div className="mt-8 lg:mt-12 flex items-center justify-center lg:justify-start gap-2">
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-sm font-bold text-slate-700">4.9/5 from 10k+ Indians</p>
          </div>
        </motion.div>


        {/* =======================
            RIGHT: IMAGE & POSTER (Perfect Mobile Stacking)
        ======================== */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="relative mx-auto w-full max-w-[400px] lg:max-w-md h-[450px] lg:h-[500px] mt-4 lg:mt-0"
        >
           {/* Image Frame */}
           <div className="w-full h-full rounded-[2rem] overflow-hidden shadow-2xl border-[6px] border-white relative z-10">
             <img 
               src="https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
               alt="Indian Fashion" 
               className="w-full h-full object-cover"
             />
             {/* Gradient for Text Readability at bottom */}
             <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/50 to-transparent"></div>
           </div>

           {/* --- THE SALE POSTER (Responsive Positioning) --- */}
           {/* On Mobile: It sits INSIDE the bottom left. On Desktop: It floats OUTSIDE. */}
           <div className="absolute -bottom-6 -right-4 lg:bottom-12 lg:-left-16 z-20 w-56 lg:w-64">
              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="bg-white p-5 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-blue-50"
              >
                <div className="flex justify-between items-start mb-2">
                   <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-1 rounded-md uppercase">
                     Limited Offer
                   </span>
                   {/* Made In India Icon */}
                   <img 
                     src="https://em-content.zobj.net/source/apple/354/flag-india_1f1ee-1f1f3.png" 
                     alt="India" 
                     className="w-5 h-5"
                   />
                </div>
                
                <h3 className="text-slate-900 font-bold text-base leading-tight mt-1">
                  Festive Sale
                </h3>
                
                <div className="flex items-end gap-1 my-1">
                  <span className="text-3xl font-black text-blue-700">40%</span>
                  <div className="flex flex-col leading-none mb-1">
                     <span className="text-[10px] font-bold text-slate-400 uppercase">Flat</span>
                     <span className="text-[10px] font-bold text-slate-400 uppercase">Off</span>
                  </div>
                </div>

                <button className="w-full mt-2 py-2 bg-slate-900 text-white text-[10px] font-bold uppercase rounded-lg hover:bg-blue-700 transition">
                  Claim Now
                </button>
              </motion.div>
           </div>
           
           {/* Decorative Circle behind image */}
           <div className="absolute top-10 -right-10 w-full h-full border-2 border-blue-100 rounded-[2rem] -z-0 hidden lg:block"></div>

        </motion.div>
      </div>
    </section>
  );
};

export default Hero;