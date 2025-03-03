
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount, onCartClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Featured', path: '/products?filter=featured' },
    { name: 'New Arrivals', path: '/products?filter=new' }
  ];

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out px-6 md:px-10',
        isScrolled 
          ? 'py-3 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm' 
          : 'py-5 bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="text-xl font-medium tracking-tight animate-fade-in"
        >
          SHOPIVERSE
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item, index) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                'text-sm font-medium transition-all duration-200 hover:text-black/70 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-black after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:duration-300 animate-fade-in',
                {
                  'delay-100': index === 0,
                  'delay-200': index === 1,
                  'delay-300': index === 2,
                  'delay-400': index === 3,
                },
                location.pathname === item.path && 'after:scale-x-100'
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-5">
          <button 
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 rounded-full text-gray-700 hover:bg-gray-100 transition animate-fade-in delay-200"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
          
          <button 
            onClick={onCartClick}
            className="p-2 rounded-full text-gray-700 hover:bg-gray-100 transition relative animate-fade-in delay-300"
            aria-label="Shopping cart"
          >
            <ShoppingCart size={20} />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center animate-scale-in">
                {cartItemCount}
              </span>
            )}
          </button>
          
          {/* Mobile Menu Button */}
          <button
            className="p-2 md:hidden rounded-full text-gray-700 hover:bg-gray-100 transition animate-fade-in delay-400"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div 
        className={cn(
          'absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-sm transition-all duration-300 ease-in-out overflow-hidden',
          searchOpen ? 'max-h-20 py-4 opacity-100' : 'max-h-0 py-0 opacity-0'
        )}
      >
        <div className="max-w-3xl mx-auto px-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-300"
              autoFocus={searchOpen}
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          'fixed inset-0 z-50 bg-white transform transition-transform duration-300 ease-in-out md:hidden',
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-between items-center mb-8">
            <Link to="/" className="text-xl font-medium">SHOPIVERSE</Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-full text-gray-700 hover:bg-gray-100"
            >
              <X size={24} />
            </button>
          </div>
          
          <nav className="flex flex-col space-y-6 text-lg">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  'font-medium py-2 border-b border-gray-100',
                  location.pathname === item.path ? 'text-black' : 'text-gray-600'
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          <div className="mt-auto pt-6 border-t border-gray-100">
            <button className="w-full py-3 bg-gray-100 rounded-md text-gray-800 font-medium">Sign In</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
