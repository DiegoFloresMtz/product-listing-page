import { Metadata } from 'next';

export const defaultMetadata: Metadata = {
    title: 'Product Catalog | Browse Products',
    description: 'This is a custom metadata file.',
    keywords: 'e-commerce, online shopping, products, store, shop, deals',
    openGraph: {
        title: 'E-Commerce Store | Browse Products',
        description: 'Discover our wide range of high-quality products. Shop the latest trends with competitive prices.',
        type: 'website',
        locale: 'en_US',
        url: 'https://xxx-xxx.com',
        siteName: 'Product Catalog',
        images: [
            {
                url: '/placeholder.jpg',
                width: 1200,
                height: 630,
                alt: 'Product Catalog',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Product Catalog | Browse Products',
        description: 'Discover our wide range of high-quality products. Shop the latest trends.',
        images: ['/placeholder.jpg'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: 'index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1',
    },
}; 