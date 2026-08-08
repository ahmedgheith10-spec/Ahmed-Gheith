import React, { useState } from 'react';
import { Cookie } from '../types';

interface HomeFeaturedBatchesProps {
  cookies: Cookie[];
  onAddToCart: (cookie: Cookie) => void;
  onViewAll: () => void;
  onCookieClick: (cookie: Cookie) => void;
}

export const HomeFeaturedBatches: React.FC<HomeFeaturedBatchesProps> = ({
  cookies,
  onAddToCart,
  onViewAll,
  onCookieClick,
}) => {
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleAdd = (e: React.MouseEvent, cookie: Cookie) => {
    e.stopPropagation();
    onAddToCart(cookie);
    setAddedId(cookie.id);
    setTimeout(() => {
      setAddedId(null);
    }, 1800);
  };

  // Show top 3 featured cookies
  const featured = cookies.slice(0, 3);

  return (
    <section id="featured" className="py-20 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
      <div className="flex justify-between items-end mb-12">
        <div>
          <span className="font-accent-badge text-accent-badge text-secondary mb-1 block">
            ~ Fresh From the Oven ~
          </span>
          <h2 className="font-headline-lg text-headline-lg mb-2">Our Current Batches</h2>
          <p className="text-on-surface-variant">Baking daily in small groups to ensure perfect texture.</p>
        </div>
        <button
          onClick={onViewAll}
          className="font-label-sm text-label-sm text-primary flex items-center gap-1 hover:underline group cursor-pointer"
        >
          <span>VIEW ALL BATCHES</span>
          <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {featured.map((cookie) => (
          <div
            key={cookie.id}
            onClick={() => onCookieClick(cookie)}
            className="group cursor-pointer bg-surface rounded-xl p-3 border border-outline/10 hover:border-outline/30 hover:rustic-shadow transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-square overflow-hidden rounded-xl mb-4 rustic-shadow bg-surface-container-low">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={cookie.image}
                  alt={cookie.altText}
                />
                <div className="absolute top-4 right-4 bg-tertiary text-white px-3 py-1 rounded-full font-accent-badge text-accent-badge shadow-md">
                  ${cookie.price.toFixed(2)}
                </div>
                {cookie.badge && (
                  <div className="absolute top-4 left-4 bg-secondary/90 backdrop-blur-xs text-white px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider">
                    {cookie.badge}
                  </div>
                )}
              </div>

              <h3 className="font-headline-md text-headline-md mb-1 text-on-surface group-hover:text-primary transition-colors">
                {cookie.name}
              </h3>
              <p className="text-on-surface-variant mb-4 line-clamp-2 text-sm leading-relaxed">
                {cookie.description}
              </p>
            </div>

            <button
              onClick={(e) => handleAdd(e, cookie)}
              className={`w-full py-2.5 rounded-lg font-bold transition-all squish flex items-center justify-center gap-2 border-2 ${
                addedId === cookie.id
                  ? 'bg-secondary border-secondary text-white'
                  : 'border-primary text-primary hover:bg-primary hover:text-white'
              }`}
            >
              {addedId === cookie.id ? (
                <>
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  <span>Added to Box!</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
                  <span>Add to Box</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
