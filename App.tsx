
import React, { useState, useMemo, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Profile } from './pages/Profile';
import { Checkout } from './pages/Checkout';
import { OrderConfirmation } from './pages/OrderConfirmation';
import { Login } from './pages/Login';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { SommelierChat } from './components/SommelierChat';
import { Tea, CartItem, User, Order, PackSize } from './types';

const SplashScreen = () => (
  <div className="fixed inset-0 z-[200] bg-leaf-900 flex flex-col items-center justify-center splash-fade-out">
    <div className="text-center animate-pulse">
      <h1 className="font-serif text-5xl text-cream tracking-tight mb-2">
        Verdant <span className="text-gold">Leaf</span>
      </h1>
      <p className="text-gold uppercase tracking-[0.3em] text-[10px] font-bold">Artisanal Tea Atelier</p>
    </div>
  </div>
);

const FloatingCartBar = ({ items }: { items: CartItem[] }) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.selectedPrice * item.quantity), 0);
  const location = useLocation();

  if (totalItems === 0 || location.pathname === '/cart' || location.pathname === '/checkout') return null;

  return (
    <div className="fixed bottom-[86px] left-6 right-6 z-[90] animate-fade-up">
      <Link to="/cart" className="flex items-center justify-between bg-leaf-900 text-white p-4 rounded-2xl shadow-2xl border border-white/10 active:scale-95 transition-all">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold text-xs font-bold">
            {totalItems}
          </div>
          <div className="space-y-0.5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-leaf-300">Your Bag</p>
            <p className="text-sm font-serif">₹{totalPrice.toLocaleString('en-IN')}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest">View Bag</span>
          <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </Link>
    </div>
  );
};

function AppContent() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('vl_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [orders, setOrders] = useState<Order[]>([]);
  const [user, setUser] = useState<User>({
    name: 'Julian Sterling',
    email: 'julian@luxury.com',
    tier: 'Gold',
    points: 1250,
    isSubscribed: false
  });

  useEffect(() => {
    localStorage.setItem('vl_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const status = localStorage.getItem('isLoggedIn');
    const mobile = localStorage.getItem('userMobile');
    
    if (status === 'true' && mobile) {
      setIsLoggedIn(true);
      setUser(prev => ({ ...prev, mobile, id: `USER-${mobile.slice(-5)}` }));
    }
    
    const timer = setTimeout(() => setShowSplash(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (mobile: string) => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userMobile", mobile);
    
    const userId = `USER-${mobile.slice(-5)}`;
    setIsLoggedIn(true);
    setUser(prev => ({ ...prev, mobile, id: userId }));
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userMobile");
    localStorage.removeItem("vl_cart");
    setIsLoggedIn(false);
    setCart([]);
  };

  const addToCart = (tea: Tea, size: PackSize = '250g', price?: number) => {
    setCart(prev => {
      // Create unique key based on ID and size
      const existing = prev.find(item => item.id === tea.id && item.selectedSize === size);
      const selectedPrice = price || tea.price;

      if (existing) {
        return prev.map(item => 
          (item.id === tea.id && item.selectedSize === size) 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...tea, quantity: 1, selectedSize: size, selectedPrice }];
    });
  };

  const removeFromCart = (id: string, size?: PackSize) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.selectedSize === size)));
  };

  const updateQuantity = (id: string, delta: number, size?: PackSize) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id && item.selectedSize === size) {
          const newQty = item.quantity + delta;
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const clearCart = () => setCart([]);

  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
    setUser(prev => ({
      ...prev,
      points: prev.points + Math.floor(order.subtotal / 10)
    }));
  };

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-cream overflow-hidden flex flex-col">
      {showSplash && <SplashScreen />}
      <Navbar cartCount={cartCount} />
      
      <main className="flex-grow overflow-y-auto overflow-x-hidden pt-16 pb-24 scroll-smooth">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route path="/shop" element={<Shop addToCart={addToCart} />} />
          <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
          <Route 
            path="/cart" 
            element={<Cart items={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />} 
          />
          <Route 
            path="/checkout" 
            element={<Checkout items={cart} addOrder={addOrder} clearCart={clearCart} />} 
          />
          <Route 
            path="/order-confirmation/:orderId" 
            element={<OrderConfirmation orders={orders} />} 
          />
          <Route path="/profile" element={<Profile user={user} orders={orders} setOrders={setOrders} onLogout={handleLogout} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      <FloatingCartBar items={cart} />
      <BottomNav cartCount={cartCount} />
      <SommelierChat />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
