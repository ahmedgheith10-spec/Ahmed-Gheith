import React, { useState } from 'react';
import { ViewMode } from '../types';

interface NavbarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenAiAssistant: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  cartCount,
  onOpenCart,
  onOpenAiAssistant,
  searchQuery,
  onSearchChange,
}) => {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-sm border-b border-outline/10 transition-all duration-200">
      <div className="flex justify-between items-center px-4 md:px-margin-desktop py-4 max-w-container-max mx-auto">
        {/* Brand & Nav Links */}
        <div className="flex items-center gap-8">
          <button 
            onClick={() => onNavigate('home')} 
            className="font-headline-md text-headline-md text-primary tracking-tight font-bold select-none text-left flex items-center gap-2 group"
          >
            <span className="material-symbols-outlined text-primary group-hover:rotate-12 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>
              cookie
            </span>
            <span>Hearth & Crumb</span>
          </button>
          
          <div className="hidden md:flex gap-6 items-center">
            <button
              onClick={() => onNavigate('shop')}
              className={`font-body-md text-body-md transition-colors duration-200 pb-1 ${
                currentView === 'shop'
                  ? 'text-primary font-bold border-b-2 border-primary'
                  : 'text-on-surface-variant font-medium hover:text-primary'
              }`}
            >
              Shop
            </button>
            <button
              onClick={() => onNavigate('story')}
              className={`font-body-md text-body-md transition-colors duration-200 pb-1 ${
                currentView === 'story'
                  ? 'text-primary font-bold border-b-2 border-primary'
                  : 'text-on-surface-variant font-medium hover:text-primary'
              }`}
            >
              Our Story
            </button>
            <button
              onClick={onOpenAiAssistant}
              className="text-secondary font-medium pb-1 hover:text-primary transition-colors duration-200 font-body-md text-body-md flex items-center gap-1.5 bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20 hover:bg-secondary/20"
            >
              <span className="material-symbols-outlined text-sm">auto_awesome</span>
              <span>Ask Clara (AI)</span>
            </button>
          </div>
        </div>

        {/* Right Section: Search & Actions */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Search Input on Desktop */}
          <div className="hidden lg:flex bg-surface-container rounded-full px-4 py-1.5 items-center gap-2 border border-outline/10">
            <span className="material-symbols-outlined text-on-surface-variant text-sm">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (currentView !== 'shop' && e.target.value.trim() !== '') {
                  onNavigate('shop');
                }
              }}
              placeholder="Find your flavor..."
              className="bg-transparent border-none focus:outline-none focus:ring-0 text-sm text-on-surface-variant placeholder:text-on-surface-variant/50 w-48 font-body-md"
            />
            {searchQuery && (
              <button 
                onClick={() => onSearchChange('')} 
                className="text-xs text-on-surface-variant/60 hover:text-on-surface"
              >
                ✕
              </button>
            )}
          </div>

          {/* AI Helper Mobile Trigger */}
          <button
            onClick={onOpenAiAssistant}
            className="md:hidden p-2 text-secondary hover:text-primary transition-colors active-squish"
            title="Ask Clara (AI Cookie Assistant)"
          >
            <span className="material-symbols-outlined">auto_awesome</span>
          </button>

          {/* Search Mobile Toggle */}
          <button
            onClick={() => {
              setMobileSearchOpen(!mobileSearchOpen);
              if (currentView !== 'shop') onNavigate('shop');
            }}
            className="lg:hidden p-2 hover:text-primary transition-colors active-squish"
            aria-label="Search"
          >
            <span className="material-symbols-outlined">search</span>
          </button>

          {/* User Profile */}
          <button 
            onClick={() => alert("Welcome back! You are logged in as a Hearth & Crumb VIP Baker.")}
            className="p-2 hover:text-primary transition-colors active-squish text-on-surface"
            aria-label="Account"
          >
            <span className="material-symbols-outlined">account_circle</span>
          </button>

          {/* Cart Bag */}
          <button
            onClick={onOpenCart}
            className="p-2 hover:text-primary transition-colors active-squish relative text-on-surface"
            aria-label="Shopping Cart"
          >
            <span className="material-symbols-outlined">shopping_bag</span>
            {cartCount > 0 ? (
              <span className="absolute -top-1 -right-1 bg-primary text-on-primary text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-sm animate-pulse">
                {cartCount}
              </span>
            ) : (
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary/40 rounded-full"></span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:text-primary transition-colors active-squish"
          >
            <span className="material-symbols-outlined">{mobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Search Bar Expansion */}
      {mobileSearchOpen && (
        <div className="lg:hidden px-4 pb-3 bg-background border-t border-outline/10">
          <div className="flex bg-surface-container rounded-full px-4 py-2 items-center gap-2 border border-outline/10 mt-2">
            <span className="material-symbols-outlined text-on-surface-variant text-sm">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search cookies by flavor, ingredient..."
              className="bg-transparent border-none focus:outline-none focus:ring-0 text-sm text-on-surface-variant placeholder:text-on-surface-variant/50 w-full font-body-md"
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface-container-low border-b border-outline/10 px-6 py-4 flex flex-col gap-3">
          <button
            onClick={() => {
              onNavigate('home');
              setMobileMenuOpen(false);
            }}
            className={`text-left py-2 font-body-md font-bold ${
              currentView === 'home' ? 'text-primary' : 'text-on-surface'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => {
              onNavigate('shop');
              setMobileMenuOpen(false);
            }}
            className={`text-left py-2 font-body-md font-bold ${
              currentView === 'shop' ? 'text-primary' : 'text-on-surface'
            }`}
          >
            Shop All Batches
          </button>
          <button
            onClick={() => {
              onNavigate('story');
              setMobileMenuOpen(false);
            }}
            className={`text-left py-2 font-body-md font-bold ${
              currentView === 'story' ? 'text-primary' : 'text-on-surface'
            }`}
          >
            Our Story
          </button>
          <button
            onClick={() => {
              onOpenAiAssistant();
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 py-2 text-secondary font-bold"
          >
            <span className="material-symbols-outlined">auto_awesome</span>
            <span>Ask Clara (AI Cookie Recommendation)</span>
          </button>
        </div>
      )}
    </nav>
  );
};
