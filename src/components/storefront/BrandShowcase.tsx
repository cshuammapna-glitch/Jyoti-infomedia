import React from 'react';
import { Sparkles, ArrowRight, Check, ShieldCheck, Zap } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { BrandType } from '../../types';

export const BrandShowcase: React.FC = () => {
  const { selectedBrand, setSelectedBrand, setSelectedCategory } = useStore();

  const brandCards: {
    brand: BrandType;
    icon: string;
    badge: string;
    title: string;
    tagline: string;
    points: string[];
    gradient: string;
    accentColor: string;
    bgHover: string;
  }[] = [
    {
      brand: 'Apple',
      icon: '🍎',
      badge: 'Authorized Apple Retailer',
      title: 'Apple Experience',
      tagline: 'iPhone 16 Pro, MacBook Air M3 & Apple Watch Series 10',
      points: [
        'A18 Pro & Apple Intelligence Ready',
        'Official Apple India 1-Year Warranty',
        '100% Genuine Sealed Packaging with GST Bill'
      ],
      gradient: 'from-slate-900 via-neutral-900 to-stone-900',
      accentColor: 'text-amber-400',
      bgHover: 'hover:border-slate-400'
    },
    {
      brand: 'Samsung',
      icon: '🔷',
      badge: 'Samsung Galaxy Hub',
      title: 'Samsung Galaxy & TVs',
      tagline: 'Galaxy S24 Ultra, Z Flip 6 & 55" Crystal 4K Smart TVs',
      points: [
        'Galaxy AI Live Translate & Circle to Search',
        '200MP Quad Tele & ProVisual Engine',
        '0% Interest Bajaj Finserv EMI Available'
      ],
      gradient: 'from-blue-950 via-slate-900 to-indigo-950',
      accentColor: 'text-blue-400',
      bgHover: 'hover:border-blue-400'
    },
    {
      brand: 'Vivo',
      icon: '✨',
      badge: 'Vivo Master Partner',
      title: 'Vivo ZEISS Optics',
      tagline: 'Vivo X100 Pro, V40 Pro 5G & Ultra-Slim Y-Series',
      points: [
        'Co-engineered ZEISS Professional Portrait Camera',
        'Aura Light Studio Flash & 5500mAh Battery',
        'Instant Screen Protection Applied at Store'
      ],
      gradient: 'from-indigo-950 via-slate-900 to-purple-950',
      accentColor: 'text-indigo-400',
      bgHover: 'hover:border-indigo-400'
    }
  ];

  const handleSelect = (brand: BrandType) => {
    setSelectedBrand(brand);
    setSelectedCategory('All');
    const catalog = document.getElementById('catalog-section');
    if (catalog) {
      catalog.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider mb-2">
              <Zap className="w-3.5 h-3.5" />
              Brand Flagships
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              Explore Our Major Brand Collections
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Direct authorized inventory with brand warranty and local after-sales service at Kochadhaman.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setSelectedBrand('All');
                setSelectedCategory('All');
                const catalog = document.getElementById('catalog-section');
                if (catalog) catalog.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedBrand === 'All'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Show All Brands
            </button>
          </div>
        </div>

        {/* 3 Major Brand Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {brandCards.map((b) => {
            const isSelected = selectedBrand === b.brand;
            return (
              <div
                key={b.brand}
                onClick={() => handleSelect(b.brand)}
                className={`relative rounded-3xl p-6 sm:p-7 bg-gradient-to-br ${b.gradient} text-white border-2 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 shadow-xl flex flex-col justify-between ${
                  isSelected ? 'border-blue-400 ring-4 ring-blue-500/20 shadow-blue-500/10' : 'border-slate-800 ' + b.bgHover
                }`}
              >
                <div>
                  {/* Top Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-2xl">{b.icon}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-xs text-slate-200 border border-white/10">
                      {b.badge}
                    </span>
                  </div>

                  <h4 className="text-xl font-bold font-display text-white">{b.title}</h4>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">{b.tagline}</p>

                  {/* Bullet points */}
                  <ul className="mt-5 space-y-2 text-xs text-slate-300">
                    {b.points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom CTA */}
                <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
                  <span className={`text-xs font-bold ${b.accentColor} flex items-center gap-1`}>
                    {isSelected ? 'Currently Viewing' : `View ${b.brand} Range`}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-white/20 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
