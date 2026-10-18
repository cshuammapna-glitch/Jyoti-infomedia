import React, { useState, useMemo } from 'react';
import { 
  ShoppingBag, 
  Eye, 
  Star, 
  Sparkles, 
  ShieldCheck, 
  SlidersHorizontal, 
  Check, 
  MessageCircle,
  AlertCircle
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Product, BrandType, CategoryType } from '../../types';

export const ProductCatalog: React.FC = () => {
  const { 
    products, 
    selectedBrand, 
    setSelectedBrand, 
    selectedCategory, 
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    addToCart,
    setSelectedProduct,
    settings
  } = useStore();

  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [onlyInStock, setOnlyInStock] = useState(false);

  const categories: { label: string; value: CategoryType | 'All' }[] = [
    { label: 'All Categories', value: 'All' },
    { label: '📱 Smartphones', value: 'Smartphones' },
    { label: '💻 Laptops & MacBooks', value: 'Laptops' },
    { label: '🎧 Audio & Wearables', value: 'Audio & Wearables' },
    { label: '📺 Smart TVs', value: 'Smart TVs' },
    { label: '🔌 Accessories & Adapters', value: 'Accessories' },
  ];

  const brands: (BrandType | 'All')[] = ['All', 'Apple', 'Samsung', 'Vivo', 'HP', 'Sony'];

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Brand filter
        if (selectedBrand !== 'All' && p.brand !== selectedBrand) {
          return false;
        }
        // Category filter
        if (selectedCategory !== 'All' && p.category !== selectedCategory) {
          return false;
        }
        // In-stock filter
        if (onlyInStock && (!p.inStock || p.stock <= 0)) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchBrand = p.brand.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchCategory = p.category.toLowerCase().includes(q);
          if (!matchName && !matchBrand && !matchDesc && !matchCategory) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        // Default: featured first, then newest
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
  }, [products, selectedBrand, selectedCategory, onlyInStock, searchQuery, sortBy]);

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section id="catalog-section" className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Title & Subheading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
              <Sparkles className="w-4 h-4" />
              Verified Electronic Stock
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              JYOTI INFOMEDIA Product Showcase
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Showing {filteredProducts.length} items from our Kochadhaman Showroom catalog.
            </p>
          </div>

          {/* Quick Clear Filters if Active */}
          {(selectedBrand !== 'All' || selectedCategory !== 'All' || searchQuery || onlyInStock) && (
            <button
              onClick={() => {
                setSelectedBrand('All');
                setSelectedCategory('All');
                setSearchQuery('');
                setOnlyInStock(false);
              }}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200 transition-colors w-fit"
            >
              Reset All Filters ✕
            </button>
          )}
        </div>

        {/* Brand Selection Tabs (Prominent Apple, Samsung, Vivo) */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">Brand:</span>
          {brands.map((b) => {
            const isSelected = selectedBrand === b;
            return (
              <button
                key={b}
                onClick={() => setSelectedBrand(b)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {b === 'Apple' && <span>🍎</span>}
                {b === 'Samsung' && <span className="text-blue-500">🔷</span>}
                {b === 'Vivo' && <span className="text-indigo-500">✨</span>}
                <span>{b === 'All' ? 'All Brands' : b}</span>
              </button>
            );
          })}
        </div>

        {/* Category Pills & Sorting Bar */}
        <div className="mt-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            {categories.map((c) => {
              const isSelected = selectedCategory === c.value;
              return (
                <button
                  key={c.value}
                  onClick={() => setSelectedCategory(c.value)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors shrink-0 ${
                    isSelected
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>

          {/* Controls: Stock Filter & Sort */}
          <div className="flex flex-wrap items-center gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
            {/* In-Stock Toggle */}
            <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="w-4 h-4 rounded-md text-blue-600 focus:ring-blue-500 border-slate-300"
              />
              <span>In-Stock Only</span>
            </label>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort products"
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-800 outline-hidden focus:border-blue-500"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Customer Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const inStock = product.inStock && product.stock > 0;
              const isLowStock = inStock && product.stock <= 5;

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  {/* Product Card Top: Image & Badges */}
                  <div>
                    <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />

                      {/* Brand Badge */}
                      <span className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
                        {product.brand}
                      </span>

                      {/* Discount Badge */}
                      {product.discountPercent > 0 && (
                        <span className="absolute top-3 right-3 bg-rose-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                          {product.discountPercent}% OFF
                        </span>
                      )}

                      {/* Stock Status Badge */}
                      <div className="absolute bottom-3 left-3">
                        {inStock ? (
                          isLowStock ? (
                            <span className="bg-amber-500/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                              Only {product.stock} units left
                            </span>
                          ) : (
                            <span className="bg-emerald-600/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                              In Stock
                            </span>
                          )
                        ) : (
                          <span className="bg-rose-600/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                            Out of Stock
                          </span>
                        )}
                      </div>

                      {/* Quick View Button on Hover */}
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-xs text-white font-bold text-xs gap-1.5 cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Quick View Specs</span>
                      </button>
                    </div>

                    {/* Product Body */}
                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>{product.category}</span>
                        <div className="flex items-center text-amber-500 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-1" />
                          <span>{product.rating}</span>
                          <span className="text-slate-400 font-normal ml-0.5">({product.reviewsCount})</span>
                        </div>
                      </div>

                      <h3 
                        onClick={() => setSelectedProduct(product)}
                        className="font-bold text-slate-900 text-sm line-clamp-2 hover:text-blue-600 cursor-pointer transition-colors"
                        title={product.name}
                      >
                        {product.name}
                      </h3>

                      {/* Key Specs Pills */}
                      <div className="flex flex-wrap gap-1 pt-1">
                        {Object.entries(product.specs).slice(0, 2).map(([key, val]) => (
                          <span key={key} className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                            {val}
                          </span>
                        ))}
                      </div>

                      {/* Warranty Guarantee */}
                      <p className="text-[11px] text-emerald-700 flex items-center gap-1 font-medium pt-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{product.warranty}</span>
                      </p>
                    </div>
                  </div>

                  {/* Product Card Bottom: Pricing & Actions */}
                  <div className="p-4 pt-0 border-t border-slate-100 mt-2">
                    <div className="flex items-baseline justify-between pt-3">
                      <div>
                        <span className="text-lg font-black text-slate-900">
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-xs text-slate-400 line-through ml-2">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">
                        GST Bill Incl.
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="py-2 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors flex items-center justify-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Details</span>
                      </button>

                      <button
                        onClick={() => addToCart(product)}
                        disabled={!inStock}
                        className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                          inStock
                            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>{inStock ? 'Add to Cart' : 'Sold Out'}</span>
                      </button>
                    </div>

                    {/* WhatsApp Fast Order Direct Link */}
                    <a
                      href={`https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}?text=Hello%20JYOTI%20INFOMEDIA%2C%20I%20am%20interested%20in%20ordering%3A%20${encodeURIComponent(product.name)}%20(SKU%3A%20${product.sku})`}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 w-full inline-flex items-center justify-center gap-1 text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 hover:underline pt-1"
                    >
                      <MessageCircle className="w-3 h-3 text-emerald-600" />
                      <span>Order directly via WhatsApp</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="mt-12 bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No matching electronic products found</h3>
            <p className="text-xs text-slate-500">
              Try clearing your brand filter, category selection, or search query to see the full inventory.
            </p>
            <button
              onClick={() => {
                setSelectedBrand('All');
                setSelectedCategory('All');
                setSearchQuery('');
                setOnlyInStock(false);
              }}
              className="px-5 py-2.5 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-xs"
            >
              Show Entire Inventory
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
