
import { Tea, Category } from './types';

export const TEAS: Tea[] = [
  {
    id: '1',
    name: 'Misty Peak Dragon Well',
    category: Category.GREEN,
    price: 1499.00,
    description: 'A legendary green tea with a chestnut-like aroma and flat, sword-shaped leaves. Hand-picked from the high altitudes of Hangzhou.',
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=800',
    origin: 'Hangzhou, China',
    region: 'West Lake Region',
    caffeine: 'Medium',
    rating: 4.9,
    reviewCount: 128,
    benefits: ['Rich in antioxidants', 'Metabolism boost', 'Calming effect'],
    steepingInfo: { temp: '80°C', time: '2-3 mins', cupsPerPack: 'approx. 80 cups' },
    harvestInfo: {
      year: '2024',
      flush: 'Pre-Qingming Flush',
      elevation: '800m',
      tastingNotes: ['Chestnut', 'Buttery', 'Grassy'],
      processing: 'Wok-fired by hand'
    }
  },
  {
    id: '2',
    name: 'Imperial Golden Needle',
    category: Category.BLACK,
    price: 1899.00,
    description: 'An exquisite black tea featuring downy golden buds. Offers notes of honey, sweet potato, and subtle chocolate.',
    image: 'https://images.unsplash.com/photo-1594631252845-29fc4586c557?auto=format&fit=crop&q=80&w=800',
    origin: 'Yunnan, China',
    region: 'Fengqing Highlands',
    caffeine: 'High',
    rating: 4.8,
    reviewCount: 85,
    benefits: ['Energy boost', 'Heart health', 'Gut wellness'],
    steepingInfo: { temp: '95°C', time: '3-5 mins', cupsPerPack: 'approx. 75 cups' },
    harvestInfo: {
      year: '2024',
      flush: 'Early Spring Flush',
      elevation: '1200m',
      tastingNotes: ['Wild Honey', 'Malt', 'Caramel'],
      processing: 'Fully Oxidized'
    }
  },
  {
    id: '3',
    name: 'Silver Needle Supreme',
    category: Category.WHITE,
    price: 2499.00,
    description: 'The finest white tea, consisting only of young, silver-downy buds. Delicate, sweet, and incredibly refreshing.',
    image: 'https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?auto=format&fit=crop&q=80&w=800',
    origin: 'Fujian, China',
    region: 'Fuding Mountains',
    caffeine: 'Low',
    rating: 5.0,
    reviewCount: 42,
    benefits: ['Youthful skin', 'Immune support', 'Stress relief'],
    steepingInfo: { temp: '75°C', time: '4-6 mins', cupsPerPack: 'approx. 100 cups' },
    harvestInfo: {
      year: '2024',
      flush: 'First Flush',
      elevation: '1000m',
      tastingNotes: ['Melon', 'White Peach', 'Floral'],
      processing: 'Sun-dried'
    }
  },
  {
    id: '4',
    name: 'Iron Goddess Oolong',
    category: Category.OOLONG,
    price: 1299.00,
    description: 'A premium Tie Guan Yin with a floral, orchid-like fragrance and a creamy, lingering finish.',
    image: 'https://images.unsplash.com/photo-1544787210-2213d2427507?auto=format&fit=crop&q=80&w=800',
    origin: 'Anxi, China',
    region: 'Anxi Fujian',
    caffeine: 'Medium',
    rating: 4.7,
    reviewCount: 210,
    benefits: ['Weight management', 'Mental clarity', 'Bone health'],
    steepingInfo: { temp: '90°C', time: '2-3 mins', cupsPerPack: 'approx. 90 cups' },
    harvestInfo: {
      year: '2023',
      flush: 'Autumn Flush',
      elevation: '900m',
      tastingNotes: ['Orchid', 'Milk', 'Toasted Rice'],
      processing: 'Semi-oxidized & Rolled'
    }
  }
];

export const ORIGINS = [
  {
    name: 'Darjeeling Estate',
    region: 'West Bengal, India',
    desc: 'The Champagne of teas, known for muscatel notes and misty high-altitude gardens.',
    img: 'https://images.unsplash.com/photo-1581600140682-d4e68c8cde32?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: 'Assam Valley',
    region: 'Assam, India',
    desc: 'Rich, malty, and brisk. The powerhouse of black teas from the Brahmaputra valley.',
    img: 'https://images.unsplash.com/photo-1622340798135-c3359d997cc0?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: 'Nilgiri Highlands',
    region: 'Tamil Nadu, India',
    desc: 'Fragrant and smooth, these high-grown teas offer a bright, citrusy character.',
    img: 'https://images.unsplash.com/photo-1596797038530-2c39da0a1941?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: 'Yunnan Gardens',
    region: 'Yunnan, China',
    desc: 'The ancient birthplace of tea, producing earthy, complex Pu-erh and black teas.',
    img: 'https://images.unsplash.com/photo-1523906630133-f74b5d1c4b51?auto=format&fit=crop&q=80&w=800'
  }
];
