import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../../app/types/types';

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push(action.payload);
            }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
            const item = state.items.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity = action.payload.quantity;
            }
        },
        decreaseQuantity: (state, action: PayloadAction<number>) => {
            const existingItem = state.items.find(item => item.id === action.payload);
            if (existingItem) {
                if (existingItem.quantity === 1) {
                    state.items = state.items.filter(item => item.id !== action.payload);
                } else {
                    existingItem.quantity -= 1;
                }
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});
export const { addToCart, removeFromCart, updateQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;