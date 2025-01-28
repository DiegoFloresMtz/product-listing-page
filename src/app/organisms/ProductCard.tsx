"use client"
import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import { addToCart } from '../../redux/store/cartSlice';
import { Product } from '../types/types';
import { Rating } from '../atoms/Rating';

interface ProductCardProps {
    product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    const [showFullDescription, setShowFullDescription] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart({ ...product, quantity: 1 }));
    };

    // Function to get first 100 words
    const getFirstWords = (text: string, wordCount: number = 100) => {
        const words = text.split(' ');
        if (words.length <= wordCount) return text;
        return words.slice(0, wordCount).join(' ') + '...';
    };

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setShowFullDescription(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setShowFullDescription(false);
        }, 300);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const truncatedDescription = getFirstWords(product.description);
    const shouldShowPopup = product.description.split(' ').length > 100;

    return (
        <div className="bg-main rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative h-48">
                <Image
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                    width={500}
                    height={500}
                    loading="lazy"
                    priority={false} 
                />
            </div>
            <div className="h-72 flex flex-col justify-between p-4">
                <h3 className="text-secondary text-lg font-semibold mb-2">{product.title}</h3>
                <div className="relative">
                    <p className="text-secondary text-[.6em] mb-2">
                        {truncatedDescription}
                        {shouldShowPopup && (
                            <span 
                                className="text-accent text-[1.3em] cursor-pointer hover:text-blue-800"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                (...read more)
                            </span>
                        )}
                    </p>
                    {showFullDescription && shouldShowPopup && (
                        <div 
                            className="h-60 absolute left-0 top-0 z-50 bg-main border text-secondary border-gray-200 rounded-md p-4 shadow-lg max-w-sm overflow-y-scroll"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <p className="text-[.6em]">{product.description}</p>
                        </div>
                    )}
                </div>
<div>
                    <div className="flex place-items-end items-center justify-between mb-2">
                        <span className="text-secondary text-xl font-bold">
                            ${product.price.toFixed(2)}
                        </span>
                        <Rating rating={product.rating} />
                    </div>
                    <button
                        onClick={handleAddToCart}
                        className="self-end w-full bg-secondary text-main py-2 rounded-md hover:bg-accent transition-colors duration-300"
                    >
                        Add to Cart
                    </button>
</div>
            </div>
        </div>
    );
};