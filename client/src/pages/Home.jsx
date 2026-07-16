import React, { useState, useMemo } from 'react';
import { MapPin, Star, BedDouble, ArrowRight, Building2, Search, SlidersHorizontal, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ALL_PROPERTIES, smartSearch } from '../data/mockData';
import FilterSidebar from '../components/FilterSidebar';
import Button from '../components/Button';

const DEFAULT_FILTERS = { type:[], gender:[], amenities:[], rules:[], city:'', priceMax:30000, minRating:null };
const PRICE_MAX = 30000;

const typeBadge = { HOSTEL:'bg-violet-500/15 text-violet-400 border-violet-500/20', PG:'bg-teal-500/15 text-teal-400 border-teal-500/20', APARTMENT:'bg-amber-500/15 text-amber-400 border-amber-500/20' };
const genderBadge = { BOYS:'bg-blue-500/15 text-blue-400', GIRLS:'bg-pink-500/15 text-pink-400', ANY:'bg-slate-500/15 text-slate-400' };

const PropertyCard = ({ property }) => {
  const rooms = property.rooms || [];
  const prices = rooms.map(r => Number(r.price));
  const lowestPrice = prices.length ? Math.min(...prices) : null;
  const availableCount = rooms.filter(r => r.isAvailable).length;

  return (
    <Link to={`/properties/${property.id}`} className="block group">
      <div className="relative bg-white/[0.04] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-violet-500/30 hover:bg-white/[0.06] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/10 flex flex-col h-full">
        <div className="h-0.5 w-full bg-gradient-to-r from-violet-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
        {/* Cover image */}
        <div className="relative h-44 overflow-hidden bg-slate-900">
          <img
            src={property.coverImage}
            alt={property.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={e => { e.target.onerror = null; e.target.src = 'https://picsum.photos/seed/fallback/800/500'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
          <div className="absolute top-3 left-3 flex gap-1.5">
            <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${typeBadge[property.type] || typeBadge.HOSTEL}`}>{property.type}</span>
            {property.gender !== 'ANY' && (
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${genderBadge[property.gender]}`}>{property.gender}</span>
            )}
          </div>
          {property.rating && (
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded-full">
              <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
              <span className="text-xs text-white font-semibold">{property.rating}</span>
              <span className="text-xs text-slate-400">({property.reviewCount})</span>
            </div>
          )}
        </div>

        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-bold text-white text-base mb-1 leading-tight group-hover:text-violet-300 transition-colors line-clamp-1">
            {property.name}
          </h3>
          <div className="flex items-center text-slate-500 text-xs mb-3">
            <MapPin className="h-3 w-3 mr-1 shrink-0" />
            <span className="truncate">{property.address}, {property.city}</span>
          </div>

          {/* Top amenities */}
          <div className="flex flex-wrap gap-1 mb-3">
            {property.amenities.slice(0,4).map(a => (
              <span key={a} className="text-xs bg-white/[0.05] text-slate-400 px-2 py-0.5 rounded-full border border-white/[0.06]">{a}</span>
            ))}
            {property.amenities.length > 4 && (
              <span className="text-xs text-slate-600">+{property.amenities.length - 4}</span>
            )}
          </div>

          <div className="mt-auto pt-3 border-t border-white/[0.06] flex justify-between items-center">
            <div>
              <span className="text-xs text-slate-500">from </span>
              <span className="text-white font-bold text-lg">₹{lowestPrice?.toLocaleString() ?? '--'}</span>
              <span className="text-xs text-slate-500">/mo</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <BedDouble className="h-3.5 w-3.5 text-emerald-500" />
              <span className="text-emerald-400 font-medium">{availableCount}</span>
              <span className="text-slate-500">available</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const Home = () => {
  const { user } = useAuth();
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = smartSearch(ALL_PROPERTIES, query);

    if (filters.type?.length) result = result.filter(p => filters.type.includes(p.type));
    if (filters.gender?.length) result = result.filter(p => filters.gender.includes(p.gender));
    if (filters.city) result = result.filter(p => p.city === filters.city);
    if (filters.amenities?.length) result = result.filter(p => filters.amenities.every(a => p.amenities.includes(a)));
    if (filters.priceMax < PRICE_MAX) {
      result = result.filter(p => {
        const minPrice = p.rooms.length ? Math.min(...p.rooms.map(r => Number(r.price))) : 0;
        return minPrice <= filters.priceMax;
      });
    }
    if (filters.minRating) result = result.filter(p => p.rating >= filters.minRating);
    if (filters.rules?.includes('nonVeg')) result = result.filter(p => !p.rules?.toLowerCase().includes('no non-veg'));
    if (filters.rules?.includes('noCurfew')) result = result.filter(p => !p.rules?.toLowerCase().includes('curfew'));

    return result;
  }, [query, filters]);

  const hasFilters = JSON.stringify(filters) !== JSON.stringify(DEFAULT_FILTERS);

  return (
    <div>
      {/* Hero */}
      <div className="relative text-center py-14 px-4 overflow-hidden mb-8">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[280px] bg-violet-600/20 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-5">
            <Building2 className="h-3.5 w-3.5" />
            {ALL_PROPERTIES.length}+ verified properties
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 tracking-tight leading-tight">
            Find Your Perfect{' '}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">Stay</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto mb-8">
            Hostels, PGs and Apartments across India. Smart search, verified reviews.
          </p>
          {/* Smart search bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 pointer-events-none" />
            <input
              type="text" value={query} onChange={e => setQuery(e.target.value)}
              placeholder='Try "hostel with pool", "pg with gym", "girls hostel bangalore"…'
              className="w-full pl-12 pr-28 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/40 transition-all text-sm shadow-xl"
            />
            {query && (
              <button onClick={() => setQuery('')} className="absolute right-16 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                <X className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={() => setShowFilters(s => !s)}
              className={`absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${hasFilters ? 'bg-violet-600 text-white' : 'bg-white/8 text-slate-400 hover:bg-white/12 hover:text-slate-300'}`}
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              {hasFilters ? 'Filters ✓' : 'Filter'}
            </button>
          </div>
          {/* Quick filter chips */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {['hostel with pool','girls pg bangalore','boys hostel with gym','apartment with parking','hostel with mess'].map(q => (
              <button key={q} onClick={() => setQuery(q)} className="text-xs px-3 py-1.5 bg-white/5 border border-white/10 text-slate-500 hover:text-slate-300 hover:border-white/20 rounded-full transition-all">
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex gap-6">
        {/* Sidebar */}
        <div className={`w-72 shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <FilterSidebar
            filters={filters}
            onChange={setFilters}
            onReset={() => setFilters(DEFAULT_FILTERS)}
            resultCount={filtered.length}
          />
        </div>

        {/* Grid */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold text-white">
                {query ? `Results for "${query}"` : 'All Properties'}
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                {filtered.length} {filtered.length === 1 ? 'property' : 'properties'} found
              </p>
            </div>
            <div className="flex items-center gap-2">
              {(user?.role === 'OWNER' || user?.role === 'ADMIN') && (
                <Link to="/add-property">
                  <Button size="sm">+ List Property</Button>
                </Link>
              )}
              <button onClick={() => setShowFilters(s => !s)} className="lg:hidden flex items-center gap-1.5 px-3 py-2 text-sm bg-white/5 border border-white/10 text-slate-400 rounded-xl hover:bg-white/8">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </button>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 bg-white/[0.02] rounded-2xl border border-white/[0.05]">
              <Building2 className="h-12 w-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-400 mb-2">No properties found</h3>
              <p className="text-slate-600 text-sm mb-4">
                {query ? 'Try a different search or clear your filters.' : 'Adjust your filters to see more results.'}
              </p>
              <Button variant="outline" size="sm" onClick={() => { setQuery(''); setFilters(DEFAULT_FILTERS); }}>
                Clear search & filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((property, i) => (
                <div key={property.id} style={{ animationDelay: `${i * 40}ms`, animationFillMode: 'both' }} className="animate-fade-in-up">
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
