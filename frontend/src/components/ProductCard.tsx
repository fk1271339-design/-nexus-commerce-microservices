import React from 'react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

interface ProductCardProps {
    id: number;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, description, imageUrl }) => {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart({ id, name, price, quantity: 1, imageUrl });
        toast.success(`${name} added to cart!`);
    };

    return (
        <div className="overflow-hidden rounded-lg bg-white shadow-md transition-transform hover:scale-105">
            <img
                src={imageUrl || 'https://via.placeholder.com/300x200?text=Product'}
                alt={name}
                className="h-48 w-full object-cover"
            />
            <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">{name}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-gray-600">{description}</p>
                <div className="mt-4 flex items-center justify-between">
                    <span className="text-xl font-bold text-blue-600">${price}</span>
                    <button
                        onClick={handleAddToCart}
                        className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
