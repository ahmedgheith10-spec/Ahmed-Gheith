import React, { useState } from 'react';
import { CartItem, Order, ShippingDetails } from '../types';

interface CheckoutPageProps {
  cartItems: CartItem[];
  onPlaceOrder: (order: Order) => void;
  onBackToShop: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  cartItems,
  onPlaceOrder,
  onBackToShop,
}) => {
  const [shipping, setShipping] = useState<ShippingDetails>({
    firstName: 'Jane',
    lastName: 'Smith',
    address: '123 Crumb Lane',
    city: 'Bakerstown',
    state: 'NY',
    zip: '10001',
    email: 'jane.smith@example.com',
  });

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'instapay' | 'fawry' | 'wallet' | 'meeza' | 'cod' | 'apple' | 'gpay'>('instapay');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8892');
  const [expiry, setExpiry] = useState('12/28');
  const [cvv, setCvv] = useState('321');
  const [isProcessing, setIsProcessing] = useState(false);

  // Egyptian Payment Specific State
  const [instaPayAddress, setInstaPayAddress] = useState('');
  const [walletNumber, setWalletNumber] = useState('01012345678');
  const [walletProvider, setWalletProvider] = useState<'vodafone' | 'orange' | 'etisalat' | 'we'>('vodafone');
  const [fawryCode] = useState(() => Math.floor(100000000 + Math.random() * 900000000).toString().replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3'));
  const [codNote, setCodNote] = useState('');

  const EGP_RATE = 50; // 1 USD = 50 EGP approximate
  const subtotal = cartItems.reduce((acc, item) => acc + item.cookie.price * item.quantity, 0);
  const tax = subtotal * 0.0825;
  const shippingFee = subtotal >= 40 ? 0 : 5.00;
  const total = subtotal + tax + shippingFee;
  const totalEGP = Math.round(total * EGP_RATE);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setIsProcessing(true);

    setTimeout(() => {
      const newOrder: Order = {
        id: 'HC-' + Math.floor(100000 + Math.random() * 900000),
        date: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        items: [...cartItems],
        subtotal,
        tax,
        shipping: shippingFee,
        total,
        shippingDetails: shipping,
      };

      setIsProcessing(false);
      onPlaceOrder(newOrder);
    }, 1800);
  };

  if (cartItems.length === 0) {
    return (
      <div className="pt-28 pb-20 px-4 max-w-container-max mx-auto text-center space-y-6">
        <span className="material-symbols-outlined text-6xl text-primary">shopping_bag</span>
        <h2 className="font-display-lg text-display-lg">Your Cookie Box is Empty</h2>
        <p className="text-on-surface-variant max-w-md mx-auto">
          Add some fresh small-batch cookies from our kitchen before heading to checkout!
        </p>
        <button
          onClick={onBackToShop}
          className="bg-primary text-white px-8 py-3.5 rounded-lg font-bold hover:brightness-110 active-squish shadow-md"
        >
          Return to Cookie Kitchen
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-on-background selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Suppressed Navigation Header */}
      <header className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-sm border-b border-outline/10">
        <div className="flex justify-between items-center px-4 md:px-margin-desktop py-4 max-w-container-max mx-auto">
          <button
            onClick={onBackToShop}
            className="font-headline-md text-headline-md text-primary flex items-center gap-2 font-bold hover:opacity-80 transition-opacity"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              cookie
            </span>
            <span>Hearth & Crumb</span>
          </button>
          <div className="flex items-center gap-2 text-on-surface-variant font-body-md text-sm bg-surface-container px-3 py-1.5 rounded-full border border-outline/10">
            <span className="material-symbols-outlined text-base text-secondary">lock</span>
            <span className="hidden sm:inline font-bold">256-bit Secure Checkout</span>
          </div>
        </div>
      </header>

      {/* Main Flow */}
      <main className="flex-grow pt-24 pb-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* Left Side: Form Flow */}
          <div className="lg:col-span-7 space-y-10">
            {/* Step 1: Shipping */}
            <section>
              <div className="flex items-center gap-4 mb-6">
                <span className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold font-body-md shadow-xs">
                  1
                </span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface">Shipping Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    value={shipping.firstName}
                    onChange={(e) => setShipping({ ...shipping, firstName: e.target.value })}
                    className="w-full bg-surface-container-low border border-outline/20 rounded-lg p-3.5 font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container transition-all"
                    placeholder="E.g. Jane"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    value={shipping.lastName}
                    onChange={(e) => setShipping({ ...shipping, lastName: e.target.value })}
                    className="w-full bg-surface-container-low border border-outline/20 rounded-lg p-3.5 font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container transition-all"
                    placeholder="E.g. Smith"
                  />
                </div>

                <div className="md:col-span-2 space-y-1.5">
                  <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={shipping.email}
                    onChange={(e) => setShipping({ ...shipping, email: e.target.value })}
                    className="w-full bg-surface-container-low border border-outline/20 rounded-lg p-3.5 font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container transition-all"
                    placeholder="jane.smith@example.com"
                  />
                </div>

                <div className="md:col-span-2 space-y-1.5">
                  <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    Street Address
                  </label>
                  <input
                    type="text"
                    required
                    value={shipping.address}
                    onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                    className="w-full bg-surface-container-low border border-outline/20 rounded-lg p-3.5 font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container transition-all"
                    placeholder="123 Crumb Lane"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={shipping.city}
                    onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                    className="w-full bg-surface-container-low border border-outline/20 rounded-lg p-3.5 font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container transition-all"
                    placeholder="Bakerstown"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                      State
                    </label>
                    <select
                      value={shipping.state}
                      onChange={(e) => setShipping({ ...shipping, state: e.target.value })}
                      className="w-full bg-surface-container-low border border-outline/20 rounded-lg p-3.5 font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container transition-all cursor-pointer"
                    >
                      <option>NY</option>
                      <option>CA</option>
                      <option>VT</option>
                      <option>MA</option>
                      <option>TX</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      required
                      value={shipping.zip}
                      onChange={(e) => setShipping({ ...shipping, zip: e.target.value })}
                      className="w-full bg-surface-container-low border border-outline/20 rounded-lg p-3.5 font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container transition-all"
                      placeholder="10001"
                    />
                  </div>
                </div>
              </div>
            </section>

            <div className="border-b border-dashed border-outline-variant/40"></div>

            {/* Step 2: Payment */}
            <section>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold font-body-md shadow-xs">
                    2
                  </span>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface">Payment Method</h2>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container border border-outline/20 text-xs font-bold text-primary">
                  <span>🇪🇬 Egypt Payment Gateway</span>
                </div>
              </div>

              {/* Egyptian Payment Selector Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {/* InstaPay */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('instapay')}
                  className={`p-3.5 rounded-xl text-left border transition-all active:scale-[0.98] cursor-pointer flex flex-col justify-between h-24 ${
                    paymentMethod === 'instapay'
                      ? 'bg-primary/10 border-primary ring-2 ring-primary text-on-surface'
                      : 'bg-surface-container-low border-outline/20 hover:border-outline/40 text-on-surface-variant'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs uppercase tracking-wider text-primary">IPN</span>
                    <span className="text-xs text-secondary font-semibold">⚡ Instant</span>
                  </div>
                  <div>
                    <div className="font-bold text-sm text-on-surface">InstaPay</div>
                    <div className="text-[11px] text-on-surface-variant">انستاباي - تحويل لحظي</div>
                  </div>
                </button>

                {/* Fawry */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('fawry')}
                  className={`p-3.5 rounded-xl text-left border transition-all active:scale-[0.98] cursor-pointer flex flex-col justify-between h-24 ${
                    paymentMethod === 'fawry'
                      ? 'bg-primary/10 border-primary ring-2 ring-primary text-on-surface'
                      : 'bg-surface-container-low border-outline/20 hover:border-outline/40 text-on-surface-variant'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs uppercase tracking-wider text-amber-500">Fawry</span>
                    <span className="text-xs text-on-surface-variant">Kiosk/App</span>
                  </div>
                  <div>
                    <div className="font-bold text-sm text-on-surface">Fawry Pay</div>
                    <div className="text-[11px] text-on-surface-variant">فوري - كود دفع</div>
                  </div>
                </button>

                {/* E-Wallets / Vodafone Cash */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('wallet')}
                  className={`p-3.5 rounded-xl text-left border transition-all active:scale-[0.98] cursor-pointer flex flex-col justify-between h-24 ${
                    paymentMethod === 'wallet'
                      ? 'bg-primary/10 border-primary ring-2 ring-primary text-on-surface'
                      : 'bg-surface-container-low border-outline/20 hover:border-outline/40 text-on-surface-variant'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs uppercase tracking-wider text-red-400">Cash</span>
                    <span className="text-xs text-on-surface-variant">Mobile</span>
                  </div>
                  <div>
                    <div className="font-bold text-sm text-on-surface">Smart Wallets</div>
                    <div className="text-[11px] text-on-surface-variant">فودافون/أورنج/اتصالات/وي</div>
                  </div>
                </button>

                {/* Meeza Card */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('meeza')}
                  className={`p-3.5 rounded-xl text-left border transition-all active:scale-[0.98] cursor-pointer flex flex-col justify-between h-24 ${
                    paymentMethod === 'meeza'
                      ? 'bg-primary/10 border-primary ring-2 ring-primary text-on-surface'
                      : 'bg-surface-container-low border-outline/20 hover:border-outline/40 text-on-surface-variant'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs uppercase tracking-wider text-emerald-400">Meeza</span>
                    <span className="text-xs text-on-surface-variant">Local Card</span>
                  </div>
                  <div>
                    <div className="font-bold text-sm text-on-surface">Meeza Card</div>
                    <div className="text-[11px] text-on-surface-variant">كارت ميزة المصري</div>
                  </div>
                </button>

                {/* Cash on Delivery */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3.5 rounded-xl text-left border transition-all active:scale-[0.98] cursor-pointer flex flex-col justify-between h-24 ${
                    paymentMethod === 'cod'
                      ? 'bg-primary/10 border-primary ring-2 ring-primary text-on-surface'
                      : 'bg-surface-container-low border-outline/20 hover:border-outline/40 text-on-surface-variant'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs uppercase tracking-wider text-primary">COD</span>
                    <span className="text-xs text-on-surface-variant">In EGP</span>
                  </div>
                  <div>
                    <div className="font-bold text-sm text-on-surface">Cash on Delivery</div>
                    <div className="text-[11px] text-on-surface-variant">الدفع عند الاستلام</div>
                  </div>
                </button>

                {/* Global Card */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3.5 rounded-xl text-left border transition-all active:scale-[0.98] cursor-pointer flex flex-col justify-between h-24 ${
                    paymentMethod === 'card'
                      ? 'bg-primary/10 border-primary ring-2 ring-primary text-on-surface'
                      : 'bg-surface-container-low border-outline/20 hover:border-outline/40 text-on-surface-variant'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs uppercase tracking-wider text-on-surface-variant">Card</span>
                    <span className="text-xs text-on-surface-variant">Visa/MC</span>
                  </div>
                  <div>
                    <div className="font-bold text-sm text-on-surface">International Card</div>
                    <div className="text-[11px] text-on-surface-variant">بطاقة ائتمان دولية</div>
                  </div>
                </button>
              </div>

              {/* Dynamic Payment Method Input Views */}
              <div className="bg-surface-container p-5 rounded-xl border border-outline/20 space-y-4">
                {/* 1. InstaPay */}
                {paymentMethod === 'instapay' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container-high border border-primary/30 text-sm">
                      <div>
                        <div className="font-bold text-primary">InstaPay Handle / IPA:</div>
                        <div className="font-mono text-base font-bold text-on-surface tracking-wide mt-0.5">hearthcrumb@instapay</div>
                      </div>
                      <span className="text-xs bg-primary text-on-primary font-bold px-2.5 py-1 rounded-md">
                        24/7 Zero Fees
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                        Your InstaPay Handle or Linked Mobile Number (عنوان انستاباي الخاص بك)
                      </label>
                      <input
                        type="text"
                        value={instaPayAddress}
                        onChange={(e) => setInstaPayAddress(e.target.value)}
                        placeholder="e.g. name@instapay or 01012345678"
                        className="w-full bg-surface-container-low border border-outline/20 rounded-lg p-3.5 font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div className="text-xs text-on-surface-variant bg-surface-container-low p-3 rounded-lg border border-outline/10 flex items-start gap-2">
                      <span className="material-symbols-outlined text-primary text-lg">info</span>
                      <span>
                        Transfer <strong>{totalEGP} EGP</strong> (${total.toFixed(2)}) via the InstaPay app to <strong>hearthcrumb@instapay</strong>. Your order will be confirmed automatically upon instant signal receipt.
                      </span>
                    </div>
                  </div>
                )}

                {/* 2. Fawry */}
                {paymentMethod === 'fawry' && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-surface-container-high border border-amber-500/30 text-center space-y-2">
                      <span className="text-xs text-on-surface-variant uppercase tracking-widest font-bold">Fawry Pay Reference Code</span>
                      <div className="font-mono text-2xl font-black text-amber-400 tracking-wider py-1 bg-surface-container-lowest rounded-lg border border-outline/10 max-w-xs mx-auto">
                        {fawryCode}
                      </div>
                      <p className="text-xs text-on-surface-variant">
                        Valid for 48 hours at any Fawry retail kiosk, myFawry app, or supermarket in Egypt.
                      </p>
                    </div>

                    <div className="text-xs text-on-surface-variant bg-surface-container-low p-3 rounded-lg border border-outline/10 space-y-1">
                      <div className="font-bold text-on-surface">How to pay with Fawry (كيفية الدفع):</div>
                      <ol className="list-decimal list-inside space-y-1 pl-1">
                        <li>Visit any Fawry POS store or open the myFawry App.</li>
                        <li>Select <strong>Fawry Pay (فوري باي)</strong> and enter code <strong className="text-amber-400 font-mono">{fawryCode}</strong>.</li>
                        <li>Pay <strong>{totalEGP} EGP</strong> and keep your receipt for delivery verification.</li>
                      </ol>
                    </div>
                  </div>
                )}

                {/* 3. Mobile Wallet */}
                {paymentMethod === 'wallet' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                        Select Mobile Operator (اختر محفظة الموبايل)
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { id: 'vodafone', name: 'Vodafone Cash', code: 'فودافون كاش' },
                          { id: 'orange', name: 'Orange Cash', code: 'أورنج كاش' },
                          { id: 'etisalat', name: 'Etisalat Cash', code: 'اتصالات كاش' },
                          { id: 'we', name: 'WE Pay', code: 'وي باي' },
                        ].map((provider) => (
                          <button
                            key={provider.id}
                            type="button"
                            onClick={() => setWalletProvider(provider.id as any)}
                            className={`p-2.5 rounded-lg border text-left text-xs transition-all ${
                              walletProvider === provider.id
                                ? 'bg-primary/20 border-primary text-on-surface font-bold'
                                : 'bg-surface-container-low border-outline/20 text-on-surface-variant'
                            }`}
                          >
                            <div className="font-bold">{provider.name}</div>
                            <div className="text-[10px] opacity-80">{provider.code}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                        Mobile Wallet Number (رقم المحفظة)
                      </label>
                      <input
                        type="text"
                        value={walletNumber}
                        onChange={(e) => setWalletNumber(e.target.value)}
                        placeholder="e.g. 01012345678"
                        className="w-full bg-surface-container-low border border-outline/20 rounded-lg p-3.5 font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div className="text-xs text-on-surface-variant bg-surface-container-low p-3 rounded-lg border border-outline/10">
                      An USSD request / push prompt for <strong>{totalEGP} EGP</strong> will be sent to <strong>{walletNumber}</strong> to enter your Wallet PIN upon order placement.
                    </div>
                  </div>
                )}

                {/* 4. Meeza Card */}
                {paymentMethod === 'meeza' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-500/10 p-2.5 rounded-lg border border-emerald-500/20">
                      <span className="material-symbols-outlined text-base">credit_card</span>
                      <span>Meeza National Egyptian Payment Card (بطاقة ميزة الوطنية)</span>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                        Meeza Card Number (رقم بطاقة ميزة)
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-surface-container-low border border-outline/20 rounded-lg p-3.5 font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="5078 •••• •••• ••••"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                          Expiry
                        </label>
                        <input
                          type="text"
                          value={expiry}
                          onChange={(e) => setExpiry(e.target.value)}
                          className="w-full bg-surface-container-low border border-outline/20 rounded-lg p-3.5 font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="MM/YY"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                          CVV
                        </label>
                        <input
                          type="text"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          className="w-full bg-surface-container-low border border-outline/20 rounded-lg p-3.5 font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. Cash on Delivery */}
                {paymentMethod === 'cod' && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-surface-container-high border border-primary/30 text-left space-y-2">
                      <div className="flex items-center gap-2 text-primary font-bold text-sm">
                        <span className="material-symbols-outlined">payments</span>
                        <span>Cash on Delivery (الدفع نقداً عند الاستلام)</span>
                      </div>
                      <p className="text-xs text-on-surface-variant">
                        Pay <strong>{totalEGP} EGP</strong> in cash to the courier when your fresh cookie box arrives at your doorstep.
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                        Delivery Notes / Change Request (ملاحظات التوصيل أو الفكة)
                      </label>
                      <input
                        type="text"
                        value={codNote}
                        onChange={(e) => setCodNote(e.target.value)}
                        placeholder="e.g. Please bring change for 1,000 EGP bill"
                        className="w-full bg-surface-container-low border border-outline/20 rounded-lg p-3.5 font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                )}

                {/* 6. International Card */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                        Card Number
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full bg-surface-container-low border border-outline/20 rounded-lg p-3.5 font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary pl-12"
                          placeholder="0000 0000 0000 0000"
                        />
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
                          credit_card
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                          Expiry
                        </label>
                        <input
                          type="text"
                          value={expiry}
                          onChange={(e) => setExpiry(e.target.value)}
                          className="w-full bg-surface-container-low border border-outline/20 rounded-lg p-3.5 font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="MM/YY"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                          CVV
                        </label>
                        <input
                          type="text"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          className="w-full bg-surface-container-low border border-outline/20 rounded-lg p-3.5 font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Baker's Note */}
            <div className="bakers-note p-6 rounded-lg space-y-2">
              <div className="flex items-center gap-2 text-secondary">
                <span className="material-symbols-outlined">temp_preferences_eco</span>
                <span className="font-label-sm uppercase tracking-wider font-bold">Baker's Commitment</span>
              </div>
              <p className="font-accent-badge text-accent-badge text-on-surface text-xl">
                "Every batch is baked fresh the morning of shipment. We use compostable liners to keep our earth as sweet as our cookies."
              </p>
            </div>
          </div>

          {/* Right Side: Order Summary */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="bg-surface-container-low p-6 md:p-8 rounded-xl border border-outline-variant/20 shadow-sm relative overflow-hidden">
              <h3 className="font-headline-md text-headline-md mb-6 flex items-center justify-between text-on-surface">
                <span>Order Summary</span>
                <span className="text-label-sm font-label-sm text-on-surface-variant bg-surface-container-highest px-3 py-1 rounded-full">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)} Items
                </span>
              </h3>

              {/* Items List */}
              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={item.cookie.id} className="flex gap-4 items-center border-b border-outline/10 pb-4">
                    <img
                      src={item.cookie.image}
                      alt={item.cookie.name}
                      className="w-16 h-16 object-cover rounded-lg bg-surface-container flex-shrink-0"
                    />
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <h4 className="font-body-lg font-bold text-on-surface text-base">
                          {item.cookie.name}
                        </h4>
                        <span className="font-body-md text-on-surface font-bold text-sm">
                          ${(item.cookie.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                      <p className="text-xs text-on-surface-variant italic">
                        Batch of 6 × {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Calculations */}
              <div className="border-t border-dashed border-outline-variant/40 pt-4 space-y-2.5">
                <div className="flex justify-between font-body-md text-on-surface-variant text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-body-md text-on-surface-variant text-sm">
                  <span>Fresh Express Shipping</span>
                  {shippingFee === 0 ? (
                    <span className="text-secondary font-bold">FREE (Orders $40+)</span>
                  ) : (
                    <span>${shippingFee.toFixed(2)}</span>
                  )}
                </div>
                <div className="flex justify-between font-body-md text-on-surface-variant text-sm">
                  <span>Estimated Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-headline-md text-headline-md pt-3 border-t border-outline/10 text-on-surface items-baseline">
                  <span>Total</span>
                  <div className="text-right">
                    <span className="text-primary font-bold block">${total.toFixed(2)}</span>
                    <span className="text-xs text-on-surface-variant font-mono font-normal">≈ {totalEGP.toLocaleString()} EGP</span>
                  </div>
                </div>
              </div>

              {/* Place Order CTA */}
              <div className="mt-8 space-y-4">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-primary text-on-primary py-4 rounded-lg font-headline-md text-headline-md shadow-lg shadow-primary/20 hover:brightness-110 transition-all active:scale-[0.98] flex items-center justify-center gap-3 cursor-pointer"
                >
                  {isProcessing ? (
                    <>
                      <span className="material-symbols-outlined animate-spin">sync</span>
                      <span>Baking Order...</span>
                    </>
                  ) : (
                    <>
                      <span>Place Order</span>
                      <span className="material-symbols-outlined">arrow_forward</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-6 py-2 text-on-surface-variant/70 text-sm">
                  <span className="flex items-center gap-1" title="256-bit SSL Security">
                    <span className="material-symbols-outlined text-base">verified_user</span>
                    <span>Secure</span>
                  </span>
                  <span className="flex items-center gap-1" title="Insulated Express Delivery">
                    <span className="material-symbols-outlined text-base">local_shipping</span>
                    <span>Express</span>
                  </span>
                  <span className="flex items-center gap-1" title="Compostable Bakery Liners">
                    <span className="material-symbols-outlined text-base">eco</span>
                    <span>Eco-Box</span>
                  </span>
                </div>

                <div className="text-center pt-2">
                  <p className="font-accent-badge text-accent-badge text-secondary text-lg">
                    ~ Direct from Vermont to your doorstep ~
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};
