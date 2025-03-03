
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Product } from '@/lib/data';

interface ProductCardProps {
  product: Product;
  index?: number;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0, onAddToCart }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, index * 100); // Staggered animation
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [index]);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div 
      ref={cardRef}
      className={cn(
        "group relative rounded-xl overflow-hidden transition-all duration-500 transform",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-w-3 aspect-h-4 relative overflow-hidden bg-gray-100 rounded-xl">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className={cn(
              "object-cover w-full h-full transition-all duration-700 ease-out transform",
              isLoaded ? "blur-0 scale-100" : "blur-md scale-105",
              isHovered && "scale-105"
            )}
            onLoad={handleImageLoad}
            loading="lazy"
          />
        </Link>
        
        {/* Overlay */}
        <div 
          className={cn(
            "absolute inset-0 bg-black/0 transition-opacity duration-300",
            isHovered && "bg-black/5"
          )}
        ></div>
        
        {/* Tags */}
        <div className="absolute top-3 left-3 flex gap-2">
          {product.new && (
            <span className="px-2 py-1 bg-black text-white text-xs font-medium rounded-full">
              New
            </span>
          )}
          {product.featured && (
            <span className="px-2 py-1 bg-white/90 text-black text-xs font-medium rounded-full backdrop-blur-sm">
              Featured
            </span>
          )}
        </div>
        
        {/* Actions */}
        <div 
          className={cn(
            "absolute right-3 top-3 flex flex-col gap-2 transform transition-all duration-300",
            isHovered ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
          )}
        >
          <button 
            className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow hover:bg-white transition"
            aria-label="Add to favorites"
          >
            <Heart size={16} className="text-gray-700" />
          </button>
        </div>
        
        {/* Add to cart */}
        <div 
          className={cn(
            "absolute bottom-4 inset-x-4 transition-all duration-300 transform",
            isHovered ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}
        >
          <button 
            onClick={() => onAddToCart(product)}
            className="w-full py-2.5 px-4 bg-white/90 backdrop-blur-sm text-black font-medium rounded-lg hover:bg-white flex items-center justify-center transition shadow-md"
          >
            <ShoppingCart size={16} className="mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
      
      <div className="pt-4 px-1">
        <h3 className="font-medium mb-1 text-sm">
          <Link to={`/product/${product.id}`} className="hover:text-gray-700">
            {product.name}
          </Link>
        </h3>
        <div className="flex items-center justify-between">
          <span className="font-medium">${product.price.toFixed(2)}</span>
          
          {product.rating && (
            <div className="flex items-center text-sm text-gray-500">
              <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <span>{product.rating}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
