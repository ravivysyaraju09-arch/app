
import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar: React.FC<{ cartCount: number }> = ({ cartCount }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-leaf-50 safe-pt">
      <div className="px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-serif text-xl tracking-tighter text-leaf-900">
          Verdant <span className="text-gold">Leaf</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/profile" className="w-8 h-8 rounded-full bg-leaf-50 flex items-center justify-center text-leaf-900">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
          </Link>
        </div>
      </div>
    </nav>
  );
};
