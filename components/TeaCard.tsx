
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tea } from '../types';

interface TeaCardProps {
  tea: Tea;
  addToCart: (tea: Tea) => void;
}

export const TeaCard: React.FC<TeaCardProps> = ({ tea, addToCart }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showStatus, setShowStatus] = useState(false);

  const handleAdd = () => {
    setIsAnimating(true);
    addToCart(tea);
    setShowStatus(true);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);

    setTimeout(() => {
      setShowStatus(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col space-y-2 group">
      <div className="relative aspect-[1/1.2] overflow-hidden bg-leaf-50 rounded-2xl">
        <Link to={`/product/${tea.id}`}>
          <img 
            src={tea.image} 
            alt={tea.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </Link>
        <button 
          onClick={handleAdd}
          className={`absolute bottom-2 right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 text-leaf-900 ${
            isAnimating ? 'scale-125 bg-gold text-white' : 'bg-white/90 backdrop-blur'
          }`}
        >
          {showStatus ? (
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          )}
        </button>
        {showStatus && (
          <div className="absolute top-2 left-2 right-2 flex justify-center animate-fade-in">
            <span className="bg-leaf-900/80 backdrop-blur text-white text-[8px] font-bold uppercase tracking-widest px-2 py-1 rounded-full">
              Added to bag
            </span>
          </div>
        )}
      </div>

      <div className="space-y-0.5 px-1">
        <Link to={`/product/${tea.id}`}>
          <h3 className="font-serif text-xs text-leaf-900 truncate">
            {tea.name}
          </h3>
        </Link>
        <div className="flex justify-between items-center">
          <p className="text-[9px] text-leaf-400">{tea.origin}</p>
          <p className="font-bold text-[10px] text-leaf-900">₹{tea.price.toLocaleString('en-IN')}</p>
        </div>
      </div>
    </div>
  );
};
