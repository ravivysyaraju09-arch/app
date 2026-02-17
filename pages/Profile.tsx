
import React from 'react';
import { Link } from 'react-router-dom';
import { User, Order } from '../types';

interface ProfileProps {
  user: User;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  onLogout: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ user, orders, setOrders, onLogout }) => {
  // Mock data for UI demonstration
  const nextTierPoints = 2000;
  const progressPercent = Math.min(100, (user.points / nextTierPoints) * 100);
  const memberSince = "October 2023";

  const quickActions = [
    { label: 'My Orders', icon: '🛍️', path: '#' },
    { label: 'Track Order', icon: '📍', path: '#' },
    { label: 'Saved Addresses', icon: '🏡', path: '#' },
    { label: 'Payment Methods', icon: '💳', path: '#' },
    { label: 'Wishlist', icon: '✨', path: '#' },
    { label: 'Rewards History', icon: '🎁', path: '#' },
    { label: 'Subscriptions', icon: '🍃', path: '#' },
    { label: 'Refer & Earn', icon: '🤝', path: '#' },
  ];

  return (
    <div className="flex flex-col min-h-full pb-12 animate-fade-in">
      {/* 1. Account Header Section */}
      <section className="px-6 pt-8 pb-6 bg-white border-b border-leaf-50">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-leaf-900 flex items-center justify-center text-white text-2xl font-serif shadow-lg">
              {user.name.charAt(0)}
            </div>
            <div className="space-y-0.5">
              <h1 className="font-serif text-2xl text-leaf-900 tracking-tight">{user.name}</h1>
              <p className="text-xs text-leaf-400 font-light">+91 {user.mobile || 'Registered'}</p>
              <p className="text-[9px] uppercase tracking-widest text-gold font-bold">Member Since {memberSince}</p>
            </div>
          </div>
          <button className="w-10 h-10 rounded-full border border-leaf-100 flex items-center justify-center text-leaf-400 active:scale-95 transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        </div>

        {/* Reward Progress Bar */}
        <div className="bg-leaf-50 rounded-2xl p-5 border border-leaf-100">
          <div className="flex justify-between items-end mb-3">
            <div className="space-y-1">
              <span className="text-[8px] uppercase font-bold text-leaf-400 tracking-widest">{user.tier} Tier</span>
              <p className="text-lg font-serif text-leaf-900">{user.points} Points</p>
            </div>
            <span className="text-[8px] uppercase font-bold text-gold tracking-widest">To Platinum: {nextTierPoints - user.points} Pts</span>
          </div>
          <div className="h-1.5 w-full bg-leaf-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gold transition-all duration-1000 ease-out" 
              style={{ width: `${progressPercent}%` }} 
            />
          </div>
        </div>
      </section>

      {/* 2. Quick Action Grid */}
      <section className="px-6 py-8">
        <h3 className="text-[10px] uppercase font-bold text-leaf-400 tracking-[0.2em] mb-4">Account Dashboard</h3>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, idx) => (
            <button key={idx} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-leaf-50 shadow-sm active:bg-leaf-50 active:scale-95 transition-all text-left">
              <span className="text-xl">{action.icon}</span>
              <span className="text-[11px] font-bold text-leaf-900 leading-tight">{action.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* 3. Recent Orders Section */}
      <section className="px-6 py-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-[10px] uppercase font-bold text-leaf-400 tracking-[0.2em]">Recent Activity</h3>
          <button className="text-[9px] font-bold uppercase text-gold">View History</button>
        </div>

        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="py-12 px-6 text-center bg-white rounded-[2rem] border border-leaf-50 space-y-4 shadow-sm">
              <div className="w-16 h-16 bg-leaf-50 rounded-full flex items-center justify-center mx-auto text-leaf-100">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div className="space-y-1">
                <p className="font-serif text-lg text-leaf-900 italic">No orders yet</p>
                <p className="text-[10px] text-leaf-400 leading-relaxed px-4">You haven't placed any orders yet. Discover our rare collections in the atelier.</p>
              </div>
              <Link to="/shop" className="inline-block bg-leaf-900 text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] active:scale-95 transition">
                Explore Teas
              </Link>
            </div>
          ) : (
            orders.slice(0, 2).map(order => (
              <div key={order.id} className="bg-white border border-leaf-50 rounded-2xl p-5 space-y-4 shadow-sm">
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-bold uppercase text-leaf-300">{order.id}</span>
                    <p className="text-[10px] text-leaf-900 font-medium">{order.date}</p>
                  </div>
                  <span className={`text-[8px] font-bold uppercase px-3 py-1 rounded-full ${
                    order.status === 'Delivered' ? 'bg-green-50 text-green-600' : 'bg-gold/10 text-gold'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-leaf-50">
                  <div className="flex -space-x-3">
                    {order.items.slice(0, 3).map((item, i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden shadow-sm">
                        <img src={item.image} className="w-full h-full object-cover" alt="" />
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-leaf-50 flex items-center justify-center text-[8px] font-bold text-leaf-400">
                        +{order.items.length - 3}
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm text-leaf-900">₹{order.total.toLocaleString('en-IN')}</p>
                    <button className="text-[8px] font-bold uppercase text-gold tracking-widest">Track Status</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* 4. Settings Section */}
      <section className="px-6 py-8 mt-4">
        <h3 className="text-[10px] uppercase font-bold text-leaf-400 tracking-[0.2em] mb-4">Settings & Support</h3>
        <div className="bg-white rounded-[2rem] border border-leaf-50 overflow-hidden shadow-sm">
          {[
            { label: 'Notification Preferences', icon: '🔔' },
            { label: 'Help & Support', icon: '💬' },
            { label: 'About Verdant Leaf', icon: '🏛️' },
            { label: 'Terms & Privacy', icon: '📜' },
          ].map((setting, idx) => (
            <button key={idx} className={`w-full flex items-center justify-between p-5 active:bg-leaf-50 transition border-b border-leaf-50 last:border-0`}>
              <div className="flex items-center gap-4">
                <span className="text-lg">{setting.icon}</span>
                <span className="text-xs font-medium text-leaf-900">{setting.label}</span>
              </div>
              <svg className="w-4 h-4 text-leaf-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-4 p-5 text-red-500 active:bg-red-50 transition"
          >
            <span className="text-lg">🚪</span>
            <span className="text-xs font-bold uppercase tracking-widest">Logout Account</span>
          </button>
        </div>
      </section>

      {/* Version Tag */}
      <p className="text-center text-[8px] text-leaf-200 uppercase tracking-[0.3em] mt-4">
        Verdant Leaf Atelier • v2.4.0
      </p>
    </div>
  );
};
