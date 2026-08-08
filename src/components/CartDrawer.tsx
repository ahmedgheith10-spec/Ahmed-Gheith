import React from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cookieId: string, delta: number) => void;
  onRemoveItem: (cookieId: string) => void;
  onCheckoutClick: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckoutClick,
}) => {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.cookie.price * item.quantity, 0);
  const freeShippingThreshold = 40.0;
  const progressPercent = Math.min((subtotal / freeShippingThreshold) * 100, 100);
  const amountNeeded = Math.max(freeShippingThreshold - subtotal, 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300 animate-fade-in"
      ></div>

      {/* Drawer Container */}
      <div className="relative w-full max-w-md bg-surface h-full shadow-2xl flex flex-col justify-between z-10 animate-slide-left border-l border-outline/10">
        {/* Header */}
        <div className="p-6 border-b border-outline/10 bg-surface-container-low flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              shopping_bag
            </span>
            <h2 className="font-headline-md text-headline-md text-on-surface">Your Cookie Box</h2>
            <span className="bg-primary/10 text-primary font-bold text-xs px-2.5 py-0.5 rounded-full">
              {cartItems.reduce((acc, i) => acc + i.quantity, 0)} items
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-on-surface-variant hover:text-on-surface rounded-full hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-secondary/10 px-6 py-3 border-b border-secondary/20">
          {subtotal >= freeShippingThreshold ? (
            <p className="text-secondary font-bold text-xs flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base">check_circle</span>
              <span>Congratulations! You've unlocked FREE Fresh Delivery!</span>
            </p>
          ) : (
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium text-on-surface-variant">
                <span>Add <strong>${amountNeeded.toFixed(2)}</strong> more for Free Shipping</span>
                <span>{Math.round(progressPercent)}%</span>
              </div>
              <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                <div
                  className="bg-secondary h-full transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Cart Items List */}
        <div className="flex-grow overflow-y-auto p-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-on-surface-variant space-y-3 py-12">
              <span className="material-symbols-outlined text-5xl opacity-40">cookie</span>
              <p className="font-headline-md text-lg">Your box is completely empty</p>
              <p className="text-sm max-w-xs">
                Explore our current batches and add handmade treats to start building your order.
              </p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.cookie.id}
                className="flex gap-4 p-3 bg-surface-container-low rounded-xl border border-outline/10 rustic-shadow"
              >
                <img
                  src={item.cookie.image}
                  alt={item.cookie.name}
                  className="w-20 h-20 object-cover rounded-lg bg-surface"
                />

                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-body-lg font-bold text-on-surface text-base line-clamp-1">
                        {item.cookie.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.cookie.id)}
                        className="text-on-surface-variant/60 hover:text-error text-xs p-0.5"
                        title="Remove from box"
                      >
                        ✕
                      </button>
                    </div>
                    <p className="text-xs text-primary font-bold mt-0.5">
                      ${(item.cookie.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-on-surface-variant italic">Batch of 6</span>

                    <div className="flex items-center gap-2 bg-surface border border-outline/20 rounded-lg px-2 py-0.5">
                      <button
                        onClick={() => onUpdateQuantity(item.cookie.id, -1)}
                        className="text-on-surface hover:text-primary font-bold text-sm px-1"
                      >
                        -
                      </button>
                      <span className="font-bold text-sm text-on-surface w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.cookie.id, 1)}
                        className="text-on-surface hover:text-primary font-bold text-sm px-1"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cartItems.length > 0 && (
          <div className="p-6 bg-surface-container-low border-t border-outline/10 space-y-4">
            <div className="flex justify-between items-center text-on-surface font-body-lg">
              <span className="font-bold">Subtotal:</span>
              <span className="font-headline-md text-primary font-bold">${subtotal.toFixed(2)}</span>
            </div>
            <p className="text-xs text-on-surface-variant">
              Taxes and fresh packaging calculated at checkout.
            </p>

            <button
              onClick={() => {
                onClose();
                onCheckoutClick();
              }}
              className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold hover:brightness-110 active-squish transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
