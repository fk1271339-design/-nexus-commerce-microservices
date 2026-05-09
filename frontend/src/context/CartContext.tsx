import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
    cartCount: number;
    cartTotal: number;
    discount: number;
    appliedCoupon: string | null;
    applyCoupon: (code: string) => boolean;
    removeCoupon: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [discount, setDiscount] = useState(0);
    const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item: CartItem) => {
        setCartItems(prev => {
            const existing = prev.find(i => i.id === item.id);
            if (existing) {
                return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
            }
            return [...prev, item];
        });
    };

    const updateQuantity = (id: number, quantity: number) => {
        if (quantity < 1) return;
        setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
    };

    const removeFromCart = (id: number) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
        setDiscount(0);
        setAppliedCoupon(null);
    };

    const applyCoupon = (code: string): boolean => {
        const upperCode = code.toUpperCase();
        let d = 0;
        if (upperCode === 'SAVE20') d = 0.2;
        else if (upperCode === 'WELCOME50') d = 0.5;
        else if (upperCode === 'NEXUS10') d = 0.1;
        else if (upperCode === 'NEXUSAICHAT') d = 0.25;

        if (d > 0) {
            setDiscount(d);
            setAppliedCoupon(upperCode);
            return true;
        }
        return false;
    };

    const removeCoupon = () => {
        setDiscount(0);
        setAppliedCoupon(null);
    };

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{ 
            cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal, 
            discount, appliedCoupon, applyCoupon, removeCoupon 
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
