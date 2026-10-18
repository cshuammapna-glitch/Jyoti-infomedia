import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { HeroBanner } from './components/storefront/HeroBanner';
import { BrandShowcase } from './components/storefront/BrandShowcase';
import { ProductCatalog } from './components/storefront/ProductCatalog';
import { StoreInfoSection } from './components/storefront/StoreInfoSection';
import { ProductDetailModal } from './components/storefront/ProductDetailModal';
import { CartDrawer } from './components/storefront/CartDrawer';
import { CheckoutModal } from './components/storefront/CheckoutModal';
import { OrderTrackingModal } from './components/storefront/OrderTrackingModal';
import { InvoiceModal } from './components/storefront/InvoiceModal';
import { AdminAuthModal } from './components/admin/AdminAuthModal';
import { AdminLayout } from './components/admin/AdminLayout';

const MainAppContent: React.FC = () => {
  const { currentView } = useStore();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-900 selection:bg-blue-600 selection:text-white">
      {currentView === 'admin' ? (
        <AdminLayout />
      ) : (
        <>
          <Navbar />
          <main className="flex-1">
            <HeroBanner />
            <BrandShowcase />
            <ProductCatalog />
            <StoreInfoSection />
          </main>
          <Footer />
        </>
      )}

      {/* Shared Interactive Modals */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderTrackingModal />
      <InvoiceModal />
      <AdminAuthModal />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainAppContent />
    </StoreProvider>
  );
}
