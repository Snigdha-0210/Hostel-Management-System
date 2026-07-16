import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ALL_PROPERTIES } from '../data/mockData';
import PropertyGallery from '../components/PropertyGallery';
import ReviewSection from '../components/ReviewSection';
import MessMenuDisplay from '../components/MessMenuDisplay';
import Button from '../components/Button';
import { cn } from '../utils/cn';
import {
  MapPin, Star, BedDouble, Users, CalendarDays, ArrowLeft, Phone,
  CheckCircle2, XCircle, Loader2, Wifi, Wind, Zap, Car, Shirt,
  BookOpen, Dumbbell, Waves, Coffee, ShieldCheck, Droplet, Refrigerator,
  UtensilsCrossed, Eye, ChevronDown, ChevronUp, Share2, Heart
} from 'lucide-react';

// ─── Amenity → icon map ─────────────────────────────────────────────────────
const AMENITY_ICONS = {
  WiFi: Wifi, AC: Wind, 'Power Backup': Zap, Parking: Car, Laundry: Shirt,
  'Study Room': BookOpen, Gym: Dumbbell, 'Swimming Pool': Waves, 'Food/Mess': Coffee,
  CCTV: ShieldCheck, 'Hot Water': Droplet, Fridge: Refrigerator,
  'Attached Washroom': Droplet, Cupboard: BookOpen, Balcony: Eye,
};

const AmenityPill = ({ name }) => {
  const Icon = AMENITY_ICONS[name] || CheckCircle2;
  return (
    <div className="flex items-center gap-1.5 px-3 py-2 bg-white/[0.04] border border-white/[0.07] rounded-xl text-sm text-slate-300">
      <Icon className="h-4 w-4 text-violet-400 shrink-0" />
      {name}
    </div>
  );
};

const SectionCard = ({ title, icon: Icon, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden mb-5">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between p-5 hover:bg-white/[0.02] transition-colors">
        <div className="flex items-center gap-2 font-semibold text-white">
          {Icon && <Icon className="h-4 w-4 text-violet-400" />}
          {title}
        </div>
        {open ? <ChevronUp className="h-4 w-4 text-slate-500" /> : <ChevronDown className="h-4 w-4 text-slate-500" />}
      </button>
      {open && <div className="px-5 pb-5">{children}</div>}
    </div>
  );
};

