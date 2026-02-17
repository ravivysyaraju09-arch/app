
import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TEAS } from '../constants';
import { Tea, PackSize } from '../types';

interface ProductDetailProps {
  addToCart: (tea: Tea, size: PackSize, price: number) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ addToCart }) => {
  const { id } = useParams<{ id: string }>();
  const [selectedSize, setSelectedSize] = useState<PackSize>('250g');
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>('brew');
  
  const tea = useMemo(() => TEAS.find(t => t.id === id), [id]);

  const sizes: { size: PackSize; label: string; badge?: string }[] = [
    { size: '250g', label: '250g Pack' },
    { size: '500g', label: '500g Pack' },
    { size: '1kg', label: '1kg Bulk', badge: 'Best Value' }
  ];

  const currentPrice = useMemo(() => {
    if (!tea) return 0;
    if (selectedSize === '250g') return tea.price;
    if (selectedSize === '500g') return tea.price * 2 * 0.9; // 10% off
    return tea.price * 4 * 0.85; // 15% off
  }, [tea, selectedSize]);

  const pricePerGram = useMemo(() => {
    const weight = selectedSize === '250g' ? 250 : selectedSize === '500g' ? 500 : 1000;
    return (currentPrice / weight).toFixed(2);
  }, [currentPrice, selectedSize]);

  if (!tea) return (
    <div className="py-40 text-center space-y-4">
      <h2 className="text-2xl font-serif">Tea Not Found</h2>
      <Link to="/shop" className="text-gold uppercase tracking-widest font-bold">Return to Atelier</Link>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-leaf-50">
            <img src={tea.image} alt={tea.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden bg-leaf-50 cursor-pointer hover:opacity-80 transition">
                <img src={tea.image} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Content */}
        <div className="flex flex-col space-y-10">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gold uppercase tracking-[0.2em] font-bold text-[10px]">{tea.category}</span>
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-leaf-900">{tea.rating}</span>
                <div className="flex text-gold">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs text-leaf-400">({tea.reviewCount} reviews)</span>
              </div>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl text-leaf-900 leading-tight">
              {tea.name}
            </h1>
            <div className="space-y-1">
              <p className="text-3xl font-light text-leaf-900">₹{currentPrice.toLocaleString('en-IN')}</p>
              <p className="text-[10px] uppercase tracking-widest text-leaf-400 font-bold">₹{pricePerGram} per gram</p>
            </div>
          </div>

          <p className="text-leaf-600 leading-relaxed font-light">
            {tea.description}
          </p>

          {/* NEW: Pack Size Selector */}
          <div className="space-y-4">
            <span className="text-[10px] uppercase font-bold text-leaf-400 tracking-widest">Select Pack Size</span>
            <div className="grid grid-cols-3 gap-3">
              {sizes.map(s => (
                <button 
                  key={s.size}
                  onClick={() => setSelectedSize(s.size)}
                  className={`relative p-4 rounded-xl border text-center transition-all ${
                    selectedSize === s.size 
                      ? 'border-gold bg-gold/5 shadow-inner' 
                      : 'border-leaf-100 hover:border-leaf-300'
                  }`}
                >
                  <p className={`text-[11px] font-bold uppercase tracking-wider ${selectedSize === s.size ? 'text-leaf-900' : 'text-leaf-400'}`}>
                    {s.label}
                  </p>
                  {s.badge && (
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-gold text-white text-[7px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                      {s.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Heritage Stats */}
          <div className="grid grid-cols-2 gap-y-6 gap-x-8 border-y border-leaf-100 py-8">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-leaf-400 tracking-widest">Harvest Year</span>
              <p className="text-sm font-medium text-leaf-900">{tea.harvestInfo.year}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-leaf-400 tracking-widest">Flush Type</span>
              <p className="text-sm font-medium text-leaf-900">{tea.harvestInfo.flush}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-leaf-400 tracking-widest">Elevation</span>
              <p className="text-sm font-medium text-leaf-900">{tea.harvestInfo.elevation}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-leaf-400 tracking-widest">Region</span>
              <p className="text-sm font-medium text-leaf-900">{tea.region}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex items-center border border-leaf-200 rounded-xl overflow-hidden">
                <button onClick={() => setQuantity(q => Math.max(1, q-1))} className="px-4 py-2 hover:bg-leaf-50 transition">-</button>
                <span className="px-4 py-2 text-sm font-bold min-w-[40px] text-center">{quantity}</span>
                <button onClick={() => setQuantity(q => q+1)} className="px-4 py-2 hover:bg-leaf-50 transition">+</button>
              </div>
              <button 
                onClick={() => addToCart(tea, selectedSize, currentPrice)}
                className="flex-grow bg-leaf-900 text-white rounded-xl py-4 font-bold uppercase tracking-widest text-xs hover:bg-gold transition-all shadow-lg active:scale-[0.98]"
              >
                Add to Bag
              </button>
            </div>
          </div>

          {/* NEW: Expandable Sections (Accordions) */}
          <div className="space-y-4 border-t border-leaf-100 pt-6">
             <div className="border-b border-leaf-50 pb-4">
                <button 
                  onClick={() => setOpenAccordion(openAccordion === 'brew' ? null : 'brew')}
                  className="w-full flex justify-between items-center group"
                >
                   <span className="text-[10px] font-bold uppercase tracking-widest text-leaf-900">The Brewing Guide</span>
                   <span className={`transition-transform duration-300 ${openAccordion === 'brew' ? 'rotate-180' : ''}`}>
                      <svg className="w-4 h-4 text-leaf-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                   </span>
                </button>
                <div className={`overflow-hidden transition-all duration-500 ${openAccordion === 'brew' ? 'max-h-60 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                   <div className="grid grid-cols-2 gap-6 text-[11px] font-light text-leaf-600 leading-relaxed">
                      <p><span className="font-bold text-leaf-900 block mb-1">Temperature:</span> {tea.steepingInfo.temp}</p>
                      <p><span className="font-bold text-leaf-900 block mb-1">Time:</span> {tea.steepingInfo.time}</p>
                      <p><span className="font-bold text-leaf-900 block mb-1">Cups Per Pack:</span> {tea.steepingInfo.cupsPerPack}</p>
                      <p><span className="font-bold text-leaf-900 block mb-1">Storage:</span> Keep in cool, dark airtight tin.</p>
                   </div>
                </div>
             </div>

             <div className="border-b border-leaf-50 pb-4">
                <button 
                  onClick={() => setOpenAccordion(openAccordion === 'tasting' ? null : 'tasting')}
                  className="w-full flex justify-between items-center group"
                >
                   <span className="text-[10px] font-bold uppercase tracking-widest text-leaf-900">Tasting Notes</span>
                   <span className={`transition-transform duration-300 ${openAccordion === 'tasting' ? 'rotate-180' : ''}`}>
                      <svg className="w-4 h-4 text-leaf-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                   </span>
                </button>
                <div className={`overflow-hidden transition-all duration-500 ${openAccordion === 'tasting' ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                    <div className="flex flex-wrap gap-2">
                       {tea.harvestInfo.tastingNotes.map(note => (
                         <span key={note} className="px-3 py-1 bg-leaf-50 rounded-full text-[10px] text-leaf-500 italic">{note}</span>
                       ))}
                    </div>
                    <p className="mt-4 text-[11px] text-leaf-500 font-light leading-relaxed">
                      Processed via {tea.harvestInfo.processing.toLowerCase()} method to preserve the delicate aroma.
                    </p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
