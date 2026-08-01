import React from 'react';
import { Crown, Clock, Hotel, Sparkles, UserPlus, FileText, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  occupancyRate: number;
  availableCount: number;
  totalRooms: number;
  dailyRevenue: number;
  pendingTasksCount: number;
  onOpenCheckIn: () => void;
  onOpenAI: () => void;
  onOpenNewInvoice: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  occupancyRate,
  availableCount,
  totalRooms,
  dailyRevenue,
  pendingTasksCount,
  onOpenCheckIn,
  onOpenAI,
  onOpenNewInvoice
}) => {
  const [time, setTime] = React.useState<string>('');

  React.useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-stone-900 border-b border-amber-800/40 text-stone-100 shadow-xl sticky top-0 z-30">
      {/* Top Gold Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-amber-800 to-amber-950 px-4 py-1 text-center text-xs font-serif tracking-widest text-amber-200 border-b border-amber-600/30 flex justify-between items-center">
        <span className="hidden md:inline">🏰 EST. 1976 • 50 YEARS OF ROYAL LUXURY</span>
        <span className="font-semibold mx-auto md:mx-0">FOUR'S WAY HOTEL • DUBAI, UAE</span>
        <span className="hidden md:flex items-center gap-1 text-amber-300">
          <Clock className="w-3 h-3" /> Dubai Time: {time || '12:00 PM'}
        </span>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 p-0.5 shadow-lg flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-stone-950 flex items-center justify-center text-amber-400">
              <Crown className="w-7 h-7" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-serif font-bold tracking-wide text-amber-100">
                Four's Way Hotel
              </h1>
              <span className="bg-amber-900/60 text-amber-300 border border-amber-600/50 text-[10px] uppercase font-mono px-2 py-0.5 rounded-full">
                ESI ERP v4.5
              </span>
            </div>
            <p className="text-xs text-stone-400">Executive & Staff Integrated Property Management System</p>
          </div>
        </div>

        {/* Quick KPI Stats */}
        <div className="flex items-center gap-3 md:gap-6 bg-stone-950/80 p-2.5 rounded-xl border border-amber-900/40 text-xs w-full lg:w-auto justify-around">
          <div className="text-center">
            <p className="text-stone-400 text-[11px] uppercase font-mono">Occupancy</p>
            <p className="text-amber-400 font-bold text-sm md:text-base font-serif">{occupancyRate}%</p>
          </div>
          <div className="h-7 w-[1px] bg-stone-800" />
          <div className="text-center">
            <p className="text-stone-400 text-[11px] uppercase font-mono">Suites Avail.</p>
            <p className="text-emerald-400 font-bold text-sm md:text-base font-serif">{availableCount} / {totalRooms}</p>
          </div>
          <div className="h-7 w-[1px] bg-stone-800" />
          <div className="text-center">
            <p className="text-stone-400 text-[11px] uppercase font-mono">Today's Rev.</p>
            <p className="text-amber-300 font-bold text-sm md:text-base font-serif">₹{dailyRevenue.toLocaleString('en-IN')}</p>
          </div>
          <div className="h-7 w-[1px] bg-stone-800" />
          <div className="text-center">
            <p className="text-stone-400 text-[11px] uppercase font-mono">Tasks</p>
            <p className={`font-bold text-sm md:text-base font-serif ${pendingTasksCount > 0 ? 'text-amber-400' : 'text-stone-300'}`}>
              {pendingTasksCount} Pending
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 w-full lg:w-auto justify-end">
          <button
            onClick={onOpenAI}
            className="flex-1 lg:flex-none flex items-center justify-center gap-1.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-semibold px-3 py-2 rounded-lg text-xs shadow-md transition-all border border-amber-400/40 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Royal AI</span>
          </button>

          <button
            onClick={onOpenCheckIn}
            className="flex-1 lg:flex-none flex items-center justify-center gap-1.5 bg-stone-800 hover:bg-stone-700 text-amber-200 border border-amber-700/50 px-3 py-2 rounded-lg text-xs transition-all cursor-pointer"
          >
            <UserPlus className="w-4 h-4 text-amber-400" />
            <span>Check-In</span>
          </button>

          <button
            onClick={onOpenNewInvoice}
            className="flex-1 lg:flex-none flex items-center justify-center gap-1.5 bg-stone-800 hover:bg-stone-700 text-amber-200 border border-amber-700/50 px-3 py-2 rounded-lg text-xs transition-all cursor-pointer"
          >
            <FileText className="w-4 h-4 text-amber-400" />
            <span>Folio Invoice</span>
          </button>
        </div>
      </div>
    </header>
  );
};
