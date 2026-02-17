
import React, { useState, useMemo } from 'react';
import { TEAS } from '../constants';
import { Category, Tea } from '../types';
import { TeaCard } from '../components/TeaCard';

interface ShopProps {
  addToCart: (tea: Tea) => void;
}

export const Shop: React.FC<ShopProps> = ({ addToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const categories: (Category | 'All')[] = ['All', ...Object.values(Category)];

  const filteredTeas = useMemo(() => {
    let result = TEAS;
    if (selectedCategory !== 'All') {
      result = result.filter(t => t.category === selectedCategory);
    }
    return result;
  }, [selectedCategory]);

  return (
    <div className="py-6 space-y-6 animate-fade-in">
      <div className="px-6 space-y-1">
        <h1 className="font-serif text-3xl text-leaf-900">The Atelier</h1>
        <p className="text-xs text-leaf-400 font-light">Hand-picked small batches.</p>
      </div>

      {/* Horizontal Category Scroll */}
      <div className="flex overflow-x-auto px-6 gap-3 no-scrollbar scroll-smooth">
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`whitespace-nowrap px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
              selectedCategory === cat 
                ? 'bg-leaf-900 text-white' 
                : 'bg-white border border-leaf-100 text-leaf-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="px-6 grid grid-cols-2 gap-4">
        {filteredTeas.map(tea => (
          <TeaCard key={tea.id} tea={tea} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};
