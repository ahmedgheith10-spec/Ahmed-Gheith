import React from 'react';
import { Order } from '../types';

interface OrderConfirmationModalProps {
  order: Order | null;
  onClose: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  onClose,
}) => {
  if (!order) return null;

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 3);
  const deliveryStr = estimatedDelivery.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-fade-in"
      ></div>

      {/* Confirmation Dialog */}
      <div className="relative bg-surface rounded-3xl max-w-lg w-full z-10 rustic-shadow border border-outline/10 p-6 md:p-8 space-y-6 text-center animate-scale-up">
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-secondary text-white flex items-center justify-center mx-auto rustic-shadow">
          <span className="material-symbols-outlined text-3xl">check_circle</span>
        </div>

        <div>
          <span className="font-accent-badge text-accent-badge text-secondary text-xl block">
            ~ Order Freshly Placed ~
          </span>
          <h2 className="font-display-lg text-headline-lg text-on-surface">Thank You, {order.shippingDetails.firstName}!</h2>
          <p className="text-xs text-on-surface-variant font-bold uppercase tracking-widest mt-1">
            Order #{order.id} • {order.date}
          </p>
        </div>

        {/* Delivery Box */}
        <div className="bg-surface-container-low p-4 rounded-xl border border-secondary/20 text-left space-y-2">
          <div className="flex items-center gap-2 text-secondary font-bold text-sm">
            <span className="material-symbols-outlined">local_shipping</span>
            <span>Estimated Fresh Delivery: {deliveryStr}</span>
          </div>
          <p className="text-xs text-on-surface-variant">
            Shipping to: <strong>{order.shippingDetails.address}, {order.shippingDetails.city}, {order.shippingDetails.state} {order.shippingDetails.zip}</strong>
          </p>
        </div>

        {/* Order Summary Items */}
        <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline/10 text-left max-h-[160px] overflow-y-auto space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Ordered Batches:</h4>
          {order.items.map((item) => (
            <div key={item.cookie.id} className="flex justify-between items-center text-sm">
              <span className="font-medium text-on-surface">
                {item.quantity}× {item.cookie.name}
              </span>
              <span className="text-primary font-bold">
                ${(item.cookie.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
          <div className="border-t border-outline/10 pt-2 flex justify-between font-bold text-on-surface text-base">
            <span>Total Paid</span>
            <span className="text-primary">${order.total.toFixed(2)}</span>
          </div>
        </div>

        {/* Baker Note */}
        <p className="font-accent-badge text-accent-badge text-secondary text-lg">
          "Your cookies will enter our hearth oven first thing tomorrow morning!" — Clara
        </p>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full bg-primary text-white py-3.5 rounded-xl font-bold hover:brightness-110 active-squish shadow-md"
        >
          Continue Browsing The Kitchen
        </button>
      </div>
    </div>
  );
};
