import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle2, 
  ShieldCheck, 
  Truck, 
  Store, 
  CreditCard, 
  QrCode, 
  Banknote, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { PaymentMethod, CustomerDetails } from '../../types';

export const CheckoutModal: React.FC = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    cartTotal, 
    placeOrder, 
    setActiveInvoiceOrder, 
    settings 
  } = useStore();

  const [deliveryType, setDeliveryType] = useState<'store_pickup' | 'home_delivery'>('store_pickup');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Data
  const [formData, setFormData] = useState<CustomerDetails>({
    name: 'Suman Kumar Besra',
    email: 'sumanbesraofficial@gmail.com',
    phone: '+91 94312 88421',
    address: 'Near Mahavir Chowk, Main Market',
    landmark: 'Opposite Central Bank',
    city: 'Kochadhaman',
    district: 'Kishanganj',
    state: 'Bihar',
    pinCode: '855115',
    deliveryType: 'store_pickup',
  });

  const [customerNotes, setCustomerNotes] = useState('');

  if (!isCheckoutOpen || cart.length === 0) return null;

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  // 18% GST calculation included
  const gstAmount = Math.round(cartTotal * (18 / 118));
  const netSubtotal = cartTotal - gstAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const orderItems = cart.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        brand: item.product.brand,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image,
      }));

      const createdOrder = placeOrder({
        customer: {
          ...formData,
          deliveryType,
        },
        items: orderItems,
        subtotal: cartTotal,
        gstAmount,
        deliveryFee: 0,
        total: cartTotal,
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'COD' : 'Paid',
        orderStatus: deliveryType === 'store_pickup' ? 'Confirmed' : 'Pending',
        notes: customerNotes.trim() || (deliveryType === 'store_pickup' ? 'Store Pickup at Mahavir Marg Showroom' : 'Doorstep delivery in Kishanganj'),
      });

      setIsSubmitting(false);
      setIsCheckoutOpen(false);
      setActiveInvoiceOrder(createdOrder);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block">
              JYOTI INFOMEDIA • Mahavir Marg, Kochadhaman
            </span>
            <h3 className="text-lg font-bold text-slate-900 font-display">
              Complete Your Electronics Order
            </h3>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Step 1: Delivery Mode Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
              1. Choose Fulfillment Method
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              {/* Option A: Store Pickup */}
              <div
                onClick={() => setDeliveryType('store_pickup')}
                className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                  deliveryType === 'store_pickup'
                    ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/10'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className={`p-2 rounded-xl shrink-0 ${deliveryType === 'store_pickup' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  <Store className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900">Store Pickup</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-md">FREE</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Mahavir Marg, Kochadhaman. Ready in 30 mins!
                  </p>
                </div>
              </div>

              {/* Option B: Local Home Delivery */}
              <div
                onClick={() => setDeliveryType('home_delivery')}
                className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                  deliveryType === 'home_delivery'
                    ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/10'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className={`p-2 rounded-xl shrink-0 ${deliveryType === 'home_delivery' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900">Express Delivery</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-md">FREE</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Delivered to your doorstep across Kishanganj District.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Step 2: Contact & Address Information */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
              2. Customer Contact & Location
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 mb-1 block">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Suman Kumar"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:border-blue-500 outline-hidden font-medium text-slate-900"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 mb-1 block">Mobile Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. +91 94312 88421"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:border-blue-500 outline-hidden font-medium text-slate-900"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 mb-1 block">Email Address (for Invoice)</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:border-blue-500 outline-hidden font-medium text-slate-900"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 mb-1 block">Pincode *</label>
                <input
                  type="text"
                  required
                  value={formData.pinCode}
                  onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
                  placeholder="e.g. 855115"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:border-blue-500 outline-hidden font-medium text-slate-900"
                  maxLength={6}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[11px] font-semibold text-slate-600 mb-1 block">
                  {deliveryType === 'store_pickup' ? 'Primary Customer Address' : 'Full Delivery Address & Landmark *'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="House/Shop No, Street, Landmark"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:border-blue-500 outline-hidden font-medium text-slate-900"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[11px] font-semibold text-slate-600 mb-1 block">City / Block & District</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Kochadhaman"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl text-slate-800"
                  />
                  <input
                    type="text"
                    value="Kishanganj, Bihar"
                    disabled
                    className="w-full px-3 py-2 text-xs bg-slate-100 border border-slate-200 rounded-xl text-slate-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Payment Method */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
              3. Payment Preference
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  paymentMethod === 'upi'
                    ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold ring-1 ring-blue-500'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <QrCode className="w-4 h-4 mx-auto mb-1 text-blue-600" />
                <span>UPI / QR</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold ring-1 ring-blue-500'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Banknote className="w-4 h-4 mx-auto mb-1 text-emerald-600" />
                <span>Cash on Delivery</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  paymentMethod === 'card'
                    ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold ring-1 ring-blue-500'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <CreditCard className="w-4 h-4 mx-auto mb-1 text-indigo-600" />
                <span>Debit / Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('netbanking')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  paymentMethod === 'netbanking'
                    ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold ring-1 ring-blue-500'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Store className="w-4 h-4 mx-auto mb-1 text-amber-600" />
                <span>Net Banking</span>
              </button>

            </div>
          </div>

          {/* Order Summary Breakdown */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Order Summary ({cart.length} unique items)
            </h4>
            <div className="divide-y divide-slate-200/80">
              {cart.map(({ product, quantity }) => (
                <div key={product.id} className="py-1.5 flex justify-between items-center text-slate-700">
                  <span className="truncate pr-4">
                    {product.name} × <strong>{quantity}</strong>
                  </span>
                  <span className="font-semibold shrink-0">
                    {formatPrice(product.price * quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-200 space-y-1">
              <div className="flex justify-between text-slate-500">
                <span>Tax Breakdown (18% GST Included)</span>
                <span>{formatPrice(gstAmount)}</span>
              </div>
              <div className="flex justify-between text-base font-black text-slate-900 pt-1">
                <span>Payable Amount</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
            </div>
          </div>

          {/* Submit Order Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Generating Tax Invoice & Booking...</span>
            ) : (
              <>
                <span>Confirm Order & View GST Invoice ({formatPrice(cartTotal)})</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

        </form>

      </div>
    </div>
  );
};
