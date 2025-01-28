import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Header } from '../Header';
import cartReducer from '../../../redux/store/cartSlice';
import { act } from 'react';

const mockCartItems = [
    {
        id: 1,
        title: "Test Product",
        description: "Test description",
        price: 99.99,
        quantity: 2,
        image: "https://test.com/image.jpg",
        rating: 4.5,
        currency: "USD"
    }
];

const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
    preloadedState: {
        cart: {
            items: mockCartItems
        }
    }
});

const renderWithProvider = (component: React.ReactElement) => {
    return render(
        <Provider store={store}>
            {component}
        </Provider>
    );
};

describe('Header', () => {
    it('renders header with cart icon', () => {
        renderWithProvider(<Header />);
        expect(screen.getByText('Products')).toBeInTheDocument();
    });

    it('shows cart items count', () => {
        renderWithProvider(<Header />);
        expect(screen.getByText('2')).toBeInTheDocument();
    });

    it('shows cart details on hover', () => {
        renderWithProvider(<Header />);
        
        const cartButton = screen.getByRole('button');
        fireEvent.mouseEnter(cartButton);
        
        expect(screen.getByText('Test Product')).toBeInTheDocument();
        expect(screen.getByText('2 × $99.99')).toBeInTheDocument();
        expect(screen.getByText('Total:')).toBeInTheDocument();
        expect(screen.getByText('$199.98')).toBeInTheDocument();
    });

    it('hides cart details when mouse leaves', async () => {
        renderWithProvider(<Header />);
        
        const cartButton = screen.getByRole('button');
        fireEvent.mouseEnter(cartButton);
        fireEvent.mouseLeave(cartButton);
        
        // Wait for the timeout using act
        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 400));
        });
        
        expect(screen.queryByText('Total:')).not.toBeInTheDocument();
    });
}); 