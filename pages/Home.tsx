
import React from 'react';
import { Link } from 'react-router-dom';
import { TeaCard } from '../components/TeaCard';
import { TEAS, ORIGINS } from '../constants';
import { Tea } from '../types';

interface HomeProps {
  addToCart: (tea: Tea) => void;
}

export const Home: React.FC<HomeProps> = ({ addToCart }) => {
  const featuredTeas = TEAS.slice(0, 4);

  return (
    <div className="space-y-20 pb-12 animate-fade-in">
      {/* 1. Enhanced Hero Section */}
      <section className="relative h-[85vh] flex items-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1594631252845-29fc4586c557?auto=format&fit=crop&q=80&w=1600" 
            alt="Tea Plantation"
            className="w-full h-full object-cover animate-fade-in scale-105"
            style={{ animation: 'zoom-in-fade 10s infinite alternate ease-in-out' }}
          />
          <div className="absolute inset-0 bg-leaf-900/40 backdrop-brightness-75" />
        </div>
        
        <div className="relative z-10 w-full text-white animate-fade-up">
          <div className="space-y-6">
            <span className="text-gold uppercase tracking-[0.4em] font-bold text-[10px] block opacity-80">Est. 1924 • Darjeeling</span>
            <h1 className="font-serif text-5xl md:text-7xl leading-tight">
              The Soul of <br />
              <span className="italic text-gold">Exceptional</span> Tea
            </h1>
            <p className="text-sm md:text-base text-leaf-50 font-light max-w-xs leading-relaxed opacity-90">
              Discover artisanal blends sourced directly from the world's most secluded gardens.
            </p>
            <div className="flex flex-col gap-3 pt-4">
              <Link 
                to="/shop" 
                className="bg-white text-leaf-900 w-fit px-10 py-4 rounded-full font-bold uppercase tracking-widest text-[11px] shadow-2xl active:scale-95 transition-all"
              >
                Enter the Atelier
              </Link>
            </div>
          </div>
        </div>
        <style>{`
          @keyframes zoom-in-fade {
            from { transform: scale(1); }
            to { transform: scale(1.1); }
          }
        `}</style>
      </section>

      {/* 2. Trust Badges Section */}
      <section className="px-6 grid grid-cols-3 gap-2 text-center -mt-10 relative z-20">
        {[
          { icon: '🌱', label: '100% Garden Sourced' },
          { icon: '🚚', label: 'Free Shipping > ₹499' },
          { icon: '🔒', label: 'Secure Payments' }
        ].map((item, idx) => (
          <div key={idx} className="bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-leaf-50 space-y-2">
            <span className="text-xl">{item.icon}</span>
            <p className="text-[8px] font-bold uppercase tracking-widest text-leaf-900 leading-tight">{item.label}</p>
          </div>
        ))}
      </section>

      {/* NEW: Story of the Garden Section */}
      <section className="relative h-[60vh] flex items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1563911892437-1feda0179e1b?auto=format&fit=crop&q=80&w=1200" 
            className="w-full h-full object-cover opacity-70 grayscale-[30%]" 
            alt="Tea Harvesters"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-cream via-transparent to-cream opacity-90" />
        </div>
        <div className="relative z-10 space-y-6 max-w-lg mx-auto">
          <h2 className="font-serif text-3xl text-leaf-900 italic">Handpicked in the misty gardens of Darjeeling</h2>
          <div className="w-12 h-px bg-gold mx-auto" />
          <p className="text-sm text-leaf-500 font-light leading-relaxed">
            Every leaf tells a story of the soil, the altitude, and the seasoned hands that plucked it at dawn. Small-lot harvest. Single origin. Uncompromising purity.
          </p>
        </div>
      </section>

      {/* NEW: Tea Origins Section */}
      <section className="space-y-8">
        <div className="px-6 text-center space-y-2">
          <span className="text-gold uppercase tracking-[0.2em] font-bold text-[8px]">Curated Origins</span>
          <h2 className="font-serif text-3xl text-leaf-900 italic">Ancient Landscapes</h2>
        </div>
        
        <div className="flex overflow-x-auto px-6 gap-4 no-scrollbar pb-4">
          {ORIGINS.map((origin, idx) => (
            <div key={idx} className="flex-shrink-0 w-72 h-96 relative rounded-3xl overflow-hidden group shadow-lg">
              <img src={origin.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={origin.name} />
              <div className="absolute inset-0 bg-leaf-900/40" />
              <div className="absolute bottom-0 left-0 right-0 p-8 space-y-2 text-white">
                <p className="text-[8px] uppercase tracking-widest text-gold font-bold">{origin.region}</p>
                <h3 className="font-serif text-xl italic">{origin.name}</h3>
                <p className="text-[10px] font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 leading-relaxed">
                  {origin.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Collection */}
      <section className="px-6">
        <div className="flex justify-between items-end mb-8">
          <div className="space-y-1">
            <span className="text-gold uppercase tracking-[0.2em] font-bold text-[8px]">New Arrivals</span>
            <h2 className="font-serif text-2xl text-leaf-900 italic">Spring Flush</h2>
          </div>
          <Link to="/shop" className="text-[10px] font-bold uppercase tracking-widest text-gold border-b border-gold/30 pb-1">See All Collections</Link>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          {featuredTeas.map(tea => (
            <TeaCard key={tea.id} tea={tea} addToCart={addToCart} />
          ))}
        </div>
      </section>

      {/* 6. Limited Drop Section */}
      <section className="px-6">
        <div className="bg-leaf-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <div className="inline-block px-3 py-1 bg-gold/20 border border-gold/30 rounded-full">
              <span className="text-gold uppercase tracking-[0.2em] font-bold text-[8px]">Limited Harvest</span>
            </div>
            <h2 className="font-serif text-4xl italic leading-tight">Misty Dragon <br/>Gold Bud</h2>
            
            <div className="flex gap-4">
               <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-xl text-center">
                  <p className="text-lg font-serif text-gold">04</p>
                  <p className="text-[7px] uppercase tracking-widest text-leaf-300">Days</p>
               </div>
               <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-xl text-center">
                  <p className="text-lg font-serif text-gold">12</p>
                  <p className="text-[7px] uppercase tracking-widest text-leaf-300">Hours</p>
               </div>
               <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-xl text-center">
                  <p className="text-lg font-serif text-gold">45</p>
                  <p className="text-[7px] uppercase tracking-widest text-leaf-300">Mins</p>
               </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <span className="text-[10px] uppercase font-bold text-leaf-300">Availability</span>
                <span className="text-[10px] font-bold text-gold">14 Packs Left</span>
              </div>
              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gold w-[30%]" />
              </div>
            </div>

            <button className="w-full bg-gold text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs active:scale-95 transition-all">
              Reserve Early Access
            </button>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?auto=format&fit=crop&q=80&w=600" 
            alt="Rare Tea" 
            className="absolute top-0 right-0 h-full w-2/3 object-cover opacity-30 mix-blend-overlay"
          />
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="px-6 py-4 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="font-serif text-3xl text-leaf-900 italic">The Verdant Philosophy</h2>
          <p className="text-xs text-leaf-400 font-light">Uncompromising standards in every leaf.</p>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {[
            { title: 'Direct From Origin', desc: 'Removing middlemen to ensure maximum freshness and fair trade for farmers.', icon: '🌍' },
            { title: 'Handpicked Batches', desc: 'Each leaf is selected by hand during the peak of its flavor profile.', icon: '🖐️' },
            { title: 'Freshness Guaranteed', desc: 'Small batch processing ensures your tea arrives within weeks of harvest.', icon: '✨' }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl border border-leaf-50 shadow-sm flex items-start gap-4">
              <span className="text-3xl">{item.icon}</span>
              <div className="space-y-1">
                <h4 className="font-serif text-lg text-leaf-900">{item.title}</h4>
                <p className="text-xs text-leaf-400 font-light leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
