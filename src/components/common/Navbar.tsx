import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  MapPin, 
  Clock, 
  Phone, 
  ShieldCheck, 
  LayoutDashboard, 
  UserCheck, 
  Sparkles,
  Menu,
  X,
  PackageCheck,
  MessageCircle
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { BrandType } from '../../types';

export const Navbar: React.FC = () => {
  const { 
    settings, 
    cartCount, 
    setIsCartOpen, 
    setIsTrackOrderOpen,
    currentUser, 
    currentView, 
    setCurrentView,
    setIsAdminAuthOpen,
    searchQuery, 
    setSearchQuery,
    setSelectedBrand,
    setSelectedCategory
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleBrandClick = (brand: BrandType) => {
    setSelectedBrand(brand);
    setSelectedCategory('All');
    setCurrentView('store');
    setMobileMenuOpen(false);
    const element = document.getElementById('catalog-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAllProductsClick = () => {
    setSelectedBrand('All');
    setSelectedCategory('All');
    setSearchQuery('');
    setCurrentView('store');
    setMobileMenuOpen(false);
    const element = document.getElementById('catalog-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStoreDetailsClick = () => {
    setCurrentView('store');
    setMobileMenuOpen(false);
    const element = document.getElementById('store-info-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Professional Announcement & Store Location Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1">
            <span className="inline-flex items-center text-amber-400 font-medium">
              <MapPin className="w-3.5 h-3.5 mr-1 inline shrink-0" />
              {settings.addressLine}, {settings.marketArea}, {settings.district}, {settings.state}
            </span>
            <span className="hidden lg:inline-block text-slate-500">|</span>
            <span className="inline-flex items-center text-emerald-400 font-medium">
              <Clock className="w-3.5 h-3.5 mr-1 inline shrink-0" />
              {settings.operatingHoursWeekday}
            </span>
            <span className="hidden lg:inline-flex items-center text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-sky-400 inline shrink-0" />
              GSTIN: {settings.gstin}
            </span>
          </div>

          <div className="flex items-center justify-center gap-3 text-xs">
            <a 
              href={`tel:${settings.phonePrimary}`} 
              className="inline-flex items-center text-slate-300 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 mr-1 text-amber-400" />
              <span className="font-semibold">{settings.phonePrimary}</span>
            </a>
            <span className="text-slate-600">|</span>
            <a 
              href={`https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}?text=Hello%20JYOTI%20INFOMEDIA%2C%20I%20want%20to%20inquire%20about%20a%20product`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center text-emerald-400 hover:text-emerald-300 font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5 mr-1" />
              WhatsApp Store
            </a>
          </div>
        </div>
      </div>

      {/* Main Brand & Actions Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo & Tag */}
          <button 
            onClick={() => setCurrentView('store')}
            className="flex items-center gap-3 text-left group focus:outline-hidden"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 font-display">
                  JYOTI <span className="text-blue-600">INFOMEDIA</span>
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                  Open Now
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 hidden sm:block">
                Mahavir Marg, Kochadhaman • Kishanganj's Tech Store
              </p>
            </div>
          </button>

          {/* Search Input (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search iPhone 16, Galaxy S24, Vivo V40, Laptops..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (currentView !== 'store') setCurrentView('store');
                }}
                className="w-full pl-10 pr-4 py-2 bg-slate-100 hover:bg-slate-50 focus:bg-white text-sm text-slate-800 placeholder-slate-400 border border-slate-200 focus:border-blue-500 rounded-xl outline-hidden transition-all shadow-inner/5"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs bg-slate-200 rounded-full w-4 h-4 flex items-center justify-center"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Right Action Icons & Admin Gateway */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Track Order Button */}
            <button
              onClick={() => setIsTrackOrderOpen(true)}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              <PackageCheck className="w-4 h-4 text-blue-600" />
              <span>Track Order</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors flex items-center gap-1.5"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 text-slate-800" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[11px] font-bold h-5 min-w-[20px] px-1 rounded-full flex items-center justify-center shadow-xs animate-pulse">
                  {cartCount}
                </span>
              )}
              <span className="hidden sm:inline-block text-xs font-bold text-slate-700">
                Cart
              </span>
            </button>

            {/* Admin Switcher / Authentication button */}
            {currentUser ? (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <button
                  onClick={() => setCurrentView(currentView === 'admin' ? 'store' : 'admin')}
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
                    currentView === 'admin'
                      ? 'bg-slate-900 text-white hover:bg-slate-800'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:brightness-105'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span className="hidden sm:inline">
                    {currentView === 'admin' ? 'View Storefront' : 'Admin Panel'}
                  </span>
                  <span className="bg-white/20 text-white text-[10px] px-1.5 py-0.5 rounded-md uppercase tracking-wider">
                    {currentUser.role === 'super_admin' ? 'Owner' : currentUser.role.replace('_', ' ')}
                  </span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAdminAuthOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-blue-600 bg-slate-100 hover:bg-blue-50 rounded-xl transition-all"
              >
                <UserCheck className="w-4 h-4 text-slate-500" />
                <span className="hidden sm:inline">Admin Login</span>
              </button>
            )}

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden text-slate-700 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Brand Bar (Desktop Navigation) */}
        <div className="hidden md:flex items-center justify-between pt-3 mt-2 border-t border-slate-100 text-xs font-semibold text-slate-600">
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={handleAllProductsClick}
              className="px-3 py-1.5 rounded-lg hover:text-blue-600 hover:bg-slate-50 transition-colors"
            >
              All Products
            </button>
            <span className="text-slate-300">/</span>

            {/* Apple */}
            <button
              onClick={() => handleBrandClick('Apple')}
              className="px-3 py-1.5 rounded-lg flex items-center gap-1.5 hover:text-black hover:bg-slate-100 transition-colors font-bold text-slate-900"
            >
              <span className="text-sm">🍎</span> Apple Store
            </button>

            {/* Samsung */}
            <button
              onClick={() => handleBrandClick('Samsung')}
              className="px-3 py-1.5 rounded-lg flex items-center gap-1.5 hover:text-blue-700 hover:bg-blue-50 transition-colors font-bold text-blue-900"
            >
              <span className="w-2 h-2 rounded-full bg-blue-600 inline-block"></span>
              Samsung Galaxy
            </button>

            {/* Vivo */}
            <button
              onClick={() => handleBrandClick('Vivo')}
              className="px-3 py-1.5 rounded-lg flex items-center gap-1.5 hover:text-indigo-600 hover:bg-indigo-50 transition-colors font-bold text-indigo-900"
            >
              <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block"></span>
              Vivo Series
            </button>

            <span className="text-slate-300">/</span>

            {/* Laptops */}
            <button
              onClick={() => {
                setSelectedCategory('Laptops');
                setSelectedBrand('All');
                setCurrentView('store');
                const el = document.getElementById('catalog-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3 py-1.5 rounded-lg hover:text-blue-600 hover:bg-slate-50 transition-colors"
            >
              Laptops & MacBooks
            </button>

            {/* Smart TVs */}
            <button
              onClick={() => {
                setSelectedCategory('Smart TVs');
                setSelectedBrand('All');
                setCurrentView('store');
                const el = document.getElementById('catalog-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3 py-1.5 rounded-lg hover:text-blue-600 hover:bg-slate-50 transition-colors"
            >
              4K Smart TVs
            </button>
          </div>

          <div className="flex items-center gap-3 text-slate-500">
            <button
              onClick={handleStoreDetailsClick}
              className="inline-flex items-center gap-1 hover:text-blue-600 transition-colors cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <span>Mahavir Marg Store Location & Hours</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Apple, Samsung, Vivo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 text-sm bg-slate-100 rounded-lg border border-slate-200"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm font-semibold">
            <button
              onClick={handleAllProductsClick}
              className="p-2.5 text-left bg-slate-50 rounded-lg hover:bg-slate-100"
            >
              All Products
            </button>
            <button
              onClick={() => handleBrandClick('Apple')}
              className="p-2.5 text-left bg-slate-50 rounded-lg text-slate-900 font-bold"
            >
              🍎 Apple Store
            </button>
            <button
              onClick={() => handleBrandClick('Samsung')}
              className="p-2.5 text-left bg-blue-50 text-blue-900 rounded-lg font-bold"
            >
              🔷 Samsung
            </button>
            <button
              onClick={() => handleBrandClick('Vivo')}
              className="p-2.5 text-left bg-indigo-50 text-indigo-900 rounded-lg font-bold"
            >
              ✨ Vivo
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2 text-xs">
            <button
              onClick={() => {
                setIsTrackOrderOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 p-2 rounded-lg bg-slate-100 font-medium"
            >
              <PackageCheck className="w-4 h-4 text-blue-600" />
              <span>Track Your Order by Phone / ID</span>
            </button>
            <button
              onClick={handleStoreDetailsClick}
              className="flex items-center gap-2 p-2 rounded-lg bg-slate-100 font-medium"
            >
              <MapPin className="w-4 h-4 text-rose-500" />
              <span>Showroom Address & Timings</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
