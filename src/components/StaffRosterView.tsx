import React, { useState } from 'react';
import { StaffMember } from '../types';
import { Users, Phone, Star, Shield, Clock, CheckCircle, UserCheck } from 'lucide-react';

interface StaffRosterViewProps {
  staff: StaffMember[];
  onToggleStaffStatus: (staffId: string) => void;
}

export const StaffRosterView: React.FC<StaffRosterViewProps> = ({ staff, onToggleStaffStatus }) => {
  const [selectedDept, setSelectedDept] = useState<string>('All');

  const departments = ['All', 'Front Office', 'Housekeeping', 'Kitchen & F&B', 'Event Ops'];

  const filteredStaff = staff.filter((s) => {
    if (selectedDept === 'All') return true;
    return s.department === selectedDept;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-stone-900/60 p-4 rounded-xl border border-amber-900/30">
        <div>
          <h2 className="text-xl font-serif font-bold text-amber-100 flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-400" /> Royal Butler & Executive Staff Directory
          </h2>
          <p className="text-xs text-stone-400">Duty shifts, butler assignments, and operational staff rosters</p>
        </div>

        {/* Department Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${selectedDept === dept
                  ? 'bg-amber-700 text-amber-100 border border-amber-400/50 shadow'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStaff.map((member) => (
          <div
            key={member.id}
            className={`bg-stone-900 border p-4 rounded-xl space-y-3 transition-all ${member.status === 'On Duty'
                ? 'border-amber-700/50 shadow-lg'
                : 'border-stone-800 opacity-80'
              }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-serif font-bold text-amber-100 text-base">{member.name}</span>
              <span
                className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded-full border ${member.status === 'On Duty'
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-700/60'
                    : 'bg-stone-800 text-stone-400 border-stone-700'
                  }`}
              >
                {member.status}
              </span>
            </div>

            <div>
              <p className="text-xs font-serif text-amber-400 font-semibold">{member.role}</p>
              <p className="text-[11px] text-stone-400">{member.department}</p>
            </div>

            <div className="bg-stone-950 p-2.5 rounded-lg border border-stone-800 text-xs space-y-1 text-stone-300">
              <p className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" /> Shift: <span className="font-mono text-stone-200">{member.shift}</span>
              </p>
              <p className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-amber-400" /> {member.phone}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-stone-800 text-xs">
              <span className="flex items-center gap-1 text-amber-300 font-mono">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> {member.rating.toFixed(1)} Rating
              </span>

              <button
                onClick={() => onToggleStaffStatus(member.id)}
                className="bg-stone-800 hover:bg-stone-700 text-amber-200 text-xs px-2.5 py-1 rounded border border-amber-700/40 cursor-pointer"
              >
                Toggle Duty Status
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
