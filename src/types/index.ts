export type BrandType = 'Apple' | 'Samsung' | 'Vivo' | 'OnePlus' | 'Xiaomi' | 'HP' | 'Dell' | 'Sony' | 'Boat' | 'Other';

export type CategoryType = 
  | 'Smartphones' 
  | 'Laptops' 
  | 'Audio & Wearables' 
  | 'Smart TVs' 
  | 'Accessories' 
  | 'Tablets';

export interface Product {
  id: string;
  name: string;
  brand: BrandType;
  category: CategoryType;
  price: number; // in INR ₹
  originalPrice: number;
  discountPercent: number;
  stock: number;
  inStock: boolean;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  specs: Record<string, string>;
  featured: boolean;
  isNew?: boolean;
  warranty: string;
  sku: string;
  createdAt: string;
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'Preparing' | 'Out for Delivery' | 'Delivered' | 'Cancelled';

export type PaymentMethod = 'upi' | 'cod' | 'card' | 'netbanking';
export type PaymentStatus = 'Paid' | 'Pending' | 'COD';

export interface OrderItem {
  productId: string;
  productName: string;
  brand: string;
  price: number;
  quantity: number;
  image: string;
}

export interface OrderHistoryEntry {
  timestamp: string;
  status: OrderStatus;
  note: string;
}

export interface CustomerDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  landmark?: string;
  city: string;
  district: string;
  state: string;
  pinCode: string;
  deliveryType: 'store_pickup' | 'home_delivery';
}

export interface Order {
  id: string;
  date: string;
  customer: CustomerDetails;
  items: OrderItem[];
  subtotal: number;
  gstAmount: number; // 18% GST calculation
  deliveryFee: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  notes?: string;
  history: OrderHistoryEntry[];
}

export type AdminRole = 'super_admin' | 'store_manager' | 'inventory_staff' | 'sales_executive';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: AdminRole;
  phone: string;
  status: 'active' | 'suspended';
  lastLogin: string;
  createdAt: string;
  avatar?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  addressLine: string;
  marketArea: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  phonePrimary: string;
  phoneSecondary: string;
  whatsappNumber: string;
  email: string;
  operatingHoursWeekday: string;
  operatingHoursSunday: string;
  gstin: string;
  announcementText: string;
  freeDeliveryThreshold: number;
}
