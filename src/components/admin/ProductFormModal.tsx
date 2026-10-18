import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Sparkles, Image as ImageIcon } from 'lucide-react';
import { Product, BrandType, CategoryType } from '../../types';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit?: Product | null;
  onSave: (productData: any) => void;
}

const PRESET_IMAGES = [
  { label: 'iPhone 16 Pro', url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80' },
  { label: 'Galaxy S24 Ultra', url: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80' },
  { label: 'Vivo V40 Pro', url: 'https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=800&q=80' },
  { label: 'MacBook Air', url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80' },
  { label: 'Smart 4K TV', url: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80' },
  { label: 'AirPods / Audio', url: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80' },
];

export const ProductFormModal: React.FC<ProductFormModalProps> = ({
  isOpen,
  onClose,
  productToEdit,
  onSave,
}) => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState<BrandType>('Apple');
  const [category, setCategory] = useState<CategoryType>('Smartphones');
  const [price, setPrice] = useState(79900);
  const [originalPrice, setOriginalPrice] = useState(84900);
  const [stock, setStock] = useState(10);
  const [image, setImage] = useState(PRESET_IMAGES[0].url);
  const [description, setDescription] = useState('');
  const [warranty, setWarranty] = useState('1 Year Official Brand Warranty with GST Bill');
  const [sku, setSku] = useState('');
  const [featured, setFeatured] = useState(false);
  const [inStock, setInStock] = useState(true);

  // Specs array of key-value pairs
  const [specsList, setSpecsList] = useState<{ key: string; value: string }[]>([
    { key: 'Display', value: '6.7-inch OLED' },
    { key: 'Processor', value: 'Flagship Octa-Core' },
    { key: 'Camera', value: '50MP OIS' },
    { key: 'Battery', value: '5000mAh Fast Charging' },
  ]);

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setBrand(productToEdit.brand);
      setCategory(productToEdit.category);
      setPrice(productToEdit.price);
      setOriginalPrice(productToEdit.originalPrice);
      setStock(productToEdit.stock);
      setImage(productToEdit.image);
      setDescription(productToEdit.description);
      setWarranty(productToEdit.warranty);
      setSku(productToEdit.sku);
      setFeatured(productToEdit.featured);
      setInStock(productToEdit.inStock);

      const parsedSpecs = Object.entries(productToEdit.specs).map(([key, value]) => ({
        key,
        value,
      }));
      setSpecsList(parsedSpecs.length > 0 ? parsedSpecs : [{ key: 'Display', value: 'FHD+' }]);
    } else {
      setName('');
      setBrand('Apple');
      setCategory('Smartphones');
      setPrice(79900);
      setOriginalPrice(84900);
      setStock(10);
      setImage(PRESET_IMAGES[0].url);
      setDescription('');
      setWarranty('1 Year Official Brand Warranty with GST Bill');
      setSku(`SKU-${Date.now().toString().slice(-6)}`);
      setFeatured(false);
      setInStock(true);
      setSpecsList([
        { key: 'Display', value: '6.7-inch Super AMOLED' },
        { key: 'Processor', value: 'High Performance Chipset' },
      ]);
    }
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  const handleAddSpecRow = () => {
    setSpecsList([...specsList, { key: '', value: '' }]);
  };

  const handleSpecChange = (index: number, field: 'key' | 'value', val: string) => {
    const updated = [...specsList];
    updated[index][field] = val;
    setSpecsList(updated);
  };

  const handleRemoveSpec = (index: number) => {
    setSpecsList(specsList.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const specsRecord: Record<string, string> = {};
    specsList.forEach((s) => {
      if (s.key.trim() && s.value.trim()) {
        specsRecord[s.key.trim()] = s.value.trim();
      }
    });

    const discountPercent =
      originalPrice > price
        ? Math.round(((originalPrice - price) / originalPrice) * 100)
        : 0;

    const payload = {
      name,
      brand,
      category,
      price: Number(price),
      originalPrice: Number(originalPrice),
      discountPercent,
      stock: Number(stock),
      inStock: stock > 0 ? inStock : false,
      rating: productToEdit ? productToEdit.rating : 4.8,
      reviewsCount: productToEdit ? productToEdit.reviewsCount : 12,
      image,
      description,
      specs: specsRecord,
      featured,
      warranty,
      sku: sku || `JYOTI-${Math.floor(1000 + Math.random() * 9000)}`,
    };

    onSave(payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block">
              JYOTI INFOMEDIA Inventory Catalog
            </span>
            <h3 className="text-lg font-bold text-slate-900 font-display">
              {productToEdit ? 'Edit Product Item' : 'Add New Electronic Item'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          
          {/* Product Name */}
          <div>
            <label className="text-xs font-bold text-slate-700 mb-1 block">Product Full Title *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Vivo V40 Pro 5G ZEISS Portrait (12GB/512GB)"
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:border-blue-500 font-semibold text-slate-900"
            />
          </div>

          {/* Brand & Category */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 mb-1 block">Brand *</label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value as BrandType)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl font-semibold text-slate-800 bg-white"
              >
                <option value="Apple">Apple</option>
                <option value="Samsung">Samsung</option>
                <option value="Vivo">Vivo</option>
                <option value="OnePlus">OnePlus</option>
                <option value="HP">HP</option>
                <option value="Dell">Dell</option>
                <option value="Sony">Sony</option>
                <option value="Boat">Boat</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 mb-1 block">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryType)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl font-semibold text-slate-800 bg-white"
              >
                <option value="Smartphones">Smartphones</option>
                <option value="Laptops">Laptops</option>
                <option value="Audio & Wearables">Audio & Wearables</option>
                <option value="Smart TVs">Smart TVs</option>
                <option value="Accessories">Accessories</option>
                <option value="Tablets">Tablets</option>
              </select>
            </div>
          </div>

          {/* Pricing & Stock */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 mb-1 block">Sale Price (₹) *</label>
              <input
                type="number"
                required
                min={0}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl font-bold text-slate-900"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 mb-1 block">Original MRP (₹)</label>
              <input
                type="number"
                min={0}
                value={originalPrice}
                onChange={(e) => setOriginalPrice(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl text-slate-600"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 mb-1 block">Warehouse Stock *</label>
              <input
                type="number"
                required
                min={0}
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl font-bold text-blue-600"
              />
            </div>
          </div>

          {/* SKU & Warranty */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 mb-1 block">SKU / Barcode</label>
              <input
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="e.g. VVO-V40P-12-512"
                className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-xl text-slate-800"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 mb-1 block">Warranty Term</label>
              <input
                type="text"
                value={warranty}
                onChange={(e) => setWarranty(e.target.value)}
                placeholder="1 Year Official Brand Warranty"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl text-slate-800"
              />
            </div>
          </div>

          {/* Image URL & Quick Presets */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">Product Photo URL</label>
            <input
              type="url"
              required
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl text-slate-800"
            />
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[10px] text-slate-500 font-bold">Quick Presets:</span>
              {PRESET_IMAGES.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setImage(preset.url)}
                  className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-[10px] text-slate-700 font-medium"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-bold text-slate-700 mb-1 block">Description</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Key selling points, camera specs, performance details..."
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl text-slate-800"
            />
          </div>

          {/* Specifications Builder */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Technical Specifications
              </label>
              <button
                type="button"
                onClick={handleAddSpecRow}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Spec Field</span>
              </button>
            </div>

            <div className="space-y-2">
              {specsList.map((spec, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={spec.key}
                    onChange={(e) => handleSpecChange(idx, 'key', e.target.value)}
                    placeholder="Spec (e.g. Display, Battery)"
                    className="w-1/3 px-3 py-1.5 text-xs border border-slate-300 rounded-lg text-slate-800"
                  />
                  <input
                    type="text"
                    value={spec.value}
                    onChange={(e) => handleSpecChange(idx, 'value', e.target.value)}
                    placeholder="Value (e.g. 6.78-inch 120Hz)"
                    className="flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded-lg text-slate-800"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSpec(idx)}
                    className="p-1.5 text-slate-400 hover:text-rose-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 rounded-md text-blue-600"
              />
              <span>Mark as Featured Flagship</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={inStock}
                onChange={(e) => setInStock(e.target.checked)}
                className="w-4 h-4 rounded-md text-emerald-600"
              />
              <span>In-Stock Active</span>
            </label>
          </div>

          {/* Action Button */}
          <div className="pt-3">
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
            >
              {productToEdit ? 'Save Changes' : 'Publish Product to Store'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
