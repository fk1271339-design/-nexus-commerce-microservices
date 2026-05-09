import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
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

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart({ id, name, price, quantity: 1, imageUrl: uniqueImageUrl });
        toast.success(`${name} added to cart!`);
    };

    const msrp = (price * 1.4).toFixed(2);
    const discount = 40;
    const rating = (Math.random() * (5 - 3.8) + 3.8).toFixed(1);
    const reviewCount = Math.floor(Math.random() * 5000) + 100;
    
    // Realistic image mapping based on category/name
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

    return (
        <div 
            onClick={() => navigate(`/product/${id}`)}
            className="group relative flex flex-col bg-white p-4 transition hover:shadow-2xl cursor-pointer border border-gray-100 rounded-sm"
        >
            <div className="relative mb-3 h-48 w-full overflow-hidden">
                <img
                    src={uniqueImageUrl}
                    alt={name}
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                />
                <button 
                    onClick={(e) => { e.stopPropagation(); }} 
                    className="absolute right-0 top-0 p-2 text-gray-300 hover:text-red-500 transition"
                >
                    <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                </button>
            </div>

            <div className="flex flex-col flex-1">
                <h3 className="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-[#2874f0]">{name}</h3>
                
                <div className="mt-1 flex items-center space-x-2">
                    <div className="flex items-center bg-green-600 px-1.5 py-0.5 rounded-sm text-[10px] font-bold text-white">
                        <span>{rating}</span>
                        <span className="ml-0.5">★</span>
                    </div>
                    <span className="text-xs font-semibold text-gray-400">({reviewCount})</span>
                </div>

                <div className="mt-2 flex items-baseline space-x-2">
                    <span className="text-lg font-bold text-gray-900">${price}</span>
                    <span className="text-sm text-gray-500 line-through">${msrp}</span>
                    <span className="text-xs font-bold text-green-600">{discount}% off</span>
                </div>

                <div className="mt-1">
                    <span className="text-xs font-semibold text-gray-800">Free delivery</span>
                </div>

                <div className="mt-auto pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={handleAddToCart}
                        className="w-full rounded-sm bg-[#ff9f00] py-2 text-sm font-bold text-white shadow-md hover:bg-[#fb641b] transition"
                    >
                        ADD TO CART
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
