import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { useAuth, API } from '../App';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Heart, Bookmark, Search, Filter, ExternalLink, Loader2, Menu, X, LogOut } from 'lucide-react';

const CATEGORIES = ['All', 'AI Unleashed', 'Dark Psychology', 'Conspiracy Vault', 'Geek Science'];

const Library = () => {
  const { user, token, logout } = useAuth();
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetchInsights();
  }, [selectedCategory, searchTerm]);

  const fetchInsights = async () => {
    setLoading(true);
    try {
      const params = {};
      if (selectedCategory !== 'All') params.category = selectedCategory;
      if (searchTerm) params.search = searchTerm;

      const response = await axios.get(`${API}/insights/library`, {
        headers: { Authorization: `Bearer ${token}` },
        params
      });
      setInsights(response.data.insights);
    } catch (error) {
      toast.error('Failed to load library');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchInsights();
  };

  const getCategoryColor = (category) => {
    const colors = {
      'AI Unleashed': '#10b981',
      'Dark Psychology': '#f43f5e',
      'Conspiracy Vault': '#f59e0b',
      'Geek Science': '#06b6d4'
    };
    return colors[category] || '#7c3aed';
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold" data-testid="codex-logo">GetGeeky Codex</Link>
            
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-muted-foreground hover:text-foreground" data-testid="nav-home">Home</Link>
              <Link to="/library" className="text-foreground font-medium" data-testid="nav-library">Library</Link>
              <Link to="/profile" className="text-muted-foreground hover:text-foreground" data-testid="nav-profile">Profile</Link>
              <Button variant="ghost" size="sm" onClick={logout} data-testid="logout-button">
                <LogOut size={16} className="mr-2" />
                Logout
              </Button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-foreground"
              data-testid="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden mt-4 space-y-4 pb-4" data-testid="mobile-menu">
              <Link to="/" className="block text-muted-foreground">Home</Link>
              <Link to="/library" className="block text-foreground font-medium">Library</Link>
              <Link to="/profile" className="block text-muted-foreground">Profile</Link>
              <Button variant="ghost" size="sm" onClick={logout} className="w-full justify-start">
                <LogOut size={16} className="mr-2" />
                Logout
              </Button>
            </div>
          )}
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="library-title">Knowledge Library</h1>
          <p className="text-muted-foreground">Explore all insights curated for curious minds</p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <form onSubmit={handleSearch} className="flex-1 flex gap-2" data-testid="library-search-form">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  placeholder="Search insights..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-black/50 border-border h-12"
                  data-testid="library-search-input"
                />
              </div>
              <Button type="submit" className="h-12" data-testid="search-button">
                <Search size={20} />
              </Button>
            </form>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-64 h-12 bg-black/50" data-testid="category-filter">
                <Filter size={20} className="mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat} data-testid={`category-option-${cat.toLowerCase().replace(' ', '-')}`}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Insights Grid */}
        {loading ? (
          <div className="text-center py-12" data-testid="loading-spinner">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
          </div>
        ) : insights.length === 0 ? (
          <div className="text-center py-12 glass-card p-8 rounded-md" data-testid="no-insights-message">
            <p className="text-muted-foreground">No insights found. Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="insights-grid">
            {insights.map((insight, index) => (
              <div key={insight.id} className="card-hover bg-[#121212] border border-border rounded-md p-6" data-testid={`insight-card-${index}`}>
                <div className="flex items-start justify-between mb-3">
                  <span
                    className="text-xs font-mono uppercase tracking-wider px-2 py-1 rounded border"
                    style={{
                      color: getCategoryColor(insight.category),
                      borderColor: getCategoryColor(insight.category),
                      backgroundColor: `${getCategoryColor(insight.category)}15`
                    }}
                  >
                    {insight.category}
                  </span>
                  {insight.premium_only && (
                    <span className="text-xs font-mono uppercase tracking-wider px-2 py-1 rounded bg-primary/20 text-primary border border-primary">
                      Premium
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold mb-3 line-clamp-2" data-testid={`insight-title-${index}`}>{insight.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3" data-testid={`insight-text-${index}`}>{insight.main_text}</p>

                {insight.tags && insight.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {insight.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="text-xs font-mono px-2 py-0.5 bg-muted/30 text-muted-foreground rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center space-x-3">
                    <button className="text-muted-foreground hover:text-[#f43f5e]" data-testid={`like-button-${index}`}>
                      <Heart size={18} />
                    </button>
                    <button className="text-muted-foreground hover:text-primary" data-testid={`save-button-${index}`}>
                      <Bookmark size={18} />
                    </button>
                  </div>
                  {insight.source_url && (
                    <a href={insight.source_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80" data-testid={`source-link-${index}`}>
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;