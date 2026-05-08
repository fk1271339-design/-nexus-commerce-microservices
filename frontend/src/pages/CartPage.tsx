import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';

const CartPage = () => {
    const { cartItems, removeFromCart, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="container mx-auto px-6 py-12">
                <h2 className="mb-8 text-3xl font-bold text-gray-800">Your Shopping Cart</h2>

                {cartItems.length > 0 ? (
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                        <div className="lg:col-span-2">
                            <div className="rounded-lg bg-white shadow-md">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex items-center border-b p-6 last:border-0">
                                        <img
                                            src={item.imageUrl || 'https://via.placeholder.com/100?text=Product'}
                                            alt={item.name}
                                            className="h-24 w-24 rounded-md object-cover"
                                        />
                                        <div className="ml-6 flex-1">
                                            <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                                            <p className="mt-1 text-gray-600">${item.price} x {item.quantity}</p>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <span className="text-xl font-bold text-blue-600">${item.price * item.quantity}</span>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <Trash2 className="h-6 w-6" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={clearCart}
                                className="mt-6 text-sm font-medium text-red-600 hover:underline"
                            >
                                Clear Cart
                            </button>
                        </div>

                        <div className="h-fit rounded-lg bg-white p-8 shadow-md">
                            <h3 className="mb-6 text-2xl font-bold text-gray-800">Order Summary</h3>
                            <div className="mb-4 flex justify-between text-lg text-gray-600">
                                <span>Subtotal</span>
                                <span>${cartTotal}</span>
                            </div>
                            <div className="mb-6 flex justify-between text-lg text-gray-600">
                                <span>Shipping</span>
                                <span className="text-green-600">FREE</span>
                            </div>
                            <hr className="mb-6" />
                            <div className="mb-8 flex justify-between text-2xl font-bold text-gray-800">
                                <span>Total</span>
                                <span>${cartTotal}</span>
                            </div>
                            <button
                                onClick={() => navigate('/checkout')}
                                className="w-full rounded-md bg-blue-600 py-3 text-lg font-bold text-white hover:bg-blue-700"
                            >
                                Proceed to Checkout
                            </button>
                            <Link
                                to="/"
                                className="mt-4 block text-center text-sm font-medium text-gray-600 hover:underline"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="py-20 text-center">
                        <ShoppingBag className="mx-auto h-20 w-20 text-gray-300" />
                        <p className="mt-6 text-2xl text-gray-600">Your cart is empty.</p>
                        <Link
                            to="/"
                            className="mt-8 inline-block rounded-md bg-blue-600 px-8 py-3 font-bold text-white hover:bg-blue-700"
                        >
                            Shop Now
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
};

export default CartPage;
