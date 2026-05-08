import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const CheckoutPage = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handlePlaceOrder = async () => {
        if (!user) {
            toast.error('Please login to place an order');
            navigate('/login');
            return;
        }

        setLoading(true);
        try {
            // In this simplified version, we'll place an order for the first item
            // or we could loop through items. Let's do a simplified single item order
            // or update the backend to support bulk orders.
            // For now, we'll simulate placing an order for each item.
            
            for (const item of cartItems) {
                await api.post('/orders', {
                    userId: 1, // Simulated user ID, in real app extract from JWT/User context
                    productId: item.id,
                    quantity: item.quantity
                });
            }

            toast.success('Order placed successfully!');
            clearCart();
            navigate('/');
        } catch (error: any) {
            toast.error(error.response?.data?.error || 'Failed to place order');
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        navigate('/');
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="container mx-auto px-6 py-12">
                <div className="mx-auto max-w-3xl rounded-lg bg-white p-10 shadow-lg">
                    <h2 className="mb-8 text-3xl font-bold text-gray-800">Checkout</h2>
                    
                    <div className="mb-8">
                        <h3 className="mb-4 text-xl font-semibold text-gray-700">Delivery Information</h3>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <input type="text" placeholder="Full Name" className="rounded-md border p-3 focus:outline-blue-500" defaultValue={user?.name as string} />
                            <input type="email" placeholder="Email Address" className="rounded-md border p-3 focus:outline-blue-500" defaultValue={user?.email as string} />
                            <input type="text" placeholder="Shipping Address" className="col-span-2 rounded-md border p-3 focus:outline-blue-500" />
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="mb-4 text-xl font-semibold text-gray-700">Payment Method</h3>
                        <div className="rounded-md border bg-gray-50 p-4">
                            <p className="font-medium text-gray-800">Cash on Delivery (COD)</p>
                            <p className="text-sm text-gray-500">Pay when your items are delivered.</p>
                        </div>
                    </div>

                    <div className="border-t pt-8">
                        <div className="mb-6 flex justify-between text-2xl font-bold text-gray-800">
                            <span>Final Total</span>
                            <span>${cartTotal}</span>
                        </div>
                        <button
                            onClick={handlePlaceOrder}
                            disabled={loading}
                            className="w-full rounded-md bg-green-600 py-4 text-xl font-bold text-white hover:bg-green-700 disabled:bg-green-300"
                        >
                            {loading ? 'Processing...' : 'Place My Order'}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CheckoutPage;
