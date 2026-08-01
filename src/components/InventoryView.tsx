import React, { useState } from 'react';
import { InventoryItem } from '../types';
import { Package, AlertTriangle, Plus, RefreshCw, CheckCircle2 } from 'lucide-react';

interface InventoryViewProps {
  inventory: InventoryItem[];
  onAddStock: (itemId: string, qty: number) => void;
}

export const InventoryView: React.FC<InventoryViewProps> = ({ inventory, onAddStock }) => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Kitchen Raw Materials', 'Royal Linen & Bedding', 'Luxury Toiletries', 'Vintage Car Maintenance'];

  const filteredItems = inventory.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-stone-900/60 p-4 rounded-xl border border-amber-900/30">
        <div>
          <h2 className="text-xl font-serif font-bold text-amber-100 flex items-center gap-2">
            <Package className="w-5 h-5 text-amber-400" /> Royal Inventory & Stock Control
          </h2>
          <p className="text-xs text-stone-400">Track kitchen spices, luxury linen, Kama Ayurveda toiletries, and vintage spares</p>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-amber-700 text-amber-100 border border-amber-400/50 shadow'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-stone-900/80 border border-amber-900/30 rounded-xl p-5 shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-300 border-collapse">
            <thead>
              <tr className="bg-stone-950 text-amber-300/80 border-b border-amber-900/40 uppercase font-mono tracking-wider">
                <th className="p-3">Item Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Current Stock</th>
                <th className="p-3">Reorder Threshold</th>
                <th className="p-3">Supplier</th>
                <th className="p-3">Cost / Unit</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/60">
              {filteredItems.map((item) => {
                const isLowStock = item.stockLevel <= item.reorderPoint;
                return (
                  <tr key={item.id} className="hover:bg-stone-800/40">
                    <td className="p-3 font-semibold text-amber-100">
                      {item.name}
                      {isLowStock && (
                        <span className="ml-2 text-[10px] bg-rose-950 text-rose-300 border border-rose-700/60 px-1.5 py-0.2 rounded font-mono">
                          LOW STOCK
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-stone-400">{item.category}</td>
                    <td className="p-3 font-mono font-bold text-amber-200">
                      {item.stockLevel} {item.unit}
                    </td>
                    <td className="p-3 font-mono text-stone-400">
                      {item.reorderPoint} {item.unit}
                    </td>
                    <td className="p-3 text-stone-300">{item.supplier}</td>
                    <td className="p-3 font-mono text-amber-300">₹{item.costPerUnit}</td>
                    <td className="p-3">
                      <button
                        onClick={() => onAddStock(item.id, 50)}
                        className="bg-amber-900/80 hover:bg-amber-700 text-amber-100 px-2.5 py-1 rounded text-[11px] border border-amber-600/40 cursor-pointer flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" /> Restock +50
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
