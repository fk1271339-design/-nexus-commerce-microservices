import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Zap, ShieldCheck, RefreshCw, Star, Heart, Share2, Ticket, Package, Truck, ChevronLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
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
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const categoryKeywords: { [key: string]: string } = {
        'Electronics': 'tech,gadget',
        'Fashion': 'clothes,fashion',
        'Home & Kitchen': 'interior,kitchen',
        'Books': 'book,library',
        'Beauty & Personal Care': 'cosmetics,beauty',
        'Sports & Outdoors': 'sports,fitness',
        'Toys & Games': 'toys,play',
        'Automotive': 'car,vehicle',
        'Health & Household': 'health,wellness',
        'Grocery': 'food,grocery'
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const productRes = await api.get(`/products/${id}`);
                setProduct(productRes.data);
                
                const relatedRes = await api.get(`/products?category=${encodeURIComponent(productRes.data.category)}&size=8`);
                setRelatedProducts(relatedRes.data.content.filter((p: any) => p.id !== parseInt(id!)));
            } catch (error) {
                toast.error('Failed to load product details');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-white">
                <Navbar />
                <div className="flex flex-col items-center justify-center h-[70vh] space-y-6">
                    <div className="h-24 w-24 animate-spin rounded-full border-b-4 border-t-4 border-[#800000]"></div>
                    <p className="text-[#800000] font-black uppercase text-[10px] tracking-[0.5em] animate-pulse">Extracting Product DNA...</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-white">
                <Navbar />
                <div className="text-center py-40">
                    <h2 className="text-4xl font-black italic uppercase tracking-tighter text-[#800000] mb-8">Asset Not Found</h2>
                    <button onClick={() => navigate('/')} className="bg-black text-white px-12 py-4 rounded-full font-black text-xs uppercase shadow-2xl hover:bg-[#800000] transition-all">Re-initialize Discovery</button>
                </div>
            </div>
        );
    }

    const keyword = categoryKeywords[product.category] || 'product';
    const uniqueImageUrl = `https://loremflickr.com/600/600/${keyword}?lock=${product.id}`;

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            
            <main className="container mx-auto px-4 lg:px-12 py-10">
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#800000] transition mb-10 group"
                >
                    <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    <span>Back to Collection</span>
                </button>

                <div className="flex flex-col lg:flex-row gap-20">
                    {/* Left: Images Column */}
                    <div className="lg:w-1/2">
                        <div className="sticky top-32">
                            <div className="relative group rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 shadow-[0_50px_100px_-20px_rgba(128,0,0,0.15)]">
                                <img 
                                    src={uniqueImageUrl} 
                                    alt={product.name} 
                                    className="w-full h-[600px] object-contain transition-transform duration-1000 group-hover:scale-105 p-12"
                                />
                                <div className="absolute top-8 left-8">
                                    <span className="bg-[#800000] text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-2xl italic">Royal Asset</span>
                                </div>
                                <button className="absolute top-8 right-8 p-4 bg-white rounded-full shadow-2xl border border-gray-100 text-gray-300 hover:text-[#800000] transition-all transform hover:scale-110 active:scale-90">
                                    <Heart className="h-7 w-7" />
                                </button>
                            </div>
                            
                            <div className="flex mt-12 gap-6">
                                <button 
                                    onClick={() => { addToCart({ ...product, quantity: 1, imageUrl: uniqueImageUrl }); toast.success('Added to Cart!'); }}
                                    className="flex-1 bg-black text-white py-6 rounded-full font-black flex items-center justify-center space-x-3 shadow-2xl hover:bg-[#800000] transition-all transform hover:-translate-y-1 active:translate-y-0 uppercase tracking-widest text-xs"
                                >
                                    <ShoppingCart className="h-5 w-5" />
                                    <span>Add to Cart</span>
                                </button>
                                <button 
                                    onClick={() => { addToCart({ ...product, quantity: 1, imageUrl: uniqueImageUrl }); navigate('/checkout'); }}
                                    className="flex-1 bg-[#800000] text-white py-6 rounded-full font-black flex items-center justify-center space-x-3 shadow-2xl hover:bg-black transition-all transform hover:-translate-y-1 active:translate-y-0 uppercase tracking-widest text-xs"
                                >
                                    <Zap className="h-5 w-5" />
                                    <span>Acquire Now</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right: Info Column */}
                    <div className="lg:w-1/2">
                        <p className="text-xs font-black text-[#800000] uppercase tracking-[0.4em] mb-4 italic opacity-80">{product.category}</p>
                        <h1 className="text-5xl font-black text-gray-900 mb-8 leading-tight italic uppercase tracking-tighter">{product.name}</h1>
                        
                        <div className="flex items-center space-x-8 mb-12 bg-gray-50/50 p-6 rounded-3xl border border-gray-100">
                            <div className="flex items-center bg-[#800000] px-4 py-1.5 rounded-full text-sm font-black text-white shadow-xl italic">
                                <span>4.4</span>
                                <Star className="h-4 w-4 ml-2 fill-current" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Global Ratings</span>
                                <span className="text-sm font-black text-gray-800 tracking-tight italic">2,453 Enthusiasts</span>
                            </div>
                            <div className="h-10 w-px bg-gray-200"></div>
                            <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt="assured" className="h-8 grayscale brightness-50" />
                        </div>

                        <div className="mb-12 bg-maroon-50 p-8 rounded-3xl border border-maroon-100/50 relative overflow-hidden group">
                            <div className="relative z-10">
                                <div className="flex items-baseline space-x-6 mb-3">
                                    <span className="text-6xl font-black text-gray-900 italic tracking-tighter">${product.price}</span>
                                    <span className="text-gray-400 line-through text-3xl font-bold">${(product.price * 1.4).toFixed(2)}</span>
                                    <span className="text-[#800000] font-black text-2xl uppercase tracking-widest animate-pulse italic">40% OFF</span>
                                </div>
                                <p className="text-[10px] text-[#800000] font-black uppercase tracking-[0.3em]">Exclusively Priced for Nexus Royalty</p>
                            </div>
                            <div className="absolute top-0 right-0 p-8 opacity-5 transform group-hover:scale-110 transition-transform duration-700">
                                <Tag className="h-32 w-32 -rotate-12" />
                            </div>
                        </div>

                        {/* Offers Section */}
                        <div className="mb-12">
                            <div className="flex items-center space-x-3 mb-8">
                                <div className="h-1 w-8 bg-[#800000]"></div>
                                <h3 className="font-black text-xl text-gray-900 uppercase italic tracking-tighter">Privilege Offers</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { title: 'Nexus Axis Bank', desc: 'Unlimited 5% Royal Cashback' },
                                    { title: 'Nexus Elite Points', desc: 'Earn 100 points on this order' },
                                    { title: 'Seasonal Bundle', desc: 'Extra 15% off on 2+ items' },
                                    { title: 'Premium Care', desc: 'Free accidental protection' }
                                ].map((offer, idx) => (
                                    <div key={idx} className="p-6 border-2 border-dashed border-gray-100 rounded-2xl hover:border-[#800000] transition-all hover:bg-maroon-50 group cursor-pointer">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <Ticket className="h-4 w-4 text-[#800000]" />
                                            <h4 className="font-black text-[10px] text-[#800000] uppercase tracking-widest">{offer.title}</h4>
                                        </div>
                                        <p className="text-sm text-gray-600 font-bold tracking-tight">{offer.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8 py-10 border-y border-gray-100 mb-12">
                            <div className="flex items-center space-x-5">
                                <div className="bg-maroon-50 p-4 rounded-2xl">
                                    <RefreshCw className="h-8 w-8 text-[#800000]" />
                                </div>
                                <div>
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Return Protocol</h4>
                                    <p className="text-sm font-black text-gray-800 italic uppercase">7 Days Window</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-5">
                                <div className="bg-green-50 p-4 rounded-2xl">
                                    <ShieldCheck className="h-8 w-8 text-green-700" />
                                </div>
                                <div>
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Protection</h4>
                                    <p className="text-sm font-black text-gray-800 italic uppercase">Nexus Guarantee</p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-16">
                            <h3 className="text-gray-900 font-black text-2xl uppercase italic mb-8 border-b-4 border-[#800000] pb-2 w-fit tracking-tighter">Architectural Summary</h3>
                            <p className="text-lg text-gray-600 leading-relaxed font-medium italic">
                                "{product.description}"
                                <br /><br />
                                The {product.name} represents the convergence of peak engineering and royal aesthetics. As a signature piece of our {product.category} collection, it has been rigorously tested to exceed global benchmarks. 
                                Designed for those who define the future, it is more than just a product—it is a statement of intent.
                            </p>
                        </div>

                        {/* Specs Grid */}
                        <div className="grid grid-cols-3 gap-6">
                            {[
                                { icon: <Package />, label: 'Crafting', value: 'Artisan' },
                                { icon: <Zap />, label: 'Efficiency', value: 'Ultra' },
                                { icon: <Truck />, label: 'Logistics', value: 'Priority' }
                            ].map((stat, i) => (
                                <div key={i} className="bg-gray-50 p-8 rounded-3xl text-center border border-gray-100 hover:shadow-xl transition-shadow">
                                    <div className="text-[#800000] mb-4 flex justify-center">{stat.icon}</div>
                                    <h4 className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">{stat.label}</h4>
                                    <p className="text-xs font-black text-gray-800 uppercase italic">{stat.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Related Section */}
                {relatedProducts.length > 0 && (
                    <section className="mt-32 border-t-2 border-gray-50 pt-20">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                            <div>
                                <h2 className="text-5xl font-black text-gray-900 italic uppercase tracking-tighter">Symphony of Suggestions</h2>
                                <p className="text-gray-400 font-black uppercase text-[10px] tracking-[0.5em] mt-4">Elevate your experience with these matching assets</p>
                            </div>
                            <button onClick={() => navigate('/')} className="bg-[#800000] text-white px-12 py-4 rounded-full font-black text-xs uppercase shadow-2xl hover:bg-black transition-all transform hover:-translate-y-1">View Entire Vault</button>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
                            {relatedProducts.map(relProduct => (
                                <ProductCard key={relProduct.id} {...relProduct} />
                            ))}
                        </div>
                    </section>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default ProductDetailPage;
