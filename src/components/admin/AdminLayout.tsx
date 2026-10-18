import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Users, 
  Settings, 
  LogOut, 
  Store, 
  Sparkles, 
  Menu, 
  X, 
  ShieldCheck, 
  TrendingUp, 
  Bell, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { ProductManagement } from './ProductManagement';
import { OrderManagement } from './OrderManagement';
import { UserManagement } from './UserManagement';
import { StoreSettingsView } from './StoreSettingsView';
import { AdminRole } from '../../types';

export const AdminLayout: React.FC = () => {
  const { 
    currentUser, 
    logoutAdmin, 
    setCurrentView, 
    adminSubTab, 
    setAdminSubTab,
    quickDemoLogin,
    settings,
    orders,
    products
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pendingOrders = orders.filter((o) => ['Pending', 'Confirmed', 'Preparing'].includes(o.orderStatus)).length;
  const lowStockCount = products.filter((p) => p.stock <= 5).length;

  const navItems = [
    {
      id: 'analytics',
      label: 'Sales & Analytics',
      icon: TrendingUp,
      badge: null,
    },
    {
      id: 'products',
      label: 'Product Management',
      icon: ShoppingBag,
      badge: lowStockCount > 0 ? `${lowStockCount} low` : null,
      badgeColor: 'bg-amber-100 text-amber-800',
    },
    {
      id: 'orders',
      label: 'Order Oversight',
      icon: Package,
      badge: pendingOrders > 0 ? `${pendingOrders} new` : null,
      badgeColor: 'bg-blue-100 text-blue-800',
    },
    {
      id: 'users',
      label: 'User Management',
      icon: Users,
      badge: null,
    },
    {
      id: 'settings',
      label: 'Store & Timings',
      icon: Settings,
      badge: null,
    },
  ];

  const handleRoleSwitch = (role: AdminRole) => {
    quickDemoLogin(role);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col lg:flex-row">
      
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-950 text-slate-300 border-r border-slate-800 shrink-0 select-none">
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-900 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
            <Sparkles className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h1 className="font-black text-white text-base tracking-tight font-display">
              JYOTI <span className="text-blue-500">ADMIN</span>
            </h1>
            <p className="text-[10px] text-slate-400 font-medium">Kochadhaman, Kishanganj</p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 py-2">
            Operations & Control
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = adminSubTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setAdminSubTab(item.id as any)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-white/20 text-white' : item.badgeColor
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-4 border-t border-slate-900 mt-4">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 py-2">
              Customer Storefront
            </div>
            <button
              onClick={() => setCurrentView('store')}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Store className="w-4 h-4 text-emerald-400" />
                <span>Go to Storefront</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </button>
          </div>
        </div>

        {/* User Card & Logout in Footer */}
        <div className="p-4 border-t border-slate-900 bg-slate-900/40">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                {currentUser?.name.charAt(0) || 'A'}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">{currentUser?.name || 'Administrator'}</p>
                <p className="text-[10px] text-blue-400 font-medium capitalize">
                  {currentUser?.role.replace('_', ' ') || 'Super Admin'}
                </p>
              </div>
            </div>

            <button
              onClick={logoutAdmin}
              className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Role Tester Pills */}
          <div className="pt-2 border-t border-slate-800/80 text-[10px]">
            <span className="text-slate-500 font-semibold block mb-1">Switch Role Demo:</span>
            <div className="flex gap-1">
              <button
                onClick={() => handleRoleSwitch('super_admin')}
                className={`px-1.5 py-0.5 rounded-md font-bold ${
                  currentUser?.role === 'super_admin' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                Owner
              </button>
              <button
                onClick={() => handleRoleSwitch('store_manager')}
                className={`px-1.5 py-0.5 rounded-md font-bold ${
                  currentUser?.role === 'store_manager' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                Manager
              </button>
              <button
                onClick={() => handleRoleSwitch('inventory_staff')}
                className={`px-1.5 py-0.5 rounded-md font-bold ${
                  currentUser?.role === 'inventory_staff' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                Stock
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 lg:hidden text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Admin Dashboard
                </span>
                <span className="text-slate-300">/</span>
                <span className="text-sm font-extrabold text-slate-900 capitalize font-display">
                  {adminSubTab.replace('_', ' ')}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Mahavir Marg Store Live</span>
            </span>

            <button
              onClick={() => setCurrentView('store')}
              className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Store className="w-3.5 h-3.5 text-blue-400" />
              <span>Back to Storefront</span>
            </button>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-950 text-white p-4 space-y-2 border-b border-slate-800">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setAdminSubTab(item.id as any);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-bold ${
                  adminSubTab === item.id ? 'bg-blue-600 text-white' : 'text-slate-400'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">{item.badge}</span>}
              </button>
            ))}
          </div>
        )}

        {/* Active Tab View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {adminSubTab === 'analytics' && <AnalyticsDashboard />}
          {adminSubTab === 'products' && <ProductManagement />}
          {adminSubTab === 'orders' && <OrderManagement />}
          {adminSubTab === 'users' && <UserManagement />}
          {adminSubTab === 'settings' && <StoreSettingsView />}
        </main>

      </div>

    </div>
  );
};
