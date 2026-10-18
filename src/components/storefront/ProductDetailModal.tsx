import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Star, 
  ShieldCheck, 
  Truck, 
  Clock, 
  MessageCircle, 
  Check, 
  MapPin, 
  CreditCard,
  Sparkles
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const ProductDetailModal: React.FC = () => {
  const { selectedProduct, setSelectedProduct, addToCart, settings } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [pincodeCheck, setPincodeCheck] = useState('855115');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(
    '✓ Delivery available within 4 hours in Kochadhaman & Kishanganj'
  );

  if (!selectedProduct) return null;

  const inStock = selectedProduct.inStock && selectedProduct.stock > 0;

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = pincodeCheck.trim();
    if (['855115', '855107', '855101', '855116', '855117'].includes(clean)) {
      setPincodeStatus('✓ Fast Same-Day Delivery available in this Kishanganj area!');
    } else {
      setPincodeStatus('✓ Standard Courier Delivery available (2-3 days across Bihar)');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image Column */}
          <div className="p-6 sm:p-8 bg-slate-50 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-inner flex items-center justify-center">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-lg">
                {selectedProduct.brand}
              </span>
              {selectedProduct.discountPercent > 0 && (
                <span className="absolute top-3 right-3 bg-rose-600 text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                  {selectedProduct.discountPercent}% OFF
                </span>
              )}
            </div>

            {/* Authenticity Guarantee Card */}
            <div className="mt-6 p-4 rounded-2xl bg-white border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-emerald-700 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>JYOTI INFOMEDIA Trust Guarantee</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Brand-new, factory-sealed unit with official manufacturer warranty. Walk into our Mahavir Marg store for on-the-spot demo & data migration.
              </p>
              <div className="text-[11px] text-slate-500 font-mono">
                SKU: {selectedProduct.sku}
              </div>
            </div>
          </div>

          {/* Details & Buy Column */}
          <div className="p-6 sm:p-8 space-y-5 overflow-y-auto max-h-[85vh]">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <span className="font-semibold text-blue-600 uppercase tracking-wider">
                  {selectedProduct.category}
                </span>
                <span>•</span>
                <div className="flex items-center text-amber-500 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-1" />
                  <span>{selectedProduct.rating}</span>
                  <span className="text-slate-400 ml-1">({selectedProduct.reviewsCount} reviews)</span>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
                {selectedProduct.name}
              </h2>

              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {selectedProduct.description}
              </p>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-black text-slate-900">
                  {formatPrice(selectedProduct.price)}
                </span>
                {selectedProduct.originalPrice > selectedProduct.price && (
                  <span className="text-sm text-slate-400 line-through">
                    {formatPrice(selectedProduct.originalPrice)}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                <span>Inclusive of all GST & Local taxes.</span>
                <span className="text-emerald-700 font-semibold">• 0% EMI available in-store</span>
              </p>
            </div>

            {/* Technical Specifications */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Technical Specifications
              </h4>
              <div className="divide-y divide-slate-100 rounded-xl border border-slate-200 overflow-hidden text-xs">
                {Object.entries(selectedProduct.specs).map(([specKey, specVal]) => (
                  <div key={specKey} className="flex justify-between py-2 px-3 bg-white hover:bg-slate-50">
                    <span className="text-slate-500 font-medium">{specKey}</span>
                    <span className="text-slate-900 font-semibold text-right">{specVal}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery / Store Pickup Checker */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                Check Kishanganj Delivery & Pickup
              </span>
              <form onSubmit={handleCheckPincode} className="flex gap-2">
                <input
                  type="text"
                  value={pincodeCheck}
                  onChange={(e) => setPincodeCheck(e.target.value)}
                  placeholder="Enter 6-digit Pincode"
                  className="flex-1 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-800"
                  maxLength={6}
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800"
                >
                  Verify
                </button>
              </form>
              {pincodeStatus && (
                <p className="text-[11px] font-medium text-emerald-700 pt-0.5">
                  {pincodeStatus}
                </p>
              )}
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-700">Quantity:</span>
                <div className="flex items-center border border-slate-300 rounded-xl bg-white overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 py-1.5 text-xs font-bold text-slate-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(selectedProduct.stock, quantity + 1))}
                    className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 font-bold"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-slate-500">
                  ({selectedProduct.stock} available)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  onClick={() => {
                    addToCart(selectedProduct, quantity);
                    setSelectedProduct(null);
                  }}
                  disabled={!inStock}
                  className={`py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    inStock
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{inStock ? 'Add to Cart' : 'Currently Out of Stock'}</span>
                </button>

                <a
                  href={`https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}?text=Hi%20JYOTI%20INFOMEDIA%2C%20I%20want%20to%20buy%20${encodeURIComponent(selectedProduct.name)}%20(Qty%3A%20${quantity})`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 px-4 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order via WhatsApp</span>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
