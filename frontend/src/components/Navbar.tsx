import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Search, ChevronDown } from 'lucide-react';
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
        <nav className="sticky top-0 z-50 bg-[#800000] text-white shadow-2xl border-b border-[#a00000]">
            <div className="container mx-auto flex h-16 items-center px-4 lg:px-12">
                {/* Logo - Royal Styling */}
                <div className="flex flex-col items-start mr-12 group cursor-pointer" onClick={() => navigate('/')}>
                    <h1 className="text-2xl font-black italic tracking-tighter uppercase leading-none">Nexus</h1>
                    <div className="flex items-center text-[9px] font-black tracking-[0.2em] uppercase text-maroon-200 mt-0.5">
                        <span>Commerce</span>
                        <div className="ml-2 h-1 w-1 bg-yellow-400 rounded-full animate-pulse"></div>
                        <span className="ml-1 text-yellow-400">Royal</span>
                    </div>
                </div>
                
                {/* Search Bar - Modern Contrast */}
                <div className="flex flex-1 items-center justify-start max-w-2xl">
                    <div className="relative w-full group">
                        <input
                            type="text"
                            placeholder="Search for Royal Products, Brands and more..."
                            className="w-full rounded-full border-none py-2.5 pl-6 pr-14 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 bg-white/95 backdrop-blur-sm transition-all shadow-inner"
                        />
                        <button className="absolute right-1 top-1 h-[calc(100%-8px)] px-5 text-white bg-[#800000] rounded-full hover:bg-black transition-colors shadow-md">
                            <Search className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                {/* Actions */}
                <div className="ml-12 flex items-center space-x-10">
                    {user ? (
                        <div className="group relative cursor-pointer">
                            <div className="flex items-center space-x-2 py-2">
                                <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition">
                                    <User className="h-4 w-4" />
                                </div>
                                <span className="text-xs font-black uppercase tracking-widest">{(user.name || 'User').split(' ')[0]}</span>
                                <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180 opacity-50" />
                            </div>
                            {/* Dropdown - Luxury Theme */}
                            <div className="absolute right-0 top-full mt-2 hidden w-56 rounded-xl bg-white text-gray-800 shadow-[0_20px_50px_rgba(0,0,0,0.2)] group-hover:block overflow-hidden border border-gray-100 animate-in fade-in slide-in-from-top-2 duration-200">
                                <div className="bg-gray-50 px-6 py-4 border-b">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Signed in as</p>
                                    <p className="text-sm font-black text-[#800000] truncate">{user.email || 'N/A'}</p>
                                </div>
                                <div className="py-2">
                                    {['My Profile', 'Order History', 'Wishlist', 'Nexus Rewards'].map(item => (
                                        <div key={item} className="px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-maroon-50 hover:text-[#800000] transition cursor-pointer">{item}</div>
                                    ))}
                                    <div className="h-px bg-gray-100 my-2 mx-4"></div>
                                    <div onClick={handleLogout} className="px-6 py-3 text-xs font-black uppercase tracking-widest text-red-600 hover:bg-red-50 transition cursor-pointer flex items-center">
                                        <LogOut className="h-3.5 w-3.5 mr-2" />
                                        Logout
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Link to="/login" className="px-10 py-2.5 bg-white text-[#800000] rounded-full text-xs font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-lg transform hover:-translate-y-0.5">
                            Login
                        </Link>
                    )}

                    <Link to="/cart" className="flex items-center space-x-3 group relative py-2">
                        <div className="relative">
                            <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 group-hover:bg-yellow-400 group-hover:text-[#800000] transition-all duration-300">
                                <ShoppingCart className="h-5 w-5" />
                            </div>
                            {cartCount > 0 && (
                                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-400 text-[10px] font-black text-[#800000] border-2 border-[#800000] shadow-lg animate-bounce">
                                    {cartCount}
                                </span>
                            )}
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest group-hover:text-yellow-400 transition">Cart</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
