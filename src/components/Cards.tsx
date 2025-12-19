import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // IMPORTED
import { ArrowRight, Heart, Star, ShoppingBag, Truck, RefreshCw, ShieldCheck } from 'lucide-react';

// --- DATA ---
const categories = [
    { id: 1, name: 'Royal Kurtas', count: '120+ Styles', image: 'https://assets2.andaazfashion.com/media/catalog/product/r/o/royal-blue-dupion-silk-plain-men-kurta-pajama-mkpa04312-1.jpg' },
    { id: 2, name: 'Sherwanis', count: '45+ Styles', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4bxa7OANMxlGzQKmT_zww-eid50ZSrAXV_g&s' },
    { id: 3, name: 'Premium Suits', count: '60+ Styles', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 4, name: 'Nehru Jackets', count: '35+ Styles', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
];

const bestSellers = [
    {
        id: 1,
        name: 'Royal Blue Suit',
        description: 'Italian cut premium wool blend with satin lapel.',
        price: '₹8,499',
        originalPrice: '₹12,999',
        rating: 4.9,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2N02-t4fOf9sFGwXtYxJF8qZjjJiZKZ_nLQ&s',
        tag: '30% OFF'
    },
    {
        id: 2,
        name: 'Navy Sherwani',
        description: 'Hand-embroidered zardosi work on velvet.',
        price: '₹14,999',
        originalPrice: '₹18,500',
        rating: 5.0,
        image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        tag: 'BESTSELLER'
    },
    {
        id: 3,
        name: 'Linen Shirt',
        description: '100% organic breathable linen, perfect for summer.',
        price: '₹2,199',
        originalPrice: '₹3,200',
        rating: 4.6,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi29wpsBOAioN3bSV4iEbQlz504BWzBJd5LA&s',
        tag: 'NEW'
    },
    {
        id: 4,
        name: 'Classic Tuxedo',
        description: 'Sharp silhouette with a single button closure.',
        price: '₹9,799',
        originalPrice: '₹11,000',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        tag: 'HOT'
    },
];

// --- REUSABLE ANIMATION COMPONENT ---
const FadeIn = ({ children, delay = 0, className }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay, ease: "easeOut" }}
        className={className}
    >
        {children}
    </motion.div>
);

// --- COMPONENT: CATEGORY CARD ---
const CategoryCard = ({ cat }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="group relative h-[250px] md:h-[380px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
    >
        <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity group-hover:opacity-100"></div>
        <div className="absolute bottom-0 left-0 p-4 md:p-6 w-full">
            <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-lg md:text-2xl font-bold text-white mb-1 md:mb-2">{cat.name}</h3>
                <div className="flex justify-between items-center opacity-80 group-hover:opacity-100 transition-opacity">
                    <p className="text-xs md:text-sm text-gray-300 font-medium">{cat.count}</p>
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                </div>
            </div>
        </div>
    </motion.div>
);

