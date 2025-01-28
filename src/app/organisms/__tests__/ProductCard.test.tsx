import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ProductCard } from '../ProductCard';
import cartReducer from '../../../redux/store/cartSlice';

const mockProduct = {
    id: 1,
    title: "Test Product",
    description: "This is a test description. ".repeat(30), // Long enough to trigger truncation
    price: 99.99,
    rating: 4.5,
    image: "https://test.com/image.jpg",
    currency: "USD"
};

const renderWithProvider = (component: React.ReactElement) => {
    return render(
        <Provider store={store}>
            {component}
        </Provider>
    );
};

const store = configureStore({
    reducer: {
        cart: cartReducer
    }
});

describe('ProductCard', () => {
    it('renders basic product information', () => {
        renderWithProvider(<ProductCard product={mockProduct} />);
        
        expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
        expect(screen.getByText('$99.99')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
    });

    it('shows read more option for long descriptions', () => {
        renderWithProvider(<ProductCard product={mockProduct} />);
        
        const readMoreElement = screen.getByText(/read more/i);
        expect(readMoreElement).toBeInTheDocument();
    });

    it('shows description popup on read more hover', () => {
        renderWithProvider(<ProductCard product={mockProduct} />);
        
        const readMoreElement = screen.getByText(/read more/i);
        fireEvent.mouseEnter(readMoreElement);
        
        const descriptionStart = mockProduct.description.slice(0, 50);
        const descriptionElements = screen.getAllByText(new RegExp(descriptionStart));
        expect(descriptionElements.length).toBeGreaterThan(0);
    });

    it('adds to cart when button is clicked', () => {
        renderWithProvider(<ProductCard product={mockProduct} />);
        
        const addButton = screen.getByRole('button', { name: /add to cart/i });
        fireEvent.click(addButton);
    });
}); 