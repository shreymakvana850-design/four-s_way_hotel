import React from 'react';
import { Hotel, BedDouble, UtensilsCrossed, CalendarDays, Users, Package, FileCheck, Sparkles } from 'lucide-react';

export type TabType = 
  | 'frontdesk' 
  | 'housekeeping' 
  | 'dining' 
  | 'banquets' 
  | 'staff' 
  | 'inventory' 
  | 'billing' 
  | 'ai_tools';

interface NavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  pendingTasksCount: number;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab, pendingTasksCount }) => {
  const navItems: { id: TabType; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'frontdesk', label: 'Front Desk & Suites', icon: <Hotel className="w-4 h-4" /> },
    { id: 'housekeeping', label: 'Housekeeping & Butler', icon: <BedDouble className="w-4 h-4" />, badge: pendingTasksCount },
    { id: 'dining', label: 'Royal F&B POS', icon: <UtensilsCrossed className="w-4 h-4" /> },
    { id: 'banquets', label: 'Weddings & Banquets', icon: <CalendarDays className="w-4 h-4" /> },
    { id: 'staff', label: 'Staff Roster', icon: <Users className="w-4 h-4" /> },
    { id: 'inventory', label: 'Inventory & Stock', icon: <Package className="w-4 h-4" /> },
    { id: 'billing', label: 'GST Invoices', icon: <FileCheck className="w-4 h-4" /> },
    { id: 'ai_tools', label: 'AI Royal Ops', icon: <Sparkles className="w-4 h-4" /> },
  ];

  return (
    <nav className="bg-stone-900/90 border-b border-amber-900/30 sticky top-[77px] z-20 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-2 md:px-4 flex items-center overflow-x-auto no-scrollbar gap-1 py-1">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-xs md:text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-amber-800/80 text-amber-100 shadow-inner border border-amber-500/40 font-semibold'
                  : 'text-stone-300 hover:text-amber-200 hover:bg-stone-800/60'
              }`}
            >
              <span className={isActive ? 'text-amber-300' : 'text-amber-500/70'}>
                {item.icon}
              </span>
              <span>{item.label}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="bg-amber-500 text-stone-950 font-bold text-[10px] px-1.5 py-0.2 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
