import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '../components/Button';
import { cn } from '../utils/cn';
import { ClipboardList, Loader2, CheckCircle2, XCircle, CalendarDays, User, BedDouble } from 'lucide-react';

const statusConfig = {
    CONFIRMED: { label: 'Confirmed', cls: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20' },
    PENDING: { label: 'Pending', cls: 'bg-amber-500/15 text-amber-400 border-amber-500/20' },
    REJECTED: { label: 'Rejected', cls: 'bg-red-500/15 text-red-400 border-red-500/20' },
};

const ManageBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                const res = await axios.get(`${API_URL}/api/bookings/owner`);
                setBookings(res.data);
            } catch (error) {
                console.error("Failed to fetch bookings", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    const handleStatusUpdate = async (bookingId, status) => {
        setUpdating(bookingId + status);
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            await axios.put(`${API_URL}/api/bookings/${bookingId}/status`, { status });
            setBookings(bookings.map(b => b.id === bookingId ? { ...b, status } : b));
        } catch (error) {
            console.error("Failed to update status", error);
        } finally {
            setUpdating(null);
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-32 text-slate-500">
            <Loader2 className="h-8 w-8 animate-spin mb-3 text-violet-500" />
            <p className="text-sm">Loading booking requests...</p>
        </div>
    );

    const pendingCount = bookings.filter(b => b.status === 'PENDING').length;

    return (
        <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
                        <ClipboardList className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Manage Bookings</h1>
                        <p className="text-slate-400 text-sm">{bookings.length} total · {pendingCount} pending review</p>
                    </div>
                </div>
                {pendingCount > 0 && (
                    <div className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/20 text-amber-400 text-sm font-medium">
                        {pendingCount} awaiting action
                    </div>
                )}
            </div>

            {bookings.length === 0 ? (
                <div className="text-center py-20 bg-white/[0.03] rounded-2xl border border-white/[0.06]">
                    <ClipboardList className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-400 mb-2">No booking requests</h3>
                    <p className="text-slate-600 text-sm">Booking requests from tenants will appear here.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {bookings.map((booking, i) => {
                        const config = statusConfig[booking.status] || statusConfig.PENDING;
                        const isPending = booking.status === 'PENDING';
                        return (
                            <div
                                key={booking.id}
                                className={cn(
                                    "bg-white/[0.04] backdrop-blur-xl border rounded-2xl p-5 md:p-6 transition-all duration-200 animate-fade-in-up",
                                    isPending ? "border-amber-500/15 hover:border-amber-500/25" : "border-white/[0.08] hover:border-white/[0.12]"
                                )}
                                style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }}
                            >
                                <div className="flex flex-col md:flex-row gap-4 justify-between">
                                    {/* Left: booking info */}
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                            <BedDouble className="h-5 w-5 text-violet-400" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-0.5">
                                                <h3 className="font-bold text-white">Room {booking.room.roomNumber}</h3>
                                                <span className="text-slate-600 text-xs">ID #{booking.room.id}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-slate-400 text-sm mt-1">
                                                <User className="h-3.5 w-3.5 text-slate-500" />
                                                <span className="font-medium text-slate-300">{booking.user.name}</span>
                                                <span className="text-slate-600">·</span>
                                                <span className="text-slate-500">{booking.user.email}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-slate-500 text-xs mt-1.5">
                                                <CalendarDays className="h-3.5 w-3.5" />
                                                {new Date(booking.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                <span>→</span>
                                                {new Date(booking.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right: status + actions */}
                                    <div className="flex items-center gap-3 md:shrink-0">
                                        <span className={cn("px-3 py-1 rounded-full text-xs font-semibold border", config.cls)}>
                                            {config.label}
                                        </span>

                                        {isPending && (
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="success"
                                                    size="sm"
                                                    onClick={() => handleStatusUpdate(booking.id, 'CONFIRMED')}
                                                    disabled={!!updating}
                                                    className="flex items-center gap-1.5"
                                                >
                                                    {updating === booking.id + 'CONFIRMED'
                                                        ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                                        : <CheckCircle2 className="h-3.5 w-3.5" />
                                                    }
                                                    Approve
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => handleStatusUpdate(booking.id, 'REJECTED')}
                                                    disabled={!!updating}
                                                    className="flex items-center gap-1.5"
                                                >
                                                    {updating === booking.id + 'REJECTED'
                                                        ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                                        : <XCircle className="h-3.5 w-3.5" />
                                                    }
                                                    Reject
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ManageBookings;
