import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

const PropertyGallery = ({ images = [], name }) => {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  if (!images.length) return null;

  const prev = (e) => { e?.stopPropagation(); setCurrent(i => (i - 1 + images.length) % images.length); };
  const next = (e) => { e?.stopPropagation(); setCurrent(i => (i + 1) % images.length); };

  return (
    <>
      <div className="relative rounded-2xl overflow-hidden bg-slate-900 mb-6 group">
        <img
          src={images[current]}
          alt={`${name} - photo ${current + 1}`}
          className="w-full h-64 md:h-80 object-cover transition-all duration-500"
          onError={e => { e.target.onerror = null; e.target.src = 'https://picsum.photos/seed/fallback/800/500'; }}
        />
        <button
          onClick={() => setLightbox(true)}
          className="absolute top-3 right-3 bg-black/50 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ZoomIn className="h-4 w-4" />
        </button>
        {images.length > 1 && (
          <>
            <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all">
              <ChevronRight className="h-4 w-4" />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className={`rounded-full transition-all ${i === current ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/40'}`} />
              ))}
            </div>
          </>
        )}
        <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
          {current + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button key={i} onClick={() => setCurrent(i)} className={`shrink-0 rounded-lg overflow-hidden border-2 transition-all ${i === current ? 'border-violet-500' : 'border-transparent opacity-60 hover:opacity-100'}`}>
              <img src={src} alt="" className="w-16 h-12 object-cover" onError={e => { e.target.onerror = null; e.target.src = 'https://picsum.photos/seed/fallback/100/80'; }} />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setLightbox(false)}>
          <button className="absolute top-4 right-4 text-white bg-white/10 p-2 rounded-full hover:bg-white/20" onClick={() => setLightbox(false)}>
            <X className="h-5 w-5" />
          </button>
          <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-3">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <img src={images[current]} alt="" className="max-w-full max-h-[85vh] object-contain rounded-xl" onClick={e => e.stopPropagation()} />
          <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-3">
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </>
  );
};

export default PropertyGallery;
