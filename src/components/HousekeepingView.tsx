import React, { useState } from 'react';
import { HousekeepingTask, TaskPriority, TaskStatus, Room } from '../types';
import { Sparkles, Clock, Plus, CheckCircle2, AlertTriangle, User, Wrench, X } from 'lucide-react';

interface HousekeepingViewProps {
  tasks: HousekeepingTask[];
  rooms: Room[];
  onAddTask: (task: Omit<HousekeepingTask, 'id'>) => void;
  onUpdateTaskStatus: (taskId: string, newStatus: TaskStatus) => void;
  onMarkRoomCleaned: (roomNumber: string) => void;
}

export const HousekeepingView: React.FC<HousekeepingViewProps> = ({
  tasks,
  rooms,
  onAddTask,
  onUpdateTaskStatus,
  onMarkRoomCleaned
}) => {
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [roomNumber, setRoomNumber] = useState('103');
  const [taskType, setTaskType] = useState<'Deep Clean' | 'Turndown Service' | 'Linen Change' | 'Butler Request' | 'Maintenance Repair'>('Deep Clean');
  const [priority, setPriority] = useState<TaskPriority>('High');
  const [assignedTo, setAssignedTo] = useState('Karan Solanki');
  const [notes, setNotes] = useState('');

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

    onAddTask({
      roomNumber,
      taskType,
      priority,
      assignedTo,
      status: 'Pending',
      notes,
      timeLogged: timeStr
    });

    setIsNewTaskOpen(false);
    setNotes('');
  };

  const getPriorityBadge = (p: TaskPriority) => {
    switch (p) {
      case 'High':
        return <span className="bg-rose-950 text-rose-200 border border-rose-700/60 text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase">High Priority</span>;
      case 'Medium':
        return <span className="bg-amber-950 text-amber-200 border border-amber-700/60 text-[10px] font-mono px-2 py-0.5 rounded uppercase">Medium</span>;
      case 'Low':
        return <span className="bg-stone-800 text-stone-300 border border-stone-700 text-[10px] font-mono px-2 py-0.5 rounded uppercase">Low</span>;
    }
  };

  const renderTaskCard = (task: HousekeepingTask) => (
    <div key={task.id} className="bg-stone-900 border border-amber-900/40 p-3.5 rounded-xl space-y-2 hover:border-amber-500/50 transition-all shadow">
      <div className="flex items-center justify-between">
        <span className="text-amber-200 font-serif font-bold text-sm">Suite #{task.roomNumber}</span>
        {getPriorityBadge(task.priority)}
      </div>

      <div className="text-xs text-amber-300 font-medium flex items-center gap-1">
        {task.taskType === 'Maintenance Repair' ? <Wrench className="w-3.5 h-3.5 text-rose-400" /> : <Sparkles className="w-3.5 h-3.5 text-amber-400" />}
        <span>{task.taskType}</span>
      </div>

      <p className="text-xs text-stone-300 line-clamp-2 bg-stone-950/60 p-2 rounded border border-stone-800/80">
        {task.notes}
      </p>

      <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1">
        <span>👤 {task.assignedTo}</span>
        <span className="flex items-center gap-1 font-mono"><Clock className="w-3 h-3 text-amber-400" /> {task.timeLogged}</span>
      </div>

      {/* Status Controls */}
      <div className="pt-2 border-t border-stone-800 flex items-center justify-between gap-1 text-[11px]">
        {task.status !== 'Completed' ? (
          <>
            {task.status === 'Pending' && (
              <button
                onClick={() => onUpdateTaskStatus(task.id, 'In Progress')}
                className="w-full bg-amber-900/60 hover:bg-amber-800 text-amber-200 py-1 rounded border border-amber-700/40 cursor-pointer"
              >
                Start Task
              </button>
            )}
            {task.status === 'In Progress' && (
              <button
                onClick={() => {
                  onUpdateTaskStatus(task.id, 'Completed');
                  onMarkRoomCleaned(task.roomNumber);
                }}
                className="w-full bg-emerald-950 hover:bg-emerald-900 text-emerald-200 py-1 rounded border border-emerald-700/50 cursor-pointer flex items-center justify-center gap-1"
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Mark Complete & Inspect
              </button>
            )}
          </>
        ) : (
          <span className="text-emerald-400 font-medium flex items-center gap-1 w-full justify-center">
            <CheckCircle2 className="w-3.5 h-3.5" /> Task Completed
          </span>
        )}
      </div>
    </div>
  );

  const pending = tasks.filter(t => t.status === 'Pending');
  const inProgress = tasks.filter(t => t.status === 'In Progress');
  const completed = tasks.filter(t => t.status === 'Completed');

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-stone-900/60 p-4 rounded-xl border border-amber-900/30">
        <div>
          <h2 className="text-xl font-serif font-bold text-amber-100 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" /> Royal Housekeeping & Maintenance Board
          </h2>
          <p className="text-xs text-stone-400">Track suite deep cleaning, turndown requests, and butler operations</p>
        </div>

        <button
          onClick={() => setIsNewTaskOpen(true)}
          className="bg-linear-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 shadow transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Log Housekeeping Task</span>
        </button>
      </div>

      {/* Kanban Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pending Column */}
        <div className="bg-stone-950/60 border border-stone-800 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-stone-800">
            <h3 className="font-serif font-bold text-amber-300 text-sm flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" /> Pending Dispatch
            </h3>
            <span className="bg-amber-950 text-amber-300 border border-amber-800/60 text-xs px-2 py-0.5 rounded-full font-mono">
              {pending.length}
            </span>
          </div>

          <div className="space-y-3">
            {pending.length === 0 ? (
              <p className="text-xs text-stone-500 text-center py-6">No pending housekeeping tasks.</p>
            ) : (
              pending.map(renderTaskCard)
            )}
          </div>
        </div>

        {/* In Progress Column */}
        <div className="bg-stone-950/60 border border-stone-800 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-stone-800">
            <h3 className="font-serif font-bold text-purple-300 text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" /> In Progress / Butler
            </h3>
            <span className="bg-purple-950 text-purple-300 border border-purple-800/60 text-xs px-2 py-0.5 rounded-full font-mono">
              {inProgress.length}
            </span>
          </div>

          <div className="space-y-3">
            {inProgress.length === 0 ? (
              <p className="text-xs text-stone-500 text-center py-6">No tasks currently in progress.</p>
            ) : (
              inProgress.map(renderTaskCard)
            )}
          </div>
        </div>

        {/* Completed Column */}
        <div className="bg-stone-950/60 border border-stone-800 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-stone-800">
            <h3 className="font-serif font-bold text-emerald-300 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Inspected & Ready
            </h3>
            <span className="bg-emerald-950 text-emerald-300 border border-emerald-800/60 text-xs px-2 py-0.5 rounded-full font-mono">
              {completed.length}
            </span>
          </div>

          <div className="space-y-3">
            {completed.length === 0 ? (
              <p className="text-xs text-stone-500 text-center py-6">No completed tasks today yet.</p>
            ) : (
              completed.map(renderTaskCard)
            )}
          </div>
        </div>
      </div>

      {/* Log Task Modal */}
      {isNewTaskOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-amber-700/60 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setIsNewTaskOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-amber-200 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-lg font-serif font-bold text-amber-100 mb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" /> Dispatch New Housekeeping Task
            </h3>
            <p className="text-xs text-stone-400 mb-4">Assign room cleaning, turndown, or butler service requests.</p>

            <form onSubmit={handleCreateTask} className="space-y-4 text-xs text-stone-200">
              <div>
                <label className="block mb-1 font-semibold text-amber-300">Select Suite Number</label>
                <select
                  value={roomNumber}
                  onChange={(e) => setRoomNumber(e.target.value)}
                  className="w-full bg-stone-950 border border-amber-900/60 rounded-lg p-2.5 text-stone-100 outline-none focus:border-amber-500 cursor-pointer"
                >
                  {rooms.map((r) => (
                    <option key={r.id} value={r.number}>
                      Suite #{r.number} - {r.category} ({r.status})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1 font-semibold text-amber-300">Task Type</label>
                <select
                  value={taskType}
                  onChange={(e) => setTaskType(e.target.value as any)}
                  className="w-full bg-stone-950 border border-amber-900/60 rounded-lg p-2.5 text-stone-100 outline-none focus:border-amber-500 cursor-pointer"
                >
                  <option value="Deep Clean">Deep Clean</option>
                  <option value="Turndown Service">Turndown Service</option>
                  <option value="Linen Change">Linen Change</option>
                  <option value="Butler Request">Butler Request</option>
                  <option value="Maintenance Repair">Maintenance Repair</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 font-semibold text-amber-300">Priority Level</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                  className="w-full bg-stone-950 border border-amber-900/60 rounded-lg p-2.5 text-stone-100 outline-none focus:border-amber-500 cursor-pointer"
                >
                  <option value="High">High Priority (Immediate)</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="Low">Low Priority</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 font-semibold text-amber-300">Assign To Staff / Butler</label>
                <select
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  className="w-full bg-stone-950 border border-amber-900/60 rounded-lg p-2.5 text-stone-100 outline-none focus:border-amber-500 cursor-pointer"
                >
                  <option value="Karan Solanki">Karan Solanki (Housekeeping Lead)</option>
                  <option value="Manish Singh">Manish Singh (Head Butler)</option>
                  <option value="Hetal Parmar">Hetal Parmar</option>
                  <option value="Ramesh Vaghela">Ramesh Vaghela (Maintenance)</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 font-semibold text-amber-300">Instructions / Notes</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Add jasmine floral scents, deliver saffron tea tray..."
                  className="w-full bg-stone-950 border border-amber-900/60 rounded-lg p-2.5 text-stone-100 outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => setIsNewTaskOpen(false)}
                  className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-linear-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold rounded-lg cursor-pointer shadow-lg"
                >
                  Dispatch Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
