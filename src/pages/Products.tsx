
import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import Cart from '@/components/Cart';
import { Product, products, categories, getProductsByCategory } from '@/lib/data';

interface CartItem extends Product {
  quantity: number;
}

const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [displayProducts, setDisplayProducts] = useState<Product[]>(products);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Get filter from URL params
  const filter = searchParams.get('filter');
  const categoryParam = searchParams.get('category');

  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart from localStorage', e);
      }
    }
    
    // Set initial category from URL if present
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    
    // Filter products based on URL parameters
    let filteredProducts = [...products];
    
    if (filter === 'featured') {
      filteredProducts = filteredProducts.filter(product => product.featured);
    } else if (filter === 'new') {
      filteredProducts = filteredProducts.filter(product => product.new);
    }
    
    if (categoryParam && categoryParam !== 'All') {
      filteredProducts = filteredProducts.filter(product => product.category === categoryParam);
    }
    
    setTimeout(() => {
      setDisplayProducts(filteredProducts);
      setIsLoading(false);
    }, 300);
  }, [filter, categoryParam]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
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

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    
    // Update URL with new category
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
    
    // Filter products
    setIsLoading(true);
    setTimeout(() => {
      setDisplayProducts(getProductsByCategory(category));
      setIsLoading(false);
    }, 300);
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Determine page title based on filter
  let pageTitle = 'All Products';
  if (filter === 'featured') pageTitle = 'Featured Products';
  if (filter === 'new') pageTitle = 'New Arrivals';
  if (categoryParam && categoryParam !== 'All') pageTitle = `${categoryParam}`;

  return (
    <div className="min-h-screen bg-white">
      <Header 
        cartItemCount={cartItemCount} 
        onCartClick={() => setIsCartOpen(true)} 
      />
      
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-6 pt-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 animate-fade-in">
            <div>
              <h1 className="text-3xl font-medium mb-2">{pageTitle}</h1>
              <p className="text-gray-600">
                {displayProducts.length} product{displayProducts.length !== 1 ? 's' : ''}
              </p>
            </div>
            
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="mt-4 sm:mt-0 flex items-center text-sm font-medium px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition sm:hidden"
            >
              <Filter size={16} className="mr-2" />
              {isFilterOpen ? 'Hide' : 'Show'} Filters
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row">
            {/* Category filter sidebar */}
            <aside className={cn(
              "sm:w-56 sm:mr-8 flex-shrink-0 animate-fade-in",
              isFilterOpen ? 'block' : 'hidden sm:block'
            )}>
              <h2 className="text-lg font-medium mb-4">Categories</h2>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category}>
                    <button
                      onClick={() => handleCategoryChange(category)}
                      className={cn(
                        "text-sm w-full text-left py-2 px-3 rounded-md transition-colors",
                        selectedCategory === category
                          ? "bg-black text-white font-medium"
                          : "text-gray-600 hover:bg-gray-100"
                      )}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </aside>
            
            {/* Product grid */}
            <div className="flex-1 mt-6 sm:mt-0">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                  {[...Array(6)].map((_, index) => (
                    <div 
                      key={index} 
                      className="bg-gray-100 animate-pulse rounded-xl aspect-w-3 aspect-h-4"
                    ></div>
                  ))}
                </div>
              ) : displayProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                  {displayProducts.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={index}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 animate-fade-in">
                  <h3 className="text-xl font-medium mb-2">No products found</h3>
                  <p className="text-gray-600 mb-6">Try changing your filters or check back later for new items.</p>
                  <button
                    onClick={() => handleCategoryChange('All')}
                    className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
                  >
                    View All Products
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
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

export default Products;
