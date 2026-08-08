import React, { useState } from 'react';
import { Cookie } from '../types';

interface AIBakersAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  cookies: Cookie[];
  onAddToCart: (cookie: Cookie) => void;
}

export const AIBakersAssistantModal: React.FC<AIBakersAssistantModalProps> = ({
  isOpen,
  onClose,
  cookies,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<string | null>(null);

  const presets = [
    'I love dark chocolate and sea salt',
    'Gluten-free treat for a friend',
    'Best cookies to pair with morning coffee',
    'Light and floral afternoon snack',
  ];

  const handleAsk = async (queryText?: string) => {
    const activeQuery = queryText || prompt;
    if (!activeQuery.trim()) return;

    setLoading(true);
    setRecommendation(null);

    try {
      const res = await fetch('/api/ai-recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: activeQuery,
          cookies: cookies.map((c) => ({
            name: c.name,
            description: c.description,
            price: c.price,
            badge: c.badge,
            ingredients: c.ingredients,
          })),
        }),
      });

      const data = await res.json();
      setRecommendation(data.recommendation || data.error || 'Clara is tending the oven, try asking again!');
    } catch (err) {
      setRecommendation('Clara suggests trying "The Hearth Classic" or "Sea Salt Toffee" for a rich, comforting bite!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/45 backdrop-blur-xs animate-fade-in"
      ></div>

      {/* Modal Dialog */}
      <div className="relative bg-surface rounded-2xl max-w-lg w-full z-10 rustic-shadow border border-outline/10 p-6 md:p-8 space-y-6 animate-scale-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:text-primary"
        >
          ✕
        </button>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-secondary/15 flex items-center justify-center text-secondary border border-secondary/20">
            <span className="material-symbols-outlined text-2xl">auto_awesome</span>
          </div>
          <div>
            <h3 className="font-headline-md text-headline-md text-on-surface">Ask Clara the Baker</h3>
            <p className="text-xs text-on-surface-variant font-body-md">
              AI-Powered Cookie & Flavor Pairing Assistant
            </p>
          </div>
        </div>

        {/* Input Form */}
        <div className="space-y-3">
          <label className="block text-xs font-label-sm uppercase text-on-surface-variant tracking-wider">
            Tell Clara what you're craving or gifting:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., 'Looking for a rich chocolate cookie with caramel'"
              className="flex-grow bg-surface-container-low border border-outline/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary font-body-md"
              onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
            />
            <button
              onClick={() => handleAsk()}
              disabled={loading}
              className="bg-primary text-white font-bold px-5 py-3 rounded-xl hover:brightness-110 active-squish disabled:opacity-50 text-sm whitespace-nowrap"
            >
              {loading ? 'Asking...' : 'Ask'}
            </button>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {presets.map((preset) => (
              <button
                key={preset}
                onClick={() => {
                  setPrompt(preset);
                  handleAsk(preset);
                }}
                className="text-xs bg-surface-container hover:bg-surface-container-high text-on-surface-variant px-3 py-1.5 rounded-full border border-outline/10 transition-colors"
              >
                💡 {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Recommendation Output */}
        {loading && (
          <div className="bg-surface-container-low p-6 rounded-xl border border-secondary/20 text-center space-y-2">
            <span className="material-symbols-outlined text-secondary animate-spin text-3xl">cookie</span>
            <p className="font-accent-badge text-accent-badge text-secondary text-xl">
              Clara is consulting her recipe book...
            </p>
          </div>
        )}

        {recommendation && !loading && (
          <div className="bakers-note p-5 rounded-xl space-y-3 animate-fade-in">
            <div className="flex items-center gap-2 text-secondary font-bold text-sm">
              <span className="material-symbols-outlined">nature_people</span>
              <span>Clara's Recommendation:</span>
            </div>
            <p className="text-sm text-on-surface leading-relaxed whitespace-pre-line font-body-md">
              {recommendation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
