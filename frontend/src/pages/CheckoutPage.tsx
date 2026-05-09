import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { CheckCircle, Package, Truck, ArrowLeft, PartyPopper } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const CheckoutPage = () => {
    const { cartItems, cartTotal, discount, clearCart } = useCart();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const navigate = useNavigate();

    const finalTotal = cartTotal * (1 - discount);

    const handlePlaceOrder = async () => {
        if (!user) {
            toast.error('Please login to place an order');
            navigate('/login');
            return;
        }

        setLoading(true);
        try {
            // Simulate API calls for each item
            for (const item of cartItems) {
                await api.post('/orders', {
                    userId: 1, 
                    productId: item.id,
                    quantity: item.quantity
                });
            }

            // Trigger Success Animation
            setShowSuccess(true);
            setTimeout(() => {
                clearCart();
            }, 500);
        } catch (error: any) {
            toast.error(error.response?.data?.error || 'Failed to place order');
        } finally {
            setLoading(false);
        }
    };

    if (showSuccess) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
                <div className="max-w-md w-full text-center animate-in fade-in zoom-in duration-500">
                    <div className="relative flex justify-center mb-6">
                        <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
                            <CheckCircle className="h-16 w-16 text-green-600" />
                        </div>
                        <div className="absolute top-0 animate-ping">
                             <PartyPopper className="h-24 w-24 text-yellow-400 opacity-50" />
                        </div>
                    </div>
                    
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Order Confirmed!</h1>
                    <p className="text-gray-600 mb-8 font-medium">Thank you for shopping with Nexus. Your order has been placed successfully and will arrive soon.</p>
                    
                    <div className="bg-gray-50 rounded-lg p-6 mb-8 border border-dashed border-gray-300">
                        <div className="flex justify-between items-center mb-4 pb-4 border-b">
                            <span className="text-gray-500 uppercase text-xs font-bold">Order Number</span>
                            <span className="font-mono font-bold">#NEX-{Math.floor(Math.random() * 900000) + 100000}</span>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center text-sm text-gray-700">
                                <Package className="h-4 w-4 mr-3 text-blue-500" />
                                <span>Status: <span className="text-green-600 font-bold">Processing</span></span>
                            </div>
                            <div className="flex items-center text-sm text-gray-700">
                                <Truck className="h-4 w-4 mr-3 text-blue-500" />
                                <span>Delivery by: <span className="font-bold">Tomorrow, 10th May</span></span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <button 
                            onClick={() => navigate('/')}
                            className="w-full bg-[#2874f0] text-white py-3 rounded-sm font-bold shadow-lg hover:bg-blue-700 transition"
                        >
                            CONTINUE SHOPPING
                        </button>
                        <button 
                            onClick={() => navigate('/')}
                            className="w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-sm font-bold hover:bg-gray-50 transition"
                        >
                            VIEW ORDER DETAILS
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (cartItems.length === 0) {
        navigate('/');
        return null;
    }

    return (
        <div className="min-h-screen bg-[#f1f3f6]">
            <Navbar />
            <main className="container mx-auto px-4 lg:px-12 py-8">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left Section: Details */}
                    <div className="flex-1 space-y-4">
                        {/* Login Section */}
                        <div className="bg-white shadow-sm rounded-sm p-4 flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="bg-gray-100 p-2 rounded-sm text-blue-600 font-bold">1</div>
                                <div>
                                    <h3 className="text-gray-500 uppercase text-xs font-bold flex items-center">
                                        Login <CheckCircle className="h-3 w-3 ml-2 text-green-600" />
                                    </h3>
                                    <p className="font-bold text-sm">{user?.name} <span className="ml-2 font-normal text-gray-600">{user?.email}</span></p>
                                </div>
                            </div>
                            <button className="text-blue-600 font-bold text-xs border px-4 py-2 uppercase hover:bg-blue-50">Change</button>
                        </div>

                        {/* Delivery Section */}
                        <div className="bg-white shadow-sm rounded-sm p-4">
                             <div className="flex items-center space-x-4 mb-4">
                                <div className="bg-[#2874f0] p-2 rounded-sm text-white font-bold text-xs leading-none">2</div>
                                <h3 className="text-gray-500 uppercase text-xs font-bold">Delivery Address</h3>
                            </div>
                            <div className="pl-12">
                                <p className="font-bold text-sm mb-1">{user?.name}</p>
                                <p className="text-sm text-gray-700">123, Digital Tower, IT Park, Road No. 5, Mumbai, Maharashtra - 400001</p>
                                <p className="mt-2 text-sm font-bold">9876543210</p>
                                <button className="mt-4 bg-[#fb641b] text-white px-8 py-2.5 rounded-sm font-bold shadow-md text-xs uppercase">Deliver Here</button>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="bg-white shadow-sm rounded-sm p-4">
                             <div className="flex items-center space-x-4 mb-4">
                                <div className="bg-[#2874f0] p-2 rounded-sm text-white font-bold text-xs leading-none">3</div>
                                <h3 className="text-gray-500 uppercase text-xs font-bold">Order Summary</h3>
                            </div>
                            <div className="pl-12 space-y-4">
                                {cartItems.map(item => (
                                    <div key={item.id} className="flex space-x-4 pb-4 border-b last:border-0">
                                        <img src={`https://picsum.photos/seed/${item.id}/100/100`} alt="" className="h-16 w-16 object-contain" />
                                        <div>
                                            <h4 className="text-sm font-medium">{item.name}</h4>
                                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                            <p className="text-sm font-bold mt-1">${item.price}</p>
                                        </div>
                                    </div>
                                ))}
                                <div className="flex justify-between items-center py-4 bg-orange-50 px-4 rounded-sm border border-orange-100">
                                    <p className="text-sm">Order confirmation will be sent to <span className="font-bold">{user?.email}</span></p>
                                    <button 
                                        onClick={handlePlaceOrder}
                                        disabled={loading}
                                        className="bg-[#fb641b] text-white px-8 py-3 rounded-sm font-bold shadow-md hover:bg-[#e65c19] transition uppercase text-sm tracking-wider"
                                    >
                                        {loading ? 'Processing...' : 'Continue'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Section: Price Details */}
                    <div className="lg:w-[380px]">
                        <div className="bg-white shadow-sm rounded-sm overflow-hidden sticky top-24">
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider p-4 border-b">Price Details</h3>
                            <div className="p-4 space-y-4">
                                <div className="flex justify-between text-base">
                                    <span>Price ({cartItems.length} items)</span>
                                    <span>${(cartTotal * 1.4).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-base">
                                    <span>Discount</span>
                                    <span className="text-green-600">-${((cartTotal * 0.4) + (cartTotal * discount)).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-base">
                                    <span>Delivery Charges</span>
                                    <span className="text-green-600">FREE</span>
                                </div>
                                <div className="border-t border-dashed pt-4 flex justify-between text-xl font-bold text-gray-800">
                                    <span>Total Payable</span>
                                    <span>${finalTotal.toFixed(2)}</span>
                                </div>
                                <div className="pt-2 text-sm font-bold text-green-600 flex items-center">
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Your total savings: ${((cartTotal * 0.4) + (cartTotal * discount)).toFixed(2)}
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

export default CheckoutPage;

