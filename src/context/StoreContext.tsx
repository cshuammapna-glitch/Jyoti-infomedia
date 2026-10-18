import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  Order,
  AdminUser,
  StoreSettings,
  CartItem,
  BrandType,
  CategoryType,
  OrderStatus,
  AdminRole,
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_ADMIN_USERS,
  INITIAL_STORE_SETTINGS,
  DEFAULT_ADMIN_PASSKEY,
} from '../data/seedData';

interface StoreContextType {
  // Storefront & Admin Navigation
  currentView: 'store' | 'admin';
  setCurrentView: (view: 'store' | 'admin') => void;
  adminSubTab: 'analytics' | 'products' | 'orders' | 'users' | 'settings';
  setAdminSubTab: (tab: 'analytics' | 'products' | 'orders' | 'users' | 'settings') => void;

  // Filter States
  selectedBrand: BrandType | 'All';
  setSelectedBrand: (brand: BrandType | 'All') => void;
  selectedCategory: CategoryType | 'All';
  setSelectedCategory: (category: CategoryType | 'All') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleProductStock: (id: string) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Orders
  orders: Order[];
  placeOrder: (orderData: Omit<Order, 'id' | 'date' | 'history'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, note?: string) => void;
  lookupOrder: (query: string) => Order | undefined;
  activeInvoiceOrder: Order | null;
  setActiveInvoiceOrder: (order: Order | null) => void;

  // Modals
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isTrackOrderOpen: boolean;
  setIsTrackOrderOpen: (open: boolean) => void;
  isAdminAuthOpen: boolean;
  setIsAdminAuthOpen: (open: boolean) => void;

  // Admin Auth & Users
  currentUser: AdminUser | null;
  adminUsers: AdminUser[];
  loginAdmin: (email: string, password?: string) => { success: boolean; message: string };
  quickDemoLogin: (role: AdminRole) => void;
  registerAdmin: (data: {
    name: string;
    email: string;
    phone: string;
    role: AdminRole;
    adminPasskey: string;
  }) => { success: boolean; message: string };
  logoutAdmin: () => void;
  updateAdminUser: (id: string, data: Partial<AdminUser>) => void;
  toggleUserStatus: (id: string) => void;
  deleteAdminUser: (id: string) => void;

  // Store Settings
  settings: StoreSettings;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;
  resetAllDataToDefaults: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'jyoti_products_v1',
  ORDERS: 'jyoti_orders_v1',
  USERS: 'jyoti_admin_users_v1',
  CURRENT_USER: 'jyoti_current_admin_v1',
  SETTINGS: 'jyoti_settings_v1',
  CART: 'jyoti_cart_v1',
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [currentView, setCurrentView] = useState<'store' | 'admin'>('store');
  const [adminSubTab, setAdminSubTab] = useState<'analytics' | 'products' | 'orders' | 'users' | 'settings'>('analytics');

