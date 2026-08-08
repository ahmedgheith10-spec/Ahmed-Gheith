import React, { useState } from 'react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => {
      setSubscribed(false);
    }, 4000);
  };

  return (
    <section className="py-16">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="bg-primary text-on-primary-container p-8 md:p-12 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden rustic-shadow">
          {/* Subtle background texture */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div
              className="absolute top-0 left-0 w-full h-full"
              style={{
                backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            ></div>
          </div>

          <div className="relative z-10 max-w-lg">
            <span className="font-accent-badge text-accent-badge text-amber-200 mb-1 block">
              ~ Direct From the Kitchen ~
            </span>
            <h2 className="font-headline-lg text-headline-lg text-white mb-2">Fresh From the Oven</h2>
            <p className="text-white/85 font-body-md">
              Get notified when we drop a new limited-edition flavor batch or seasonal gift box.
            </p>
          </div>

          <div className="relative z-10 w-full md:w-auto">
            {subscribed ? (
              <div className="bg-white/20 backdrop-blur-md text-white px-6 py-4 rounded-xl font-bold flex items-center gap-2 border border-white/30 animate-fade-in">
                <span className="material-symbols-outlined text-amber-300">check_circle</span>
                <span>You're on Clara's fresh batch list! Check your inbox soon.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row w-full md:w-auto gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  className="flex-grow md:w-80 px-6 py-4 rounded-xl border border-outline/20 text-on-surface bg-surface-container-low focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-on-surface-variant/50 font-body-md"
                />
                <button
                  type="submit"
                  className="bg-primary text-on-primary font-bold px-8 py-4 rounded-xl hover:brightness-110 active-squish transition-all whitespace-nowrap shadow-md cursor-pointer"
                >
                  Notify Me
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
