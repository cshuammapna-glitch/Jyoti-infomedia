import React from 'react';
import { X, Printer, ShieldCheck, Sparkles, MapPin, Phone, Mail, Award } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const InvoiceModal: React.FC = () => {
  const { activeInvoiceOrder, setActiveInvoiceOrder, settings } = useStore();

  if (!activeInvoiceOrder) return null;

  const order = activeInvoiceOrder;

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(val);
  };

  const handlePrint = () => {
    window.print();
  };

  // 18% GST calculation (CGST 9% + SGST 9%)
  const totalTax = order.gstAmount || Math.round(order.total * (18 / 118));
  const cgst = totalTax / 2;
  const sgst = totalTax / 2;
  const taxableValue = order.total - totalTax;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Controls Bar (Hidden during print) */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="text-amber-400">★ Official GST Tax Invoice</span>
            <span className="text-slate-400">•</span>
            <span className="font-mono text-slate-300">{order.id}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Download PDF</span>
            </button>
            <button
              onClick={() => setActiveInvoiceOrder(null)}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Invoice Printable Area */}
        <div id="printable-invoice" className="p-6 sm:p-8 space-y-6 text-slate-800 text-xs bg-white">
          
          {/* Store Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start pb-6 border-b-2 border-slate-900 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-sm">
                  JI
                </div>
                <div>
                  <h1 className="text-xl font-black text-slate-900 tracking-tight font-display">
                    {settings.storeName}
                  </h1>
                  <p className="text-[11px] font-semibold text-blue-700">
                    Retailer of Apple, Samsung, Vivo & Modern Computing
                  </p>
                </div>
              </div>

              <div className="mt-3 text-slate-600 space-y-0.5 text-[11px]">
                <p>{settings.addressLine}, {settings.marketArea}</p>
                <p>{settings.district}, {settings.state} - {settings.pincode}</p>
                <p>Phone: {settings.phonePrimary} | Email: {settings.email}</p>
                <p className="font-bold text-slate-900 mt-1">
                  GSTIN: <span className="font-mono">{settings.gstin}</span> (State Code: 10 - Bihar)
                </p>
              </div>
            </div>

            <div className="sm:text-right bg-slate-50 sm:bg-transparent p-3 sm:p-0 rounded-xl w-full sm:w-auto border sm:border-0 border-slate-200">
              <span className="text-xs font-black uppercase tracking-wider text-slate-900 bg-slate-200 px-2.5 py-1 rounded-md">
                ORIGINAL TAX INVOICE
              </span>
              <div className="mt-2 text-slate-600 space-y-1 text-[11px]">
                <p>Invoice No: <strong className="text-slate-900 font-mono">{order.id}</strong></p>
                <p>Invoice Date: <strong className="text-slate-900">{new Date(order.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</strong></p>
                <p>Payment Mode: <strong className="text-slate-900 uppercase">{order.paymentMethod} ({order.paymentStatus})</strong></p>
                <p>Delivery: <strong className="text-slate-900">{order.customer.deliveryType === 'store_pickup' ? 'Store Pickup (Kochadhaman)' : 'Doorstep Dispatch'}</strong></p>
              </div>
            </div>
          </div>

          {/* Customer / Bill To Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block mb-1">
                Billed & Shipped To:
              </span>
              <p className="font-bold text-slate-900 text-sm">{order.customer.name}</p>
              <p className="text-slate-600 text-xs mt-0.5">{order.customer.address}</p>
              {order.customer.landmark && (
                <p className="text-slate-500 text-[11px]">Landmark: {order.customer.landmark}</p>
              )}
              <p className="text-slate-600 text-xs">{order.customer.city}, {order.customer.district}, {order.customer.state} - {order.customer.pinCode}</p>
            </div>

            <div className="sm:text-right space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block mb-1">
                Contact & Verification:
              </span>
              <p className="text-slate-700">Phone: <strong className="text-slate-900">{order.customer.phone}</strong></p>
              <p className="text-slate-700">Email: {order.customer.email || 'N/A'}</p>
              <p className="text-slate-700">Place of Supply: <strong className="text-slate-900">Bihar (10)</strong></p>
            </div>
          </div>

          {/* Products Table */}
          <div className="rounded-xl border border-slate-300 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 text-[11px] font-bold uppercase tracking-wider border-b border-slate-300">
                  <th className="py-2.5 px-3">#</th>
                  <th className="py-2.5 px-3">Item Description</th>
                  <th className="py-2.5 px-3">Brand</th>
                  <th className="py-2.5 px-3 text-center">Qty</th>
                  <th className="py-2.5 px-3 text-right">Unit Price</th>
                  <th className="py-2.5 px-3 text-right">Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {order.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-mono text-slate-500">{idx + 1}</td>
                    <td className="py-2.5 px-3">
                      <span className="font-bold text-slate-900 block">{item.productName}</span>
                      <span className="text-[10px] text-emerald-700">Official Brand Sealed Pack</span>
                    </td>
                    <td className="py-2.5 px-3 font-medium text-slate-700">{item.brand}</td>
                    <td className="py-2.5 px-3 text-center font-bold">{item.quantity}</td>
                    <td className="py-2.5 px-3 text-right">{formatPrice(item.price)}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-slate-900">
                      {formatPrice(item.price * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tax Breakdown & Total */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pt-2">
            <div className="space-y-1.5 max-w-sm text-[11px] text-slate-500">
              <p className="font-bold text-slate-700">Terms & Conditions:</p>
              <p>1. 1 Year official manufacturer warranty covered under brand service centers.</p>
              <p>2. Goods once sold are backed by replacement guarantee for hardware defects.</p>
              <p>3. This is an authentic GST invoice valid for company Input Tax Credit (ITC).</p>
            </div>

            <div className="w-full sm:w-64 space-y-1.5 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex justify-between text-slate-600">
                <span>Taxable Value:</span>
                <span>{formatPrice(taxableValue)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>CGST (9%):</span>
                <span>{formatPrice(cgst)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>SGST (9%):</span>
                <span>{formatPrice(sgst)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery / Handling:</span>
                <span className="text-emerald-700 font-bold">FREE</span>
              </div>
              <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-300">
                <span>Net Total:</span>
                <span className="text-blue-700">{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Signatures Footer */}
          <div className="pt-8 border-t border-slate-200 flex justify-between items-end text-xs text-slate-500">
            <div>
              <p className="font-bold text-slate-800">Customer Acknowledgment</p>
              <div className="h-10 border-b border-dashed border-slate-300 w-36 mt-1"></div>
              <p className="text-[10px] mt-1">Received in sealed condition</p>
            </div>

            <div className="text-right">
              <p className="font-bold text-slate-900">For JYOTI INFOMEDIA</p>
              <div className="h-10 flex items-center justify-end">
                <span className="font-serif italic text-blue-900 font-bold text-sm px-2">
                  Jyoti Ranjan
                </span>
              </div>
              <p className="text-[10px] text-slate-600 font-semibold border-t border-slate-300 pt-1">
                Authorized Signatory & Store Stamp
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
