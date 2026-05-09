import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#212121] text-white pt-12 pb-8 mt-12">
            <div className="container mx-auto px-4 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-gray-700 pb-12">
                    {/* About Section */}
                    <div>
                        <h2 className="text-xl font-bold italic tracking-wide mb-6">NexusCommerce</h2>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Your one-stop destination for everything you need. From the latest electronics to trendy fashion, we bring the world to your doorstep. Experience seamless shopping with Nexus.
                        </p>
                        <div className="flex space-x-4 mt-6">
                            <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition" />
                            <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition" />
                            <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition" />
                            <Youtube className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition" />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6">Help</h3>
                        <ul className="space-y-3 text-sm text-gray-400 font-medium">
                            <li className="hover:text-white cursor-pointer transition">Payments</li>
                            <li className="hover:text-white cursor-pointer transition">Shipping</li>
                            <li className="hover:text-white cursor-pointer transition">Cancellation & Returns</li>
                            <li className="hover:text-white cursor-pointer transition">FAQ</li>
                            <li className="hover:text-white cursor-pointer transition">Report Infringement</li>
                        </ul>
                    </div>

                    {/* Policy */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6">Policy</h3>
                        <ul className="space-y-3 text-sm text-gray-400 font-medium">
                            <li className="hover:text-white cursor-pointer transition">Return Policy</li>
                            <li className="hover:text-white cursor-pointer transition">Terms Of Use</li>
                            <li className="hover:text-white cursor-pointer transition">Security</li>
                            <li className="hover:text-white cursor-pointer transition">Privacy</li>
                            <li className="hover:text-white cursor-pointer transition">Sitemap</li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6">Contact Us</h3>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li className="flex items-start space-x-3">
                                <MapPin className="h-5 w-5 flex-shrink-0 text-blue-500" />
                                <span>123 Ecommerce Tower, Digital Street, Mumbai, India - 400001</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone className="h-5 w-5 text-blue-500" />
                                <span>+91 1800-NEXUS-00</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail className="h-5 w-5 text-blue-500" />
                                <span>support@nexuscommerce.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center mt-8 text-xs text-gray-500 font-medium">
                    <p>© 2026 NexusCommerce.com. All rights reserved.</p>
                    <div className="flex space-x-8 mt-4 md:mt-0">
                        <span>Become a Seller</span>
                        <span>Advertise</span>
                        <span>Gift Cards</span>
                        <span>Help Center</span>
                    </div>
                    <img 
                        src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/payment-method_69e7ec.png" 
                        alt="Payments" 
                        className="mt-6 md:mt-0 h-4"
                    />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
