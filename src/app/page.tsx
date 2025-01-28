import { Metadata } from 'next';
import ProductPage from "../app/organisms/ProductPage";
import { defaultMetadata } from './metadata';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Product Catalog | Store',
  description: 'Browse our extensive collection of products. Find the best deals and latest trends in our online store.',
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <section aria-label="Product Catalog">
        <ProductPage />
      </section>
    </div>
  );
}