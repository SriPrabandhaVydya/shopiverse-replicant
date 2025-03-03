
import React, { useState, useEffect } from 'react';
import { ChevronRight, Heart, ShoppingCart, Check, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Product } from '@/lib/data';

interface ProductDetailProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onAddToCart }) => {
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.colors?.[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  const handleQuantityChange = (value: number) => {
    setQuantity(Math.max(1, value));
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setIsAdded(true);
    
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
      {/* Breadcrumb */}
      <div className="mb-8 animate-fade-in">
        <nav className="flex items-center text-sm text-gray-500">
          <Link to="/" className="hover:text-gray-700">Home</Link>
          <ChevronRight size={14} className="mx-2" />
          <Link to="/products" className="hover:text-gray-700">Products</Link>
          <ChevronRight size={14} className="mx-2" />
          <Link to={`/products?category=${product.category}`} className="hover:text-gray-700">
            {product.category}
          </Link>
          <ChevronRight size={14} className="mx-2" />
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="md:sticky md:top-24 self-start animate-fade-in">
          <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden relative">
            <div 
              className={cn(
                "absolute inset-0 bg-gray-100/80 backdrop-blur-sm flex items-center justify-center z-10 transition-opacity duration-300",
                isImageLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
              )}
            >
              <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
            </div>
            <img
              src={product.image}
              alt={product.name}
              className={cn(
                "w-full h-full object-cover transition-all duration-700",
                isImageLoaded ? "scale-100 blur-0" : "scale-105 blur-sm"
              )}
              onLoad={() => setIsImageLoaded(true)}
            />
            {/* Tags */}
            <div className="absolute top-4 left-4 flex gap-2">
              {product.new && (
                <span className="px-3 py-1 bg-black text-white text-xs font-medium rounded-full">
                  New
                </span>
              )}
              {product.featured && (
                <span className="px-3 py-1 bg-white text-black text-xs font-medium rounded-full shadow-sm">
                  Featured
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-medium mb-4">{product.name}</h1>
          
          {/* Price and Rating */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-2xl font-medium">${product.price.toFixed(2)}</span>
            {product.rating && (
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={cn(
                      "mr-0.5",
                      i < Math.floor(product.rating!) 
                        ? "fill-yellow-400 text-yellow-400" 
                        : "text-gray-300"
                    )}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">{product.rating.toFixed(1)}</span>
              </div>
            )}
          </div>
          
          {/* Description */}
          <p className="text-gray-600 mb-8">{product.description}</p>
          
          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-medium mb-3">Color</h3>
              <div className="flex space-x-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => handleColorSelect(color)}
                    className={cn(
                      "w-10 h-10 rounded-full border-2 transition-all duration-200 flex items-center justify-center",
                      selectedColor === color 
                        ? "border-black" 
                        : "border-transparent hover:border-gray-300"
                    )}
                    style={{ backgroundColor: color }}
                    aria-label={`Select color ${color}`}
                  >
                    {selectedColor === color && (
                      <Check size={16} className={color === '#FFFFFF' || color === '#FEF3C7' ? 'text-black' : 'text-white'} />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Quantity */}
          <div className="mb-8">
            <h3 className="text-sm font-medium mb-3">Quantity</h3>
            <div className="flex items-center">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                className="w-10 h-10 bg-gray-100 rounded-l-md flex items-center justify-center hover:bg-gray-200 transition"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="w-14 h-10 bg-gray-100 flex items-center justify-center text-gray-800">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="w-10 h-10 bg-gray-100 rounded-r-md flex items-center justify-center hover:bg-gray-200 transition"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <button
              onClick={handleAddToCart}
              className={cn(
                "flex-1 py-3 px-6 rounded-md font-medium flex items-center justify-center transition-all duration-300",
                isAdded
                  ? "bg-green-600 text-white"
                  : "bg-black text-white hover:bg-gray-800"
              )}
            >
              {isAdded ? (
                <>
                  <Check size={18} className="mr-2" />
                  Added to Cart
                </>
              ) : (
                <>
                  <ShoppingCart size={18} className="mr-2" />
                  Add to Cart
                </>
              )}
            </button>
            <button
              className="py-3 px-6 border border-gray-200 rounded-md text-gray-800 font-medium flex items-center justify-center hover:bg-gray-50 transition"
            >
              <Heart size={18} className="mr-2" />
              <span className="hidden sm:inline">Add to Wishlist</span>
              <span className="inline sm:hidden">Wishlist</span>
            </button>
          </div>
          
          {/* Additional Info */}
          <div className="mt-10 pt-8 border-t border-gray-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Features</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start">
                    <Check size={16} className="mr-2 text-green-500 mt-0.5" />
                    Premium quality materials
                  </li>
                  <li className="flex items-start">
                    <Check size={16} className="mr-2 text-green-500 mt-0.5" />
                    Designed for everyday use
                  </li>
                  <li className="flex items-start">
                    <Check size={16} className="mr-2 text-green-500 mt-0.5" />
                    Exceptional durability
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Shipping</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start">
                    <Check size={16} className="mr-2 text-green-500 mt-0.5" />
                    Free shipping on orders over $50
                  </li>
                  <li className="flex items-start">
                    <Check size={16} className="mr-2 text-green-500 mt-0.5" />
                    Delivery within 3-5 business days
                  </li>
                  <li className="flex items-start">
                    <Check size={16} className="mr-2 text-green-500 mt-0.5" />
                    30-day return policy
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
