import React, { useState } from 'react';
import { 
  X, 
  Search, 
  PackageCheck, 
  CheckCircle2, 
  Clock, 
  Truck, 
  MapPin, 
  FileText, 
  AlertCircle,
  Phone
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { OrderStatus } from '../../types';

export const OrderTrackingModal: React.FC = () => {
  const { isTrackOrderOpen, setIsTrackOrderOpen, lookupOrder, setActiveInvoiceOrder } = useStore();
  const [searchQuery, setSearchQuery] = useState('JYOTI-2026-9041');
  const [hasSearched, setHasSearched] = useState(true);

  if (!isTrackOrderOpen) return null;

  const foundOrder = lookupOrder(searchQuery);

  const statusSteps: OrderStatus[] = [
    'Pending',
    'Confirmed',
    'Preparing',
    'Out for Delivery',
    'Delivered',
  ];

  const getStepIndex = (status: OrderStatus) => {
    return statusSteps.indexOf(status);
  };

  const currentStepIdx = foundOrder ? getStepIndex(foundOrder.orderStatus) : -1;

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <PackageCheck className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-slate-900 text-base font-display">
              Track Your Electronic Order
            </h3>
          </div>
          <button
            onClick={() => setIsTrackOrderOpen(false)}
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-6">
          {/* Search Bar */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600 block">
              Enter Order ID (e.g., JYOTI-2026-9041) or Customer Mobile Phone
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setHasSearched(true);
                  }}
                  placeholder="Order ID or Phone number..."
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:border-blue-500 outline-hidden font-medium text-slate-900"
                />
              </div>
              <button
                onClick={() => setHasSearched(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700"
              >
                Track
              </button>
            </div>
          </div>

          {/* Result Card */}
          {foundOrder ? (
            <div className="space-y-5">
              {/* Order Quick Details */}
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-blue-700 block">
                    Order Reference
                  </span>
                  <span className="font-mono font-bold text-slate-900 text-sm">
                    {foundOrder.id}
                  </span>
                  <p className="text-slate-500 text-[11px] mt-0.5">
                    Placed on: {new Date(foundOrder.date).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">
                    Status
                  </span>
                  <span className="inline-block px-2.5 py-1 rounded-full text-xs font-bold bg-blue-600 text-white shadow-xs">
                    {foundOrder.orderStatus}
                  </span>
                  <p className="text-slate-700 font-bold text-xs mt-1">
                    {formatPrice(foundOrder.total)} ({foundOrder.paymentMethod.toUpperCase()})
                  </p>
                </div>
              </div>

              {/* Progress Stepper */}
              <div className="pt-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4">
                  Live Dispatch Status
                </h4>
                <div className="relative flex items-center justify-between">
                  <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 -z-0"></div>
                  <div
                    className="absolute top-1/2 left-0 h-1 bg-blue-600 -translate-y-1/2 -z-0 transition-all duration-500"
                    style={{
                      width: `${Math.max(0, (currentStepIdx / (statusSteps.length - 1)) * 100)}%`,
                    }}
                  ></div>

                  {statusSteps.map((step, idx) => {
                    const isCompleted = idx <= currentStepIdx;
                    const isCurrent = idx === currentStepIdx;
                    return (
                      <div key={step} className="flex flex-col items-center relative z-10">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                            isCompleted
                              ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                              : 'bg-white border-slate-300 text-slate-400'
                          } ${isCurrent ? 'ring-4 ring-blue-100' : ''}`}
                        >
                          {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                        </div>
                        <span
                          className={`text-[10px] mt-2 text-center font-medium max-w-[60px] ${
                            isCurrent
                              ? 'text-blue-700 font-bold'
                              : isCompleted
                              ? 'text-slate-800'
                              : 'text-slate-400'
                          }`}
                        >
                          {step}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Items in this Order */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <span className="font-bold text-slate-900 block uppercase text-[11px] tracking-wider">
                  Ordered Equipment
                </span>
                <div className="divide-y divide-slate-200">
                  {foundOrder.items.map((item, i) => (
                    <div key={i} className="py-1.5 flex justify-between items-center text-slate-700">
                      <span className="truncate pr-3">
                        {item.productName} × {item.quantity}
                      </span>
                      <span className="font-bold shrink-0">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex justify-between text-slate-500 text-[11px]">
                  <span>Fulfillment: {foundOrder.customer.deliveryType === 'store_pickup' ? 'Mahavir Marg Store Pickup' : `Home Delivery to ${foundOrder.customer.city}`}</span>
                  <span>{foundOrder.customer.name}</span>
                </div>
              </div>

              {/* Invoice Download Action */}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setIsTrackOrderOpen(false);
                    setActiveInvoiceOrder(foundOrder);
                  }}
                  className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>View & Print GST Invoice</span>
                </button>
              </div>

            </div>
          ) : (
            hasSearched && (
              <div className="text-center py-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
                <h4 className="text-xs font-bold text-slate-800">No order found</h4>
                <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
                  Please verify your order reference number or call our Kochadhaman store at <strong>+91 94312 88421</strong>.
                </p>
              </div>
            )
          )}
        </div>

      </div>
    </div>
  );
};
