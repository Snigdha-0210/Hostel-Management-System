import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { cn } from '../utils/cn';
import { CalendarDays, BedDouble, Building2, Loader2, BookOpen } from 'lucide-react';

const statusConfig = {
    CONFIRMED: { label: 'Confirmed', cls: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20' },
    PENDING: { label: 'Pending', cls: 'bg-amber-500/15 text-amber-400 border-amber-500/20' },
    REJECTED: { label: 'Rejected', cls: 'bg-red-500/15 text-red-400 border-red-500/20' },
};

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                const res = await axios.get(`${API_URL}/api/bookings/my-bookings`);
                setBookings(res.data);
            } catch (error) {
                console.error("Failed to fetch bookings", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-32 text-slate-500">
            <Loader2 className="h-8 w-8 animate-spin mb-3 text-violet-500" />
            <p className="text-sm">Loading your bookings...</p>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
                    <BookOpen className="h-5 w-5 text-white" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-white">My Bookings</h1>
                    <p className="text-slate-400 text-sm">{bookings.length} booking{bookings.length !== 1 ? 's' : ''} total</p>
                </div>
            </div>

            {bookings.length === 0 ? (
                <div className="text-center py-20 bg-white/[0.03] rounded-2xl border border-white/[0.06]">
                    <BookOpen className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-400 mb-2">No bookings yet</h3>
                    <p className="text-slate-600 text-sm">When you book a room, it will appear here.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {bookings.map((booking, i) => {
                        const config = statusConfig[booking.status] || statusConfig.PENDING;
                        return (
                            <div
                                key={booking.id}
                                className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-5 md:p-6 flex flex-col md:flex-row justify-between gap-4 hover:border-white/[0.12] transition-all duration-200 animate-fade-in-up"
                                style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}
                            >
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                        <Building2 className="h-5 w-5 text-violet-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-lg leading-tight">{booking.room.property.name}</h3>
                                        <div className="flex items-center gap-1.5 text-slate-400 text-sm mt-0.5">
                                            <BedDouble className="h-3.5 w-3.5 text-slate-500" />
                                            Room {booking.room.roomNumber}
                                            <span className="text-slate-600">·</span>
                                            {booking.room.type}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-slate-500 text-xs mt-1.5">
                                            <CalendarDays className="h-3.5 w-3.5" />
                                            {new Date(booking.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            <span>→</span>
                                            {new Date(booking.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex md:flex-col items-center md:items-end gap-3 md:gap-2">
                                    <span className={cn("px-3 py-1 rounded-full text-xs font-semibold border", config.cls)}>
                                        {config.label}
                                    </span>
                                    {booking.totalAmount && (
                                        <div className="text-right">
                                            <div className="text-xl font-black text-white">₹{Number(booking.totalAmount).toLocaleString()}</div>
                                            <div className="text-xs text-slate-500">total</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default MyBookings;
