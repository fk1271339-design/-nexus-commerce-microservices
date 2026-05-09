import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { cartCount } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="sticky top-0 z-50 bg-[#2874f0] text-white shadow-lg">
            <div className="container mx-auto flex h-16 items-center px-4 lg:px-12">
                {/* Logo */}
                <div className="flex flex-col items-start mr-8">
                    <Link to="/" className="text-xl font-bold italic tracking-wide">NexusCommerce</Link>
                    <Link to="/" className="flex items-center text-[11px] italic hover:underline">
                        Explore <span className="ml-1 font-bold text-[#ffe500]">Plus</span>
                        <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/plus_aef861.png" alt="plus" className="ml-0.5 h-2.5 w-2.5" />
                    </Link>
                </div>
                
                {/* Search Bar */}
                <div className="flex flex-1 items-center justify-start max-w-2xl">
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Search for products, brands and more"
                            className="w-full rounded-sm border-none py-2.5 pl-4 pr-12 text-sm text-gray-800 focus:outline-none"
                        />
                        <button className="absolute right-0 top-0 h-full px-4 text-[#2874f0]">
                            <Search className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Actions */}
                <div className="ml-8 flex items-center space-x-8 font-semibold">
                    {user ? (
                        <div className="group relative cursor-pointer">
                            <div className="flex items-center space-x-2">
                                <span className="hover:text-gray-200">{user.name}</span>
                                <svg className="h-4 w-4 fill-current transition-transform group-hover:rotate-180" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                            </div>
                            {/* Dropdown */}
                            <div className="absolute left-0 top-full hidden w-48 rounded-sm bg-white pt-2 text-gray-800 shadow-xl group-hover:block">
                                <div className="border-b px-4 py-3 hover:bg-gray-50">My Profile</div>
                                <div className="border-b px-4 py-3 hover:bg-gray-50">Orders</div>
                                <div className="border-b px-4 py-3 hover:bg-gray-50">Wishlist</div>
                                <div onClick={handleLogout} className="px-4 py-3 text-red-600 hover:bg-gray-50">Logout</div>
                            </div>
                        </div>
                    ) : (
                        <Link to="/login" className="rounded-sm bg-white px-8 py-1.5 text-[#2874f0] hover:bg-gray-100">
                            Login
                        </Link>
                    )}

                    <Link to="/cart" className="flex items-center space-x-2 hover:text-gray-200">
                        <div className="relative">
                            <ShoppingCart className="h-5 w-5" />
                            {cartCount > 0 && (
                                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#ff6161] text-[10px] text-white border border-white">
                                    {cartCount}
                                </span>
                            )}
                        </div>
                        <span>Cart</span>
                    </Link>

                    <div className="hidden lg:block cursor-pointer hover:text-gray-200">Become a Seller</div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
