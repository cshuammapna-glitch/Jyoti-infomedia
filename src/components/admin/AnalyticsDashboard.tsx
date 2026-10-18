import React, { useMemo } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  ShoppingBag, 
  AlertTriangle, 
  Package, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight,
  ShieldCheck,
  CheckCircle2,
  BarChart3,
  PieChart,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { BrandType } from '../../types';

export const AnalyticsDashboard: React.FC = () => {
  const { orders, products, setAdminSubTab, setActiveInvoiceOrder, updateProduct } = useStore();

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Analytics Calculations
  const totalRevenue = useMemo(() => {
    return orders.reduce((sum, o) => (o.orderStatus !== 'Cancelled' ? sum + o.total : sum), 0);
  }, [orders]);

  const totalOrdersCount = orders.length;
  const completedOrders = orders.filter((o) => o.orderStatus === 'Delivered').length;
  const pendingOrders = orders.filter((o) => ['Pending', 'Confirmed', 'Preparing', 'Out for Delivery'].includes(o.orderStatus)).length;

  const lowStockProducts = useMemo(() => {
    return products.filter((p) => p.stock <= 5);
  }, [products]);

  // Brand Share Breakdown
  const brandStats = useMemo(() => {
    const counts: Record<string, { count: number; revenue: number; color: string }> = {
      Apple: { count: 0, revenue: 0, color: '#0f172a' },
      Samsung: { count: 0, revenue: 0, color: '#2563eb' },
      Vivo: { count: 0, revenue: 0, color: '#6366f1' },
      HP: { count: 0, revenue: 0, color: '#0891b2' },
      Other: { count: 0, revenue: 0, color: '#64748b' },
    };

    orders.forEach((o) => {
      if (o.orderStatus === 'Cancelled') return;
      o.items.forEach((item) => {
        const brandKey = ['Apple', 'Samsung', 'Vivo', 'HP'].includes(item.brand)
          ? item.brand
          : 'Other';
        counts[brandKey].count += item.quantity;
        counts[brandKey].revenue += item.price * item.quantity;
      });
    });

    return counts;
  }, [orders]);

  // Monthly Sales trend for SVG Chart (mock historical + live actual)
  const monthlyData = [
    { month: 'May', revenue: 280000 },
    { month: 'Jun', revenue: 340000 },
    { month: 'Jul', revenue: 410000 },
    { month: 'Aug', revenue: 390000 },
    { month: 'Sep', revenue: 495000 },
    { month: 'Oct (Current)', revenue: totalRevenue },
  ];

  const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue), 600000);

  const handleQuickRestock = (productId: string) => {
    const prod = products.find((p) => p.id === productId);
    if (prod) {
      updateProduct(productId, { stock: prod.stock + 10, inStock: true });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 to-indigo-950 p-6 rounded-3xl text-white shadow-xl">
        <div>
          <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            JYOTI INFOMEDIA Live Telemetry
          </span>
          <h2 className="text-2xl font-black font-display tracking-tight">
            Executive Sales & Inventory Analytics
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Real-time tracking of Apple, Samsung & Vivo store revenue in Kochadhaman, Kishanganj.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setAdminSubTab('orders')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-bold transition-colors shadow-md"
          >
            Process Orders ({pendingOrders} Pending)
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Total Revenue */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Total Revenue
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              ₹
            </div>
          </div>
          <div>
            <span className="text-2xl font-black text-slate-900 font-display">
              {formatPrice(totalRevenue)}
            </span>
            <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+24.8% vs last month</span>
            </div>
          </div>
        </div>

        {/* Card 2: Orders Count */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Orders Processed
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl font-black text-slate-900 font-display">
              {totalOrdersCount}
            </span>
            <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium mt-1">
              <span className="text-emerald-600 font-bold">{completedOrders} Delivered</span>
              <span>•</span>
              <span className="text-amber-600 font-bold">{pendingOrders} Active</span>
            </div>
          </div>
        </div>

        {/* Card 3: Average Order Value */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Avg Order Value
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <BarChart3 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl font-black text-slate-900 font-display">
              {formatPrice(totalOrdersCount > 0 ? totalRevenue / totalOrdersCount : 0)}
            </span>
            <div className="text-[11px] text-slate-500 font-medium mt-1">
              Driven by Flagship Smartphones
            </div>
          </div>
        </div>

        {/* Card 4: Low Stock Alerts */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Low Stock Alerts
            </span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl font-black text-rose-600 font-display">
              {lowStockProducts.length}
            </span>
            <div className="text-[11px] text-rose-700 font-semibold mt-1">
              Requires warehouse replenishment
            </div>
          </div>
        </div>

      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Chart 1: Revenue Growth Trend (Interactive SVG Area Chart) */}
        <div className="lg:col-span-8 p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-display">
                Sales Revenue Trend (May - October 2026)
              </h3>
              <p className="text-xs text-slate-500">
                Monthly gross sales volume for Jyoti Infomedia Kochadhaman
              </p>
            </div>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
              Live Verified
            </span>
          </div>

          {/* SVG Visual Chart */}
          <div className="pt-4">
            <div className="h-64 w-full relative">
              <svg viewBox="0 0 600 220" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Grid Lines */}
                <line x1="40" y1="20" x2="580" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="40" y1="70" x2="580" y2="70" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="40" y1="120" x2="580" y2="120" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="40" y1="170" x2="580" y2="170" stroke="#f1f5f9" strokeWidth="1" />

                {/* Y-Axis Labels */}
                <text x="5" y="24" className="text-[10px] fill-slate-400 font-mono">₹6L</text>
                <text x="5" y="74" className="text-[10px] fill-slate-400 font-mono">₹4.5L</text>
                <text x="5" y="124" className="text-[10px] fill-slate-400 font-mono">₹3L</text>
                <text x="5" y="174" className="text-[10px] fill-slate-400 font-mono">₹1.5L</text>

                {/* Points calculation */}
                {(() => {
                  const points = monthlyData.map((d, i) => {
                    const x = 50 + i * (520 / (monthlyData.length - 1));
                    const y = 180 - (d.revenue / maxRevenue) * 150;
                    return { x, y, ...d };
                  });

                  const pathD = points.reduce((acc, curr, idx) => {
                    return idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
                  }, '');

                  const areaD = `${pathD} L ${points[points.length - 1].x} 180 L ${points[0].x} 180 Z`;

                  return (
                    <>
                      {/* Area Fill */}
                      <path d={areaD} fill="url(#revenueGrad)" />
                      {/* Stroke Line */}
                      <path d={pathD} fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />

                      {/* Data Dots and Labels */}
                      {points.map((pt, idx) => (
                        <g key={idx}>
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r="5"
                            className="fill-white stroke-blue-600 stroke-2 hover:r-7 transition-all cursor-pointer"
                          />
                          <text
                            x={pt.x}
                            y="205"
                            textAnchor="middle"
                            className="text-[10px] fill-slate-500 font-medium"
                          >
                            {pt.month}
                          </text>
                        </g>
                      ))}
                    </>
                  );
                })()}
              </svg>
            </div>
          </div>
        </div>

        {/* Chart 2: Major Brand Performance (Apple vs Samsung vs Vivo) */}
        <div className="lg:col-span-4 p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="pb-2 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 font-display">
              Brand Market Share
            </h3>
            <p className="text-xs text-slate-500">
              Contribution by brand to store volume
            </p>
          </div>

          <div className="space-y-4 pt-2">
            {Object.entries(brandStats).map(([brandName, data]) => {
              const totalItems = Object.values(brandStats).reduce((s, b) => s + b.count, 0) || 1;
              const percent = Math.round((data.count / totalItems) * 100);

              return (
                <div key={brandName} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-slate-900 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: data.color }}></span>
                      {brandName}
                    </span>
                    <span className="text-slate-500 font-mono">
                      {formatPrice(data.revenue)} ({percent}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${percent}%`,
                        backgroundColor: data.color,
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
            <span className="font-bold text-slate-900 block">💡 Showroom Insight:</span>
            Apple & Samsung lead total revenue, while Vivo dominates in unit volume across Kochadhaman.
          </div>
        </div>

      </div>

      {/* Bottom Grid: Low Stock Alert & Recent Live Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Low Stock Management */}
        <div className="lg:col-span-6 p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-bold text-slate-900 font-display">
                Inventory Restock Alerts ({lowStockProducts.length})
              </h3>
            </div>
            <button
              onClick={() => setAdminSubTab('products')}
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              Manage Catalog →
            </button>
          </div>

          <div className="space-y-3">
            {lowStockProducts.slice(0, 4).map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200 gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-10 h-10 rounded-lg object-cover bg-white shrink-0 border border-slate-200"
                  />
                  <div className="truncate">
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {p.name}
                    </h4>
                    <span className="text-[10px] text-slate-500">
                      Brand: {p.brand} • SKU: {p.sku}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                    {p.stock} left
                  </span>
                  <button
                    onClick={() => handleQuickRestock(p.id)}
                    className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>+10</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders Overview */}
        <div className="lg:col-span-6 p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900 font-display">
                Recent Customer Orders
              </h3>
            </div>
            <button
              onClick={() => setAdminSubTab('orders')}
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              View All ({orders.length}) →
            </button>
          </div>

          <div className="space-y-3">
            {orders.slice(0, 4).map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200 gap-3"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-900">
                      {order.id}
                    </span>
                    <span className="text-[10px] bg-blue-100 text-blue-800 font-semibold px-2 py-0.2 rounded-full">
                      {order.orderStatus}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 truncate mt-0.5">
                    {order.customer.name} ({order.customer.city}) • {order.items.length} item(s)
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-black text-slate-900 block">
                    {formatPrice(order.total)}
                  </span>
                  <button
                    onClick={() => setActiveInvoiceOrder(order)}
                    className="text-[10px] text-blue-600 font-semibold hover:underline"
                  >
                    View Invoice
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
