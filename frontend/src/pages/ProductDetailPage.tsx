import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Zap, ShieldCheck, RefreshCw, Star, Heart, Share2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
}

const ProductDetailPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get(`/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                toast.error('Failed to load product details');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-white">
                <Navbar />
                <div className="flex items-center justify-center h-[60vh]">
                    <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-600"></div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-white">
                <Navbar />
                <div className="text-center py-20">
                    <h2 className="text-2xl font-bold">Product not found</h2>
                    <button onClick={() => navigate('/')} className="mt-4 text-blue-600">Go Back Home</button>
                </div>
            </div>
        );
    }

    const uniqueImageUrl = `https://loremflickr.com/600/600/${product.category.toLowerCase().replace(/ & /g, ',')}?lock=${product.id}`;

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            
            <main className="container mx-auto px-4 lg:px-12 py-6">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left: Images Column */}
                    <div className="lg:w-2/5">
                        <div className="sticky top-24">
                            <div className="border border-gray-200 p-4 rounded-sm relative group">
                                <img 
                                    src={uniqueImageUrl} 
                                    alt={product.name} 
                                    className="w-full h-[450px] object-contain"
                                />
                                <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md border border-gray-100 text-gray-400 hover:text-red-500 transition">
                                    <Heart className="h-5 w-5" />
                                </button>
                            </div>
                            
                            <div className="flex mt-8 gap-4">
                                <button 
                                    onClick={() => { addToCart({ ...product, quantity: 1, imageUrl: uniqueImageUrl }); toast.success('Added to Cart!'); }}
                                    className="flex-1 bg-[#ff9f00] text-white py-4 rounded-sm font-bold flex items-center justify-center space-x-2 shadow-md hover:bg-[#fb641b] transition"
                                >
                                    <ShoppingCart className="h-5 w-5" />
                                    <span>ADD TO CART</span>
                                </button>
                                <button 
                                    onClick={() => { addToCart({ ...product, quantity: 1, imageUrl: uniqueImageUrl }); navigate('/checkout'); }}
                                    className="flex-1 bg-[#fb641b] text-white py-4 rounded-sm font-bold flex items-center justify-center space-x-2 shadow-md hover:bg-[#e65c19] transition"
                                >
                                    <Zap className="h-5 w-5" />
                                    <span>BUY NOW</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right: Info Column */}
                    <div className="lg:w-3/5">
                        <div className="flex justify-between items-start">
                            <nav className="flex text-xs text-gray-500 mb-2 space-x-1">
                                <span className="hover:text-blue-600 cursor-pointer">Home</span>
                                <span>&gt;</span>
                                <span className="hover:text-blue-600 cursor-pointer">{product.category}</span>
                                <span>&gt;</span>
                                <span className="text-gray-400">{product.name}</span>
                            </nav>
                            <button className="text-gray-400 hover:text-blue-600">
                                <Share2 className="h-4 w-4" />
                            </button>
                        </div>

                        <h1 className="text-xl font-medium text-gray-800 mb-2 leading-relaxed">{product.name}</h1>
                        
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="flex items-center bg-green-700 px-2 py-0.5 rounded-sm text-xs font-bold text-white">
                                <span>4.4</span>
                                <Star className="h-3 w-3 ml-1 fill-current" />
                            </div>
                            <span className="text-sm font-bold text-gray-500">2,453 Ratings & 382 Reviews</span>
                            <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt="assured" className="h-5" />
                        </div>

                        <div className="mb-6">
                            <div className="flex items-center space-x-3 mb-1">
                                <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                                <span className="text-gray-500 line-through text-lg">${(product.price * 1.4).toFixed(2)}</span>
                                <span className="text-green-600 font-bold text-base">40% off</span>
                            </div>
                            <p className="text-xs text-gray-400 font-bold italic">+ $2.0 Secure Packaging Fee</p>
                        </div>

                        {/* Offers */}
                        <div className="mb-8">
                            <h3 className="font-bold text-sm mb-3">Available offers</h3>
                            <div className="space-y-2">
                                {[
                                    'Bank Offer 5% Cashback on Nexus Axis Bank Card',
                                    'Special Price Get extra 10% off (price inclusive of cashback/coupon)',
                                    'Buy this product and Get extra $10 Off on your next purchase'
                                ].map((offer, idx) => (
                                    <div key={idx} className="flex items-start space-x-2 text-sm text-gray-800">
                                        <Ticket className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                                        <p><span className="font-bold">Offer {idx + 1}</span> {offer} <span className="text-blue-600 font-bold">T&C</span></p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 border-y border-gray-100 py-6 mb-8">
                            <div className="flex items-center space-x-3 text-sm font-medium text-gray-600">
                                <RefreshCw className="h-5 w-5 text-blue-500" />
                                <span>7 Days Replacement Policy</span>
                            </div>
                            <div className="flex items-center space-x-3 text-sm font-medium text-gray-600">
                                <ShieldCheck className="h-5 w-5 text-blue-500" />
                                <span>1 Year Warranty</span>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-gray-500 font-bold text-sm uppercase mb-4 tracking-widest">Product Description</h3>
                            <p className="text-sm text-gray-700 leading-loose">
                                {product.description}
                                <br /><br />
                                Experience the pinnacle of performance and style with this {product.name}. Designed for the modern professional, it combines elegant aesthetics with cutting-edge technology to deliver an unparalleled experience. 
                                Whether you're at home or on the go, this product from our {product.category} collection is built to last and guaranteed to impress.
                            </p>
                        </div>

                        {/* Specs Table */}
                        <div className="border rounded-sm">
                            <h3 className="bg-gray-50 p-4 border-b font-bold text-sm">Specifications</h3>
                            <div className="p-4 space-y-4">
                                <div className="flex text-sm">
                                    <span className="w-1/3 text-gray-500">Model Name</span>
                                    <span className="w-2/3 text-gray-900 font-medium">NEX-{product.id}</span>
                                </div>
                                <div className="flex text-sm">
                                    <span className="w-1/3 text-gray-500">Category</span>
                                    <span className="w-2/3 text-gray-900 font-medium">{product.category}</span>
                                </div>
                                <div className="flex text-sm">
                                    <span className="w-1/3 text-gray-500">Color</span>
                                    <span className="w-2/3 text-gray-900 font-medium">Premium Silver / Jet Black</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

const Ticket = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/></svg>
);

export default ProductDetailPage;
