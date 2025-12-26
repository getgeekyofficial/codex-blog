import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { useAuth, API } from '../App';
import { Button } from '../components/ui/button';
import { Heart, Bookmark, ExternalLink, Loader2, Menu, X, LogOut } from 'lucide-react';
import { format } from 'date-fns';

const Dashboard = () => {
  const { user, token, logout } = useAuth();
  const [dailyHit, setDailyHit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetchDailyHit();
  }, []);

  const fetchDailyHit = async () => {
    try {
      const response = await axios.get(`${API}/insights/daily-hit`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDailyHit(response.data);
    } catch (error) {
      toast.error('Failed to load daily hit');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (insightId) => {
    try {
      await axios.post(`${API}/insights/${insightId}/like`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Liked!');
    } catch (error) {
      toast.error('Failed to like insight');
    }
  };

  const handleSave = async (insightId) => {
    try {
      await axios.post(`${API}/insights/${insightId}/save`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Saved!');
    } catch (error) {
      toast.error('Failed to save insight');
    }
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
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/dashboard" className="text-foreground font-medium" data-testid="nav-home">Home</Link>
              <Link to="/library" className="text-muted-foreground hover:text-foreground" data-testid="nav-library">Library</Link>
              <Link to="/profile" className="text-muted-foreground hover:text-foreground" data-testid="nav-profile">Profile</Link>
              <Button variant="ghost" size="sm" onClick={logout} data-testid="logout-button">
                <LogOut size={16} className="mr-2" />
                Logout
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-foreground"
              data-testid="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 space-y-4 pb-4" data-testid="mobile-menu">
              <Link to="/dashboard" className="block text-foreground font-medium">Home</Link>
              <Link to="/library" className="block text-muted-foreground">Library</Link>
              <Link to="/profile" className="block text-muted-foreground">Profile</Link>
              <Button variant="ghost" size="sm" onClick={logout} className="w-full justify-start">
                <LogOut size={16} className="mr-2" />
                Logout
              </Button>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12" data-testid="dashboard-header">
          <span className="text-primary font-mono text-sm uppercase tracking-wider">Daily Knowledge Hit</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">Today's Insights</h1>
          <p className="text-muted-foreground">{dailyHit?.date ? format(new Date(dailyHit.date), 'EEEE, MMMM d, yyyy') : ''}</p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12" data-testid="loading-spinner">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
            <p className="mt-4 text-muted-foreground">Loading your daily insights...</p>
          </div>
        )}

        {/* Daily Insights */}
        {!loading && dailyHit?.insights && (
          <div className="space-y-8" data-testid="daily-insights-container">
            {dailyHit.insights.length === 0 ? (
              <div className="text-center py-12 glass-card p-8 rounded-md" data-testid="no-insights-message">
                <p className="text-muted-foreground">No insights available yet. Check back later!</p>
              </div>
            ) : (
              dailyHit.insights.map((insight, index) => (
                <div
                  key={insight.id}
                  className="insight-card"
                  data-testid={`insight-card-${index}`}
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  {/* Category Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-md border"
                      style={{
                        color: getCategoryColor(insight.category),
                        borderColor: getCategoryColor(insight.category),
                        backgroundColor: `${getCategoryColor(insight.category)}20`
                      }}
                      data-testid={`insight-category-${index}`}
                    >
                      {insight.category}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground" data-testid={`insight-number-${index}`}>
                      INSIGHT #{index + 1}/3
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-bold mb-4" data-testid={`insight-title-${index}`}>{insight.title}</h2>

                  {/* Content */}
                  <p className="text-foreground/90 leading-relaxed mb-6" data-testid={`insight-text-${index}`}>
                    {insight.main_text}
                  </p>

                  {/* Tags */}
                  {insight.tags && insight.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6" data-testid={`insight-tags-${index}`}>
                      {insight.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="text-xs font-mono uppercase tracking-wider px-3 py-1 bg-muted/50 text-muted-foreground rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-6 border-t border-border">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleLike(insight.id)}
                        className="flex items-center space-x-2 text-muted-foreground hover:text-[#f43f5e] transition-colors"
                        data-testid={`like-button-${index}`}
                      >
                        <Heart size={20} />
                        <span className="text-sm">Like</span>
                      </button>
                      <button
                        onClick={() => handleSave(insight.id)}
                        className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
                        data-testid={`save-button-${index}`}
                      >
                        <Bookmark size={20} />
                        <span className="text-sm">Save</span>
                      </button>
                    </div>
                    {insight.source_url && insight.source_url.trim() !== '' && (
                      <a
                        href={insight.source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-primary hover:text-primary/80"
                        data-testid={`source-link-${index}`}
                      >
                        <span className="text-sm font-mono">READ MORE</span>
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;