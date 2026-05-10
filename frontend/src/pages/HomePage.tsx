import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import api from '../services/api';
import toast from 'react-hot-toast';
import { 
    ChevronLeft, 
    ChevronRight, 
    Filter, 
    Zap, 
    Star, 
    Tag, 
    Clock, 
    Trophy,
    LayoutGrid,
    Search,
    X,
    ChevronDown
} from 'lucide-react';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
}

const HomePage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [priceRange, setPriceRange] = useState(2000);
    const [searchQuery, setSearchQuery] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const banners = [
        {
            url: "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=1600&h=450&fit=crop&q=80",
            title: "Nexus Elegance",
            sub: "Redefining Luxury in Every Detail"
        },
        {
            url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1600&h=450&fit=crop&q=80",
            title: "Royal Footwear",
            sub: "Step Up with Our Exclusive Maroon Collection"
        },
        {
            url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1600&h=450&fit=crop&q=80",
            title: "Premium Sound",
            sub: "Feel the Rhythm of Excellence"
        }
    ];

    const categories = [
        { name: 'All', icon: <LayoutGrid size={18} /> },
        { name: 'Electronics', icon: <Zap size={18} /> },
        { name: 'Fashion', icon: <Tag size={18} /> },
        { name: 'Home & Kitchen', icon: <Star size={18} /> },
        { name: 'Beauty & Personal Care', icon: <Clock size={18} /> },
        { name: 'Automotive', icon: <Trophy size={18} /> }
    ];

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await api.get('/products?size=100');
            const data = response.data.content || [];
            setProducts(data);
            setFilteredProducts(data);
        } catch (error) {
            toast.error('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % banners.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        let filtered = products;
        
        if (selectedCategory !== 'All') {
            filtered = filtered.filter(p => p.category === selectedCategory);
        }
        
        filtered = filtered.filter(p => p.price <= priceRange);
        
        if (searchQuery) {
            filtered = filtered.filter(p => 
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.category.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        
        setFilteredProducts(filtered);
    }, [selectedCategory, priceRange, searchQuery, products]);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % banners.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1));

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            
            {/* Category Bar - Maroon Theme */}
            <div className="bg-white shadow-sm border-b overflow-x-auto whitespace-nowrap scrollbar-hide sticky top-16 z-40">
                <div className="container mx-auto px-4 lg:px-12 py-3 flex space-x-12 justify-center">
                    {categories.map((cat) => (
                        <button
                            key={cat.name}
                            onClick={() => setSelectedCategory(cat.name)}
                            className={`flex flex-col items-center space-y-1 group transition ${selectedCategory === cat.name ? 'text-[#800000]' : 'text-gray-500 hover:text-[#800000]'}`}
                        >
                            <div className={`p-2 rounded-full transition ${selectedCategory === cat.name ? 'bg-maroon-50 text-[#800000]' : 'bg-gray-50 group-hover:bg-maroon-50 group-hover:text-[#800000]'}`}>
                                {cat.icon}
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest">{cat.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Hero Slider */}
            <div className="container mx-auto px-4 lg:px-12 py-6">
                <div className="relative h-[480px] w-full overflow-hidden rounded-2xl shadow-2xl bg-[#1a0000] group">
                    <img 
                        src={banners[currentSlide].url} 
                        alt="Banner" 
                        className="h-full w-full object-cover transition-transform duration-1000 scale-105 group-hover:scale-100 opacity-70"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#4d0000]/90 to-transparent flex flex-col justify-center px-20 text-white">
                        <span className="bg-[#800000] text-white text-[10px] font-black px-4 py-1.5 rounded-full w-fit mb-6 tracking-[0.3em] uppercase animate-pulse shadow-lg">Royal Collection 2026</span>
                        <h1 className="text-6xl font-black mb-6 leading-tight italic tracking-tighter uppercase">{banners[currentSlide].title}</h1>
                        <p className="text-2xl font-medium text-gray-200 mb-10 tracking-wide max-w-xl">{banners[currentSlide].sub}</p>
                        <button className="bg-white text-[#800000] px-12 py-5 rounded-full font-black text-sm uppercase shadow-2xl hover:bg-[#800000] hover:text-white transition-all transform hover:-translate-y-2 active:translate-y-0 w-fit tracking-widest">
                            Explore Now
                        </button>
                    </div>
                    
                    <button onClick={prevSlide} className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 p-4 rounded-full backdrop-blur-md transition group-hover:left-8">
                        <ChevronLeft className="text-white h-8 w-8" />
                    </button>
                    <button onClick={nextSlide} className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 p-4 rounded-full backdrop-blur-md transition group-hover:right-8">
                        <ChevronRight className="text-white h-8 w-8" />
                    </button>
                </div>
            </div>

            <main className="container mx-auto px-4 lg:px-12 py-8 relative">
                
                {/* Side Drawer Filter - Mehroom Theme */}
                <div className={`fixed inset-0 z-[100] transition-opacity duration-300 ${isFilterOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsFilterOpen(false)}></div>
                    <aside className={`absolute left-0 top-0 h-full w-80 bg-white shadow-2xl transition-transform duration-500 transform ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                        <div className="flex items-center justify-between p-6 border-b bg-[#800000] text-white">
                            <h3 className="font-black text-xl italic uppercase tracking-tighter">Nexus Filters</h3>
                            <button onClick={() => setIsFilterOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition">
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        
                        <div className="p-8 space-y-10 overflow-y-auto h-[calc(100%-80px)]">
                            <div>
                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-6">Price Ceiling: <span className="text-[#800000] text-lg">${priceRange}</span></h4>
                                <input 
                                    type="range" 
                                    min="10" 
                                    max="2000" 
                                    value={priceRange}
                                    onChange={(e) => setPriceRange(parseInt(e.target.value))}
                                    className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#800000]"
                                />
                                <div className="flex justify-between mt-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                    <span>$10</span>
                                    <span>$2000+</span>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-6">Discovery Tags</h4>
                                <div className="flex flex-wrap gap-3">
                                    {['Trending', 'Limited', 'Featured', 'Royal', 'Eco'].map(tag => (
                                        <span key={tag} className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-full text-[10px] font-black text-gray-600 hover:bg-maroon-50 hover:border-maroon-200 hover:text-[#800000] cursor-pointer transition uppercase tracking-widest">{tag}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-maroon-50 p-6 rounded-2xl border border-maroon-100">
                                <h4 className="font-black text-[#800000] uppercase italic tracking-tighter mb-2">Member Special</h4>
                                <p className="text-xs text-gray-600 font-medium mb-4">Unlock extra 15% discount on checkout for all orders.</p>
                                <button className="w-full bg-[#800000] text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg">Unlock Now</button>
                            </div>
                        </div>
                    </aside>
                </div>

                {/* Main Content Area - Full Width */}
                <div className="space-y-8">
                    {/* Control Bar */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center space-x-4">
                            <button 
                                onClick={() => setIsFilterOpen(true)}
                                className="flex items-center space-x-2 bg-white border-2 border-gray-100 px-6 py-3 rounded-full hover:border-[#800000] hover:text-[#800000] transition-all group shadow-sm hover:shadow-lg"
                            >
                                <Filter className="h-4 w-4" />
                                <span className="text-xs font-black uppercase tracking-widest">Open Filters</span>
                                <ChevronDown className="h-3 w-3 opacity-50 group-hover:rotate-180 transition-transform" />
                            </button>
                            
                            <div className="h-8 w-px bg-gray-100"></div>
                            
                            <div className="relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 group-focus-within:text-[#800000] transition" />
                                <input 
                                    type="text" 
                                    placeholder="Search Nexus Inventory..." 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-12 pr-6 py-3 bg-gray-50 border-2 border-transparent rounded-full text-sm focus:outline-none focus:border-[#800000] focus:bg-white transition-all w-64 md:w-96 shadow-inner"
                                />
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 bg-gray-50 px-6 py-2 rounded-full border border-gray-100">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Category:</span>
                            <span className="text-xs font-black text-[#800000] uppercase tracking-widest italic">{selectedCategory}</span>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="min-h-[600px]">
                        <div className="flex items-baseline justify-between mb-12">
                             <div className="space-y-1">
                                <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase italic">
                                   {selectedCategory === 'All' ? 'Nexus Global Store' : selectedCategory}
                                </h2>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">Curated Excellence for You</p>
                             </div>
                             <div className="flex items-center space-x-2">
                                <span className="text-sm font-black text-gray-900 italic">{filteredProducts.length}</span>
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Products Found</span>
                             </div>
                        </div>

                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-40 space-y-6">
                                <div className="h-20 w-20 animate-spin rounded-full border-b-4 border-t-4 border-[#800000]"></div>
                                <p className="text-[#800000] font-black uppercase text-[10px] tracking-[0.5em] animate-pulse">Synchronizing Nexus Data...</p>
                            </div>
                        ) : filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                                {filteredProducts.map(product => (
                                    <ProductCard key={product.id} {...product} />
                                ))}
                            </div>
                        ) : (
                            <div className="py-40 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-100">
                                <div className="h-24 w-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                                    <Filter className="h-10 w-10 text-gray-200" />
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 uppercase italic tracking-tighter">Zero Matches in Inventory</h3>
                                <p className="text-gray-400 font-medium max-w-sm mx-auto mt-4 text-sm px-6">We couldn't find any products matching your current filter criteria. Try expanding your search or resetting filters.</p>
                                <button 
                                    onClick={() => { setSelectedCategory('All'); setPriceRange(2000); setSearchQuery(''); }} 
                                    className="mt-10 bg-[#800000] text-white px-12 py-4 rounded-full font-black text-[10px] uppercase tracking-widest shadow-2xl hover:bg-black transition-all transform hover:-translate-y-1"
                                >
                                    Reset Discovery Path
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;
