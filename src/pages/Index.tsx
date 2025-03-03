
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import Header from '@/components/Header';
import Cart from '@/components/Cart';
import { Product, getFeaturedProducts, getNewProducts } from '@/lib/data';

interface CartItem extends Product {
  quantity: number;
}

const Index: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [newProducts, setNewProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Load products
    setFeaturedProducts(getFeaturedProducts());
    setNewProducts(getNewProducts());
    
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart from localStorage', e);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Update quantity if item already exists
        return prevItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        // Add new item
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

  return (
    <div className="min-h-screen bg-white">
      <Header 
        cartItemCount={cartItemCount} 
        onCartClick={() => setIsCartOpen(true)} 
      />
      
      <main>
        <Hero />
        
        <FeaturedProducts 
          title="Featured Products" 
          products={featuredProducts}
          link={{ text: "View All Products", url: "/products" }}
          onAddToCart={handleAddToCart}
        />
        
        {newProducts.length > 0 && (
          <FeaturedProducts 
            title="New Arrivals" 
            products={newProducts}
            link={{ text: "View All New Arrivals", url: "/products?filter=new" }}
            onAddToCart={handleAddToCart}
          />
        )}
        
        {/* Collection Banner */}
        <section className="my-16 md:my-24 px-6 max-w-7xl mx-auto">
          <div className="rounded-2xl overflow-hidden relative bg-gray-100 min-h-[400px] flex items-center">
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3" 
                alt="Premium collection" 
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
            </div>
            
            <div className="relative z-10 p-10 md:p-16 max-w-lg">
              <span className="inline-block text-sm font-medium bg-white px-3 py-1 rounded-full mb-4">Limited Edition</span>
              <h2 className="text-3xl md:text-4xl font-medium text-white mb-4">Premium Collection 2023</h2>
              <p className="text-white/90 mb-6">Discover our exclusive collection of premium products designed for those who appreciate exceptional quality and timeless elegance.</p>
              <Link 
                to="/products?filter=featured" 
                className="inline-flex items-center px-6 py-3 bg-white text-black rounded-full hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
              >
                Explore Collection <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-50 py-12 md:py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-4">SHOPIVERSE</h3>
            <p className="text-gray-600 text-sm">Premium products for your lifestyle. Designed with attention to detail and exceptional quality.</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium uppercase text-gray-500 mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-gray-600 hover:text-black text-sm">All Products</Link></li>
              <li><Link to="/products?filter=featured" className="text-gray-600 hover:text-black text-sm">Featured</Link></li>
              <li><Link to="/products?filter=new" className="text-gray-600 hover:text-black text-sm">New Arrivals</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-medium uppercase text-gray-500 mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-black text-sm">Contact Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black text-sm">FAQ</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black text-sm">Shipping & Returns</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-medium uppercase text-gray-500 mb-4">Connect</h4>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                </svg>
              </a>
              
              <a href="#" className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                </svg>
              </a>
              
              <a href="#" className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
            </div>
            
            <form className="mt-4">
              <label htmlFor="email" className="text-sm text-gray-600 mb-2 block">Subscribe to our newsletter</label>
              <div className="flex">
                <input 
                  type="email" 
                  id="email" 
                  placeholder="your@email.com" 
                  className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 text-sm"
                />
                <button 
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded-r-md hover:bg-gray-800 transition-colors text-sm"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">&copy; 2023 SHOPIVERSE. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-gray-600 text-sm">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-gray-600 text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-gray-600 text-sm">Cookie Policy</a>
          </div>
        </div>
      </footer>
      
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

export default Index;
