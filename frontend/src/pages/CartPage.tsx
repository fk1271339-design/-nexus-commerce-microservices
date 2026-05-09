import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, PartyPopper } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const CartPage = () => {
    const { 
        cartItems, removeFromCart, updateQuantity, cartTotal, 
        discount, appliedCoupon, applyCoupon, removeCoupon 
    } = useCart();
    const [couponCode, setCouponCode] = useState('');
    const navigate = useNavigate();

    const handleApplyCoupon = (e: React.FormEvent) => {
        e.preventDefault();
        const success = applyCoupon(couponCode);
        if (success) {
            toast.success('Coupon applied successfully!');
            setCouponCode('');
        } else {
            toast.error('Invalid coupon code');
        }
    };

    const finalTotal = cartTotal * (1 - discount);
    const savings = (cartTotal * discount) + (cartTotal * 0.4); // Simulated 40% base discount from MSRP

    return (
        <div className="min-h-screen bg-[#f1f3f6]">
            <Navbar />
            <main className="container mx-auto px-4 lg:px-12 py-8">
                {cartItems.length > 0 ? (
                    <div className="flex flex-col gap-6 lg:flex-row">
                        {/* Cart Items Section */}
                        <div className="flex-1">
                            <div className="bg-white shadow-sm rounded-sm mb-4">
                                <div className="p-4 border-b flex justify-between items-center">
                                    <h2 className="text-lg font-bold text-gray-800">My Cart ({cartItems.length})</h2>
                                    <div className="flex items-center space-x-2 text-sm">
                                        <svg className="h-4 w-4 fill-blue-600" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/></svg>
                                        <span className="text-gray-600 font-medium">Deliver to: <span className="text-blue-600">Mumbai - 400001</span></span>
                                    </div>
                                </div>

                                {cartItems.map((item) => (
                                    <div key={item.id} className="p-6 border-b flex flex-col sm:flex-row">
                                        <div className="flex flex-col items-center">
                                            <img
                                                src={item.imageUrl || `https://picsum.photos/seed/${item.id}/100/100`}
                                                alt={item.name}
                                                className="h-28 w-28 object-contain"
                                            />
                                            <div className="mt-4 flex items-center border rounded-full px-2">
                                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 px-3 text-lg">-</button>
                                                <input readOnly value={item.quantity} className="w-8 text-center text-sm font-bold focus:outline-none" />
                                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 px-3 text-lg">+</button>
                                            </div>
                                        </div>
                                        <div className="sm:ml-8 mt-4 sm:mt-0 flex-1">
                                            <h3 className="text-lg font-medium text-gray-800 hover:text-blue-600 cursor-pointer">{item.name}</h3>
                                            <p className="text-sm text-gray-500 mt-1">Seller: NexusRetail</p>
                                            <div className="mt-4 flex items-baseline space-x-2">
                                                <span className="text-sm text-gray-400 line-through">${(item.price * 1.4).toFixed(2)}</span>
                                                <span className="text-xl font-bold text-gray-900">${item.price}</span>
                                                <span className="text-sm font-bold text-green-600">40% Off</span>
                                            </div>
                                            <div className="mt-6 flex space-x-6 text-sm font-bold">
                                                <button className="uppercase hover:text-blue-600">Save for later</button>
                                                <button onClick={() => removeFromCart(item.id)} className="uppercase hover:text-blue-600">Remove</button>
                                            </div>
                                        </div>
                                        <div className="mt-4 sm:mt-0 text-sm font-medium">
                                            Delivery by tomorrow, Sun | <span className="text-green-600">Free</span>
                                        </div>
                                    </div>
                                ))}

                                <div className="p-4 flex justify-end shadow-[0_-2px_10px_0_rgba(0,0,0,0.1)] bg-white sticky bottom-0">
                                    <button
                                        onClick={() => navigate('/checkout')}
                                        className="bg-[#fb641b] text-white px-12 py-3 rounded-sm font-bold shadow-md hover:bg-[#e65c19] transition uppercase tracking-wide"
                                    >
                                        Place Order
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Price Details Section */}
                        <div className="lg:w-[380px]">
                            {/* Coupons Section */}
                            <div className="bg-white shadow-sm rounded-sm p-4 mb-4 border border-blue-100">
                                <div className="flex items-center space-x-2 mb-4">
                                    <PartyPopper className="h-5 w-5 text-blue-600" />
                                    <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Available Offers</h3>
                                </div>
                                
                                {appliedCoupon ? (
                                    <div className="mb-4 p-4 bg-green-50 border border-dashed border-green-400 rounded-sm flex justify-between items-center">
                                        <div>
                                            <p className="text-xs font-bold text-green-800 uppercase tracking-wide">Applied: {appliedCoupon}</p>
                                            <p className="text-[10px] text-green-600 font-medium">Savings: ${(cartTotal * discount).toFixed(2)}</p>
                                        </div>
                                        <button 
                                            onClick={() => { removeCoupon(); toast.success('Coupon removed'); }}
                                            className="text-xs font-bold text-red-500 uppercase hover:underline"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-3 mb-4">
                                        <div className="p-3 bg-blue-50 border border-dashed border-blue-300 rounded-sm">
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs font-bold text-blue-800">SAVE20</span>
                                                <button onClick={() => { applyCoupon('SAVE20'); toast.success('SAVE20 Applied!'); }} className="text-xs font-bold text-blue-600 uppercase">Apply</button>
                                            </div>
                                            <p className="text-[10px] text-blue-600 mt-1">Get 20% OFF on your first order</p>
                                        </div>
                                        <div className="p-3 bg-green-50 border border-dashed border-green-300 rounded-sm">
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs font-bold text-green-800">WELCOME50</span>
                                                <button onClick={() => { applyCoupon('WELCOME50'); toast.success('WELCOME50 Applied!'); }} className="text-xs font-bold text-green-600 uppercase">Apply</button>
                                            </div>
                                            <p className="text-[10px] text-green-600 mt-1">Special 50% Welcome Discount</p>
                                        </div>
                                    </div>
                                )}

                                {!appliedCoupon && (
                                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                                        <input 
                                            type="text" 
                                            placeholder="Enter Coupon Code" 
                                            className="flex-1 border rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value)}
                                        />
                                        <button type="submit" className="text-blue-600 font-bold text-sm uppercase px-2 hover:bg-blue-50 transition">Apply</button>
                                    </form>
                                )}
                            </div>

                            <div className="bg-white shadow-sm rounded-sm overflow-hidden">
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
                                        <span>Total Amount</span>
                                        <span>${finalTotal.toFixed(2)}</span>
                                    </div>
                                    <div className="pt-2 text-sm font-bold text-green-600">
                                        You will save ${savings.toFixed(2)} on this order
                                    </div>
                                </div>
                                <div className="p-4 bg-gray-50 flex items-center space-x-2 text-xs text-gray-500 border-t">
                                    <svg className="h-5 w-5 fill-gray-400" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                                    <span>Safe and Secure Payments. 100% Authentic products.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white p-20 shadow-sm rounded-sm text-center">
                        <img src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4e8b-b4a6-520b560971e8.png?q=90" alt="Empty" className="mx-auto h-60" />
                        <h3 className="mt-6 text-xl font-bold text-gray-800">Your cart is empty!</h3>
                        <p className="mt-2 text-sm text-gray-500">Add items to it now.</p>
                        <Link
                            to="/"
                            className="mt-6 inline-block bg-blue-600 text-white px-12 py-3 rounded-sm font-bold shadow-md hover:bg-blue-700 transition"
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
