import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  ShieldCheck, 
  KeyRound, 
  UserPlus, 
  LogIn, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Briefcase
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { AdminRole } from '../../types';
import { DEFAULT_ADMIN_PASSKEY } from '../../data/seedData';

export const AdminAuthModal: React.FC = () => {
  const { 
    isAdminAuthOpen, 
    setIsAdminAuthOpen, 
    loginAdmin, 
    quickDemoLogin, 
    registerAdmin, 
    setCurrentView 
  } = useStore();

  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Login State
  const [loginEmail, setLoginEmail] = useState('admin@jyotiinfomedia.com');
  const [loginPassword, setLoginPassword] = useState('admin123');

  // Register State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regRole, setRegRole] = useState<AdminRole>('store_manager');
  const [regPasskey, setRegPasskey] = useState(DEFAULT_ADMIN_PASSKEY);

  if (!isAdminAuthOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    const res = loginAdmin(loginEmail, loginPassword);
    if (res.success) {
      setSuccessMessage(res.message);
      setTimeout(() => {
        setIsAdminAuthOpen(false);
        setCurrentView('admin');
        setSuccessMessage(null);
      }, 500);
    } else {
      setErrorMessage(res.message);
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    const res = registerAdmin({
      name: regName,
      email: regEmail,
      phone: regPhone,
      role: regRole,
      adminPasskey: regPasskey,
    });
    if (res.success) {
      setSuccessMessage(res.message);
      setTimeout(() => {
        setIsAdminAuthOpen(false);
        setCurrentView('admin');
        setSuccessMessage(null);
      }, 600);
    } else {
      setErrorMessage(res.message);
    }
  };

  const handleDemoLogin = (role: AdminRole) => {
    quickDemoLogin(role);
    setIsAdminAuthOpen(false);
    setCurrentView('admin');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
              <Lock className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-base font-bold font-display">
                Staff & Admin Portal
              </h3>
              <p className="text-xs text-slate-400">
                JYOTI INFOMEDIA • Kochadhaman
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAdminAuthOpen(false)}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher: Login vs Register */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-bold">
          <button
            onClick={() => {
              setAuthMode('login');
              setErrorMessage(null);
            }}
            className={`flex-1 py-3 text-center transition-colors flex items-center justify-center gap-1.5 ${
              authMode === 'login'
                ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Admin Sign In</span>
          </button>

          <button
            onClick={() => {
              setAuthMode('register');
              setErrorMessage(null);
            }}
            className={`flex-1 py-3 text-center transition-colors flex items-center justify-center gap-1.5 ${
              authMode === 'register'
                ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Staff Registration</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4">
          
          {/* Status Notifications */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2 text-xs text-rose-700">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-2 text-xs text-emerald-700">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* LOGIN FORM */}
          {authMode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-slate-700 mb-1 block">Staff Email</label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:border-blue-500 outline-hidden font-medium text-slate-900"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 mb-1 block">Password</label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:border-blue-500 outline-hidden font-medium text-slate-900"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
              >
                Sign In to Dashboard
              </button>

              {/* 1-Click Role Testing Quick Buttons */}
              <div className="pt-3 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2 text-center">
                  Quick Demo Access (Select Role)
                </span>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => handleDemoLogin('super_admin')}
                    className="p-2 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 rounded-xl border border-slate-200 font-semibold text-center transition-all text-[11px]"
                  >
                    👑 Super Admin
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDemoLogin('store_manager')}
                    className="p-2 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 rounded-xl border border-slate-200 font-semibold text-center transition-all text-[11px]"
                  >
                    🏬 Store Manager
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDemoLogin('inventory_staff')}
                    className="p-2 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 rounded-xl border border-slate-200 font-semibold text-center transition-all text-[11px]"
                  >
                    📦 Inventory
                  </button>
                </div>
              </div>
            </form>
          ) : (
            /* REGISTRATION FORM */
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 mb-1 block">Full Name *</label>
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:border-blue-500 outline-hidden font-medium text-slate-900"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 mb-1 block">Work Email *</label>
                <input
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="name@jyotiinfomedia.com"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:border-blue-500 outline-hidden font-medium text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold text-slate-700 mb-1 block">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="+91 94312..."
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl text-slate-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 mb-1 block">Assign Role *</label>
                  <select
                    value={regRole}
                    onChange={(e) => setRegRole(e.target.value as AdminRole)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl font-semibold text-slate-800 bg-white"
                  >
                    <option value="store_manager">Store Manager</option>
                    <option value="inventory_staff">Inventory Staff</option>
                    <option value="sales_executive">Sales Executive</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                </div>
              </div>

              {/* Master Admin Passkey */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold text-slate-800 flex items-center gap-1">
                    <KeyRound className="w-3.5 h-3.5 text-blue-600" />
                    <span>Store Master Passkey *</span>
                  </label>
                  <span className="text-[10px] text-blue-600 font-mono font-bold bg-blue-100 px-1.5 py-0.5 rounded-md">
                    Key: {DEFAULT_ADMIN_PASSKEY}
                  </span>
                </div>
                <input
                  type="text"
                  required
                  value={regPasskey}
                  onChange={(e) => setRegPasskey(e.target.value)}
                  placeholder={DEFAULT_ADMIN_PASSKEY}
                  className="w-full px-3 py-1.5 text-xs font-mono border border-slate-300 rounded-lg text-slate-900"
                />
                <p className="text-[10px] text-slate-500">
                  Required to prevent unauthorized signups to JYOTI INFOMEDIA system.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
              >
                Create Staff Account & Sign In
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
