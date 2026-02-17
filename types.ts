
export enum Category {
  GREEN = 'Green Tea',
  BLACK = 'Black Tea',
  OOLONG = 'Oolong',
  WHITE = 'White Tea',
  HERBAL = 'Herbal Infusions',
  WELLNESS = 'Wellness Blends',
  GIFTING = 'Gifting Sets'
}

export type PackSize = '250g' | '500g' | '1kg';

export interface Tea {
  id: string;
  name: string;
  category: Category;
  price: number; // Base price for 250g
  description: string;
  image: string;
  origin: string;
  region: string;
  caffeine: 'None' | 'Low' | 'Medium' | 'High';
  rating: number;
  reviewCount: number;
  benefits: string[];
  steepingInfo: {
    temp: string;
    time: string;
    cupsPerPack: string;
  };
  harvestInfo: {
    year: string;
    flush: string;
    elevation: string;
    tastingNotes: string[];
    processing: string;
  };
}

export interface CartItem extends Tea {
  quantity: number;
  selectedSize: PackSize;
  selectedPrice: number;
}

export interface User {
  id?: string;
  mobile?: string;
  name: string;
  email: string;
  tier: 'Silver' | 'Gold' | 'Platinum';
  points: number;
  isSubscribed: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface ShippingAddress {
  fullName: string;
  mobile: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  type: 'Home' | 'Office';
}

export type PaymentMethod = 'UPI' | 'Card' | 'NetBanking' | 'Wallet' | 'COD';

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  gst: number;
  shipping: number;
  total: number;
  address: ShippingAddress;
  paymentMethod: PaymentMethod;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
}
