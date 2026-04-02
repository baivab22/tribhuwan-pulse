

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { listEvents, EventItem } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  CalendarDays, MapPin, Search, Star, Sparkles, 
  Clock, Filter, Grid3x3, List, X, TrendingUp,
  CalendarRange, ChevronLeft, ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const EVENT_PAGE_SIZE = 12;

const EventsPage = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / EVENT_PAGE_SIZE)), [total]);
  
  const categories = useMemo(() => {
    const cats = new Set(events.map(e => e.category || 'General'));
    return ['all', ...Array.from(cats)];
  }, [events]);

  const filteredEvents = useMemo(() => {
    if (selectedCategory === 'all') return events;
    return events.filter(e => (e.category || 'General') === selectedCategory);
  }, [events, selectedCategory]);

  const loadEvents = async (targetPage = page) => {
    setLoading(true);
    try {
      const response = await listEvents({ page: targetPage, limit: EVENT_PAGE_SIZE, q: q.trim() || undefined });
      setEvents(response.events);
      setPage(response.page);
      setTotal(response.total);
    } catch {
      setEvents([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents(1);
  }, []);

  const handleSearch = () => {
    loadEvents(1);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      {/* Hero Section with Parallax Effect */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-800">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-0 -right-32 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-48 -left-32 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        

        
        {/* Wave Divider */}
        <div className="absolute bottom-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-12">
            <path fill="#f8fafc" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" />
          </svg>
        </div>
      </div>

      <div className="w-[92vw] max-w-7xl mx-auto py-12">
        {/* Filters and Controls */}
        <div className="mb-8 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full ${
                  selectedCategory === category 
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white' 
                    : 'hover:bg-indigo-50'
                }`}
              >
                {category === 'all' ? 'All Events' : category}
              </Button>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-lg"
            >
              <Grid3x3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-lg"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Loading State with Skeleton */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}
            >
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="animate-pulse">
                  <div className="bg-gradient-to-r from-gray-200 to-gray-100 rounded-2xl h-64" />
                </div>
              ))}
            </motion.div>
          ) : filteredEvents.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20 bg-white rounded-2xl shadow-sm"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 mb-6">
                <CalendarRange className="w-10 h-10 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">No events found</h3>
              <p className="text-slate-500">Try adjusting your search or filters</p>
              <Button 
                onClick={() => {
                  setQ('');
                  setSelectedCategory('all');
                  loadEvents(1);
                }}
                className="mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
              >
                Clear Filters
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key={viewMode}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-8`}
            >
              {filteredEvents.map((event, idx) => {
                const cover = event.images?.[0] || 'https://images.unsplash.com/photo-1519452575417-564c1401ecc0?auto=format&fit=crop&w=900&q=80';
                return (
                  <motion.article
                    key={event._id}
                    variants={itemVariants}
                    whileHover={{ y: -8 }}
                    className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                  >
                    {/* Image Container with Overlay */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={cover}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {event.isFeatured && (
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 text-white border-0 shadow-lg">
                            <Star className="w-3 h-3 mr-1 fill-current" />
                            Featured
                          </Badge>
                        </div>
                      )}
                      
                      {/* Date Badge */}
                      <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1.5">
                        <div className="text-white text-sm font-semibold">
                          {new Date(event.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <Badge variant="secondary" className="bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border-0">
                          {event.category || 'General'}
                        </Badge>
                        {event.eventDate && new Date(event.eventDate) > new Date() && (
                          <Badge className="bg-green-100 text-green-700 border-0">
                            Upcoming
                          </Badge>
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-slate-800 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                        {event.title}
                      </h3>
                      
                      <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                        {event.shortDescription || event.description}
                      </p>

                      <div className="space-y-2 mb-4">
                        {event.location && (
                          <div className="flex items-center gap-2 text-sm text-slate-500">
                            <MapPin className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">{event.location}</span>
                          </div>
                        )}
                        {event.eventDate && (
                          <div className="flex items-center gap-2 text-sm text-slate-500">
                            <Clock className="w-4 h-4 flex-shrink-0" />
                            <span>{new Date(event.eventDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                        )}
                      </div>

                      <Link to={`/events/${event._id}`}>
                        <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-300 group">
                          <span>View Details</span>
                          <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Pagination */}
        {!loading && filteredEvents.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-12 mt-8 border-t border-slate-200"
          >
            <div className="text-sm text-slate-600">
              Showing <span className="font-semibold text-slate-800">{((page - 1) * EVENT_PAGE_SIZE) + 1}</span> to{' '}
              <span className="font-semibold text-slate-800">
                {Math.min(page * EVENT_PAGE_SIZE, total)}
              </span> of{' '}
              <span className="font-semibold text-slate-800">{total}</span> events
            </div>
            
            <div className="flex gap-3">
              <Button
                variant="outline"
                disabled={page <= 1 || loading}
                onClick={() => loadEvents(page - 1)}
                className="gap-2 hover:bg-indigo-50"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              
              <div className="flex gap-2">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (page <= 3) {
                    pageNum = i + 1;
                  } else if (page >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = page - 2 + i;
                  }
                  
                  return (
                    <Button
                      key={pageNum}
                      variant={pageNum === page ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => loadEvents(pageNum)}
                      className={`w-10 ${
                        pageNum === page 
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white' 
                          : 'hover:bg-indigo-50'
                      }`}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>
              
              <Button
                variant="outline"
                disabled={page >= totalPages || loading}
                onClick={() => loadEvents(page + 1)}
                className="gap-2 hover:bg-indigo-50"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
