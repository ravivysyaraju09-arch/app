
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface BottomNavProps {
  cartCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({ cartCount = 0 }) => {
  const location = useLocation();
  const [shouldBounce, setShouldBounce] = useState(false);

  useEffect(() => {
    if (cartCount > 0) {
      setShouldBounce(true);
      const timer = setTimeout(() => setShouldBounce(false), 400);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  const navItems = [
    {
      path: '/',
      label: 'Home',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      path: '/shop',
      label: 'Shop',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      )
    },
    {
      path: '/cart',
      label: 'Cart',
      isCart: true,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      )
    },
    {
      path: '/profile',
      label: 'Orders',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      )
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-leaf-100 z-[100] safe-pb">
      <div className="flex justify-around items-center py-3">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path === '/shop' && location.pathname.startsWith('/product'));
          return (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`flex flex-col items-center gap-1 transition-all duration-300 relative ${isActive ? 'text-gold' : 'text-leaf-400'}`}
            >
              <div className="relative">
                {item.icon}
                {item.isCart && cartCount > 0 && (
                  <span className={`absolute -top-1.5 -right-1.5 bg-gold text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm ${shouldBounce ? 'animate-bounce-subtle' : ''}`}>
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
