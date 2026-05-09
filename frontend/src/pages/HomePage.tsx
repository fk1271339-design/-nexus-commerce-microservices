import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import api from '../services/api';
import toast from 'react-hot-toast';

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
    const [loading, setLoading] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);

    const banners = [
        "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=1600&h=450&fit=crop&q=80",
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1600&h=450&fit=crop&q=80",
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1600&h=450&fit=crop&q=80",
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&h=450&fit=crop&q=80"
    ];

    const fetchProducts = async (categoryFilter?: string) => {
        setLoading(true);
        try {
            const url = categoryFilter ? `/products?size=50&category=${encodeURIComponent(categoryFilter)}` : '/products?size=50';
            const response = await api.get(url);
            setProducts(response.data.content || []);
        } catch (error) {
            toast.error('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
        // Auto-slide every 5 seconds
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % banners.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % banners.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1));

    return (
        <div className="min-h-screen bg-[#f1f3f6]">
            <Navbar />
            
            {/* Hero Section (Enlarged Carousel) */}
            <div className="container mx-auto px-4 lg:px-12 py-4">
                <div className="relative h-[450px] w-full overflow-hidden rounded-sm shadow-md bg-gray-200">
                    <img 
                        src={banners[currentSlide]} 
                        alt="Banner" 
                        className="h-full w-full object-cover transition-opacity duration-500"
                    />
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-between px-2">
                        <button 
                            onClick={(e) => { e.preventDefault(); prevSlide(); }} 
                            className="bg-white/90 p-4 rounded-r-sm shadow-lg hover:bg-white text-[#2874f0] font-bold text-2xl transition z-10"
                        >
                            &#10094;
                        </button>
                        <button 
                            onClick={(e) => { e.preventDefault(); nextSlide(); }} 
                            className="bg-white/90 p-4 rounded-l-sm shadow-lg hover:bg-white text-[#2874f0] font-bold text-2xl transition z-10"
                        >
                            &#10095;
                        </button>
                    </div>
                    {/* Dots */}
                    <div className="absolute bottom-4 left-0 w-full flex justify-center space-x-2">
                        {banners.map((_, i) => (
                            <div key={i} className={`h-2 w-2 rounded-full ${i === currentSlide ? 'bg-white' : 'bg-white/50'}`}></div>
                        ))}
                    </div>
                </div>
            </div>

            <main className="container mx-auto px-4 lg:px-12 py-4">
                {/* Section Header */}
                <div className="flex items-center justify-between bg-white px-6 py-4 rounded-t-sm shadow-sm border-b">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 tracking-tight">Deals of the Day</h2>
                        <p className="text-sm text-gray-500">Handpicked for you</p>
                    </div>
                    <button onClick={() => fetchProducts()} className="bg-blue-600 text-white px-6 py-2 rounded-sm font-semibold shadow-md hover:bg-blue-700 transition">VIEW ALL</button>
                </div>
                
                <div className="bg-white p-6 shadow-sm rounded-b-sm min-h-[400px]">
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-600"></div>
                        </div>
                    ) : products.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                            {products.map(product => (
                                <ProductCard key={product.id} {...product} />
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center text-gray-600">
                            <p className="text-xl">No products found. Please try another category.</p>
                            <button onClick={() => fetchProducts()} className="mt-4 text-blue-600 font-bold hover:underline">Reset Filters</button>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;
