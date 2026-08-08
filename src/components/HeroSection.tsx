import React from 'react';
import { HERO_IMAGE } from '../data/products';

interface HeroSectionProps {
  onShopClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onShopClick }) => {
  return (
    <section className="relative h-[780px] min-h-[550px] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/25 z-10"></div>
        <img
          className="w-full h-full object-cover"
          src={HERO_IMAGE}
          alt="Cinematic close-up of freshly baked chocolate chip cookies cooling on a wire rack in warm golden sunlight"
        />
      </div>
      <div className="relative z-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full text-white">
        <div className="max-w-2xl bg-black/20 backdrop-blur-xs p-8 rounded-2xl border border-white/10">
          <span className="font-accent-badge text-accent-badge text-amber-200 mb-2 block">
            ~ Est. 1974 Vermont Bakery ~
          </span>
          <h1 className="font-display-lg text-display-lg mb-4 drop-shadow-md leading-tight">
            Baked the Old-Fashioned Way
          </h1>
          <p className="font-body-lg text-body-lg mb-8 text-white/95 leading-relaxed">
            Small batches, big love from our farmhouse kitchen to your home. Every crumb tells a story of heritage and heat.
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            <button
              onClick={onShopClick}
              className="bg-primary text-on-primary px-8 py-4 rounded-lg font-bold text-lg hover:brightness-110 active-squish transition-all rustic-shadow flex items-center gap-2"
            >
              <span>Shop Fresh Batches</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
            <a
              href="#featured"
              className="px-6 py-4 rounded-lg font-bold text-white hover:bg-white/10 transition-colors border border-white/30"
            >
              Explore Flavors
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
