import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles, Ticket } from 'lucide-react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ text: string; sender: 'bot' | 'user'; type?: 'text' | 'coupon' }[]>([
        { text: "Hi! I'm Nexus AI. How can I help you today?", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const { applyCoupon } = useCart();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input.trim();
        setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
        setInput('');
        setIsTyping(true);

        // Simulated AI Logic
        setTimeout(() => {
            let botResponse = "";
            let type: 'text' | 'coupon' = 'text';

            const msg = userMessage.toLowerCase();
            if (msg.includes('coupon') || msg.includes('discount') || msg.includes('offer')) {
                botResponse = "I've found a special offer for you! Use code **NEXUSAIChat** for 25% off your first order.";
                type = 'coupon';
            } else if (msg.includes('order') || msg.includes('delivery')) {
                botResponse = "Standard delivery takes 2-3 business days. You can track your order in the 'Orders' section of your profile.";
            } else if (msg.includes('return') || msg.includes('refund')) {
                botResponse = "We have a 30-day easy return policy. Just go to your orders and click 'Return Item'.";
            } else if (msg.includes('hi') || msg.includes('hello')) {
                botResponse = "Hello! I can help you with coupons, order tracking, or any other issues you're facing. What's on your mind?";
            } else {
                botResponse = "That's a great question! For specific issues, you can also reach our human support at 1800-NEXUS-00. But I can help with discounts - just ask!";
            }

            setMessages(prev => [...prev, { text: botResponse, sender: 'bot', type }]);
            setIsTyping(false);
        }, 1000);
    };

    const handleApplyChatCoupon = (code: string) => {
        const success = applyCoupon(code);
        if (success) {
            toast.success(`Applied ${code} from Chat!`);
        } else {
            toast.error('Invalid coupon');
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] font-sans">
            {/* Chat Toggle Button */}
            {!isOpen && (
                <button 
                    onClick={() => setIsOpen(true)}
                    className="bg-[#2874f0] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all flex items-center space-x-2 group"
                >
                    <MessageCircle className="h-6 w-6" />
                    <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap font-bold">Chat with Nexus AI</span>
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="bg-white w-[350px] h-[500px] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 animate-in slide-in-from-bottom-10 duration-300">
                    {/* Header */}
                    <div className="bg-[#2874f0] p-4 text-white flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <div className="bg-white/20 p-2 rounded-lg">
                                <Bot className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm">Nexus AI Support</h3>
                                <div className="flex items-center text-[10px] opacity-80">
                                    <div className="h-1.5 w-1.5 bg-green-400 rounded-full mr-1 animate-pulse"></div>
                                    Online | Instant Answers
                                </div>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-full">
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                        {messages.map((m, i) => (
                            <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                                    m.sender === 'user' 
                                    ? 'bg-[#2874f0] text-white rounded-tr-none' 
                                    : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none'
                                }`}>
                                    {m.sender === 'bot' && <div className="text-[10px] font-bold text-blue-600 mb-1 flex items-center"><Bot className="h-3 w-3 mr-1" /> NEXUS AI</div>}
                                    <p className="leading-relaxed">{m.text}</p>
                                    
                                    {m.type === 'coupon' && (
                                        <button 
                                            onClick={() => handleApplyChatCoupon('SAVE20')}
                                            className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg font-bold flex items-center justify-center space-x-2 hover:bg-green-700 transition"
                                        >
                                            <Ticket className="h-4 w-4" />
                                            <span>Apply Coupon Automatically</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex space-x-1">
                                    <div className="h-1.5 w-1.5 bg-gray-300 rounded-full animate-bounce"></div>
                                    <div className="h-1.5 w-1.5 bg-gray-300 rounded-full animate-bounce delay-75"></div>
                                    <div className="h-1.5 w-1.5 bg-gray-300 rounded-full animate-bounce delay-150"></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Suggestions */}
                    {!isTyping && messages.length < 4 && (
                        <div className="px-4 py-2 bg-gray-50 flex flex-wrap gap-2">
                            {['Track Order', 'Latest Coupons', 'Refund Policy'].map(s => (
                                <button 
                                    key={s} 
                                    onClick={() => setInput(s)}
                                    className="text-[10px] bg-white border border-gray-200 px-2 py-1 rounded-full hover:border-blue-500 hover:text-blue-600 transition"
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Input Area */}
                    <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-100 flex items-center space-x-2">
                        <input 
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your issue..."
                            className="flex-1 bg-gray-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
                        />
                        <button type="submit" className="bg-[#2874f0] text-white p-2 rounded-xl hover:bg-blue-700 transition">
                            <Send className="h-4 w-4" />
                        </button>
                    </form>
                    <div className="bg-gray-100 py-1 text-center">
                        <span className="text-[8px] text-gray-400 font-bold uppercase tracking-widest flex items-center justify-center">
                            Powered by Nexus AI <Sparkles className="h-2 w-2 ml-1 text-yellow-500" />
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
