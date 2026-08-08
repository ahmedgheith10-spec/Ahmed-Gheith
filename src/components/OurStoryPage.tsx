import React from 'react';
import { BAKER_STORY_IMAGE, HERO_IMAGE } from '../data/products';

interface OurStoryPageProps {
  onShopClick: () => void;
}

export const OurStoryPage: React.FC<OurStoryPageProps> = ({ onShopClick }) => {
  return (
    <div className="pt-24 pb-20 kraft-texture min-h-screen">
      {/* Story Hero */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center py-12">
        <span className="font-accent-badge text-accent-badge text-secondary text-2xl mb-2 block">
          ~ Est. 1974 in Vermont ~
        </span>
        <h1 className="font-display-lg text-display-lg text-on-surface mb-6">
          The Hearth & Crumb Story
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mx-auto leading-relaxed">
          From a drafty farmhouse kitchen to nationwide cookie deliveries, our mission remains unchanged: slow baking, local ingredients, and uncompromised quality.
        </p>
      </section>

      {/* Main Content Sections */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <img
            src={BAKER_STORY_IMAGE}
            alt="Artisan baker kneading dough"
            className="rounded-2xl rustic-shadow w-full h-[450px] object-cover"
          />
          <div className="absolute -bottom-6 -left-4 bg-surface p-6 rounded-xl border border-outline/10 shadow-lg max-w-xs">
            <span className="font-accent-badge text-accent-badge text-primary text-xl block">
              "Honest flour, cultured butter."
            </span>
            <p className="text-xs text-on-surface-variant mt-1">
              Stone-ground wheat milled weekly by 4th generation Vermont millers.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest block">
            Chapter I
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">
            Grandmother's Rolling Pin
          </h2>
          <p className="font-body-md text-on-surface-variant leading-relaxed">
            Fifty years ago, Clara's grandmother baked her first batch of chocolate chip cookies for the local harvest festival. She swore by three golden rules: brown the butter until it smells like hazelnuts, hand-chop chocolate blocks into uneven chunks so every bite is a surprise, and never rush the dough rest.
          </p>
          <p className="font-body-md text-on-surface-variant leading-relaxed">
            Today, in our Vermont farmhouse bakery, we follow those exact same steps. No automated high-speed mixing lines. No synthetic shelf-life preservers. Just fire, hearth, and hand.
          </p>
        </div>
      </section>

      {/* Story Section 2 */}
      <section className="bg-surface-container py-16 my-12 border-y border-outline/10">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-surface p-8 rounded-xl rustic-shadow space-y-3">
            <span className="material-symbols-outlined text-secondary text-3xl">agriculture</span>
            <h3 className="font-headline-md text-headline-md text-on-surface">Local Partnerships</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              We source raw wildflower honey from local apiaries and organic eggs from pasture-raised hens just 12 miles down the road.
            </p>
          </div>

          <div className="bg-surface p-8 rounded-xl rustic-shadow space-y-3">
            <span className="material-symbols-outlined text-primary text-3xl">local_fire_department</span>
            <h3 className="font-headline-md text-headline-md text-on-surface">Small-Batch Hearth</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              We bake only 12 dozen cookies per oven run to maintain strict control over temperature, crust crispness, and center softness.
            </p>
          </div>

          <div className="bg-surface p-8 rounded-xl rustic-shadow space-y-3">
            <span className="material-symbols-outlined text-tertiary text-3xl">eco</span>
            <h3 className="font-headline-md text-headline-md text-on-surface">Compostable Packaging</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Every box is packed with 100% biodegradable plant-based glassine bags and unbleached cotton string.
            </p>
          </div>
        </div>
      </section>

      {/* Hero Banner CTA */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center py-12">
        <div className="bg-primary text-white p-12 rounded-3xl relative overflow-hidden rustic-shadow space-y-6">
          <h2 className="font-display-lg text-display-lg">Taste the Heritage Today</h2>
          <p className="max-w-xl mx-auto text-white/90 font-body-lg">
            Order your fresh batch box and enjoy cookies hand-baked the morning they ship to your door.
          </p>
          <button
            onClick={onShopClick}
            className="bg-white text-primary font-bold px-8 py-4 rounded-xl hover:bg-surface-container transition-all active-squish text-lg"
          >
            Explore The Cookie Kitchen
          </button>
        </div>
      </section>
    </div>
  );
};
