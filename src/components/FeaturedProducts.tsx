
import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Product } from '@/lib/data';
import ProductCard from './ProductCard';

interface FeaturedProductsProps {
  title: string;
  products: Product[];
  link?: {
    text: string;
    url: string;
  };
  onAddToCart: (product: Product) => void;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ 
  title, 
  products, 
  link, 
  onAddToCart 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 px-6 max-w-7xl mx-auto"
    >
      <div className={cn(
        "flex justify-between items-end mb-10 transform transition-all duration-500",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      )}>
        <div>
          <h2 className="text-2xl md:text-3xl font-medium">{title}</h2>
          <p className="text-gray-600 mt-2">Discover our selection of premium products</p>
        </div>
        
        {link && (
          <Link 
            to={link.url} 
            className="text-sm font-medium flex items-center hover:underline"
          >
            {link.text}
            <ArrowRight size={14} className="ml-1" />
          </Link>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            index={index}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
