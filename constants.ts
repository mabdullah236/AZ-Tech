import { Product, ProductCategory } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Nebula X1 Carbon',
    price: 1299.00,
    category: ProductCategory.LAPTOPS,
    description: 'Ultra-lightweight ultrabook with 14" 4K OLED display and AI-enhanced performance.',
    image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=800&q=80',
    features: ['M3 Pro Chip', '32GB RAM', '1TB SSD', '18hr Battery'],
    taxRate: 0.12
  },
  {
    id: 'p2',
    name: 'Titan Gaming Pro',
    price: 2499.00,
    category: ProductCategory.LAPTOPS,
    description: 'Desktop-class performance in a portable chassis. Ray-tracing ready.',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80',
    features: ['RTX 5090 Mobile', '64GB RAM', '240Hz Display', 'Mechanical Keys'],
    taxRate: 0.12
  },
  {
    id: 'p3',
    name: 'SonicFlow Elite',
    price: 349.00,
    category: ProductCategory.AUDIO,
    description: 'Industry-leading noise cancellation with spatial audio support.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    features: ['ANC 3.0', '40hr Battery', 'Multipoint', 'Lossless Audio'],
    taxRate: 0.08
  },
  {
    id: 'p4',
    name: 'Pulse Earbuds',
    price: 199.00,
    category: ProductCategory.AUDIO,
    description: 'True wireless earbuds with transparency mode and crystal clear mics.',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    features: ['IPX7 Waterproof', 'Wireless Charging', 'Hifi Sound'],
    taxRate: 0.08
  },
  {
    id: 'p5',
    name: 'Chrono Watch Ultra',
    price: 799.00,
    category: ProductCategory.WEARABLES,
    description: 'Rugged titanium smartwatch for extreme athletes and divers.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    features: ['Titanium Case', '100m Water Resist', 'Dual GPS', 'Health Sensors'],
    taxRate: 0.10
  },
  {
    id: 'p6',
    name: 'KeyMech RGB',
    price: 149.00,
    category: ProductCategory.ACCESSORIES,
    description: 'Hot-swappable mechanical keyboard with programmable OLED screen.',
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80',
    features: ['Gasket Mount', 'PBT Keycaps', 'QMK/VIA', 'RGB Underglow'],
    taxRate: 0.05
  },
  {
    id: 'p7',
    name: 'Vision 4K Webcam',
    price: 129.00,
    category: ProductCategory.ACCESSORIES,
    description: 'DSLR-quality webcam for professional streaming and conferencing.',
    image: 'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&w=800&q=80',
    features: ['4K 60fps', 'HDR', 'Auto-Focus', 'Privacy Shutter'],
    taxRate: 0.05
  },
  {
    id: 'p8',
    name: 'StreamDeck Mini',
    price: 89.00,
    category: ProductCategory.ACCESSORIES,
    description: 'Tactile control interface for streamers and productivity.',
    image: 'https://images.unsplash.com/photo-1526509867162-5b0c0d1b4b33?auto=format&fit=crop&w=800&q=80',
    features: ['6 LCD Keys', 'Custom Macros', 'Plugin Store'],
    taxRate: 0.05
  }
];

export const STORE_NAME = "AZ Tech";