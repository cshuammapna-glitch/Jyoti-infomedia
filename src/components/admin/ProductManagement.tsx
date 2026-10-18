import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Star, 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Product, BrandType, CategoryType } from '../../types';
import { ProductFormModal } from './ProductFormModal';

export const ProductManagement: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct, toggleProductStock } = useStore();

  const [search, setSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<BrandType | 'All'>('All');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'All'>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedBrand !== 'All' && p.brand !== selectedBrand) return false;
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [products, selectedBrand, selectedCategory, search]);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setIsModalOpen(true);
  };

  const handleSaveProduct = (data: any) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, data);
    } else {
      addProduct(data);
    }
  };

  const handleAdjustStock = (p: Product, delta: number) => {
    const newStock = Math.max(0, p.stock + delta);
    updateProduct(p.id, {
      stock: newStock,
      inStock: newStock > 0,
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-xl font-black text-slate-900 font-display">
            Inventory & Catalog Management
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage models, specifications, pricing, and stock for Apple, Samsung, Vivo and PC systems.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 w-fit cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-white p-4 rounded-2xl border border-slate-200">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by product name, SKU or model..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-3 py-2 text-xs border border-slate-300 rounded-xl outline-hidden focus:border-blue-500 font-medium"
          />
        </div>

        <div>
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value as any)}
            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl font-semibold text-slate-800 bg-white"
          >
            <option value="All">All Brands (Apple, Samsung, Vivo, etc.)</option>
            <option value="Apple">Apple</option>
            <option value="Samsung">Samsung</option>
            <option value="Vivo">Vivo</option>
            <option value="HP">HP</option>
            <option value="Sony">Sony</option>
          </select>
        </div>

        <div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as any)}
            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl font-semibold text-slate-800 bg-white"
          >
            <option value="All">All Categories</option>
            <option value="Smartphones">Smartphones</option>
            <option value="Laptops">Laptops</option>
            <option value="Audio & Wearables">Audio & Wearables</option>
            <option value="Smart TVs">Smart TVs</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px] font-bold">
                <th className="py-3 px-4">Product & Specs</th>
                <th className="py-3 px-4">Brand / Category</th>
                <th className="py-3 px-4">Price & MRP</th>
                <th className="py-3 px-4">Stock Level</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map((p) => {
                const isLow = p.stock <= 5;
                return (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Title & Image */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-12 h-12 rounded-xl object-cover bg-slate-100 border border-slate-200 shrink-0"
                        />
                        <div className="min-w-0 max-w-xs">
                          <span className="font-bold text-slate-900 block truncate" title={p.name}>
                            {p.name}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500">
                            SKU: {p.sku} {p.featured && '• ⭐ Featured'}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Brand & Category */}
                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2.5 py-0.5 rounded-md font-bold text-[11px] bg-slate-100 text-slate-800">
                        {p.brand}
                      </span>
                      <span className="block text-[11px] text-slate-500 mt-0.5">
                        {p.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-3.5 px-4 font-mono">
                      <span className="font-extrabold text-slate-900 block">
                        {formatPrice(p.price)}
                      </span>
                      {p.originalPrice > p.price && (
                        <span className="text-[10px] text-slate-400 line-through">
                          {formatPrice(p.originalPrice)}
                        </span>
                      )}
                    </td>

                    {/* Stock Quick Controller */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleAdjustStock(p, -1)}
                          className="w-6 h-6 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-xs"
                          title="Reduce 1"
                        >
                          -
                        </button>
                        <span className={`px-2 py-0.5 font-bold rounded-md ${
                          isLow ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-800'
                        }`}>
                          {p.stock}
                        </span>
                        <button
                          onClick={() => handleAdjustStock(p, 1)}
                          className="w-6 h-6 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-xs"
                          title="Add 1"
                        >
                          +
                        </button>
                      </div>
                    </td>

                    {/* In-Stock Status Toggle */}
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => toggleProductStock(p.id)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                          p.inStock && p.stock > 0
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                        }`}
                      >
                        {p.inStock && p.stock > 0 ? 'Active (In Stock)' : 'Inactive / Out'}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit Product"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete ${p.name} from catalog?`)) {
                              deleteProduct(p.id);
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Form Modal */}
      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productToEdit={editingProduct}
        onSave={handleSaveProduct}
      />

    </div>
  );
};
