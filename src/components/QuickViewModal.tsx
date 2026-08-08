import React, { useState } from 'react';
import { Cookie } from '../types';

interface QuickViewModalProps {
  cookie: Cookie | null;
  onClose: () => void;
  onAddToCart: (cookie: Cookie, quantity: number) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  cookie,
  onClose,
  onAddToCart,
}) => {
  if (!cookie) return null;

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(cookie, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs animate-fade-in"
      ></div>

      {/* Modal Dialog */}
      <div className="relative bg-surface rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto z-10 rustic-shadow border border-outline/10 p-6 md:p-8 animate-scale-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:text-primary transition-colors"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Photo */}
          <div className="relative aspect-square rounded-xl overflow-hidden bg-surface-container-low rustic-shadow">
            <img
              src={cookie.image}
              alt={cookie.altText}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 right-3 bg-tertiary text-white px-3 py-1 rounded-full font-accent-badge text-accent-badge text-lg">
              ${cookie.price.toFixed(2)}
            </div>
            {cookie.badge && (
              <span className="absolute top-3 left-3 bg-secondary text-white text-xs font-bold uppercase px-2.5 py-1 rounded-full">
                {cookie.badge}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div>
              <span className="text-xs uppercase font-bold text-secondary tracking-widest block mb-1">
                {cookie.category}
              </span>
              <h3 className="font-headline-lg text-headline-lg text-on-surface mb-1">
                {cookie.name}
              </h3>

              {cookie.rating && (
                <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                  <div className="flex text-tertiary">
                    <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <span className="font-bold text-on-surface ml-1">{cookie.rating}</span>
                  </div>
                  <span>({cookie.reviewsCount} reviews)</span>
                </div>
              )}
            </div>

            <p className="font-body-md text-on-surface-variant text-sm leading-relaxed">
              {cookie.description}
            </p>

            {/* Ingredients */}
            {cookie.ingredients && (
              <div className="space-y-1 pt-2 border-t border-outline/10">
                <h4 className="font-label-sm text-xs text-on-surface uppercase tracking-wider">
                  Organic Ingredients:
                </h4>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cookie.ingredients.map((ing, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-surface-container-low px-2.5 py-1 rounded-md text-on-surface-variant border border-outline/10"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Baker Tip */}
            {cookie.bakersTip && (
              <div className="bakers-note p-3 rounded-lg text-xs space-y-0.5">
                <span className="font-bold text-secondary flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">temp_preferences_eco</span>
                  <span>Warming Tip:</span>
                </span>
                <p className="text-on-surface-variant italic">{cookie.bakersTip}</p>
              </div>
            )}

            {/* Actions */}
            <div className="pt-2 flex items-center gap-4">
              <div className="flex items-center border border-outline/20 rounded-lg px-3 py-2 bg-surface-container-low">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="font-bold text-lg text-on-surface px-2 hover:text-primary"
                >
                  -
                </button>
                <span className="font-bold text-on-surface px-3">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="font-bold text-lg text-on-surface px-2 hover:text-primary"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                className={`flex-grow py-3 rounded-xl font-bold transition-all squish flex items-center justify-center gap-2 ${
                  added
                    ? 'bg-secondary text-white'
                    : 'bg-primary text-white hover:brightness-110'
                }`}
              >
                {added ? (
                  <>
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    <span>Added to Box!</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
                    <span>Add {quantity} Box{quantity > 1 ? 'es' : ''} (${(cookie.price * quantity).toFixed(2)})</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
