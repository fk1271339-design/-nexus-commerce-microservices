import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import toast from 'react-hot-toast';

interface ProductCardProps {
    id: number;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    category: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, description, imageUrl, category }) => {
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

    const keyword = categoryKeywords[category] || 'product';
    const uniqueImageUrl = `https://loremflickr.com/400/400/${keyword}?lock=${id}`;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart({ id, name, price, quantity: 1, imageUrl: uniqueImageUrl });
        toast.success(`${name} added to cart!`);
    };

    const msrp = (price * 1.4).toFixed(2);
    const rating = (Math.random() * (5 - 3.8) + 3.8).toFixed(1);
    const reviewCount = Math.floor(Math.random() * 5000) + 100;

    return (
        <div 
            onClick={() => navigate(`/product/${id}`)}
            className="group relative flex flex-col bg-white p-5 transition-all duration-500 hover:shadow-[0_30px_60px_rgba(128,0,0,0.12)] cursor-pointer border border-gray-100 rounded-2xl hover:-translate-y-2 overflow-hidden"
        >
            <div className="relative mb-5 h-60 w-full overflow-hidden rounded-xl bg-gray-50 group-hover:bg-white transition-colors">
                <img
                    src={uniqueImageUrl}
                    alt={name}
                    className="h-full w-full object-contain transition-transform duration-1000 group-hover:scale-110"
                    loading="lazy"
                />
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {price > 500 && (
                        <span className="bg-[#800000] text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg italic">Premium</span>
                    )}
                    <span className="bg-yellow-400 text-[#800000] text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg italic">Trending</span>
                </div>
                <button 
                    onClick={(e) => { e.stopPropagation(); }} 
                    className="absolute right-3 top-3 p-2.5 bg-white/90 backdrop-blur-sm rounded-full text-gray-300 hover:text-[#800000] transition shadow-md border border-gray-100 hover:scale-110 active:scale-90"
                >
                    <Heart className="h-4 w-4" />
                </button>
            </div>

            <div className="flex flex-col flex-1">
                <p className="text-[10px] font-black text-[#800000] uppercase tracking-[0.2em] mb-2 italic opacity-70">{category}</p>
                <h3 className="text-sm font-black text-gray-800 line-clamp-2 group-hover:text-[#800000] transition-colors tracking-tight mb-3 leading-snug">{name}</h3>
                
                <div className="mt-auto">
                    <div className="flex items-center space-x-3 mb-4 border-b border-dashed border-gray-100 pb-3">
                        <div className="flex items-center bg-[#800000] px-2 py-0.5 rounded text-[10px] font-black text-white italic">
                            <span>{rating}</span>
                            <Star className="ml-1 h-2.5 w-2.5 fill-current" />
                        </div>
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Nexus Verified ({reviewCount})</span>
                    </div>

                    <div className="flex items-baseline space-x-3 mb-5">
                        <span className="text-2xl font-black text-gray-900 italic tracking-tighter">${price}</span>
                        <span className="text-xs text-gray-400 line-through font-bold">${msrp}</span>
                        <div className="bg-maroon-50 px-2 py-0.5 rounded">
                            <span className="text-[10px] font-black text-[#800000] uppercase tracking-widest animate-pulse">40% OFF</span>
                        </div>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="w-full rounded-full bg-gray-900 py-3 text-[10px] font-black text-white shadow-xl hover:bg-[#800000] transition-all duration-300 flex items-center justify-center space-x-2 uppercase tracking-[0.3em] group-hover:shadow-maroon-200"
                    >
                        <ShoppingCart className="h-3.5 w-3.5" />
                        <span>Acquire</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
