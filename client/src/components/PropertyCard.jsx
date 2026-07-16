import React from 'react';
import { MapPin, BedDouble, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const typeBadgeColors = {
    HOSTEL: 'bg-violet-500/15 text-violet-400 border-violet-500/20',
    PG: 'bg-teal-500/15 text-teal-400 border-teal-500/20',
    FLAT: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
};

const PropertyCard = ({ property }) => {
    const badgeClass = typeBadgeColors[property.type] || 'bg-slate-500/15 text-slate-400 border-slate-500/20';
    const roomCount = property.rooms ? property.rooms.length : 0;
    const availableRooms = property.rooms ? property.rooms.filter(r => r.isAvailable).length : 0;
    const lowestPrice = property.rooms && property.rooms.length > 0
        ? Math.min(...property.rooms.map(r => Number(r.price)))
        : null;

    return (
        <Link to={`/properties/${property.id}`} className="block group">
            <div className="relative bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl overflow-hidden hover:border-violet-500/30 hover:bg-white/[0.06] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-violet-500/10">
                {/* Top accent */}
                <div className="h-1 w-full bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="p-5">
                    {/* Header row */}
                    <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-semibold text-white leading-tight group-hover:text-violet-300 transition-colors duration-200">
                            {property.name}
                        </h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badgeClass} ml-2 shrink-0`}>
                            {property.type}
                        </span>
                    </div>

                    {/* Location */}
                    <div className="flex items-center text-slate-400 text-sm mb-3">
                        <MapPin className="h-3.5 w-3.5 mr-1.5 text-slate-500 shrink-0" />
                        <span className="truncate">{property.address}, {property.city}</span>
                    </div>

                    {/* Rules snippet */}
                    {property.rules && (
                        <p className="text-sm text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                            {property.rules}
                        </p>
                    )}

                    {/* Footer */}
                    <div className="pt-3 border-t border-white/[0.06] flex justify-between items-center mt-2">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5 text-sm text-slate-400">
                                <BedDouble className="h-4 w-4 text-slate-500" />
                                <span><span className="text-emerald-400 font-semibold">{availableRooms}</span> / {roomCount} available</span>
                            </div>
                        </div>
                        {lowestPrice !== null && (
                            <div className="text-right">
                                <span className="text-xs text-slate-500">from </span>
                                <span className="text-white font-bold">₹{lowestPrice.toLocaleString()}</span>
                                <span className="text-xs text-slate-500">/mo</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Hover overlay arrow */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0">
                    <div className="w-7 h-7 rounded-full bg-violet-600 flex items-center justify-center">
                        <ArrowRight className="h-3.5 w-3.5 text-white" />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default PropertyCard;
