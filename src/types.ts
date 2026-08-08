export interface Cookie {
  id: string;
  name: string;
  price: number;
  badge?: string;
  badgeType?: 'tertiary' | 'secondary' | 'accent' | 'gluten-free';
  description: string;
  image: string;
  altText: string;
  category: 'Classic Favorites' | 'Seasonal Specials' | 'Gift Boxes' | 'Gluten-Free Flour';
  rating?: number;
  reviewsCount?: number;
  ingredients?: string[];
  bakersTip?: string;
  calories?: number;
}

export interface CartItem {
  cookie: Cookie;
  quantity: number;
}

export type ViewMode = 'home' | 'shop' | 'story' | 'checkout' | 'confirmation';

export interface ShippingDetails {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  email: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  shippingDetails: ShippingDetails;
}
