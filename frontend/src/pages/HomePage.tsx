import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
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

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/products');
                // Backend returns Page object, products are in 'content'
                setProducts(response.data.content || []);
            } catch (error) {
                toast.error('Failed to load products');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <header className="bg-blue-600 py-16 text-center text-white">
                <h1 className="text-5xl font-extrabold">Next-Gen Shopping Experience</h1>
                <p className="mt-4 text-xl">Discover the best products at unbeatable prices.</p>
            </header>

            <main className="container mx-auto px-6 py-12">
                <h2 className="mb-8 text-3xl font-bold text-gray-800">Featured Products</h2>
                
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-600"></div>
                    </div>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {products.map(product => (
                            <ProductCard key={product.id} {...product} />
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center text-gray-600">
                        <p className="text-xl">No products found. Please check back later.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default HomePage;
