import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  Headphones, 
  Sparkles,
  ExternalLink,
  MessageCircle,
  Award
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { BrandType } from '../../types';

export const Footer: React.FC = () => {
  const { settings, setSelectedBrand, setSelectedCategory, setCurrentView, setIsAdminAuthOpen, currentUser } = useStore();

  const handleBrandClick = (brand: BrandType) => {
    setSelectedBrand(brand);
    setSelectedCategory('All');
    setCurrentView('store');
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      {/* 4 Pillars Trust Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl shrink-0 border border-blue-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">100% Genuine Products</h4>
              <p className="text-xs text-slate-400 mt-1">
                Authorized stock with original company seal, official warranty & valid GST invoice.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl shrink-0 border border-emerald-500/20">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Local Kishanganj Delivery</h4>
              <p className="text-xs text-slate-400 mt-1">
                Fast same-day delivery across Kochadhaman & Kishanganj District or instant store pickup.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl shrink-0 border border-amber-500/20">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">0% Easy EMI & Exchange</h4>
              <p className="text-xs text-slate-400 mt-1">
                Bajaj Finserv, HDFC, TVS Credit, and instant old smartphone exchange valuation.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl shrink-0 border border-purple-500/20">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Local After-Sales Care</h4>
              <p className="text-xs text-slate-400 mt-1">
                Walk into Mahavir Marg store anytime for data transfer, accessories, and tech assistance.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        
        {/* Brand & Address Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <span className="text-xl font-black text-white font-display tracking-tight">
                JYOTI <span className="text-blue-500">INFOMEDIA</span>
              </span>
              <p className="text-xs text-slate-400">Electronics & Smartphone Superstore</p>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            Serving Kochadhaman, Kishanganj and North-East Bihar with genuine mobile phones, laptops, smart TVs, and premium audio technology directly from authorized brand channels.
          </p>

          <div className="space-y-2 pt-2 text-xs text-slate-300">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Physical Showroom:</strong>
                <p>{settings.addressLine}, {settings.marketArea}, {settings.district}, {settings.state} - {settings.pincode}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Helpline: <strong className="text-white">{settings.phonePrimary}</strong> / {settings.phoneSecondary}</span>
            </div>

            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Email: <strong className="text-white">{settings.email}</strong></span>
            </div>

            <div className="flex items-center gap-2.5">
              <Award className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Government GSTIN: <strong className="text-white">{settings.gstin}</strong></span>
            </div>
          </div>

          <div className="pt-2 flex gap-3">
            <a
              href={`https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              Direct WhatsApp Order
            </a>

            <a
              href="https://maps.google.com/?q=Kochadhaman+Kishanganj+Bihar"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
            >
              <span>Get Directions</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Operating Hours Column */}
        <div>
          <h5 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-400" />
            Operating Hours
          </h5>
          <ul className="space-y-3 text-xs text-slate-400">
            <li className="pb-2 border-b border-slate-800">
              <span className="text-white font-medium block">Monday - Saturday</span>
              <span>9:00 AM - 8:30 PM</span>
            </li>
            <li className="pb-2 border-b border-slate-800">
              <span className="text-white font-medium block">Sunday</span>
              <span>10:00 AM - 4:30 PM</span>
            </li>
            <li className="pb-2 border-b border-slate-800">
              <span className="text-white font-medium block">Emergency Order Support</span>
              <span>24/7 on WhatsApp (+91 94312 88421)</span>
            </li>
            <li className="text-emerald-400 font-medium">
              ● Store open today for walk-ins & demonstrations
            </li>
          </ul>
        </div>

        {/* Featured Brands */}
        <div>
          <h5 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
            Authorized Brands
          </h5>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li>
              <button 
                onClick={() => handleBrandClick('Apple')}
                className="hover:text-white transition-colors text-left flex items-center gap-1.5"
              >
                <span>🍎</span> Apple (iPhone, MacBook, Watch)
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleBrandClick('Samsung')}
                className="hover:text-white transition-colors text-left flex items-center gap-1.5"
              >
                <span className="w-2 h-2 rounded-full bg-blue-500"></span> Samsung Galaxy & Smart TVs
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleBrandClick('Vivo')}
                className="hover:text-white transition-colors text-left flex items-center gap-1.5"
              >
                <span className="w-2 h-2 rounded-full bg-indigo-400"></span> Vivo V-Series & X-Series
              </button>
            </li>
            <li>
              <button 
                onClick={() => {
                  setSelectedCategory('Laptops');
                  setCurrentView('store');
                  const el = document.getElementById('catalog-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-white transition-colors text-left"
              >
                HP & Dell Computing
              </button>
            </li>
            <li>
              <button 
                onClick={() => {
                  setSelectedCategory('Audio & Wearables');
                  setCurrentView('store');
                  const el = document.getElementById('catalog-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-white transition-colors text-left"
              >
                Sony & Boat Audio
              </button>
            </li>
          </ul>
        </div>

        {/* Service Areas & Admin Gateway */}
        <div>
          <h5 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
            Service Coverage
          </h5>
          <ul className="space-y-2 text-xs text-slate-400">
            <li className="flex items-center gap-1.5">
              <span className="text-emerald-400">✓</span> Kochadhaman Bazar
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-emerald-400">✓</span> Kishanganj City & Railway Stn
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-emerald-400">✓</span> Bahadurganj Market
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-emerald-400">✓</span> Thakurganj & Pothia
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-emerald-400">✓</span> Dighalbank Border Area
            </li>
          </ul>

          <div className="mt-6 pt-4 border-t border-slate-800">
            <h6 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Staff Access</h6>
            <button
              onClick={() => {
                if (currentUser) {
                  setCurrentView('admin');
                } else {
                  setIsAdminAuthOpen(true);
                }
              }}
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold underline decoration-dotted flex items-center gap-1"
            >
              <span>{currentUser ? 'Open Admin Dashboard' : 'Admin Login / Register'}</span>
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 mt-10 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>© {new Date().getFullYear()} JYOTI INFOMEDIA, Mahavir Marg, Kochadhaman, Kishanganj. All rights reserved.</p>
        <p className="flex items-center gap-2">
          <span>Official Authorized Retailer</span>
          <span>•</span>
          <span>GST Compliant</span>
          <span>•</span>
          <span>Bihar, India</span>
        </p>
      </div>
    </footer>
  );
};
