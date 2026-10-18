import React from 'react';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Navigation, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Store,
  Calendar,
  MessageCircle,
  Smartphone,
  Cpu,
  BadgePercent
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const StoreInfoSection: React.FC = () => {
  const { settings } = useStore();

  return (
    <section id="store-info-section" className="py-16 bg-gradient-to-b from-white to-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Store className="w-3.5 h-3.5" />
            Official Retail Showroom
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
            Visit JYOTI INFOMEDIA in Kochadhaman
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Experience the latest flagship technology in person. Test Apple camera controls, Samsung AI displays, 
            and Vivo ZEISS portrait modes in our modern showroom with dedicated tech specialists.
          </p>
        </div>

        {/* 2-Column Store Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Store Address, Hours & Contacts Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl shadow-slate-200/50 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Store Identity */}
              <div className="flex items-start justify-between pb-6 border-b border-slate-100 gap-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                    {settings.storeName}
                  </h3>
                  <p className="text-sm font-medium text-blue-600 mt-0.5">
                    Authorized Electronics & Smartphone Store
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    GSTIN: <span className="font-mono font-semibold text-slate-700">{settings.gstin}</span>
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold shrink-0">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Open Today
                </span>
              </div>

              {/* Exact Location & Landmark */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="flex items-center gap-2 text-rose-600 text-xs font-bold uppercase tracking-wider">
                    <MapPin className="w-4 h-4" />
                    Store Address
                  </div>
                  <div className="text-sm text-slate-800 font-medium leading-relaxed">
                    <p className="font-bold text-slate-900">{settings.addressLine}</p>
                    <p>{settings.marketArea}, {settings.district}</p>
                    <p>{settings.state} - {settings.pincode}</p>
                    <p className="text-xs text-slate-500 mt-1 font-normal">
                      Landmark: Central Market, Near Post Office Chowk
                    </p>
                  </div>
                </div>

                {/* Operating Hours Box */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider">
                    <Clock className="w-4 h-4" />
                    Operating Hours
                  </div>
                  <div className="text-xs text-slate-700 space-y-1.5">
                    <div className="flex justify-between items-center pb-1 border-b border-slate-200/60">
                      <span className="font-semibold text-slate-900">Monday - Saturday:</span>
                      <span className="text-blue-700 font-bold">9:00 AM - 8:30 PM</span>
                    </div>
                    <div className="flex justify-between items-center pb-1 border-b border-slate-200/60">
                      <span className="font-semibold text-slate-900">Sunday:</span>
                      <span className="text-amber-700 font-bold">10:00 AM - 4:30 PM</span>
                    </div>
                    <div className="text-[11px] text-slate-500 pt-0.5">
                      ✓ Open on festive days with extended hours
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information & Action Buttons */}
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <p className="text-xs font-bold text-blue-900 uppercase tracking-wide">
                    Direct Store Assistance
                  </p>
                  <p className="text-sm text-slate-700 font-semibold">
                    {settings.phonePrimary} / {settings.phoneSecondary}
                  </p>
                  <p className="text-xs text-slate-500">
                    {settings.email}
                  </p>
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <a
                    href={`https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}?text=Hi%20Jyoti%20Infomedia%2C%20I%20am%20inquiring%20about%20store%20availability`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href={`tel:${settings.phonePrimary}`}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-all"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Store</span>
                  </a>
                </div>
              </div>

            </div>

            {/* In-Store Benefits Banner */}
            <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
              <div className="p-2">
                <span className="font-bold text-slate-900 block">Live Demos</span>
                <span className="text-[11px] text-slate-500">Apple & Android</span>
              </div>
              <div className="p-2">
                <span className="font-bold text-slate-900 block">Free Setup</span>
                <span className="text-[11px] text-slate-500">Complete data copy</span>
              </div>
              <div className="p-2">
                <span className="font-bold text-slate-900 block">Instant EMI</span>
                <span className="text-[11px] text-slate-500">Bajaj & Credit card</span>
              </div>
              <div className="p-2">
                <span className="font-bold text-slate-900 block">GST Invoice</span>
                <span className="text-[11px] text-slate-500">Claim 18% Input tax</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Location Map Card & Service Radius */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div className="space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-indigo-900">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                  <Navigation className="w-4 h-4" />
                  Showroom Navigation Guide
                </div>
                <span className="text-xs text-indigo-300 font-mono">Kishanganj, Bihar</span>
              </div>

              {/* Stylized Map View Simulation */}
              <div className="relative rounded-2xl overflow-hidden border border-indigo-800 bg-slate-950 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-xs">
                      JI
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">JYOTI INFOMEDIA</h4>
                      <p className="text-[11px] text-indigo-300">Mahavir Marg, Kochadhaman</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-semibold">
                    Verified Location
                  </span>
                </div>

                <div className="bg-slate-900/90 rounded-xl p-3.5 border border-indigo-900/60 text-xs text-slate-300 space-y-2">
                  <p className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold">1.</span>
                    <span>From <strong>Kishanganj Railway Station</strong>: 14 km via Bahadurganj-Kishanganj Road (approx. 25 mins).</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold">2.</span>
                    <span>From <strong>Kochadhaman Block Chowk</strong>: 300 meters into Mahavir Marg market.</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold">3.</span>
                    <span>Parking available for two-wheelers and four-wheelers right in front of the store.</span>
                  </p>
                </div>

                <a
                  href="https://maps.google.com/?q=Kochadhaman+Kishanganj+Bihar"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Open in Google Maps Navigation</span>
                </a>
              </div>

              {/* Express Delivery Coverage Box */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-indigo-200 uppercase tracking-wider">
                  Same-Day Local Delivery Coverage
                </h4>
                <div className="flex flex-wrap gap-1.5 text-xs">
                  {['Kochadhaman', 'Kishanganj City', 'Bahadurganj', 'Thakurganj', 'Pothia', 'Dighalbank', 'Chhatargachh'].map((area) => (
                    <span key={area} className="px-2.5 py-1 rounded-lg bg-indigo-900/50 border border-indigo-700/60 text-indigo-200 font-medium">
                      ✓ {area}
                    </span>
                  ))}
                </div>
                <p className="text-[11px] text-slate-400">
                  * Orders confirmed before 4:00 PM are delivered same-day across Kishanganj District.
                </p>
              </div>

            </div>

            <div className="pt-4 border-t border-indigo-900/60 text-xs text-indigo-300 flex items-center justify-between">
              <span>Customer Helpline: <strong className="text-white">+91 94312 88421</strong></span>
              <span className="text-amber-400 font-semibold">Store Pickup in 30 Mins</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
