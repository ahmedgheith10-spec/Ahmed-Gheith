import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TrustStrip } from './components/TrustStrip';
import { HomeFeaturedBatches } from './components/HomeFeaturedBatches';
import { BrandStory } from './components/BrandStory';
import { Newsletter } from './components/Newsletter';
import { ShopPage } from './components/ShopPage';
import { OurStoryPage } from './components/OurStoryPage';
import { CheckoutPage } from './components/CheckoutPage';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { AIBakersAssistantModal } from './components/AIBakersAssistantModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { Footer } from './components/Footer';

import { COOKIES } from './data/products';
import { CartItem, Cookie, Order, ViewMode } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // Initial sample items matching screen 3 mock if desired or empty
    return [
      { cookie: COOKIES[0], quantity: 1 },
      { cookie: COOKIES[3], quantity: 1 },
    ];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedQuickViewCookie, setSelectedQuickViewCookie] = useState<Cookie | null>(null);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Scroll listener for Back to Top FAB
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = (cookie: Cookie, quantity: number = 1) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex((item) => item.cookie.id === cookie.id);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      }
      return [...prev, { cookie, quantity }];
    });
  };

  const handleUpdateQuantity = (cookieId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.cookie.id === cookieId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (cookieId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cookie.id !== cookieId));
  };

  const handlePlaceOrder = (order: Order) => {
    setCompletedOrder(order);
    setCartItems([]);
    setCurrentView('home');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cartTotalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col relative selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Texture grain overlay */}
      <div className="grain-overlay"></div>

      {/* Navigation (suppressed in checkout view) */}
      {currentView !== 'checkout' && (
        <Navbar
          currentView={currentView}
          onNavigate={(view) => {
            setCurrentView(view);
            scrollToTop();
          }}
          cartCount={cartTotalCount}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      )}

      {/* Main Views */}
      <main className="flex-grow">
        {currentView === 'home' && (
          <>
            <HeroSection
              onShopClick={() => {
                setCurrentView('shop');
                scrollToTop();
              }}
            />
            <TrustStrip />
            <HomeFeaturedBatches
              cookies={COOKIES}
              onAddToCart={handleAddToCart}
              onViewAll={() => {
                setCurrentView('shop');
                scrollToTop();
              }}
              onCookieClick={(cookie) => setSelectedQuickViewCookie(cookie)}
            />
            <BrandStory
              onReadStoryClick={() => {
                setCurrentView('story');
                scrollToTop();
              }}
            />
            <Newsletter />
          </>
        )}

        {currentView === 'shop' && (
          <>
            <ShopPage
              cookies={COOKIES}
              onAddToCart={handleAddToCart}
              onCookieClick={(cookie) => setSelectedQuickViewCookie(cookie)}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
            <Newsletter />
          </>
        )}

        {currentView === 'story' && (
          <>
            <OurStoryPage
              onShopClick={() => {
                setCurrentView('shop');
                scrollToTop();
              }}
            />
            <Newsletter />
          </>
        )}

        {currentView === 'checkout' && (
          <CheckoutPage
            cartItems={cartItems}
            onPlaceOrder={handlePlaceOrder}
            onBackToShop={() => {
              setCurrentView('shop');
              scrollToTop();
            }}
          />
        )}
      </main>

      {/* Shared Footer (suppressed in checkout view) */}
      {currentView !== 'checkout' && (
        <Footer
          onNavigate={(view) => {
            setCurrentView(view);
            scrollToTop();
          }}
        />
      )}

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckoutClick={() => {
          setIsCartOpen(false);
          setCurrentView('checkout');
          scrollToTop();
        }}
      />

      {/* Cookie Quick View Modal */}
      <QuickViewModal
        cookie={selectedQuickViewCookie}
        onClose={() => setSelectedQuickViewCookie(null)}
        onAddToCart={handleAddToCart}
      />

      {/* AI Baker Clara Assistant Modal */}
      <AIBakersAssistantModal
        isOpen={isAiAssistantOpen}
        onClose={() => setIsAiAssistantOpen(false)}
        cookies={COOKIES}
        onAddToCart={(cookie) => handleAddToCart(cookie, 1)}
      />

      {/* Order Success Confirmation Popup */}
      <OrderConfirmationModal
        order={completedOrder}
        onClose={() => setCompletedOrder(null)}
      />

      {/* Back to Top Floating Button */}
      {showBackToTop && currentView !== 'checkout' && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-secondary text-on-secondary w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 border border-white/20"
          title="Back to Top"
        >
          <span className="material-symbols-outlined">expand_less</span>
        </button>
      )}
    </div>
  );
}
