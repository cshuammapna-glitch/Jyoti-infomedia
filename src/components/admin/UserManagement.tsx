import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  ShieldCheck, 
  UserX, 
  KeyRound, 
  Mail, 
  Phone, 
  CheckCircle2, 
  Clock,
  Sparkles,
  ShoppingBag,
  X
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { AdminUser, AdminRole } from '../../types';

export const UserManagement: React.FC = () => {
  const { adminUsers, currentUser, toggleUserStatus, updateAdminUser, registerAdmin, orders } = useStore();

  const [activeTab, setActiveTab] = useState<'staff' | 'customers'>('staff');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New staff state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<AdminRole>('store_manager');

  const handleCreateStaff = (e: React.FormEvent) => {
    e.preventDefault();
    registerAdmin({
      name,
      email,
      phone,
      role,
      adminPasskey: 'JYOTI@ADMIN2026',
    });
    setName('');
    setEmail('');
    setPhone('');
    setIsAddModalOpen(false);
  };

  // Derive unique customers from orders
  const customerList = React.useMemo(() => {
    const map = new Map<string, { name: string; phone: string; email: string; city: string; ordersCount: number; totalSpent: number }>();
    orders.forEach((o) => {
      const key = o.customer.phone || o.customer.email || o.customer.name;
      const existing = map.get(key);
      if (existing) {
        existing.ordersCount += 1;
        existing.totalSpent += o.total;
      } else {
        map.set(key, {
          name: o.customer.name,
          phone: o.customer.phone,
          email: o.customer.email,
          city: o.customer.city,
          ordersCount: 1,
          totalSpent: o.total,
        });
      }
    });
    return Array.from(map.values());
  }, [orders]);

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-xl font-black text-slate-900 font-display">
            User & Access Management
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage administrative permissions, store associates, and registered customers.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 w-fit cursor-pointer"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add New Staff Account</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-4 text-xs font-bold">
        <button
          onClick={() => setActiveTab('staff')}
          className={`pb-3 px-1 transition-colors flex items-center gap-2 border-b-2 ${
            activeTab === 'staff'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Administrative Team & Staff ({adminUsers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('customers')}
          className={`pb-3 px-1 transition-colors flex items-center gap-2 border-b-2 ${
            activeTab === 'customers'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Verified Customers Directory ({customerList.length})</span>
        </button>
      </div>

      {/* TAB 1: Admin Staff */}
      {activeTab === 'staff' ? (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px] font-bold">
                  <th className="py-3 px-4">Member Name</th>
                  <th className="py-3 px-4">Role & Access</th>
                  <th className="py-3 px-4">Contact Phone</th>
                  <th className="py-3 px-4">Last Activity</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {adminUsers.map((user) => {
                  const isSelf = currentUser?.id === user.id;
                  return (
                    <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* Name & Avatar */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 border border-blue-200">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block">
                              {user.name} {isSelf && <span className="text-[10px] text-blue-600 font-normal">(You)</span>}
                            </span>
                            <span className="text-[11px] text-slate-500">{user.email}</span>
                          </div>
                        </div>
                      </td>

                      {/* Role Dropdown */}
                      <td className="py-3.5 px-4">
                        <select
                          value={user.role}
                          onChange={(e) => updateAdminUser(user.id, { role: e.target.value as AdminRole })}
                          disabled={user.role === 'super_admin' && isSelf}
                          className="px-2 py-1 rounded-lg border border-slate-300 text-xs font-bold text-slate-800 bg-white"
                        >
                          <option value="super_admin">Super Admin (Owner)</option>
                          <option value="store_manager">Store Manager</option>
                          <option value="inventory_staff">Inventory Staff</option>
                          <option value="sales_executive">Sales Executive</option>
                        </select>
                      </td>

                      {/* Phone */}
                      <td className="py-3.5 px-4 font-mono text-slate-700">
                        {user.phone}
                      </td>

                      {/* Last Login */}
                      <td className="py-3.5 px-4 text-slate-500">
                        {new Date(user.lastLogin).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          user.status === 'active'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}>
                          {user.status === 'active' ? 'Active' : 'Suspended'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => toggleUserStatus(user.id)}
                          disabled={user.role === 'super_admin' && isSelf}
                          className="px-2.5 py-1 rounded-lg border border-slate-300 text-[11px] font-bold hover:bg-slate-100 disabled:opacity-40"
                        >
                          {user.status === 'active' ? 'Deactivate' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* TAB 2: Customer Directory */
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px] font-bold">
                  <th className="py-3 px-4">Customer Name</th>
                  <th className="py-3 px-4">Phone Number</th>
                  <th className="py-3 px-4">Email Address</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Total Orders</th>
                  <th className="py-3 px-4 text-right">Lifetime Spend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {customerList.map((cust, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">{cust.name}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-700">{cust.phone}</td>
                    <td className="py-3.5 px-4 text-slate-600">{cust.email || 'N/A'}</td>
                    <td className="py-3.5 px-4 text-slate-700">{cust.city}</td>
                    <td className="py-3.5 px-4 font-bold text-blue-600">{cust.ordersCount}</td>
                    <td className="py-3.5 px-4 text-right font-black text-slate-900 font-mono">
                      {formatPrice(cust.totalSpent)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Staff Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-900 text-base font-display">
                Create New Staff Profile
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateStaff} className="p-6 space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 mb-1 block">Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 mb-1 block">Work Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ramesh@jyotiinfomedia.com"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 mb-1 block">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 94312..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 mb-1 block">System Role *</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as AdminRole)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-semibold bg-white"
                >
                  <option value="store_manager">Store Manager</option>
                  <option value="inventory_staff">Inventory Staff</option>
                  <option value="sales_executive">Sales Executive</option>
                  <option value="super_admin">Super Admin (Owner)</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-md"
                >
                  Confirm & Provision Staff Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
