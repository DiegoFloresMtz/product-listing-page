"use client";

import { useEffect, useState, useCallback } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/store/hooks";
import { fetchProducts, resetProducts } from "../../redux/store/productSlice";
import { ProductCard } from "../../app/organisms/ProductCard";
import { Header } from "../../app/atoms/Header";
import { SearchBar } from "../molecules/SearchBar";
import { SortSelect } from "../molecules/SortSelect";
import { GoToTop } from "../atoms/GoToTop";

export default function ProductPage() {
    const dispatch = useAppDispatch();
    const {
        items: products,
        loading,
        error,
        currentPage,
        totalPages
    } = useAppSelector((state) => state.products);

    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState<string>("title-asc");

    const canLoadMore = !loading && currentPage < totalPages;

    const handleSearchChange = useCallback((value: string) => {
        setSearchTerm(value);
        dispatch(resetProducts());
        dispatch(fetchProducts({
            page: 1,
            limit: 10,
            sort: sortBy,
            search: value,
        }));
    }, [dispatch, sortBy]);

    const handleSortChange = useCallback((value: string) => {
        setSortBy(value);
        dispatch(resetProducts());
        dispatch(fetchProducts({
            page: 1,
            limit: 10,
            sort: value,
            search: searchTerm
        }));
    }, [dispatch, searchTerm]);

    const handleScroll = useCallback(() => {
        const scrollPosition = window.innerHeight + window.scrollY;
        const scrollThreshold = document.documentElement.scrollHeight - 200;

        if (scrollPosition >= scrollThreshold && !loading && canLoadMore) {
            dispatch(fetchProducts({
                page: currentPage + 1,
                limit: 10,
                sort: sortBy,
                search: searchTerm
            }));
        }
    }, [dispatch, loading, currentPage, canLoadMore, sortBy, searchTerm]);

    useEffect(() => {
        const debouncedScroll = () => {
            if (loading) return;
            handleScroll();
        };

        window.addEventListener('scroll', debouncedScroll);
        return () => window.removeEventListener('scroll', debouncedScroll);
    }, [handleScroll, loading]);

    useEffect(() => {
        dispatch(resetProducts());
        dispatch(fetchProducts({
            page: 1,
            limit: 10,
            sort: sortBy,
            search: searchTerm
        }));
    }, [dispatch, sortBy, searchTerm]);

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <main className="max-w-7xl mx-auto px-4 pt-24 pb-12">
                <div className="flex gap-4 mb-10">
                    <div className="flex-1">
                        <SearchBar value={searchTerm} onChange={handleSearchChange} />
                    </div>
                    <div className="w-48">
                        <SortSelect value={sortBy} onChange={handleSortChange} />
                    </div>
                </div>

                {error && (
                    <div className="text-red-500 text-center py-8">
                        {error}
                        <button
                            onClick={() => dispatch(fetchProducts({ 
                                page: currentPage, 
                                limit: 10, 
                                sort: sortBy, 
                                search: searchTerm 
                            }))}
                            className="ml-2 underline"
                        >
                            Retry
                        </button>
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {products.map((product, index) => (
                        <ProductCard 
                            key={`${product.id}-${index}`} 
                            product={product} 
                        />
                    ))}
                </div>

                {loading && (
                    <div className="flex justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
                    </div>
                )}

                {!loading && !error && products.length === 0 && (
                    <div className="text-black text-center py-8">
                        No products available.
                    </div>
                )}

                {/* Debug panel
                <div className="fixed bottom-4 right-4 bg-black/75 text-white p-4 rounded text-sm space-y-1">
                    <div>Page: {currentPage} / {totalPages}</div>
                    <div>Items: {products.length} / {totalItems}</div>
                    <div>Loading: {loading ? 'Yes' : 'No'}</div>
                    <div>Can Load More: {canLoadMore ? 'Yes' : 'No'}</div>
                    <div>Search: {searchTerm || 'None'}</div>
                    <div>Sort: {sortBy}</div>
                </div>
                */}
            </main>
            <GoToTop />
        </div>
    );
}