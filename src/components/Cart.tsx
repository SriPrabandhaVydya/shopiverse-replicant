
import React, { useEffect, useRef } from 'react';
import { X, ShoppingCart, ArrowRight, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Product } from '@/lib/data';

interface CartItem extends Product {
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
}

const Cart: React.FC<CartProps> = ({
  items,
  isOpen,
  onClose,
  onUpdateQuantity,
  onRemoveItem
}) => {
  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/20 backdrop-blur-sm z-50 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      />

      {/* Cart */}
      <div
        ref={cartRef}
        className={cn(
          "fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-white shadow-xl z-50 flex flex-col transform transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center">
            <ShoppingCart size={18} className="mr-2" />
            <h2 className="text-lg font-medium">Your Cart</h2>
            {totalItems > 0 && (
              <span className="ml-2 bg-black text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close cart"
          >
            <X size={18} />
          </button>
        </div>

        {/* Cart Items */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <ShoppingCart size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-4">Looks like you haven't added any products to your cart yet.</p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-4 py-2">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex py-4 border-b border-gray-100 animate-fade-in"
                >
                  <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden mr-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium mb-1">{item.name}</h3>
                    <p className="text-gray-500 text-sm mb-2">${item.price.toFixed(2)}</p>
                    <div className="flex items-center">
                      <button
                        onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="w-7 h-7 bg-gray-100 rounded flex items-center justify-center hover:bg-gray-200 transition"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="mx-2 text-sm w-5 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 bg-gray-100 rounded flex items-center justify-center hover:bg-gray-200 transition"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="ml-auto p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Cart Summary and Checkout */}
            <div className="border-t border-gray-100 p-4 bg-gray-50">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">Calculated at checkout</span>
              </div>
              <button
                className="w-full py-3 bg-black text-white rounded-md font-medium hover:bg-gray-800 transition flex items-center justify-center"
              >
                Checkout
                <ArrowRight size={16} className="ml-2" />
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
