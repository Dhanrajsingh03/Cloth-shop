import React from 'react';
import { Facebook, Instagram, Twitter, ArrowRight } from 'lucide-react';

const Footer = () => {
  // Config for links to keep JSX short
  const links = {
    Shop: ['New Arrivals', 'Best Sellers', 'Suits', 'Ethnic'],
    Support: ['Order Status', 'Delivery', 'Returns', 'Size Guide'],
    Company: ['About Us', 'Stores', 'Careers', 'Contact'],
    Legal: ['Privacy', 'Terms', 'Cookies']
  };

  return (
    <footer className="relative bg-[#0B1120] text-white overflow-hidden pt-16 pb-8 font-sans">
      {/* 1. BIG BACKGROUND TEXT */}
      <h1 className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 text-[15vw] font-black text-slate-800/20 leading-none select-none pointer-events-none">
        ROYAL
      </h1>

      <div className="container mx-auto px-6 relative z-10">
        {/* 2. TOP: NEWSLETTER */}
        <div className="flex flex-col lg:flex-row justify-between items-end gap-10 mb-16">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Join the <span className="text-blue-500">Club.</span></h2>
            <div className="flex items-center bg-slate-800/50 border border-slate-700 rounded-full p-1 focus-within:border-blue-500 transition-colors">
              <input type="email" placeholder="Email address" className="bg-transparent flex-1 px-4 py-2 outline-none text-sm" />
              <button className="bg-blue-600 p-2.5 rounded-full hover:bg-blue-500 transition"><ArrowRight className="w-4 h-4" /></button>
            </div>
          </div>
          <div className="flex gap-3">
            {[Instagram, Twitter, Facebook].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* 3. MIDDLE: LINKS LOOP */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-slate-800 pt-10 mb-10">
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="font-bold mb-4 text-xs uppercase tracking-widest text-slate-500">{title}</h4>
              <ul className="space-y-3 text-sm font-medium text-slate-300">
                {items.map(item => (
                  <li key={item}><a href="#" className="hover:text-blue-500 hover:translate-x-1 block transition-all">{item}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 4. BOTTOM */}
        <div className="text-center md:text-left text-xs text-slate-600 font-medium">
          &copy; 2025 Royal Menswear Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;