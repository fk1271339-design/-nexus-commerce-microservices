import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login, googleLogin } = useAuth();

    const handleGoogleLogin = () => {
        setLoading(true);
        toast.loading('Redirecting to Google...', { id: 'google-loading' });
        
        setTimeout(() => {
            googleLogin();
            toast.dismiss('google-loading');
            toast.success('Successfully verified with Google!', { icon: '✅' });
            navigate('/');
        }, 1500);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await api.post('/auth/login', { email, password });
            login(response.data.token, {
                name: response.data.name,
                email: response.data.email,
                role: response.data.role
            });
            toast.success('Login successful!');
            navigate('/');
        } catch (error: any) {
            toast.error(error.response?.data?.error || 'Invalid credentials. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md overflow-hidden rounded-lg bg-white shadow-lg">
                <div className="bg-[#2874f0] py-6 text-center text-white">
                    <h2 className="text-3xl font-extrabold tracking-tight italic">NexusCommerce</h2>
                    <p className="mt-2 text-blue-100">Log in to your account</p>
                </div>
                <div className="p-8">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="mb-2 block text-sm font-medium text-gray-700">Email Address</label>
                            <input
                                type="email"
                                placeholder="Enter Email"
                                className="w-full rounded-sm border border-gray-300 px-4 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none transition"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="mb-2 block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                placeholder="Enter Password"
                                className="w-full rounded-sm border border-gray-300 px-4 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none transition"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full rounded-sm bg-[#fb641b] py-3 font-bold text-white hover:bg-[#e65c19] focus:outline-none transition disabled:bg-gray-300 shadow-md uppercase tracking-wider"
                            disabled={loading}
                        >
                            {loading ? 'Processing...' : 'Login'}
                        </button>
                    </form>

                    <div className="relative my-8 text-center">
                        <span className="relative z-10 bg-white px-4 text-xs font-bold text-gray-400 uppercase">OR</span>
                        <div className="absolute left-0 top-1/2 w-full border-t border-gray-200"></div>
                    </div>

                    <button
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        className="flex w-full items-center justify-center gap-3 rounded-sm border border-gray-300 bg-white py-3 font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none transition shadow-sm"
                    >
                        <img 
                            src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_Logo.svg" 
                            alt="Google" 
                            className="h-5 w-5" 
                        />
                        Sign in with Google
                    </button>

                    <p className="mt-8 text-center text-sm text-gray-600">
                        New to Nexus? <Link to="/register" className="font-bold text-[#2874f0] hover:underline">Create an account</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
