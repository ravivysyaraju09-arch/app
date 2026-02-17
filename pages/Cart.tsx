
import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartItem, PackSize } from '../types';

interface CartProps {
  items: CartItem[];
  removeFromCart: (id: string, size: PackSize) => void;
  updateQuantity: (id: string, delta: number, size: PackSize) => void;
}

export const Cart: React.FC<CartProps> = ({ items, removeFromCart, updateQuantity }) => {
  const navigate = useNavigate();
  const subtotal = useMemo(() => items.reduce((sum, item) => sum + (item.selectedPrice * item.quantity), 0), [items]);
  const shipping = subtotal > 499 ? 0 : 50;
  const gst = subtotal * 0.18;
  const total = subtotal + shipping + gst;

  if (items.length === 0) {
    return (
      <div className="px-6 h-full flex flex-col items-center justify-center py-24 text-center space-y-8 animate-fade-in">
        <div className="w-20 h-20 bg-leaf-50 rounded-full flex items-center justify-center">
           <svg className="w-10 h-10 text-leaf-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h2 className="font-serif text-2xl text-leaf-900">Your bag is empty</h2>
        <Link to="/shop" className="bg-leaf-900 text-white px-10 py-4 rounded-xl font-bold uppercase tracking-widest text-[10px]">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="px-6 py-4 border-b border-leaf-50">
        <h1 className="font-serif text-2xl text-leaf-900">Shopping Bag</h1>
      </div>
      
      <div className="flex-grow px-6 space-y-6 py-6 overflow-y-auto pb-40">
        {items.map((item, idx) => (
          <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 p-4 bg-white rounded-2xl border border-leaf-50">
            <div className="w-20 h-24 rounded-xl overflow-hidden flex-shrink-0">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-grow flex flex-col justify-between py-1">
              <div className="flex justify-between items-start">
                <div className="space-y-0.5">
                  <h3 className="font-serif text-sm text-leaf-900 leading-tight">{item.name}</h3>
                  <div className="flex items-center gap-2">
                    <p className="text-[10px] text-leaf-400 font-bold uppercase tracking-widest">{item.selectedSize}</p>
                    <span className="w-1 h-1 rounded-full bg-leaf-200" />
                    <p className="text-[10px] text-leaf-400">{item.origin}</p>
                  </div>
                </div>
                <p className="font-bold text-xs text-leaf-900">₹{item.selectedPrice.toLocaleString('en-IN')}</p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center bg-leaf-50 rounded-lg h-8 px-1">
                  <button onClick={() => updateQuantity(item.id, -1, item.selectedSize)} className="w-6 text-leaf-900">-</button>
                  <span className="w-6 text-center text-[10px] font-bold">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1, item.selectedSize)} className="w-6 text-leaf-900">+</button>
                </div>
                <button onClick={() => removeFromCart(item.id, item.selectedSize)} className="text-[8px] uppercase font-bold text-red-400 tracking-widest">Delete</button>
              </div>
            </div>
          </div>
        ))}
        
        <div className="pt-4 space-y-2">
           <div className="flex justify-between text-xs font-light text-leaf-500">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-xs font-light text-leaf-500">
              <span>GST (18%)</span>
              <span>₹{gst.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-xs font-light text-leaf-500">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
            </div>
        </div>
      </div>

      {/* Sticky Bottom Checkout */}
      <div className="fixed bottom-[84px] left-0 right-0 px-6 py-4 bg-white border-t border-leaf-50 shadow-2xl safe-pb">
        <div className="flex justify-between items-center mb-4">
          <span className="font-serif text-lg">Total</span>
          <span className="font-bold text-lg">₹{total.toLocaleString('en-IN')}</span>
        </div>
        <button 
          onClick={() => navigate('/checkout')}
          className="w-full bg-leaf-900 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-lg active:scale-95 transition-all"
        >
          Checkout Now
        </button>
      </div>
    </div>
  );
};
