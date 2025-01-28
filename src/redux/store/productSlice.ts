import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../../app/types/types';


export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async ({ page, limit, sort, search }: { page: number; limit: number; sort: string; search: string }) => {
        const [sortField, sortOrder] = sort.split('-');
        
        try {
            // get all products
            const response = await axios.get(`http://localhost:3001/products`);
            let filteredData = response.data;
            
            if (search) {
                const searchLower = search.toLowerCase();
                const searchNumber = parseFloat(search);
                
                filteredData = filteredData.filter((product: Product) => 
                    // Search in title
                    product.title.toLowerCase().includes(searchLower) ||
                    // Search in description
                    product.description.toLowerCase().includes(searchLower) ||
                    // Search in price (if search term is a number)
                    (!isNaN(searchNumber) && product.price <= searchNumber)
                );
            }

            // sorting
            filteredData.sort((a: Product, b: Product) => {
                if (sortField === 'price') {
                    return sortOrder === 'asc' 
                        ? a.price - b.price 
                        : b.price - a.price;
                }
                if (sortField === 'rating') {
                    return sortOrder === 'asc' 
                        ? a.rating - b.rating 
                        : b.rating - a.rating;
                }
                if (sortField === 'title') {
                    return sortOrder === 'asc'
                        ? a.title.localeCompare(b.title)
                        : b.title.localeCompare(a.title);
                }
                return 0;
            });

            //  pagination calcs 
            const totalCount = filteredData.length;
            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;
            const paginatedData = filteredData.slice(startIndex, endIndex);

            {/*
            console.log('Fetch response:', {
                totalCount,
                currentPageCount: paginatedData.length,
                page,
                startIndex,
                endIndex,
                totalPages: Math.ceil(totalCount / limit)
            });
            */}

            return {
                products: paginatedData,
                totalItems: totalCount,
                page: page,
            };
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    }
);

interface ProductsState {
    items: Product[];
    loading: boolean;
    error: string | null;
    currentPage: number;
    totalPages: number;
    totalItems: number;
}

const initialState: ProductsState = {
    items: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 0,
    totalItems: 0,
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        resetProducts: (state) => {
            state.items = [];
            state.currentPage = 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.currentPage = action.payload.page;
                state.totalItems = action.payload.totalItems;
                state.totalPages = Math.ceil(action.payload.totalItems / 10);
                // if page 1, reset items
                if (action.payload.page === 1) {
                    state.items = action.payload.products;
                } else {
                    // if page 2 or more, append new items ensuring uniqueness
                    const existingIds = new Set(state.items.map((item: Product) => item.id));
                    const uniqueNewItems = action.payload.products.filter((item: Product) => !existingIds.has(item.id));
                    state.items = [...state.items, ...uniqueNewItems];
                }
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to fetch products';
            });
    },
});

export const { resetProducts } = productsSlice.actions;
export default productsSlice.reducer;