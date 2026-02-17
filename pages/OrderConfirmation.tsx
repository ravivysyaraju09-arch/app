
import React, { useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Order } from '../types';

interface OrderConfirmationProps {
  orders: Order[];
}

export const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ orders }) => {
  const { orderId } = useParams<{ orderId: string }>();
  const order = useMemo(() => orders.find(o => o.id === orderId), [orders, orderId]);

  if (!order) return <Navigate to="/shop" />;

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 5);
  const formattedDelivery = deliveryDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 lg:py-24 text-center">
      <div className="mb-12">
        <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 scale-110 animate-bounce">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="font-serif text-5xl text-leaf-900 mb-4">Order Confirmed</h1>
        <p className="text-leaf-500 font-light">Thank you for choosing Verdant Leaf, {order.address.fullName.split(' ')[0]}.</p>
      </div>

      <div className="bg-white border border-leaf-100 rounded-[2.5rem] overflow-hidden shadow-xl mb-12">
        <div className="p-8 md:p-12 space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-8 border-b border-leaf-50">
            <div className="space-y-1">
              <p className="text-[10px] uppercase font-bold text-leaf-400 tracking-widest">Order ID</p>
              <p className="text-sm font-bold text-leaf-900">{order.id}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] uppercase font-bold text-leaf-400 tracking-widest">Date</p>
              <p className="text-sm font-bold text-leaf-900">{order.date}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] uppercase font-bold text-leaf-400 tracking-widest">Total Paid</p>
              <p className="text-sm font-bold text-leaf-900">₹{order.total.toLocaleString('en-IN')}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] uppercase font-bold text-leaf-400 tracking-widest">Payment</p>
              <p className="text-sm font-bold text-leaf-900">{order.paymentMethod}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
            <div className="space-y-4">
              <h3 className="font-serif text-xl text-leaf-900">Delivery Address</h3>
              <p className="text-sm text-leaf-600 font-light leading-relaxed">
                {order.address.address}<br />
                {order.address.city}, {order.address.state} - {order.address.pincode}<br />
                Mobile: {order.address.mobile}
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-serif text-xl text-leaf-900">Estimated Delivery</h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center text-gold">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-sm font-bold text-leaf-900">{formattedDelivery}</p>
              </div>
              <p className="text-xs text-leaf-400">Our logistics partner will contact you shortly.</p>
            </div>
          </div>
        </div>
        <div className="bg-leaf-900 p-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white text-sm font-light">A confirmation email has been sent to <span className="font-bold">{order.address.email}</span></p>
          <Link to="/profile" className="text-gold text-xs font-bold uppercase tracking-widest hover:text-white transition">Track Your Order</Link>
        </div>
      </div>

      <div className="flex justify-center gap-6">
        <Link to="/shop" className="bg-leaf-900 text-white px-10 py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-gold transition-all shadow-xl">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};
