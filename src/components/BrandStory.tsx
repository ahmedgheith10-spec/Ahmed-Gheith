import React from 'react';
import { BAKER_STORY_IMAGE } from '../data/products';

interface BrandStoryProps {
  onReadStoryClick: () => void;
}

export const BrandStory: React.FC<BrandStoryProps> = ({ onReadStoryClick }) => {
  return (
    <section className="bg-surface-container py-24 overflow-hidden border-y border-outline/10">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Asymmetric Image Frame */}
        <div className="relative">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="relative z-10 p-4 bg-surface-container rounded-xl rustic-shadow border border-outline/10 rotate-[-2deg]">
            <img
              className="rounded-lg w-full h-[380px] object-cover"
              src={BAKER_STORY_IMAGE}
              alt="Artisan baker dusting organic white flour over a wooden kneading board in a sunlit farmhouse kitchen"
            />
          </div>
          <div className="absolute -bottom-6 -right-4 md:-right-8 z-20 p-6 bg-surface-container-high text-on-surface rounded-xl max-w-[260px] rustic-shadow rotate-[3deg] border border-primary/30">
            <p className="font-accent-badge text-accent-badge text-primary italic leading-snug">
              "We believe the best ingredients are the ones grown closest to home."
            </p>
            <p className="font-label-sm text-label-sm mt-2 text-on-surface-variant">— Clara, Founder & Head Baker</p>
          </div>
        </div>

        {/* Text Story Content */}
        <div>
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest mb-3 block">
            Our Heritage
          </span>
          <h2 className="font-display-lg text-display-lg mb-6 text-on-surface">Join the Family</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 leading-relaxed">
            What started as a single batch in a drafty farmhouse kitchen has grown into a community of cookie lovers. We still use my grandmother's original rolling pin and the same local flour mill she trusted fifty years ago.
          </p>

          <div className="bakers-note p-6 mb-8 rounded-r-xl space-y-1">
            <p className="font-body-md text-on-secondary-container">
              <strong className="font-bold text-secondary">Baker's Note:</strong> Always let your cookies sit on the rack for exactly four minutes after leaving the oven. It's the secret to that perfect snap-to-chew ratio.
            </p>
          </div>

          <button
            onClick={onReadStoryClick}
            className="bg-primary text-white px-8 py-3.5 rounded-lg font-bold hover:brightness-105 active-squish transition-all flex items-center gap-2 rustic-shadow"
          >
            <span>Read Our Full Story</span>
            <span className="material-symbols-outlined text-sm">auto_stories</span>
          </button>
        </div>
      </div>
    </section>
  );
};
