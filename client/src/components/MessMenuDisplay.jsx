import React, { useState } from 'react';
import { Coffee, Sun, Cookie, Moon, ChevronLeft, ChevronRight } from 'lucide-react';

const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

const MealSlot = ({ icon: Icon, label, food, color }) => (
  <div className={`p-3 rounded-xl bg-${color}-500/10 border border-${color}-500/20`}>
    <div className={`flex items-center gap-1.5 text-${color}-400 mb-1`}>
      <Icon className="h-3.5 w-3.5" />
      <span className="text-xs font-semibold uppercase tracking-wide">{label}</span>
    </div>
    <p className="text-sm text-slate-300 leading-snug">{food}</p>
  </div>
);

const MessMenuDisplay = ({ menu }) => {
  const today = DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];
  const [selectedDay, setSelectedDay] = useState(today);
  const dayMenu = menu[selectedDay] || {};
  const idx = DAYS.indexOf(selectedDay);

  const prev = () => setSelectedDay(DAYS[(idx - 1 + 7) % 7]);
  const next = () => setSelectedDay(DAYS[(idx + 1) % 7]);

  return (
    <div>
      {/* Day selector */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={prev} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 transition-colors">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex gap-1 overflow-x-auto">
          {DAYS.map(d => (
            <button
              key={d}
              onClick={() => setSelectedDay(d)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                d === selectedDay
                  ? 'bg-violet-600 text-white'
                  : d === today
                  ? 'bg-violet-500/15 text-violet-400 border border-violet-500/30'
                  : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
              }`}
            >
              {d === today ? `${d.slice(0,3)} (Today)` : d.slice(0,3)}
            </button>
          ))}
        </div>
        <button onClick={next} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 transition-colors">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <h4 className="text-sm font-semibold text-white mb-3">{selectedDay}'s Menu</h4>
      <div className="grid grid-cols-2 gap-3">
        <MealSlot icon={Sun} label="Breakfast" food={dayMenu.breakfast || 'TBD'} color="amber" />
        <MealSlot icon={Coffee} label="Lunch" food={dayMenu.lunch || 'TBD'} color="emerald" />
        <MealSlot icon={Cookie} label="Snacks" food={dayMenu.snacks || 'TBD'} color="blue" />
        <MealSlot icon={Moon} label="Dinner" food={dayMenu.dinner || 'TBD'} color="purple" />
      </div>
    </div>
  );
};

export default MessMenuDisplay;
