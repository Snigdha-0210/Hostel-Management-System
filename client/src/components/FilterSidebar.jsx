import React from 'react';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';

const PRICE_MAX = 30000;

const AMENITY_OPTIONS = ['WiFi','AC','Power Backup','Food/Mess','Parking','Attached Washroom','Gym','Swimming Pool','Laundry','Study Room'];
const RULE_OPTIONS = [
  { label: 'Non-Veg Allowed', key: 'nonVeg' },
  { label: 'No Strict Curfew', key: 'noCurfew' },
];

const Chip = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all duration-150 ${
      active
        ? 'bg-violet-500/20 border-violet-500/50 text-violet-300'
        : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-300'
    }`}
  >
    {label}
  </button>
);

const Section = ({ title, children }) => (
  <div className="mb-5">
    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2.5">{title}</h3>
    {children}
  </div>
);

const FilterSidebar = ({ filters, onChange, onReset, resultCount }) => {
  const set = (key, val) => onChange({ ...filters, [key]: val });

  const toggleSet = (key, val) => {
    const current = filters[key] || [];
    set(key, current.includes(val) ? current.filter(v => v !== val) : [...current, val]);
  };

  const hasActive = filters.type?.length || filters.gender?.length || filters.amenities?.length
    || filters.rules?.length || filters.priceMax < PRICE_MAX || filters.city;

  return (
    <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-violet-400" />
          <span className="font-semibold text-white text-sm">Filters</span>
          {hasActive && (
            <span className="text-xs bg-violet-500/20 text-violet-400 px-1.5 py-0.5 rounded-full">Active</span>
          )}
        </div>
        {hasActive && (
          <button onClick={onReset} className="text-xs text-slate-500 hover:text-red-400 flex items-center gap-1 transition-colors">
            <X className="h-3 w-3" /> Reset
          </button>
        )}
      </div>
      <p className="text-xs text-slate-600 mb-4">{resultCount} properties found</p>

      {/* Price Range */}
      <Section title="Max Price / Month">
        <div className="space-y-2">
          <input
            type="range" min={3000} max={PRICE_MAX} step={500}
            value={filters.priceMax ?? PRICE_MAX}
            onChange={e => set('priceMax', Number(e.target.value))}
            className="w-full accent-violet-500"
          />
          <div className="flex justify-between text-xs text-slate-400">
            <span>₹3,000</span>
            <span className="text-violet-400 font-medium">₹{(filters.priceMax ?? PRICE_MAX).toLocaleString()}</span>
          </div>
        </div>
      </Section>

      {/* Property Type */}
      <Section title="Property Type">
        <div className="flex flex-wrap gap-2">
          {['HOSTEL','PG','APARTMENT'].map(t => (
            <Chip key={t} label={t} active={(filters.type||[]).includes(t)} onClick={() => toggleSet('type', t)} />
          ))}
        </div>
      </Section>

      {/* Tenant Type */}
      <Section title="For">
        <div className="flex flex-wrap gap-2">
          {['BOYS','GIRLS','ANY'].map(g => (
            <Chip key={g} label={g === 'ANY' ? 'Family/Any' : g} active={(filters.gender||[]).includes(g)} onClick={() => toggleSet('gender', g)} />
          ))}
        </div>
      </Section>

      {/* City */}
      <Section title="City">
        <select
          value={filters.city || ''}
          onChange={e => set('city', e.target.value)}
          className="w-full bg-white/5 border border-white/10 text-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30"
        >
          <option value="">All Cities</option>
          {['Mumbai','Bangalore','Pune','Delhi','Hyderabad','Chennai','Jaipur','Ahmedabad','Kolkata','Surat','Kochi','Chandigarh','Nagpur'].map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </Section>

      {/* Amenities */}
      <Section title="Amenities">
        <div className="flex flex-wrap gap-2">
          {AMENITY_OPTIONS.map(a => (
            <Chip key={a} label={a} active={(filters.amenities||[]).includes(a)} onClick={() => toggleSet('amenities', a)} />
          ))}
        </div>
      </Section>

      {/* House Rules */}
      <Section title="House Rules">
        <div className="space-y-2">
          {RULE_OPTIONS.map(({ label, key }) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={(filters.rules||[]).includes(key)}
                onChange={() => toggleSet('rules', key)}
                className="accent-violet-500 rounded"
              />
              <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">{label}</span>
            </label>
          ))}
        </div>
      </Section>

      {/* Rating */}
      <Section title="Minimum Rating">
        <div className="flex gap-2">
          {[3,3.5,4,4.5].map(r => (
            <Chip key={r} label={`${r}★`} active={filters.minRating === r} onClick={() => set('minRating', filters.minRating === r ? null : r)} />
          ))}
        </div>
      </Section>
    </div>
  );
};

export default FilterSidebar;
