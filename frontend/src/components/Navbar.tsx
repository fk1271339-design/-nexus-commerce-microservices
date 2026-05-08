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
        <nav className="sticky top-0 z-50 bg-white shadow-md">
            <div className="container mx-auto flex items-center justify-between px-6 py-4">
                <Link to="/" className="text-2xl font-bold text-blue-600">NexusCommerce</Link>
                
                <div className="hidden flex-1 items-center justify-center px-10 md:flex">
                    <div className="relative w-full max-w-lg">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full rounded-full border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none"
                        />
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                </div>

                <div className="flex items-center space-x-6">
                    <Link to="/cart" className="relative flex items-center text-gray-700 hover:text-blue-600">
                        <ShoppingCart className="h-6 w-6" />
                        {cartCount > 0 && (
                            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {user ? (
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1 text-gray-700">
                                <User className="h-5 w-5" />
                                <span className="font-medium">{user.name}</span>
                            </div>
                            <button onClick={handleLogout} className="text-gray-700 hover:text-red-600">
                                <LogOut className="h-5 w-5" />
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
