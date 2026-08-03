import React, { useState } from 'react';
import { Invoice } from '../types';
import { FileCheck, Download, Printer, Plus, Crown, FileText, CheckCircle2, X } from 'lucide-react';

interface GSTBillingViewProps {
  invoices: Invoice[];
  onAddInvoice: (inv: Omit<Invoice, 'id' | 'invoiceNo' | 'cgst' | 'sgst' | 'grandTotal'>) => void;
}

export const GSTBillingView: React.FC<GSTBillingViewProps> = ({ invoices, onAddInvoice }) => {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Invoice Form
  const [guestName, setGuestName] = useState('');
  const [roomNumber, setRoomNumber] = useState('101');
  const [date, setDate] = useState('2026-07-26');
  const [items, setItems] = useState<{ description: string; amount: number; gstRate: number }[]>([
    { description: 'Maharaja Suite Room Tariff', amount: 28000, gstRate: 18 },
    { description: 'Deep Mahal Royal Dining Charges', amount: 3500, gstRate: 18 }
  ]);

  const addItemRow = () => {
    setItems((prev) => [...prev, { description: 'Royal Service Charge', amount: 1000, gstRate: 18 }]);
  };

  const updateItemRow = (index: number, field: string, value: any) => {
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const removeItemRow = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const calculateSubtotal = items.reduce((acc, it) => acc + Number(it.amount || 0), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || items.length === 0) {
      alert('Please enter guest name and at least one billable item.');
      return;
    }

    onAddInvoice({
      guestName,
      roomNumber,
      date,
      items,
      subtotal: calculateSubtotal,
      paymentStatus: 'Paid'
    });

    setIsModalOpen(false);
    setGuestName('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-stone-900/60 p-4 rounded-xl border border-amber-900/30">
        <div>
          <h2 className="text-xl font-serif font-bold text-amber-100 flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-amber-400" /> GST Tax Billing & Royal Guest Folios
          </h2>
          <p className="text-xs text-stone-400">GSTR-1 compliant tax invoices with CGST (9%) & SGST (9%) itemized breakdown</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-linear-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 shadow transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Generate Guest Folio Invoice</span>
        </button>
      </div>

      {/* Invoices List Table */}
      <div className="bg-stone-900/80 border border-amber-900/30 rounded-xl p-5 shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-300 border-collapse">
            <thead>
              <tr className="bg-stone-950 text-amber-300/80 border-b border-amber-900/40 uppercase font-mono tracking-wider">
                <th className="p-3">Invoice No</th>
                <th className="p-3">Guest Name</th>
                <th className="p-3">Suite #</th>
                <th className="p-3">Date</th>
                <th className="p-3">Subtotal</th>
                <th className="p-3">CGST (9%)</th>
                <th className="p-3">SGST (9%)</th>
                <th className="p-3">Grand Total (₹)</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/60">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-stone-800/40">
                  <td className="p-3 font-mono font-bold text-amber-300">{inv.invoiceNo}</td>
                  <td className="p-3 font-semibold text-amber-100">{inv.guestName}</td>
                  <td className="p-3 text-amber-400 font-serif font-bold">#{inv.roomNumber}</td>
                  <td className="p-3 text-stone-400">{inv.date}</td>
                  <td className="p-3 font-mono">₹{inv.subtotal.toLocaleString('en-IN')}</td>
                  <td className="p-3 font-mono text-stone-400">₹{inv.cgst.toLocaleString('en-IN')}</td>
                  <td className="p-3 font-mono text-stone-400">₹{inv.sgst.toLocaleString('en-IN')}</td>
                  <td className="p-3 font-mono font-bold text-amber-200">₹{inv.grandTotal.toLocaleString('en-IN')}</td>
                  <td className="p-3">
                    <span className="bg-emerald-950 text-emerald-300 border border-emerald-700/60 text-[10px] px-2 py-0.5 rounded font-mono uppercase">
                      {inv.paymentStatus}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => setSelectedInvoice(inv)}
                      className="bg-amber-900/80 hover:bg-amber-700 text-amber-100 px-2.5 py-1 rounded text-[11px] border border-amber-600/40 cursor-pointer flex items-center gap-1"
                    >
                      <FileText className="w-3 h-3" /> View Bill
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Printable Folio Invoice Receipt Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-amber-700/60 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative text-stone-100 font-sans space-y-4">
            <button
              onClick={() => setSelectedInvoice(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-amber-200 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Receipt Header */}
            <div className="border-b border-amber-900/50 pb-4 text-center space-y-1">
              <div className="inline-flex items-center gap-1 text-amber-400 font-serif text-lg font-bold">
                <Crown className="w-5 h-5 text-amber-400" />FOUR'S WAY HOTEL</div>
              <p className="text-xs text-amber-200 font-serif">50-Year Heritage Luxury Hotel • Dubai</p>
              <p className="text-[10px] text-stone-400 font-mono">GSTIN: 24AAACH1234F1Z8 • Phone: +91 281 292 2000</p>
            </div>

            {/* Bill Meta */}
            <div className="grid grid-cols-2 text-xs text-stone-300 border-b border-stone-800 pb-3">
              <div>
                <p><strong>Invoice No:</strong> <span className="font-mono text-amber-300">{selectedInvoice.invoiceNo}</span></p>
                <p><strong>Guest Name:</strong> {selectedInvoice.guestName}</p>
                <p><strong>Suite Allocated:</strong> #{selectedInvoice.roomNumber}</p>
              </div>
              <div className="text-right">
                <p><strong>Date:</strong> {selectedInvoice.date}</p>
                <p><strong>Payment Status:</strong> <span className="text-emerald-400 font-semibold">{selectedInvoice.paymentStatus}</span></p>
              </div>
            </div>

            {/* Items Table */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-amber-300 border-b border-stone-800 pb-1">
                <span>Description</span>
                <span>Amount (₹)</span>
              </div>
              {selectedInvoice.items.map((it, idx) => (
                <div key={idx} className="flex justify-between text-xs text-stone-300 py-1 border-b border-stone-800/40">
                  <span>{it.description}</span>
                  <span className="font-mono">₹{it.amount.toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="bg-stone-950 p-3 rounded-lg border border-stone-800 text-xs space-y-1">
              <div className="flex justify-between text-stone-400">
                <span>Subtotal</span>
                <span className="font-mono">₹{selectedInvoice.subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>CGST @ 9%</span>
                <span className="font-mono">₹{selectedInvoice.cgst.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>SGST @ 9%</span>
                <span className="font-mono">₹{selectedInvoice.sgst.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-amber-200 font-bold pt-1 border-t border-stone-800 text-sm">
                <span>Grand Total (Incl. GST)</span>
                <span className="font-mono text-amber-300">₹{selectedInvoice.grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-amber-200 rounded-lg text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" /> Print GST Invoice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Invoice Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-amber-700/60 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-amber-200 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-lg font-serif font-bold text-amber-100 mb-2 flex items-center gap-2">
              <Plus className="w-5 h-5 text-amber-400" /> Create Custom Folio Invoice
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs text-stone-200">
              <div>
                <label className="block mb-1 font-semibold text-amber-300">Guest Name *</label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="e.g. Vikramaditya Singhania"
                  required
                  className="w-full bg-stone-950 border border-amber-900/60 rounded-lg p-2 text-stone-100 outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 font-semibold text-amber-300">Suite Number</label>
                  <input
                    type="text"
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                    className="w-full bg-stone-950 border border-amber-900/60 rounded-lg p-2 text-stone-100 outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold text-amber-300">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-stone-950 border border-amber-900/60 rounded-lg p-2 text-stone-100 outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-semibold text-amber-300">Billable Line Items</label>
                  <button
                    type="button"
                    onClick={addItemRow}
                    className="text-amber-400 hover:underline text-[11px] cursor-pointer"
                  >
                    + Add Row
                  </button>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {items.map((it, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={it.description}
                        onChange={(e) => updateItemRow(idx, 'description', e.target.value)}
                        placeholder="Description"
                        className="flex-1 bg-stone-950 border border-stone-800 rounded p-1.5 text-stone-100"
                      />
                      <input
                        type="number"
                        value={it.amount}
                        onChange={(e) => updateItemRow(idx, 'amount', Number(e.target.value))}
                        placeholder="Amount"
                        className="w-24 bg-stone-950 border border-stone-800 rounded p-1.5 text-stone-100 font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => removeItemRow(idx)}
                        className="text-rose-400 hover:text-rose-300 cursor-pointer text-sm font-bold"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-stone-800 text-stone-300 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-linear-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold rounded-lg cursor-pointer shadow-lg"
                >
                  Generate & Settle Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
