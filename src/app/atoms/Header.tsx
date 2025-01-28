import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { decreaseQuantity, clearCart } from '../../redux/store/cartSlice';

export const Header = () => {
    const [showCart, setShowCart] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
    const cartRef = useRef<HTMLDivElement>(null);
    
    const cart = useSelector((state: RootState) => state.cart);
    const totalItems = cart.items.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const dispatch = useDispatch();

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setShowCart(true);
    };
    // event - mouse leaves without click
    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setShowCart(false);
        }, 300); // delay
    };

    // Clean up timeout on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    // event - Click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
                setShowCart(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 bg-secondary shadow-md z-50">
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-main">Products</h1>
                    
                    <div className="relative" ref={cartRef}>
                        <button
                            className="flex items-center space-x-2 hover:text-blue-600 transition-colors"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <ShoppingCartIcon className="text-main h-6 w-6" />
                            {totalItems > 0 && (
                                <span className="absolute -top-2 -right-2 bg-main text-secondary text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {totalItems}
                                </span>
                            )}
                        </button>

                        {showCart && (
                            <div 
                                className="absolute right-0 mt-2 w-72 bg-secondary text-main rounded-lg shadow-lg border border-gray-200 p-4"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                {cart.items.length > 0 ? (
                                    <>
                                        <div className="max-h-60 overflow-auto">
                                            {cart.items.map((item) => (
                                                <div key={item.id} className="flex items-center gap-2 py-2 border-b border-gray-100">
                                                    <Image 
                                                        src={item.image} 
                                                        alt={item.title} 
                                                        className="w-12 h-12 object-cover rounded"
                                                        width={500}
                                                        height={500}
                                                    />
                                                    <div className="flex-1">
                                                        <p className="text-sm font-medium truncate text-accent">{item.title}</p>
                                                        <div className="flex items-center justify-between">
                                                            <p className="text-xs text-gray-500">
                                                                {item.quantity} × ${item.price.toFixed(2)}
                                                            </p>
                                                            <button 
                                                                onClick={() => dispatch(decreaseQuantity(item.id))}
                                                                className="text-accent text-xs hover:text-red-700"
                                                            >
                                                                Remove One
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-gray-100">
                                            <div className="flex justify-between font-semibold">
                                                <span>Total:</span>
                                                <span>${totalPrice.toFixed(2)}</span>
                                            </div>
                                            <button 
                                                onClick={() => dispatch(clearCart())}
                                                className="mt-2 w-full bg-accent text-main py-2 rounded hover:bg-red-600 transition-colors"
                                            >
                                                Clear Cart
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <p className="text-main text-center py-4">Your cart is empty</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}; 