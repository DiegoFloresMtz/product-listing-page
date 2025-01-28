export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    rating: number;
    currency: string;
    image: string;
}

export interface CartItem extends Product {
    quantity: number;
}