import React, { useState, useMemo } from 'react';
import { Cookie } from '../types';

interface ShopPageProps {
  cookies: Cookie[];
  onAddToCart: (cookie: Cookie) => void;
  onCookieClick: (cookie: Cookie) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  cookies,
  onAddToCart,
  onCookieClick,
  searchQuery,
  onSearchChange,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('Newest Arrivals');
  const [addedIds, setAddedIds] = useState<{ [key: string]: boolean }>({});
  const [visibleCount, setVisibleCount] = useState<number>(6);

  const categories = [
    'All',
    'Classic Favorites',
    'Seasonal Specials',
    'Gift Boxes',
    'Gluten-Free Flour',
  ];

  const handleAdd = (e: React.MouseEvent, cookie: Cookie) => {
    e.stopPropagation();
    onAddToCart(cookie);
    setAddedIds((prev) => ({ ...prev, [cookie.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [cookie.id]: false }));
    }, 2000);
  };

  // Filter & Sort Logic
  const filteredCookies = useMemo(() => {
    return cookies.filter((cookie) => {
      const matchesCategory =
        selectedCategory === 'All' || cookie.category === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        cookie.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cookie.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cookie.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'Price: Low to High') return a.price - b.price;
      if (sortBy === 'Price: High to Low') return b.price - a.price;
      if (sortBy === 'Best Selling') return (b.reviewsCount || 0) - (a.reviewsCount || 0);
      return 0; // Newest / Default
    });
  }, [cookies, selectedCategory, searchQuery, sortBy]);

  const displayedCookies = filteredCookies.slice(0, visibleCount);

  return (
    <div className="kraft-texture min-h-screen pt-24 pb-20">
      {/* Header */}
      <header className="max-w-container-max mx-auto px-4 md:px-margin-desktop py-10 text-center">
        <span className="font-accent-badge text-accent-badge text-primary mb-1 block">
          ~ Small-Batch Oven Fresh ~
        </span>
        <h1 className="font-display-lg text-display-lg text-on-surface mb-4">
          The Cookie Kitchen
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
          Small-batch treats made with organic flour, cultured butter, and a generous pinch of sea salt. Baked fresh every morning.
        </p>
      </header>

      {/* Main Shop Grid & Sidebar */}
      <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12 items-start">
        {/* Sidebar Filters */}
        <aside className="hidden lg:block space-y-8 sticky top-28">
          {/* Categories */}
          <div>
            <h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-4">
              Categories
            </h3>
            <ul className="space-y-2 font-body-md">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left py-1.5 px-3 rounded-lg transition-colors flex items-center justify-between ${
                      selectedCategory === cat
                        ? 'bg-primary/10 text-primary font-bold'
                        : 'text-on-surface-variant hover:text-primary hover:bg-surface-container/50'
                    }`}
                  >
                    <span>{cat === 'All' ? 'All Collections' : cat}</span>
                    {selectedCategory === cat && (
                      <span className="material-symbols-outlined text-sm">chevron_right</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Sort By */}
          <div className="pt-6 dashed-line">
            <h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-3">
              Sort By
            </h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-surface-container border border-outline/10 rounded-lg font-body-md text-on-surface-variant py-2.5 px-3 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
            >
              <option>Newest Arrivals</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Best Selling</option>
            </select>
          </div>

          {/* Baker's Note Sidebar Card */}
          <div className="p-6 bg-secondary/5 rounded-xl border border-secondary/15 relative overflow-hidden shadow-xs">
            <div className="relative z-10 space-y-2">
              <span className="material-symbols-outlined text-secondary text-lg">temp_preferences_eco</span>
              <h4 className="font-accent-badge text-accent-badge text-secondary font-bold text-xl block">
                Baker's Note
              </h4>
              <p className="font-body-md text-on-surface-variant text-sm leading-relaxed italic">
                "Our 'Espresso Midnight' uses 72% dark Venezuelan cacao. For the best experience, warm for 15 seconds."
              </p>
            </div>
          </div>
        </aside>

        {/* Product Section */}
        <section>
          {/* Mobile Category Scroll */}
          <div className="lg:hidden flex overflow-x-auto gap-2 pb-4 mb-6 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-5 py-2 rounded-full font-label-sm text-label-sm transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                {cat === 'All' ? 'All' : cat}
              </button>
            ))}
          </div>

          {/* Active Search / Category Indicator */}
          <div className="flex flex-wrap justify-between items-center mb-6">
            <p className="text-on-surface-variant text-sm font-medium">
              Showing <strong className="text-on-surface">{displayedCookies.length}</strong> of{' '}
              <strong className="text-on-surface">{filteredCookies.length}</strong> small-batch creations
              {searchQuery && (
                <span> for "<strong className="text-primary">{searchQuery}</strong>"</span>
              )}
            </p>

            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="text-xs text-primary font-bold hover:underline flex items-center gap-1"
              >
                Clear Search ✕
              </button>
            )}
          </div>

          {/* Product Cards Grid */}
          {displayedCookies.length === 0 ? (
            <div className="bg-surface-container p-12 rounded-2xl text-center space-y-4 my-8">
              <span className="material-symbols-outlined text-4xl text-outline">cookie</span>
              <h3 className="font-headline-md text-headline-md">No cookies match your search</h3>
              <p className="text-on-surface-variant text-sm">
                Try searching for "chocolate", "oats", "almond", or clear your filter.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  onSearchChange('');
                }}
                className="bg-primary text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:brightness-110"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-10">
              {displayedCookies.map((cookie) => (
                <div
                  key={cookie.id}
                  onClick={() => onCookieClick(cookie)}
                  className="group relative bg-surface rounded-xl overflow-hidden border border-outline/10 hover:card-shadow transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    {/* Cookie Image */}
                    <div className="relative aspect-[4/5] overflow-hidden bg-surface-container-low">
                      <img
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                        src={cookie.image}
                        alt={cookie.altText}
                      />

                      {/* Badges */}
                      {cookie.badge && (
                        <div
                          className={`absolute top-3 right-3 px-3 py-1 rounded-full font-label-sm text-label-sm shadow-sm flex items-center gap-1 ${
                            cookie.badgeType === 'gluten-free'
                              ? 'bg-secondary-fixed text-on-secondary-fixed'
                              : cookie.badgeType === 'secondary'
                              ? 'bg-secondary-container text-on-secondary-container'
                              : 'bg-tertiary-fixed text-on-tertiary-fixed'
                          }`}
                        >
                          {cookie.badgeType === 'gluten-free' && (
                            <span className="material-symbols-outlined text-[12px]">eco</span>
                          )}
                          <span>{cookie.badge}</span>
                        </div>
                      )}
                    </div>

                    {/* Card Body */}
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2 gap-2">
                        <h3 className="font-headline-md text-on-surface group-hover:text-primary transition-colors">
                          {cookie.name}
                        </h3>
                        <span className="font-body-lg text-primary font-bold whitespace-nowrap">
                          ${cookie.price.toFixed(2)}
                        </span>
                      </div>
                      <p className="font-body-md text-on-surface-variant text-sm mb-6 line-clamp-2 leading-relaxed">
                        {cookie.description}
                      </p>
                    </div>
                  </div>

                  {/* Add to Box Button */}
                  <div className="px-6 pb-6">
                    <button
                      onClick={(e) => handleAdd(e, cookie)}
                      className={`w-full py-3 rounded-lg font-label-sm text-label-sm uppercase tracking-widest squish transition-all flex items-center justify-center gap-2 ${
                        addedIds[cookie.id]
                          ? 'bg-secondary text-on-secondary'
                          : 'bg-primary text-on-primary hover:bg-primary-container'
                      }`}
                    >
                      {addedIds[cookie.id] ? (
                        <>
                          <span className="material-symbols-outlined text-sm">check_circle</span>
                          <span>Added!</span>
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-sm">shopping_cart</span>
                          <span>Add to Box</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {displayedCookies.length < filteredCookies.length && (
            <div className="mt-16 text-center">
              <button
                onClick={() => setVisibleCount((prev) => prev + 3)}
                className="px-12 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-on-primary transition-all duration-300 rounded-lg font-label-sm text-label-sm uppercase tracking-widest squish cursor-pointer font-bold"
              >
                Load More Treats
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
