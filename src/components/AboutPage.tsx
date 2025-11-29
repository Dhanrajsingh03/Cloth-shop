import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Globe, CheckCircle, ArrowRight, ShieldCheck, Smile, MapPin, Phone, Mail, Send } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="bg-white min-h-screen font-sans pt-20 text-slate-900">
      
      {/* 1. HERO SECTION (Clean & Modern Blue) */}
      <section className="relative w-full py-20 lg:py-32 overflow-hidden bg-slate-50">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100 rounded-full blur-[100px] opacity-60 translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-[80px] opacity-60 -translate-x-1/2 translate-y-1/2"></div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1.5 px-4 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              Since 2025 • Made for Men
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 leading-tight tracking-tight">
              We Don't Just Make Suits. <br/> We Engineer <span className="text-blue-600">Confidence.</span>
            </h1>
            <p className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              Bridging the gap between Italian craftsmanship and modern Indian needs. Premium fabrics, perfect fit, no compromise.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. IMAGE & STORY GRID */}
      <section className="py-24 px-6 lg:px-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Image Side */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -inset-4 border-2 border-blue-100 rounded-[2rem] -z-10 hidden md:block"></div>
              <img 
                src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=2000&auto=format&fit=crop" 
                alt="Man in Blue Suit" 
                className="w-full h-[550px] object-cover rounded-2xl shadow-2xl"
              />
              {/* Floating Badge */}
              <div className="absolute bottom-8 right-8 bg-white p-6 rounded-xl shadow-xl max-w-xs hidden sm:block">
                <p className="text-4xl font-black text-blue-600 mb-1">50k+</p>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">Gentlemen Styled</p>
              </div>
            </motion.div>

            {/* Text Side */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-3">Our Mission</h3>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                Designed for the <br/> Modern Leader.
              </h2>
              <div className="w-20 h-1.5 bg-blue-600 rounded-full mb-8"></div>
              
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                It started with a simple frustration: why is it so hard to find a suit that fits perfectly off the rack?
              </p>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                At Aura Mod, we obsess over the details so you don't have to. From the lapel width to the button stance, every millimeter is calculated to enhance your silhouette.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                  <span className="font-bold text-slate-800">Premium Fabrics</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                  <span className="font-bold text-slate-800">Tailored Fit</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                  <span className="font-bold text-slate-800">Ethical Sourcing</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                  <span className="font-bold text-slate-800">Made in India</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. CORE VALUES (Cards) */}
    <section className="py-20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Why Choose Aura?</h2>
        <div className="w-12 h-1 bg-blue-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: ShieldCheck, title: "Quality Guarantee", text: "If the fabric fades or tears within a year, we replace it. No questions asked." },
          { icon: Users, title: "Artisan Crafted", text: "We work with 3rd generation tailors who view every stitch as an art form." },
          { icon: Smile, title: "Perfect Fit Tech", text: "Our AI-driven sizing algorithm predicts your fit with 98% accuracy." }
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all group"
          >
            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 transition-colors group-hover:bg-blue-600">
            <item.icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{item.text}</p>
          </motion.div>
        ))}
        </div>
      </div>
    </section>

      {/* 4. CONTACT SECTION (Blue & Clean) */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Left: Contact Info */}
            <div>
              <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-2 block">Get in Touch</span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">We're Here to Help.</h2>
              <p className="text-slate-500 text-lg mb-10 max-w-md">
                Whether you need styling advice or help with an order, our team is ready to assist you.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-1">Headquarters</h4>
                    <p className="text-slate-500 text-sm">108, Cyber City, DLF Phase 2,<br/>Gurugram, Haryana 122002</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-1">Phone Support</h4>
                    <p className="text-slate-500 text-sm">+91 98765 43210</p>
                    <p className="text-blue-600 text-xs mt-1 font-bold">Available 10am - 7pm</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-1">Email</h4>
                    <p className="text-slate-500 text-sm">support@auramod.in</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h3>
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">First Name</label>
                    <input type="text" placeholder="Rahul" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3.5 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Last Name</label>
                    <input type="text" placeholder="Sharma" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3.5 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Email Address</label>
                  <input type="email" placeholder="rahul@example.com" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3.5 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Message</label>
                  <textarea rows="4" placeholder="How can we help you?" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3.5 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all resize-none"></textarea>
                </div>

                <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 mt-4">
                  Send Message <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;