// --- COMPONENT: PRODUCT CARD (UPDATED WITH NAVIGATION) ---
const ProductCard = ({ product }) => {
    const [isLiked, setIsLiked] = useState(false);
    const navigate = useNavigate(); // Hook for navigation

    const handleCardClick = () => {
        window.scrollTo(0, 0); // Scroll to top
        navigate(`/product/${product.id}`); // Navigate
    };

    return (
        <div 
            onClick={handleCardClick}
            className="group bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-blue-100 flex flex-col h-full cursor-pointer"
        >

            {/* Image Section */}
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                <div className="absolute top-2 left-2 md:top-3 md:left-3 z-10">
                    <span className={`text-[9px] md:text-[10px] font-bold px-2 py-0.5 md:px-3 md:py-1 rounded-full uppercase tracking-wider text-white shadow-sm ${product.tag.includes('OFF') ? 'bg-red-500' : 'bg-blue-600'}`}>
                        {product.tag}
                    </span>
                </div>
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent opening details page
                        setIsLiked(!isLiked);
                    }}
                    className="absolute top-2 right-2 md:top-3 md:right-3 z-10 p-1.5 md:p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md text-slate-400 hover:text-red-500 transition-all active:scale-95"
                >
                    <Heart className={`w-3.5 h-3.5 md:w-4 md:h-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                </button>
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>

            {/* Details Section */}
            <div className="p-3 md:p-5 flex flex-col flex-1">

                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-1 md:mb-2 gap-1">
                    <h3 className="font-bold text-slate-900 text-sm md:text-base leading-tight group-hover:text-blue-700 transition-colors line-clamp-1">
                        {product.name}
                    </h3>
                    <div className="flex items-center gap-1 bg-yellow-50 px-1.5 py-0.5 rounded text-yellow-600 w-fit">
                        <Star className="w-2.5 h-2.5 md:w-3 md:h-3 fill-current" />
                        <span className="text-[10px] md:text-xs font-bold">{product.rating}</span>
                    </div>
                </div>

                <p className="text-[10px] md:text-sm text-slate-500 leading-tight md:leading-relaxed mb-2 md:mb-4 line-clamp-2">
                    {product.description}
                </p>

                <div className="flex items-baseline gap-1.5 md:gap-2 mb-3 md:mb-4 mt-auto">
                    <span className="text-sm md:text-lg font-bold text-slate-900">{product.price}</span>
                    <span className="text-[10px] md:text-xs text-slate-400 line-through font-medium">{product.originalPrice}</span>
                </div>

                <button 
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent opening details page
                        // Logic to add to cart
                    }}
                    className="w-full py-2 md:py-3 bg-slate-900 text-white rounded-lg md:rounded-xl font-bold text-xs md:text-sm flex items-center justify-center gap-1.5 md:gap-2 hover:bg-blue-700 transition-colors shadow-lg shadow-slate-200 active:scale-95"
                >
                    <ShoppingBag className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    <span className="hidden md:inline">Add to Cart</span>
                    <span className="md:hidden">Add</span>
                </button>
            </div>
        </div>
    );
};

// --- COMPONENT: FEATURES ---
const Features = () => (
    <section className="py-12 md:py-16 border-t border-slate-100 bg-white">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                {[
                    { icon: Truck, title: "Express Delivery", text: "Free shipping on orders over ₹999" },
                    { icon: RefreshCw, title: "Easy Exchanges", text: "Hassle-free 7 day return policy" },
                    { icon: ShieldCheck, title: "100% Authentic", text: "Guaranteed original products" }
                ].map((f, i) => (
                    <FadeIn key={i} delay={i * 0.1} className="flex flex-col items-center text-center p-4">
                        <div className="p-4 bg-blue-50 rounded-2xl text-blue-600 mb-4 transition-transform hover:scale-110 duration-300">
                            <f.icon className="w-6 h-6 md:w-8 md:h-8 stroke-[1.5]" />
                        </div>
                        <h4 className="font-bold text-slate-900 text-base md:text-lg mb-1">{f.title}</h4>
                        <p className="text-xs md:text-sm text-slate-500">{f.text}</p>
                    </FadeIn>
                ))}
            </div>
        </div>
    </section>
);

// --- MAIN EXPORT ---
const ShopSection = () => {
    return (
        <>
            {/* 1. CATEGORIES */}
            <section className="py-12 md:py-24 bg-white">
                <div className="container mx-auto px-4 md:px-6 lg:px-12">
                    <FadeIn className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12 gap-4">
                        <div>
                            <span className="text-blue-600 font-bold uppercase tracking-widest text-[10px] md:text-xs">Curated Collections</span>
                            <h2 className="text-2xl md:text-5xl font-bold text-slate-900 mt-2 tracking-tight">Shop By Category</h2>
                        </div>
                        <button className="hidden md:flex items-center gap-2 text-sm font-bold border-b border-slate-300 pb-1 hover:text-blue-600 hover:border-blue-600 transition-all">
                            View All Collections <ArrowRight className="w-4 h-4" />
                        </button>
                    </FadeIn>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                        {categories.map((cat, index) => (
                            <FadeIn key={cat.id} delay={index * 0.1}>
                                <CategoryCard cat={cat} />
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* 2. BEST SELLERS */}
            <section className="py-12 md:py-24 bg-slate-50">
                <div className="container mx-auto px-4 md:px-6 lg:px-12">
                    <FadeIn className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
                        <span className="text-blue-600 font-bold uppercase tracking-widest text-[10px] md:text-xs">Customer Favorites</span>
                        <h2 className="text-2xl md:text-5xl font-bold text-slate-900 mt-2 tracking-tight mb-2 md:mb-4">Trending Now</h2>
                        <p className="text-xs md:text-base text-slate-500">Handpicked favorites that define the season.</p>
                    </FadeIn>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-8">
                        {bestSellers.map((product, index) => (
                            <FadeIn key={product.id} delay={index * 0.1}>
                                <ProductCard product={product} />
                            </FadeIn>
                        ))}
                    </div>

                    <FadeIn className="mt-10 md:mt-16 text-center">
                        <button
                            onClick={() => (window.location.href = '/collections')}
                            className="bg-white border border-slate-200 text-slate-900 px-8 py-3 md:px-12 md:py-4 rounded-full font-bold uppercase text-[10px] md:text-xs tracking-widest hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300 shadow-sm hover:shadow-lg"
                        >
                            Browse All Products
                        </button>
                    </FadeIn>
                </div>
            </section>

            {/* 3. FEATURES */}
            <Features />
        </>
    );
};

export default ShopSection;