
import React, { useEffect, useRef, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setIsVisible(true);
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }
    
    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={heroRef}
      className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden bg-[#F5F5F7]"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-white/10"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#F5F5F7] to-transparent"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl w-full mx-auto px-6 py-20 md:py-28 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 mb-12 md:mb-0">
          <div className={cn(
            "transform transition-all duration-700",
            isVisible 
              ? "translate-y-0 opacity-100" 
              : "translate-y-10 opacity-0"
          )}>
            <span className="inline-block text-sm font-medium bg-black/5 px-3 py-1 rounded-full mb-6 animate-fade-in">New Collection</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight tracking-tight mb-6 animate-fade-in delay-100">
              Discover Our <br />
              Premium Products
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-md animate-fade-in delay-200">
              Explore the perfect blend of innovative design and exceptional quality for your lifestyle.
            </p>
            <div className="flex space-x-4 animate-fade-in delay-300">
              <Link 
                to="/products" 
                className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-all shadow-sm hover:shadow flex items-center"
              >
                Shop Now <ChevronRight size={16} className="ml-2" />
              </Link>
              <Link 
                to="/products?filter=featured" 
                className="px-6 py-3 bg-white text-black border border-gray-200 rounded-full hover:bg-gray-50 transition-all"
              >
                Featured
              </Link>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <div className={cn(
            "relative transform transition-all duration-1000 ease-out",
            isVisible 
              ? "translate-y-0 opacity-100" 
              : "translate-y-20 opacity-0"
          )}>
            <div className="relative z-20 rounded-3xl overflow-hidden shadow-2xl animate-hover-pulse">
              <img 
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3" 
                alt="Premium headphones" 
                className="w-full h-auto object-cover transition-transform hover:scale-105 duration-700 ease-out"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 z-10 w-56 h-56 bg-[#E8E8ED] rounded-full blur-2xl opacity-70"></div>
            <div className="absolute -top-10 -left-10 z-10 w-72 h-72 bg-[#E8E8ED] rounded-full blur-3xl opacity-50"></div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-fade-in delay-500">
        <div className="w-1.5 h-10 flex flex-col items-center">
          <div className="w-1.5 h-1.5 rounded-full bg-black/30 mb-1"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-black mb-1"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-black/30 mb-1"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-black/30"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
