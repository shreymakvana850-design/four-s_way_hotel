import React, { useState } from 'react';
import { Sparkles, Crown, TrendingUp, MessageSquare, Loader2, Send, CheckCircle2, X } from 'lucide-react';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'concierge' | 'pricing' | 'sentiment'>('concierge');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Tab 1: Concierge Form State
  const [guestName, setGuestName] = useState('Maharaja Vikramaditya Singhania');
  const [roomCategory, setRoomCategory] = useState('Maharaja Suite');
  const [occasion, setOccasion] = useState('Heritage Royal Luxury Tour');
  const [preferences, setPreferences] = useState('Authentic Kathiyawadi royal dining, vintage car ride around Rajkot, sunset chai on Suryavanshi terrace');
  const [conciergeResult, setConciergeResult] = useState<any>(null);

  // Tab 2: Pricing Form State
  const [occupancyPercentage, setOccupancyPercentage] = useState(75);
  const [currentSeason, setCurrentSeason] = useState('Peak Wedding & Festive Season (Oct - Mar)');
  const [upcomingEvents, setUpcomingEvents] = useState('Jadeja-Rathore Royal Wedding & Gujarat Industrial Summit');
  const [competitorRate, setCompetitorRate] = useState(22000);
  const [pricingResult, setPricingResult] = useState<any>(null);

  // Tab 3: Sentiment Form State
  const [reviewText, setReviewText] = useState(
    "The Maharaja Suite was breathtaking! The vintage car arrival made us feel like royalty. However, breakfast service at Deep Mahal took 20 minutes longer than expected. Housekeeping butler Manish was exceptional."
  );
  const [sentimentResult, setSentimentResult] = useState<any>(null);

  if (!isOpen) return null;

  const handleConciergeGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/ai/royal-concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guestName, roomCategory, occasion, preferences })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Concierge API failed');
      setConciergeResult(data);
    } catch (err: any) {
      setError(err.message || 'Failed to generate itinerary');
    } finally {
      setLoading(false);
    }
  };

  const handlePricingGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/ai/rate-optimizer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ occupancyPercentage, currentSeason, upcomingEvents, competitorRate })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Pricing API failed');
      setPricingResult(data);
    } catch (err: any) {
      setError(err.message || 'Failed to optimize rates');
    } finally {
      setLoading(false);
    }
  };

  const handleSentimentGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/ai/guest-sentiment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviews: reviewText })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Sentiment API failed');
      setSentimentResult(data);
    } catch (err: any) {
      setError(err.message || 'Failed to analyze sentiment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-stone-900 border border-amber-600/60 rounded-2xl max-w-3xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto text-stone-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-amber-200 cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-amber-900/40">
          <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-serif font-bold text-amber-100">
              Gemini Royal Intelligence & Operations Assistant
            </h3>
            <p className="text-xs text-stone-400">AI-powered bespoke guest concierge, dynamic yield optimizer & staff sentiment analyzer</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 border-b border-stone-800 pb-3 mb-4">
          <button
            onClick={() => setActiveTab('concierge')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-serif font-bold flex items-center gap-1.5 transition-all cursor-pointer ${activeTab === 'concierge'
              ? 'bg-amber-800 text-amber-100 border border-amber-500/50'
              : 'bg-stone-950 text-stone-400 hover:text-amber-200'
              }`}
          >
            <Crown className="w-4 h-4 text-amber-400" /> Royal Concierge
          </button>
          <button
            onClick={() => setActiveTab('pricing')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-serif font-bold flex items-center gap-1.5 transition-all cursor-pointer ${activeTab === 'pricing'
              ? 'bg-amber-800 text-amber-100 border border-amber-500/50'
              : 'bg-stone-950 text-stone-400 hover:text-amber-200'
              }`}
          >
            <TrendingUp className="w-4 h-4 text-amber-400" /> Dynamic Yield AI
          </button>
          <button
            onClick={() => setActiveTab('sentiment')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-serif font-bold flex items-center gap-1.5 transition-all cursor-pointer ${activeTab === 'sentiment'
              ? 'bg-amber-800 text-amber-100 border border-amber-500/50'
              : 'bg-stone-950 text-stone-400 hover:text-amber-200'
              }`}
          >
            <MessageSquare className="w-4 h-4 text-amber-400" /> Sentiment Analyzer
          </button>
        </div>

        {error && (
          <div className="bg-rose-950/80 border border-rose-700 p-3 rounded-lg text-xs text-rose-200 mb-4">
            ⚠️ {error}
          </div>
        )}

        {/* TAB 1: ROYAL CONCIERGE */}
        {activeTab === 'concierge' && (
          <div className="space-y-4">
            <form onSubmit={handleConciergeGenerate} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-amber-300 font-semibold">Guest Name</label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-stone-950 border border-amber-900/60 rounded p-2 text-stone-100 outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-amber-300 font-semibold">Suite Category</label>
                  <input
                    type="text"
                    value={roomCategory}
                    onChange={(e) => setRoomCategory(e.target.value)}
                    className="w-full bg-stone-950 border border-amber-900/60 rounded p-2 text-stone-100 outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-amber-300 font-semibold">Special Preferences / Dietary</label>
                <input
                  type="text"
                  value={preferences}
                  onChange={(e) => setPreferences(e.target.value)}
                  className="w-full bg-stone-950 border border-amber-900/60 rounded p-2 text-stone-100 outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-linear-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold py-2.5 rounded-lg text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                <span>Generate Royal Concierge Protocol</span>
              </button>
            </form>

            {/* Result display */}
            {conciergeResult && (
              <div className="bg-stone-950 border border-amber-800/50 p-4 rounded-xl space-y-3 text-xs text-stone-200 mt-4">
                <div className="bg-amber-950/60 p-3 rounded border border-amber-800/60 font-serif">
                  <strong className="text-amber-300 block mb-1">👑 Royal Welcome Protocol:</strong>
                  {conciergeResult.welcomeProtocol}
                </div>

                <div className="space-y-2">
                  <p><strong className="text-amber-400">🌅 Morning Schedule:</strong> {conciergeResult.morningSchedule}</p>
                  <p><strong className="text-amber-400">☀️ Afternoon Heritage Tour:</strong> {conciergeResult.afternoonSchedule}</p>
                  <p><strong className="text-amber-400">🌙 Evening Royal Dining & Stars:</strong> {conciergeResult.eveningSchedule}</p>
                </div>

                {conciergeResult.bespokeTouches && (
                  <div>
                    <strong className="text-amber-300 block mb-1">✨ Bespoke Royal Touches:</strong>
                    <ul className="list-disc list-inside space-y-1 text-stone-300">
                      {conciergeResult.bespokeTouches.map((touch: string, i: number) => (
                        <li key={i}>{touch}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: DYNAMIC YIELD AI */}
        {activeTab === 'pricing' && (
          <div className="space-y-4">
            <form onSubmit={handlePricingGenerate} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-amber-300 font-semibold">Current Occupancy Rate (%)</label>
                  <input
                    type="number"
                    value={occupancyPercentage}
                    onChange={(e) => setOccupancyPercentage(Number(e.target.value))}
                    className="w-full bg-stone-950 border border-amber-900/60 rounded p-2 text-stone-100 outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-amber-300 font-semibold">Competitor Regional Luxury Rate (₹)</label>
                  <input
                    type="number"
                    value={competitorRate}
                    onChange={(e) => setCompetitorRate(Number(e.target.value))}
                    className="w-full bg-stone-950 border border-amber-900/60 rounded p-2 text-stone-100 outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-amber-300 font-semibold">Upcoming High Demand Events</label>
                <input
                  type="text"
                  value={upcomingEvents}
                  onChange={(e) => setUpcomingEvents(e.target.value)}
                  className="w-full bg-stone-950 border border-amber-900/60 rounded p-2 text-stone-100 outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-linear-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold py-2.5 rounded-lg text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <TrendingUp className="w-4 h-4" />}
                <span>Calculate Optimized Suite & Wedding Rates</span>
              </button>
            </form>

            {pricingResult && (
              <div className="bg-stone-950 border border-amber-800/50 p-4 rounded-xl space-y-3 text-xs text-stone-200 mt-4">
                <p><strong className="text-amber-300">📊 Occupancy Demand Analysis:</strong> {pricingResult.occupancyAnalysis}</p>

                {pricingResult.recommendedSuiteRates && (
                  <div>
                    <strong className="text-amber-400 block mb-1">Recommended Dynamic Room Rates:</strong>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(pricingResult.recommendedSuiteRates).map(([k, v]: any) => (
                        <div key={k} className="bg-stone-900 p-2 rounded border border-stone-800">
                          <span className="capitalize text-stone-400">{k}: </span>
                          <span className="font-mono font-bold text-amber-300">{typeof v === 'number' ? `₹${v.toLocaleString('en-IN')}` : v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {pricingResult.banquetYieldStrategy && (
                  <div>
                    <strong className="text-amber-400 block mb-1">Banquet & Wedding Yield Strategy:</strong>
                    <ul className="list-disc list-inside space-y-1">
                      {pricingResult.banquetYieldStrategy.map((s: string, idx: number) => (
                        <li key={idx}>{s}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SENTIMENT ANALYZER */}
        {activeTab === 'sentiment' && (
          <div className="space-y-4">
            <form onSubmit={handleSentimentGenerate} className="space-y-3 text-xs">
              <div>
                <label className="block mb-1 text-amber-300 font-semibold">Paste Guest Feedback Comment</label>
                <textarea
                  rows={3}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="w-full bg-stone-950 border border-amber-900/60 rounded p-2 text-stone-100 outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-linear-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold py-2.5 rounded-lg text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <MessageSquare className="w-4 h-4" />}
                <span>Analyze Sentiment & Dispatch Staff Tasks</span>
              </button>
            </form>

            {sentimentResult && (
              <div className="bg-stone-950 border border-amber-800/50 p-4 rounded-xl space-y-3 text-xs text-stone-200 mt-4">
                <div className="flex items-center justify-between">
                  <strong className="text-amber-300">Sentiment Score:</strong>
                  <span className="bg-amber-900 text-amber-200 px-3 py-1 rounded-full font-serif font-bold text-sm">
                    {sentimentResult.sentimentScore} / 10
                  </span>
                </div>

                {sentimentResult.positiveHighlights && (
                  <div>
                    <strong className="text-emerald-400 block mb-1">👍 Praised Royal Experience Highlights:</strong>
                    <ul className="list-disc list-inside space-y-1 text-emerald-200">
                      {sentimentResult.positiveHighlights.map((h: string, i: number) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {sentimentResult.recommendedActions && (
                  <div>
                    <strong className="text-rose-400 block mb-1">⚠️ Corrective Operational Action Items:</strong>
                    <ul className="list-disc list-inside space-y-1 text-stone-300">
                      {sentimentResult.recommendedActions.map((a: string, i: number) => (
                        <li key={i}>{a}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
