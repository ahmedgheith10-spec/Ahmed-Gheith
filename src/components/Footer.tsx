import React from 'react';
import { ViewMode } from '../types';

interface FooterProps {
  onNavigate: (view: ViewMode) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-surface-container dark:bg-surface-container w-full mt-auto border-t border-outline/10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter px-4 md:px-margin-desktop py-16 max-w-container-max mx-auto">
        {/* Brand Info */}
        <div className="flex flex-col gap-4">
          <button
            onClick={() => onNavigate('home')}
            className="font-headline-lg text-headline-lg text-primary text-left font-bold"
          >
            Hearth & Crumb
          </button>
          <p className="text-on-surface-variant font-body-md text-body-md max-w-sm leading-relaxed">
            Small-batch cookies delivered from our farm to your door. Handmade with passion, butter, and a little bit of magic.
          </p>
          <div className="flex gap-3 mt-2">
            <button
              onClick={() => alert('Follow Hearth & Crumb on Instagram!')}
              className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-primary hover:scale-110 transition-transform shadow-xs"
              title="Instagram"
            >
              <span className="material-symbols-outlined text-xl">photo_camera</span>
            </button>
            <button
              onClick={() => alert('Scan QR Code for Farm Directions')}
              className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-primary hover:scale-110 transition-transform shadow-xs"
              title="QR Code"
            >
              <span className="material-symbols-outlined text-xl">qr_code_2</span>
            </button>
            <a
              href="mailto:clara@hearthandcrumb.com"
              className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-primary hover:scale-110 transition-transform shadow-xs"
              title="Email Us"
            >
              <span className="material-symbols-outlined text-xl">mail</span>
            </a>
          </div>
        </div>

        {/* Link Columns */}
        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col gap-3">
            <h4 className="font-label-sm text-label-sm uppercase tracking-widest text-primary">Explore</h4>
            <button
              onClick={() => onNavigate('shop')}
              className="text-left text-on-surface-variant hover:text-primary transition-colors font-body-md"
            >
              Shop All
            </button>
            <button
              onClick={() => onNavigate('shop')}
              className="text-left text-on-surface-variant hover:text-primary transition-colors font-body-md"
            >
              Gifting
            </button>
            <button
              onClick={() => onNavigate('story')}
              className="text-left text-on-surface-variant hover:text-primary transition-colors font-body-md"
            >
              Our Story
            </button>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="font-label-sm text-label-sm uppercase tracking-widest text-primary">Support</h4>
            <button
              onClick={() => alert('Standard Shipping: 2-3 Business Days in insulated eco-boxes.')}
              className="text-left text-on-surface-variant hover:text-primary transition-colors font-body-md"
            >
              Shipping
            </button>
            <button
              onClick={() => alert('FAQ: We bake fresh every morning at 5:00 AM.')}
              className="text-left text-on-surface-variant hover:text-primary transition-colors font-body-md"
            >
              FAQ
            </button>
            <button
              onClick={() => alert('Contact: clara@hearthandcrumb.com')}
              className="text-left text-on-surface-variant hover:text-primary transition-colors font-body-md"
            >
              Contact
            </button>
          </div>
        </div>

        {/* Address & Hours */}
        <div className="flex flex-col gap-4">
          <h4 className="font-label-sm text-label-sm uppercase tracking-widest text-primary">Visit Us</h4>
          <p className="text-on-surface-variant font-body-md leading-relaxed">
            1244 Oatfield Lane<br />
            Rural Haven, VT 05401
          </p>
          <div className="mt-2 p-4 border border-outline/20 rounded-xl dashed-separator bg-surface-container/50">
            <p className="font-accent-badge text-accent-badge text-primary text-xl">
              Open Sat-Sun for Farm Pickups
            </p>
          </div>
        </div>
      </div>

      {/* Sub-footer */}
      <div className="border-t border-outline/10 py-6 px-4 md:px-margin-desktop max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
        <p className="text-on-surface-variant font-label-sm opacity-80">
          © 2024 Hearth & Crumb Cookie Co. Hand-baked with heart.
        </p>
        <div className="flex gap-6">
          <button onClick={() => alert('Privacy Policy')} className="text-on-surface-variant hover:text-primary">
            Privacy
          </button>
          <button onClick={() => alert('Terms of Service')} className="text-on-surface-variant hover:text-primary">
            Terms
          </button>
        </div>
      </div>
    </footer>
  );
};
