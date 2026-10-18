import React from 'react';
import { 
  Sparkles, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  PhoneCall, 
  CheckCircle2, 
  ShoppingBag,
  Zap
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { BrandType } from '../../types';

export const HeroBanner: React.FC = () => {
  const { settings, setSelectedBrand, setSelectedCategory } = useStore();

  const handleBrandPick = (brand: BrandType) => {
    setSelectedBrand(brand);
    setSelectedCategory('All');
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToStoreInfo = () => {
    const el = document.getElementById('store-info-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none"></div>

      {/* Announcement Strip */}
      <div className="border-b border-indigo-900/60 bg-indigo-950/70 px-4 py-2 text-center text-xs text-indigo-200">
        <span className="font-semibold text-amber-300">★ Official Retail Partner: </span>
        {settings.announcementText}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Store Positioning & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Location & Status Badge */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 bg-slate-800/80 border border-slate-700/80 px-3.5 py-1.5 rounded-full text-xs shadow-inner">
              <span className="flex items-center text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping mr-2 inline-block"></span>
                Showroom Open Now
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300 flex items-center">
                <MapPin className="w-3.5 h-3.5 text-rose-400 mr-1" />
                Mahavir Marg, Kochadhaman, Kishanganj
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight font-display">
              The Authorized <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">
                Electronics Hub
              </span>{" "}
              of Kishanganj
            </h1>

            <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              Welcome to <strong className="text-white font-semibold">{settings.storeName}</strong>. 
              Explore authentic Apple iPhones, Samsung Galaxy flagships, and Vivo portrait series with 
              verified brand warranty, genuine GST bills, and zero-down-payment EMI schemes right here at Kochadhaman.
            </p>

            {/* Quick Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-w-lg mx-auto lg:mx-0 text-xs">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-800/50 border border-slate-700/60 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Sealed Stock</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-800/50 border border-slate-700/60 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Instant Store Pickup</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-800/50 border border-slate-700/60 text-slate-200 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Bajaj 0% EMI</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={scrollToCatalog}
                className="px-6 py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Browse Products & Deals</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={scrollToStoreInfo}
                className="px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm rounded-xl border border-slate-700 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Store Address & Timings</span>
              </button>

              <a
                href={`tel:${settings.phonePrimary}`}
                className="p-3.5 bg-slate-800/80 hover:bg-slate-700 text-emerald-400 rounded-xl border border-slate-700 transition-colors"
                title="Call Jyoti Infomedia"
              >
                <PhoneCall className="w-4 h-4" />
              </a>
            </div>

            {/* Operating Hours Ticker */}
            <div className="pt-2 text-xs text-slate-400 flex items-center justify-center lg:justify-start gap-2">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>
                Operating Hours: <strong className="text-slate-200">{settings.operatingHoursWeekday}</strong> (Sunday: {settings.operatingHoursSunday})
              </span>
            </div>

          </div>

          {/* Right Column: Interactive Featured Brand Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-1 rounded-3xl bg-gradient-to-b from-blue-500/30 via-indigo-500/20 to-transparent shadow-2xl">
              <div className="bg-slate-900/90 rounded-[22px] p-5 sm:p-6 backdrop-blur-xl border border-slate-800 space-y-4">
                
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                      Featured Brand Boutiques
                    </span>
                  </div>
                  <span className="text-[11px] text-blue-400 font-medium">Kochadhaman Showroom</span>
                </div>

                {/* 1. Apple Boutique Card */}
                <button
                  onClick={() => handleBrandPick('Apple')}
                  className="w-full text-left p-3.5 rounded-2xl bg-gradient-to-r from-slate-800/90 to-slate-850 hover:from-slate-750 hover:to-slate-800 border border-slate-700 hover:border-slate-500 transition-all group flex items-center justify-between"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-black border border-slate-700 flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform">
                      🍎
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-white text-sm">Apple Flagship Corner</h3>
                        <span className="bg-sky-500/20 text-sky-300 text-[10px] px-2 py-0.5 rounded-full font-medium">
                          A18 Pro
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        iPhone 16 Pro, MacBook Air M3, AirPods Pro 2
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </button>

                {/* 2. Samsung Galaxy Card */}
                <button
                  onClick={() => handleBrandPick('Samsung')}
                  className="w-full text-left p-3.5 rounded-2xl bg-gradient-to-r from-slate-800/90 to-slate-850 hover:from-slate-750 hover:to-slate-800 border border-slate-700 hover:border-blue-500 transition-all group flex items-center justify-between"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-blue-950 border border-blue-700/50 flex items-center justify-center text-blue-400 font-black text-sm shrink-0 group-hover:scale-105 transition-transform">
                      S
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-white text-sm">Samsung Galaxy Zone</h3>
                        <span className="bg-blue-500/20 text-blue-300 text-[10px] px-2 py-0.5 rounded-full font-medium">
                          Galaxy AI
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Galaxy S24 Ultra, Z Flip 6, Crystal 4K TVs
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                </button>

                {/* 3. Vivo Portrait Card */}
                <button
                  onClick={() => handleBrandPick('Vivo')}
                  className="w-full text-left p-3.5 rounded-2xl bg-gradient-to-r from-slate-800/90 to-slate-850 hover:from-slate-750 hover:to-slate-800 border border-slate-700 hover:border-indigo-500 transition-all group flex items-center justify-between"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-indigo-950 border border-indigo-700/50 flex items-center justify-center text-indigo-400 font-black text-xs shrink-0 group-hover:scale-105 transition-transform">
                      vivo
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-white text-sm">Vivo Portrait Hub</h3>
                        <span className="bg-indigo-500/20 text-indigo-300 text-[10px] px-2 py-0.5 rounded-full font-medium">
                          ZEISS
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Vivo X100 Pro, V40 Pro 5G, T3 Ultra series
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                </button>

                {/* Trust Footer inside card */}
                <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Authorized Brand Invoices
                  </span>
                  <span className="text-slate-300 font-medium">GST Billing Included</span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
