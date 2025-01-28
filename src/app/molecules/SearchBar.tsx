import { useEffect, useState } from "react";
import { MagnifyingGlassIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
    const [inputValue, setInputValue] = useState(value);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(inputValue.toLowerCase());
        }, 300);

        return () => clearTimeout(timeout);
    }, [inputValue, onChange]);

    return (
        <div className="relative">
            <div className={`flex items-center transition-all duration-300 ease-in-out ${isExpanded ? 'w-64' : 'w-10'}`}>
                <div 
                    className={`flex items-center bg-white rounded-md border border-gray-300 
                    ${isExpanded ? 'w-full pl-3 pr-8' : 'px-2 w-fit h-10 relative justify-center cursor-pointer hover:bg-gray-50'}`}
                    onClick={() => !isExpanded && setIsExpanded(true)}
                >
                    <div className="flex items-center gap-1">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
                        {!isExpanded && <ChevronRightIcon className="h-4 w-4 text-gray-400" />}
                    </div>
                    
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Search products..."
                        className={`text-secondary ml-2 focus:outline-none ${isExpanded ? 'w-full py-2' : 'w-0'} transition-all duration-300`}
                        onBlur={() => !inputValue && setIsExpanded(false)}
                    />
                </div>
                {inputValue && (
                    <button
                        onClick={() => {
                            setInputValue('');
                            setIsExpanded(false);
                        }}
                        className="absolute right-10 text-secondary hover:text-gray-600"
                    >
                        Clear filter
                    </button>
                )}
            </div>
        </div>
    );
};