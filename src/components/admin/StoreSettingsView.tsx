import React, { useState } from 'react';
import { 
  Settings, 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  ShieldCheck, 
  RotateCcw, 
  Save, 
  CheckCircle2, 
  Sparkles,
  AlertTriangle
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const StoreSettingsView: React.FC = () => {
  const { settings, updateSettings, resetAllDataToDefaults } = useStore();
  const [formData, setFormData] = useState(settings);
  const [savedAlert, setSavedAlert] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 2500);
  };

  const handleResetData = () => {
    if (window.confirm('Reset all products, orders, and staff records back to default demo state?')) {
      resetAllDataToDefaults();
      setFormData(settings);
      alert('System successfully reset to default demo catalog!');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-xl font-black text-slate-900 font-display">
            Store Profile & Operating Hours Configuration
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Update store showroom address in Kochadhaman, phone lines, GSTIN, and visitor announcements.
          </p>
        </div>

        {savedAlert && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Store Settings Updated!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Section 1: Store Details & Location */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-800">
            <MapPin className="w-4 h-4 text-rose-500" />
            <span>Showroom Identity & Location</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 mb-1 block">Store Trade Name *</label>
              <input
                type="text"
                required
                value={formData.storeName}
                onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-slate-900"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 mb-1 block">Government GSTIN *</label>
              <input
                type="text"
                required
                value={formData.gstin}
                onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono font-bold text-slate-900"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-bold text-slate-700 mb-1 block">Street / Market Address *</label>
              <input
                type="text"
                required
                value={formData.addressLine}
                onChange={(e) => setFormData({ ...formData, addressLine: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 font-medium"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 mb-1 block">Area / Block *</label>
              <input
                type="text"
                required
                value={formData.marketArea}
                onChange={(e) => setFormData({ ...formData, marketArea: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 font-medium"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 mb-1 block">District & State *</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 font-medium"
                />
                <input
                  type="text"
                  required
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 font-medium"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Operating Hours & Contacts */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-800">
            <Clock className="w-4 h-4 text-blue-600" />
            <span>Store Operating Hours & Customer Hotlines</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 mb-1 block">Weekday Hours (Mon - Sat) *</label>
              <input
                type="text"
                required
                value={formData.operatingHoursWeekday}
                onChange={(e) => setFormData({ ...formData, operatingHoursWeekday: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl font-semibold text-slate-900"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 mb-1 block">Sunday Hours *</label>
              <input
                type="text"
                required
                value={formData.operatingHoursSunday}
                onChange={(e) => setFormData({ ...formData, operatingHoursSunday: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl font-semibold text-slate-900"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 mb-1 block">Primary Phone Line *</label>
              <input
                type="text"
                required
                value={formData.phonePrimary}
                onChange={(e) => setFormData({ ...formData, phonePrimary: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono text-slate-900"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 mb-1 block">WhatsApp Orders Hotline *</label>
              <input
                type="text"
                required
                value={formData.whatsappNumber}
                onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono text-slate-900"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-bold text-slate-700 mb-1 block">Public Announcement Strip</label>
              <input
                type="text"
                value={formData.announcementText}
                onChange={(e) => setFormData({ ...formData, announcementText: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900"
              />
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <button
            type="button"
            onClick={handleResetData}
            className="px-4 py-2.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Demo Catalog & Factory Records</span>
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Store Configuration</span>
          </button>
        </div>

      </form>

    </div>
  );
};
