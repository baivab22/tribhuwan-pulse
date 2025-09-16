import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { listResolved, Suggestion, Category, Status } from '@/lib/api';
import { Search, Filter, ChevronLeft, ChevronRight, Eye, Calendar, Clock, BarChart3, X, Image, Download } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';

const categories: Category[] = ['academic', 'administrative', 'infrastructure', 'other'];
const statuses: Status[] = ['Received', 'In Process', 'Resolved'];

// Status badge colors mapping
const statusColors: Record<Status, string> = {
  'Received': 'bg-blue-100 text-blue-800 hover:bg-blue-200',
  'In Process': 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
  'Resolved': 'bg-green-100 text-green-800 hover:bg-green-200'
};

export default function PublicSuggestionsPage() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<Suggestion[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [selectedSuggestion, setSelectedSuggestion] = useState<Suggestion | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<Category | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<Status | 'all'>('Resolved');

  const itemsPerPage = 8;

  useEffect(() => {
    loadPublicSuggestions();
  }, []);

  useEffect(() => {
    filterAndPaginateSuggestions();
  }, [suggestions, searchTerm, categoryFilter, statusFilter, page]);

  async function loadPublicSuggestions() {
    setLoading(true);
    setError(null);
    try {
      const data = await listResolved(page, 100); // Load more items for client-side filtering
      setSuggestions(data.suggestions);
      setTotal(data.total);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Failed to load suggestions';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  function filterAndPaginateSuggestions() {
    let filtered = suggestions;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(suggestion =>
        suggestion.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(suggestion => suggestion.category === categoryFilter);
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(suggestion => suggestion.status === statusFilter);
    }

    setTotal(filtered.length);
    
    // Apply pagination
    const startIndex = (page - 1) * itemsPerPage;
    const paginated = filtered.slice(startIndex, startIndex + itemsPerPage);
    setFilteredSuggestions(paginated);
  }

  const totalPages = Math.ceil(total / itemsPerPage);

  const handleClearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('all');
    setStatusFilter('Resolved');
    setPage(1);
  };

  const handleViewDetails = (suggestion: Suggestion) => {
    setSelectedSuggestion(suggestion);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Resolved Suggestions</h1>
          <p className="text-muted-foreground">
            Explore implemented suggestions and their impact on our community
          </p>
        </div>

        {error && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="text-red-600">{error}</div>
              <Button variant="outline" className="mt-2" onClick={loadPublicSuggestions}>
                Try Again
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Filters Section */}
        <Card className="mb-6">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filter Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="space-y-2">
                <Label>Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search suggestions..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setPage(1);
                    }}
                    className="pl-9"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={categoryFilter}
                  onValueChange={(value: Category | 'all') => {
                    setCategoryFilter(value);
                    setPage(1);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Status Filter */}
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={statusFilter}
                  onValueChange={(value: Status | 'all') => {
                    setStatusFilter(value);
                    setPage(1);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Clear Filters */}
              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={handleClearFilters}
                  className="w-full"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-muted-foreground">
            Showing {filteredSuggestions.length} of {total} suggestions
          </p>
          {total > 0 && (
            <div className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </div>
          )}
        </div>

        {/* Suggestions Grid */}
        {filteredSuggestions.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-muted-foreground mb-4">
                {suggestions.length === 0 
                  ? "No resolved suggestions available yet."
                  : "No suggestions match your filters."
                }
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {filteredSuggestions.map((suggestion) => (
              <SuggestionCard 
                key={suggestion._id || suggestion.id} 
                suggestion={suggestion} 
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            
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
                  variant={page === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPage(pageNum)}
                >
                  {pageNum}
                </Button>
              );
            })}

            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}

        {/* Call to Action */}
        <Card className="mt-8 bg-primary/5 border-primary/20">
          <CardContent className="pt-6 text-center">
            <BarChart3 className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Have a suggestion?</h3>
            <p className="text-muted-foreground mb-4">
              Help us improve our community by sharing your ideas
            </p>
            <Link to="/submit">
              <Button>Submit a Suggestion</Button>
            </Link>
          </CardContent>
        </Card>

        {/* Suggestion Detail Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>Suggestion Details</span>
                <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(false)}>
                  {/* <X className="h-4 w-4" /> */}
                </Button>
              </DialogTitle>
              <DialogDescription>
                View all details about this suggestion
              </DialogDescription>
            </DialogHeader>
            
            {selectedSuggestion && (
              <div className="space-y-6 py-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="capitalize">
                    {selectedSuggestion.category}
                  </Badge>
                  <Badge className={statusColors[selectedSuggestion.status]}>
                    {selectedSuggestion.status}
                  </Badge>
                  <Badge variant="secondary" className="ml-auto">
                    ID: {selectedSuggestion._id?.substring(0, 8)}...
                  </Badge>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground bg-muted/30 p-4 rounded-md">
                    {selectedSuggestion.description}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-1 flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Submitted
                    </h4>
                    <p className="text-sm">
                      {format(new Date(selectedSuggestion.createdAt), 'PPP')}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(selectedSuggestion.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                  
                  {selectedSuggestion.status === 'Resolved' && (
                    <div>
                      <h4 className="text-sm font-medium mb-1 flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        Resolved
                      </h4>
                      <p className="text-sm">
                        {format(new Date(selectedSuggestion.updatedAt), 'PPP')}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(selectedSuggestion.updatedAt), { addSuffix: true })}
                      </p>
                    </div>
                  )}
                </div>
                
                {selectedSuggestion.media && selectedSuggestion.media.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                      <Image className="h-4 w-4" />
                      Attachments ({selectedSuggestion.media.length})
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedSuggestion.media.map((media, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                          <span className="text-sm truncate mr-2">
                            {media.name || `Attachment ${index + 1}`}
                          </span>
                          <Button variant="ghost" size="icon" asChild>
                            <a href={media.url} target="_blank" rel="noopener noreferrer">
                              <Download className="h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

function SuggestionCard({ 
  suggestion, 
  onViewDetails 
}: { 
  suggestion: Suggestion;
  onViewDetails: (suggestion: Suggestion) => void;
}) {
  const id = suggestion._id || suggestion.id;
  
  return (
    <Card className="h-full hover:shadow-md transition-shadow group">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="outline" className="capitalize">
            {suggestion.category}
          </Badge>
          <Badge className={statusColors[suggestion.status]}>
            {suggestion.status}
          </Badge>
        </div>
        <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
          {suggestion.description.length > 60 
            ? `${suggestion.description.substring(0, 60)}...`
            : suggestion.description
          }
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {suggestion.description}
          </p>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{format(new Date(suggestion.createdAt), 'MMM dd, yyyy')}</span>
              </div>
              {suggestion.status === 'Resolved' && (
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{format(new Date(suggestion.updatedAt), 'MMM dd, yyyy')}</span>
                </div>
              )}
            </div>
          </div>

          {suggestion.media && suggestion.media.length > 0 && (
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <Image className="h-3 w-3" />
              {suggestion.media.length} attachment{suggestion.media.length !== 1 ? 's' : ''}
            </div>
          )}

          <div className="flex justify-between items-center pt-2">
            <span className="text-xs font-mono text-muted-foreground">
              ID: {id?.substring(0, 8)}...
            </span>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onViewDetails(suggestion)}
            >
              <Eye className="h-4 w-4 mr-1" />
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}