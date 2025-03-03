
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import ProductDetail from '@/components/ProductDetail';
import Cart from '@/components/Cart';
import FeaturedProducts from '@/components/FeaturedProducts';
import { Product, getProductById, getProductsByCategory } from '@/lib/data';

interface CartItem extends Product {
  quantity: number;
}

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load product data
    if (id) {
      setIsLoading(true);
      const productData = getProductById(parseInt(id));
      
      if (productData) {
        setProduct(productData);
        
        // Get related products from the same category
        const related = getProductsByCategory(productData.category)
          .filter(p => p.id !== productData.id)
          .slice(0, 4);
          
        setRelatedProducts(related);
      } else {
        // Product not found, redirect to products page
        navigate('/products');
      }
      
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
    
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart from localStorage', e);
      }
    }
  }, [id, navigate]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header 
          cartItemCount={cartItemCount} 
          onCartClick={() => setIsCartOpen(true)} 
        />
        <div className="mt-24 max-w-7xl mx-auto px-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="aspect-square bg-gray-100 animate-pulse rounded-2xl"></div>
            <div className="space-y-4">
              <div className="h-10 bg-gray-100 animate-pulse rounded-md w-3/4"></div>
              <div className="h-6 bg-gray-100 animate-pulse rounded-md w-1/4"></div>
              <div className="h-24 bg-gray-100 animate-pulse rounded-md w-full"></div>
              <div className="h-10 bg-gray-100 animate-pulse rounded-md w-full mt-6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header 
        cartItemCount={cartItemCount} 
        onCartClick={() => setIsCartOpen(true)} 
      />
      
      <div className="pt-20">
        <ProductDetail 
          product={product} 
          onAddToCart={handleAddToCart} 
        />
        
        {relatedProducts.length > 0 && (
          <div className="mt-12 md:mt-24">
            <FeaturedProducts 
              title="You Might Also Like" 
              products={relatedProducts}
              onAddToCart={(product) => handleAddToCart(product, 1)}
            />
          </div>
        )}
      </div>
      
      {/* Cart */}
      <Cart 
        items={cartItems} 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
};

export default ProductPage;
