import React from 'react';

export const TrustStrip: React.FC = () => {
  return (
    <section className="bg-surface-container-low py-6 border-y border-outline/10">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-wrap justify-center md:justify-between items-center gap-6 text-on-surface-variant">
        <div className="flex items-center gap-2">
          <div className="flex text-tertiary">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          </div>
          <span className="font-label-sm text-label-sm italic">"Best cookies since Grandma's"</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">local_shipping</span>
          <span className="font-label-sm text-label-sm">Hand-delivered Nationwide</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary">eco</span>
          <span className="font-label-sm text-label-sm">100% Organic, Local Ingredients</span>
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <span className="material-symbols-outlined text-tertiary">bakery_dining</span>
          <span className="font-label-sm text-label-sm">Baked Fresh Every Morning</span>
        </div>
      </div>
    </section>
  );
};
