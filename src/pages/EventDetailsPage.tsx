import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getEventById, EventItem } from '@/lib/api';
import { ArrowLeft, CalendarDays, MapPin, Star } from 'lucide-react';

const fallbackImage =
  'https://images.unsplash.com/photo-1519452575417-564c1401ecc0?auto=format&fit=crop&w=1200&q=80';

const EventDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [event, setEvent] = useState<EventItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  const images = useMemo(() => {
    if (!event?.images || event.images.length === 0) return [fallbackImage];
    return event.images;
  }, [event]);

  useEffect(() => {
    const run = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const response = await getEventById(id);
        if (response.success) {
          setEvent(response.event);
        } else {
          setEvent(null);
        }
      } catch {
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 py-10">
        <div className="w-[92vw] max-w-6xl mx-auto">
          <div className="h-96 rounded-3xl bg-slate-200 animate-pulse" />
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-slate-100 py-12">
        <div className="w-[92vw] max-w-3xl mx-auto rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-xl font-semibold text-slate-900">Event not found</p>
          <p className="mt-2 text-slate-600">The event may have been removed or is unavailable.</p>
          <div className="mt-5 flex justify-center gap-3">
            <Button variant="outline" onClick={() => navigate(-1)}>
              Go Back
            </Button>
            <Link to="/events">
              <Button>Browse Events</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_35%,#fff7ed_100%)] py-8 md:py-10">
      <div className="w-[92vw] max-w-6xl mx-auto space-y-6">
        <Button variant="outline" className="gap-2" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
          <div className="relative h-[320px] md:h-[430px]">
            <img src={images[activeImage]} alt={event.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
              <div className="flex gap-2 flex-wrap mb-3">
                <Badge className="bg-white/90 text-slate-900">{event.category || 'General'}</Badge>
                {event.isFeatured ? (
                  <Badge className="bg-amber-400 text-slate-900">
                    <Star className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                ) : null}
              </div>
              <h1 className="text-3xl md:text-5xl font-black leading-tight max-w-4xl">{event.title}</h1>
            </div>
          </div>

          {images.length > 1 ? (
            <div className="border-t border-slate-200 p-3 md:p-4 bg-slate-50">
              <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                {images.map((image, idx) => (
                  <button
                    key={`${image}-${idx}`}
                    onClick={() => setActiveImage(idx)}
                    className={`overflow-hidden rounded-lg border-2 transition ${
                      idx === activeImage ? 'border-slate-900' : 'border-transparent hover:border-slate-300'
                    }`}
                  >
                    <img src={image} alt={`Event image ${idx + 1}`} className="h-16 w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
          <article className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-3">About This Event</h2>
            {event.shortDescription ? (
              <p className="text-slate-700 text-lg leading-relaxed mb-5">{event.shortDescription}</p>
            ) : null}
            <div className="prose prose-slate max-w-none whitespace-pre-line leading-7 text-slate-700">
              {event.description}
            </div>
          </article>

          <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm h-fit lg:sticky lg:top-24">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Event Info</h3>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <CalendarDays className="w-5 h-5 text-slate-700 mt-0.5" />
                <div>
                  <p className="text-slate-500">Date</p>
                  <p className="font-semibold text-slate-900">{new Date(event.eventDate).toLocaleDateString()}</p>
                </div>
              </div>

              {event.location ? (
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-slate-700 mt-0.5" />
                  <div>
                    <p className="text-slate-500">Location</p>
                    <p className="font-semibold text-slate-900">{event.location}</p>
                  </div>
                </div>
              ) : null}

              <div>
                <p className="text-slate-500">Published</p>
                <p className="font-semibold text-slate-900">{new Date(event.createdAt).toLocaleDateString()}</p>
              </div>

              <div className="pt-2">
                <Link to="/events">
                  <Button className="w-full">View More Events</Button>
                </Link>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
};

export default EventDetailsPage;