  // Filter States
  const [selectedBrand, setSelectedBrand] = useState<BrandType | 'All'>('All');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals & Drawers
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);
  const [isAdminAuthOpen, setIsAdminAuthOpen] = useState(false);
  const [activeInvoiceOrder, setActiveInvoiceOrder] = useState<Order | null>(null);

  // Persistent States
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USERS);
      return saved ? JSON.parse(saved) : INITIAL_ADMIN_USERS;
    } catch {
      return INITIAL_ADMIN_USERS;
    }
  });

  const [currentUser, setCurrentUser] = useState<AdminUser | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [settings, setSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return saved ? JSON.parse(saved) : INITIAL_STORE_SETTINGS;
    } catch {
      return INITIAL_STORE_SETTINGS;
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(adminUsers));
  }, [adminUsers]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  // Product Operations
  const addProduct = (prodData: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...prodData,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleProductStock = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, inStock: !p.inStock } : p))
    );
  };

  // Cart Operations
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Order Operations
  const placeOrder = (orderData: Omit<Order, 'id' | 'date' | 'history'>): Order => {
    const orderId = `JYOTI-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      ...orderData,
      id: orderId,
      date: new Date().toISOString(),
      history: [
        {
          timestamp: new Date().toISOString(),
          status: 'Pending',
          note: `Order received by JYOTI INFOMEDIA system via ${orderData.paymentMethod.toUpperCase()}`,
        },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Deduct stock for each purchased product
    setProducts((prev) =>
      prev.map((product) => {
        const item = orderData.items.find((i) => i.productId === product.id);
        if (item) {
          const newStock = Math.max(0, product.stock - item.quantity);
          return {
            ...product,
            stock: newStock,
            inStock: newStock > 0,
          };
        }
        return product;
      })
    );

    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, note?: string) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          const newHistory = [
            ...order.history,
            {
              timestamp: new Date().toISOString(),
              status,
              note: note || `Order status updated to ${status} by admin`,
            },
          ];
          return {
            ...order,
            orderStatus: status,
            history: newHistory,
          };
        }
        return order;
      })
    );
  };

  const lookupOrder = (query: string): Order | undefined => {
    const clean = query.trim().toLowerCase();
    return orders.find(
      (o) =>
        o.id.toLowerCase() === clean ||
        o.customer.phone.replace(/\D/g, '').includes(clean.replace(/\D/g, ''))
    );
  };

  // Admin Auth Operations
  const loginAdmin = (email: string): { success: boolean; message: string } => {
    const user = adminUsers.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );
    if (!user) {
      return { success: false, message: 'No registered admin found with this email.' };
    }
    if (user.status === 'suspended') {
      return { success: false, message: 'This staff account has been deactivated. Please contact store owner.' };
    }

    const updated = {
      ...user,
      lastLogin: new Date().toISOString(),
    };
    setCurrentUser(updated);
    setAdminUsers((prev) => prev.map((u) => (u.id === user.id ? updated : u)));
    return { success: true, message: `Welcome back, ${user.name}!` };
  };

  const quickDemoLogin = (role: AdminRole) => {
    const user = adminUsers.find((u) => u.role === role) || adminUsers[0];
    if (user) {
      const updated = { ...user, lastLogin: new Date().toISOString() };
      setCurrentUser(updated);
      setAdminUsers((prev) => prev.map((u) => (u.id === user.id ? updated : u)));
    }
  };

  const registerAdmin = (data: {
    name: string;
    email: string;
    phone: string;
    role: AdminRole;
    adminPasskey: string;
  }): { success: boolean; message: string } => {
    if (data.adminPasskey !== DEFAULT_ADMIN_PASSKEY) {
      return {
        success: false,
        message: `Invalid Store Admin Passkey. For official staff evaluation, passkey is '${DEFAULT_ADMIN_PASSKEY}'.`,
      };
    }

    const exists = adminUsers.some(
      (u) => u.email.toLowerCase() === data.email.trim().toLowerCase()
    );
    if (exists) {
      return { success: false, message: 'An account with this email address already exists.' };
    }

    const newUser: AdminUser = {
      id: `admin-${Date.now()}`,
      name: data.name.trim(),
      email: data.email.trim(),
      role: data.role,
      phone: data.phone.trim(),
      status: 'active',
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    setAdminUsers((prev) => [newUser, ...prev]);
    setCurrentUser(newUser);
    return { success: true, message: `Account registered successfully! Welcome, ${newUser.name}.` };
  };

  const logoutAdmin = () => {
    setCurrentUser(null);
    setCurrentView('store');
  };

  const updateAdminUser = (id: string, data: Partial<AdminUser>) => {
    setAdminUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ...data } : u))
    );
    if (currentUser?.id === id) {
      setCurrentUser((prev) => (prev ? { ...prev, ...data } : null));
    }
  };

  const toggleUserStatus = (id: string) => {
    setAdminUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' }
          : u
      )
    );
  };

  const deleteAdminUser = (id: string) => {
    if (adminUsers.length <= 1) {
      return; // prevent deleting last admin
    }
    setAdminUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const resetAllDataToDefaults = () => {
    setProducts(INITIAL_PRODUCTS);
    setOrders(INITIAL_ORDERS);
    setAdminUsers(INITIAL_ADMIN_USERS);
    setSettings(INITIAL_STORE_SETTINGS);
    setCurrentUser(INITIAL_ADMIN_USERS[0]);
    localStorage.removeItem(STORAGE_KEYS.CART);
    setCart([]);
  };

  return (
    <StoreContext.Provider
      value={{
        currentView,
        setCurrentView,
        adminSubTab,
        setAdminSubTab,
        selectedBrand,
        setSelectedBrand,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductStock,
        selectedProduct,
        setSelectedProduct,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        orders,
        placeOrder,
        updateOrderStatus,
        lookupOrder,
        activeInvoiceOrder,
        setActiveInvoiceOrder,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isTrackOrderOpen,
        setIsTrackOrderOpen,
        isAdminAuthOpen,
        setIsAdminAuthOpen,
        currentUser,
        adminUsers,
        loginAdmin,
        quickDemoLogin,
        registerAdmin,
        logoutAdmin,
        updateAdminUser,
        toggleUserStatus,
        deleteAdminUser,
        settings,
        updateSettings,
        resetAllDataToDefaults,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