const RoomCard = ({ room, onBook }) => {
  const [showBook, setShowBook] = useState(false);
  const [dates, setDates] = useState({ startDate: '', endDate: '' });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const confirm = async () => {
    if (!dates.startDate || !dates.endDate) return;
    setLoading(true);
    await onBook(room.id, dates);
    setLoading(false); setDone(true); setShowBook(false);
    setTimeout(() => setDone(false), 3000);
  };

  return (
    <div className={cn('border rounded-2xl overflow-hidden transition-all', room.isAvailable ? 'border-white/[0.08] hover:border-violet-500/30' : 'border-white/[0.04] opacity-60')}>
      {room.images?.[0] && (
        <div className="h-36 overflow-hidden bg-slate-900">
          <img src={room.images[0]} alt={`Room ${room.roomNumber}`} className="w-full h-full object-cover" onError={e => { e.target.style.display='none'; }} />
        </div>
      )}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h4 className="font-bold text-white">{room.type} Sharing</h4>
            <p className="text-xs text-slate-500">{room.size} · {room.capacity} person{room.capacity>1?'s':''}</p>
          </div>
          <div className="text-right">
            <div className="text-xl font-black text-white">₹{Number(room.price).toLocaleString()}</div>
            <div className="text-xs text-slate-500">/month</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 mb-3">
          <span className={cn('flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border font-medium', room.isAvailable ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20')}>
            {room.isAvailable ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
            {room.isAvailable ? `${room.availableCount} Available` : 'Occupied'}
          </span>
        </div>
        {room.amenities?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {room.amenities.map(a => {
              const Icon = AMENITY_ICONS[a] || CheckCircle2;
              return <span key={a} className="flex items-center gap-1 text-xs text-slate-500 bg-white/[0.03] px-2 py-0.5 rounded-full border border-white/[0.05]"><Icon className="h-3 w-3" />{a}</span>;
            })}
          </div>
        )}
        {done ? (
          <div className="flex items-center gap-2 text-emerald-400 text-sm bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded-xl">
            <CheckCircle2 className="h-4 w-4" /> Booking request sent!
          </div>
        ) : showBook ? (
          <div className="space-y-2 pt-2 border-t border-white/[0.06]">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Check-in</label>
                <input type="date" onChange={e => setDates(d => ({...d, startDate: e.target.value}))}
                  className="w-full bg-white/5 border border-white/10 text-slate-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-violet-500/30" />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Check-out</label>
                <input type="date" onChange={e => setDates(d => ({...d, endDate: e.target.value}))}
                  className="w-full bg-white/5 border border-white/10 text-slate-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-violet-500/30" />
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" className="flex-1" onClick={confirm} disabled={loading || !dates.startDate || !dates.endDate}>
                {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : 'Confirm'}
              </Button>
              <Button size="sm" variant="outline" onClick={() => setShowBook(false)}>Cancel</Button>
            </div>
          </div>
        ) : (
          <Button size="sm" variant={room.isAvailable ? 'primary' : 'secondary'} className="w-full" disabled={!room.isAvailable} onClick={() => setShowBook(true)}>
            {room.isAvailable ? 'Book Now' : 'Occupied'}
          </Button>
        )}
      </div>
    </div>
  );
};

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────
const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const property = useMemo(() => ALL_PROPERTIES.find(p => p.id === parseInt(id)), [id]);
  const [saved, setSaved] = useState(false);

  const handleBook = async (roomId, dates) => {
    if (!user) { navigate('/login'); return; }
    if (user.role !== 'TENANT') { alert('Only tenants can book rooms.'); return; }
    await new Promise(r => setTimeout(r, 700)); // mock API
    console.log('Booked:', { roomId, ...dates });
  };

  if (!property) return (
    <div className="text-center py-32">
      <XCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
      <h2 className="text-xl font-bold text-white mb-2">Property not found</h2>
      <Button variant="outline" onClick={() => navigate('/')}><ArrowLeft className="h-4 w-4 mr-2" />Back</Button>
    </div>
  );

  const avgRating = property.reviews?.length
    ? (property.reviews.reduce((s, r) => s + r.rating, 0) / property.reviews.length).toFixed(1)
    : property.rating;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Back */}
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-5 transition-colors group">
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />Back to listings
      </button>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={cn('text-xs px-2.5 py-0.5 rounded-full border font-semibold',
              property.type === 'HOSTEL' ? 'bg-violet-500/15 text-violet-400 border-violet-500/20' :
              property.type === 'PG' ? 'bg-teal-500/15 text-teal-400 border-teal-500/20' :
              'bg-amber-500/15 text-amber-400 border-amber-500/20'
            )}>{property.type}</span>
            {property.gender && property.gender !== 'ANY' && (
              <span className={cn('text-xs px-2.5 py-0.5 rounded-full font-semibold', property.gender === 'BOYS' ? 'bg-blue-500/15 text-blue-400' : 'bg-pink-500/15 text-pink-400')}>
                {property.gender}
              </span>
            )}
            {property.hasMess && (
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">Mess Available</span>
            )}
          </div>
          <h1 className="text-3xl font-black text-white">{property.name}</h1>
          <div className="flex items-center gap-3 mt-1.5 text-sm text-slate-400">
            <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-slate-500" />{property.address}, {property.city}</span>
            {avgRating && (
              <span className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                <strong className="text-white">{avgRating}</strong>
                <span className="text-slate-500">({property.reviewCount || property.reviews?.length} reviews)</span>
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setSaved(s => !s)} className={cn('p-2.5 rounded-xl border transition-all', saved ? 'bg-red-500/15 border-red-500/30 text-red-400' : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20')}>
            <Heart className={cn('h-5 w-5', saved ? 'fill-red-400' : '')} />
          </button>
          <button className="p-2.5 rounded-xl border bg-white/5 border-white/10 text-slate-400 hover:border-white/20 transition-all">
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Gallery */}
      <PropertyGallery images={property.images || [property.coverImage]} name={property.name} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-0">

          {/* Amenities */}
          <SectionCard title="Amenities" icon={CheckCircle2}>
            <div className="flex flex-wrap gap-2">
              {property.amenities.map(a => <AmenityPill key={a} name={a} />)}
            </div>
          </SectionCard>

          {/* Rules */}
          <SectionCard title="House Rules" icon={ShieldCheck}>
            <p className="text-slate-400 text-sm leading-relaxed">{property.rules || 'No specific rules listed.'}</p>
          </SectionCard>

          {/* Rooms */}
          <SectionCard title={`Rooms (${property.rooms?.length || 0})`} icon={BedDouble}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {property.rooms?.map(room => (
                <RoomCard key={room.id} room={room} onBook={handleBook} />
              ))}
            </div>
          </SectionCard>

          {/* Mess Menu */}
          {property.hasMess && property.messMenu && (
            <SectionCard title="Mess Menu" icon={UtensilsCrossed}>
              <MessMenuDisplay menu={property.messMenu} />
            </SectionCard>
          )}

          {/* Map */}
          <SectionCard title="Location" icon={MapPin}>
            <div className="rounded-xl overflow-hidden border border-white/[0.07] h-64 bg-slate-900">
              <iframe
                title="map"
                width="100%" height="100%" frameBorder="0" loading="lazy"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${property.location.lng-0.01},${property.location.lat-0.01},${property.location.lng+0.01},${property.location.lat+0.01}&layer=mapnik&marker=${property.location.lat},${property.location.lng}`}
              />
            </div>
            <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
              <MapPin className="h-3 w-3" />{property.address}, {property.city}
            </p>
          </SectionCard>

          {/* Reviews */}
          <SectionCard title={`Reviews (${property.reviews?.length || 0})`} icon={Star}>
            <ReviewSection
              propertyId={property.id}
              reviews={property.reviews || []}
              userHasBooked={user?.role === 'TENANT'}
            />
          </SectionCard>
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          {/* Price summary */}
          <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5 sticky top-24">
            <h3 className="font-semibold text-white mb-3 text-sm">Room Pricing</h3>
            {property.rooms?.map(room => (
              <div key={room.id} className="flex justify-between items-center py-2 border-b border-white/[0.05] last:border-0">
                <span className="text-sm text-slate-400">{room.type} Sharing</span>
                <span className="text-white font-bold">₹{Number(room.price).toLocaleString()}<span className="text-xs text-slate-500">/mo</span></span>
              </div>
            ))}
            {!user && (
              <Link to="/login">
                <Button className="w-full mt-4">Login to Book</Button>
              </Link>
            )}
          </div>

          {/* Staff contacts */}
          {property.staff?.length > 0 && (
            <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-violet-400" /> Staff Contacts
              </h3>
              <div className="space-y-3">
                {property.staff.map((s, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
                      {s.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-200">{s.name}</div>
                      <div className="text-xs text-violet-400">{s.role}</div>
                      <a href={`tel:${s.phone}`} className="text-xs text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1 mt-0.5">
                        <Phone className="h-3 w-3" />{s.phone}
                      </a>
                      <div className="text-xs text-slate-600">{s.available}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* GPS Coordinates */}
          {property.location && (
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 text-xs text-slate-500">
              <div className="flex items-center gap-1.5 mb-1 text-slate-400 font-medium"><MapPin className="h-3.5 w-3.5 text-violet-400" />GPS Location</div>
              <div>Lat: {property.location.lat.toFixed(4)}, Lng: {property.location.lng.toFixed(4)}</div>
              <a
                href={`https://www.google.com/maps?q=${property.location.lat},${property.location.lng}`}
                target="_blank" rel="noopener noreferrer"
                className="text-violet-400 hover:underline mt-1 block"
              >
                Open in Google Maps →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
