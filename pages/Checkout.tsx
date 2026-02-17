
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem, ShippingAddress, PaymentMethod, Order } from '../types';

interface CheckoutProps {
  items: CartItem[];
  addOrder: (order: Order) => void;
  clearCart: () => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ items, addOrder, clearCart }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [address, setAddress] = useState<ShippingAddress>({
    fullName: '',
    mobile: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    type: 'Home'
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('UPI');

  const subtotal = useMemo(() => items.reduce((sum, item) => sum + (item.price * item.quantity), 0), [items]);
  const shipping = subtotal > 499 ? 0 : 50;
  const gst = subtotal * 0.18;
  const total = subtotal + shipping + gst;

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    setError(null);
    
    // Simulate payment delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate occasional failure for realism (1 in 10 chance)
    if (Math.random() < 0.1) {
      setIsProcessing(false);
      setError("Payment gateway is temporarily unavailable. Please try again.");
      return;
    }

    const newOrder: Order = {
      id: `VL-${Math.floor(Math.random() * 900000) + 100000}`,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
      items: [...items],
      subtotal,
      gst,
      shipping,
      total,
      address,
      paymentMethod,
      status: 'Processing'
    };

    addOrder(newOrder);
    clearCart();
    setIsProcessing(false);
    navigate(`/order-confirmation/${newOrder.id}`);
  };

  if (items.length === 0 && step !== 3) {
    navigate('/shop');
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 lg:py-24">
      <div className="flex justify-center mb-12">
        <div className="flex items-center gap-4">
          {[1, 2, 3].map((s) => (
            <React.Fragment key={s}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step === s ? 'bg-leaf-900 text-white shadow-lg' : 
                step > s ? 'bg-gold text-white' : 'bg-leaf-100 text-leaf-400'
              }`}>
                {step > s ? '✓' : s}
              </div>
              {s < 3 && <div className={`w-12 h-[2px] ${step > s ? 'bg-gold' : 'bg-leaf-100'}`} />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2">
          {step === 1 && (
            <div className="space-y-8 animate-fade-in">
              <h1 className="font-serif text-3xl text-leaf-900">Shipping Details</h1>
              <form onSubmit={handleAddressSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] uppercase font-bold text-leaf-400 tracking-widest">Full Name</label>
                  <input required value={address.fullName} onChange={e => setAddress({...address, fullName: e.target.value})} className="w-full bg-white border border-leaf-100 p-4 rounded-xl outline-none focus:border-gold transition" placeholder="Julian Sterling" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-leaf-400 tracking-widest">Mobile Number</label>
                  <input required value={address.mobile} onChange={e => setAddress({...address, mobile: e.target.value})} className="w-full bg-white border border-leaf-100 p-4 rounded-xl outline-none focus:border-gold transition" placeholder="+91 98765 43210" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-leaf-400 tracking-widest">Email Address</label>
                  <input required type="email" value={address.email} onChange={e => setAddress({...address, email: e.target.value})} className="w-full bg-white border border-leaf-100 p-4 rounded-xl outline-none focus:border-gold transition" placeholder="julian@luxury.com" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] uppercase font-bold text-leaf-400 tracking-widest">Flat, House no., Building, Apartment</label>
                  <input required value={address.address} onChange={e => setAddress({...address, address: e.target.value})} className="w-full bg-white border border-leaf-100 p-4 rounded-xl outline-none focus:border-gold transition" placeholder="123, Tea Gardens Road" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-leaf-400 tracking-widest">City</label>
                  <input required value={address.city} onChange={e => setAddress({...address, city: e.target.value})} className="w-full bg-white border border-leaf-100 p-4 rounded-xl outline-none focus:border-gold transition" placeholder="Mumbai" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-leaf-400 tracking-widest">Pincode</label>
                  <input required value={address.pincode} onChange={e => setAddress({...address, pincode: e.target.value})} className="w-full bg-white border border-leaf-100 p-4 rounded-xl outline-none focus:border-gold transition" placeholder="400001" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] uppercase font-bold text-leaf-400 tracking-widest">Address Type</label>
                  <div className="flex gap-4">
                    {['Home', 'Office'].map(t => (
                      <button key={t} type="button" onClick={() => setAddress({...address, type: t as any})} className={`px-8 py-3 rounded-xl border font-bold text-xs uppercase tracking-widest transition ${address.type === t ? 'bg-leaf-900 text-white border-leaf-900' : 'bg-white text-leaf-400 border-leaf-100'}`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <button type="submit" className="md:col-span-2 bg-leaf-900 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-gold transition-all shadow-xl mt-4">
                  Continue to Summary
                </button>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-fade-in">
              <h1 className="font-serif text-3xl text-leaf-900">Order Summary</h1>
              <div className="bg-white border border-leaf-100 rounded-3xl overflow-hidden">
                <div className="p-8 space-y-6">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="flex gap-4">
                        <div className="w-16 h-16 bg-leaf-50 rounded-xl overflow-hidden flex-shrink-0">
                          <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                        </div>
                        <div>
                          <p className="font-bold text-leaf-900">{item.name}</p>
                          <p className="text-xs text-leaf-400">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-bold text-leaf-900">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-leaf-50/50 p-8 border-t border-leaf-100 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-leaf-500">Subtotal</span>
                    <span className="font-medium text-leaf-900">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-leaf-500">Shipping</span>
                    <span className="font-medium text-leaf-900">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-leaf-500">GST (18%)</span>
                    <span className="font-medium text-leaf-900">₹{gst.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="pt-4 border-t border-leaf-200 flex justify-between">
                    <span className="font-bold uppercase tracking-widest text-xs text-leaf-900">Grand Total</span>
                    <span className="font-serif text-2xl text-leaf-900">₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button onClick={() => setStep(1)} className="flex-1 border border-leaf-100 text-leaf-900 py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-leaf-50 transition">
                  Back
                </button>
                <button onClick={() => setStep(3)} className="flex-[2] bg-leaf-900 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-gold transition-all shadow-xl">
                  Proceed to Payment
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-fade-in">
              <h1 className="font-serif text-3xl text-leaf-900">Payment Selection</h1>
              
              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100 flex items-center gap-3">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 gap-4">
                {[
                  { id: 'UPI', label: 'UPI (GPay, PhonePe, Paytm)', icon: '📱' },
                  { id: 'Card', label: 'Debit / Credit Card', icon: '💳' },
                  { id: 'NetBanking', label: 'Net Banking', icon: '🏦' },
                  { id: 'Wallet', label: 'Wallets', icon: '👛' },
                  { id: 'COD', label: 'Cash on Delivery', icon: '💵' }
                ].map(p => (
                  <button key={p.id} onClick={() => setPaymentMethod(p.id as PaymentMethod)} className={`flex items-center gap-4 p-6 rounded-2xl border transition-all ${paymentMethod === p.id ? 'border-gold bg-gold/5 ring-1 ring-gold' : 'border-leaf-100 bg-white hover:border-gold'}`}>
                    <span className="text-2xl">{p.icon}</span>
                    <span className="flex-grow text-left font-bold text-leaf-900">{p.label}</span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === p.id ? 'border-gold bg-gold' : 'border-leaf-200'}`}>
                      {paymentMethod === p.id && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex gap-4 pt-4">
                <button onClick={() => setStep(2)} disabled={isProcessing} className="flex-1 border border-leaf-100 text-leaf-900 py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-leaf-50 transition disabled:opacity-50">
                  Back
                </button>
                <button onClick={handlePayment} disabled={isProcessing} className="flex-[2] bg-leaf-900 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-gold transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-3">
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : `Pay ₹${total.toLocaleString('en-IN')}`}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Mini Summary */}
        <div className="space-y-6">
          <div className="bg-leaf-50 p-6 rounded-2xl space-y-4">
            <h3 className="uppercase tracking-[0.2em] font-bold text-[10px] text-leaf-900">Your Order</h3>
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-hide">
              {items.map(item => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <span className="text-leaf-600 font-light truncate max-w-[150px]">{item.name} x {item.quantity}</span>
                  <span className="text-leaf-900 font-medium">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t border-leaf-100">
              <div className="flex justify-between">
                <span className="font-bold text-leaf-900 uppercase text-[10px] tracking-widest">Total</span>
                <span className="font-bold text-leaf-900">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
          
          <div className="p-6 bg-white border border-leaf-100 rounded-2xl flex items-center gap-4">
            <div className="text-2xl">🛡️</div>
            <div>
              <p className="text-[10px] uppercase font-bold text-leaf-900 tracking-widest">Secure Checkout</p>
              <p className="text-[10px] text-leaf-400">SSL Encrypted Transaction</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
