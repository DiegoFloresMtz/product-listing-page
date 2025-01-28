"use client"
import { useState, useEffect } from 'react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';

export const GoToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-4 right-4 bg-main p-2 rounded-full shadow-lg border border-gray-200 
                             hover:bg-gray-50 transition-all duration-300 hover:shadow-xl"
                    aria-label="Go to top"
                >
                    <ChevronUpIcon className="h-6 w-6 text-gray-600" />
                </button>
            )}
        </>
    );
}; 