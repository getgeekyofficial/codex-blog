import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { useAuth, API } from '../App';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Plus, Edit, Trash2, Loader2, ArrowLeft } from 'lucide-react';

const CATEGORIES = ['AI Unleashed', 'Dark Psychology', 'Conspiracy Vault', 'Geek Science'];

const AdminInsights = () => {
  const { token } = useAuth();
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingInsight, setEditingInsight] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'AI Unleashed',
    tags: '',
    main_text: '',
    source_url: '',
    premium_only: false
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchInsights();
    fetchLastSync();
  }, []);

  const fetchInsights = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API}/admin/insights`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setInsights(response.data.insights);
    } catch (error) {
      toast.error('Failed to load insights');
    } finally {
      setLoading(false);
    }
  };

  const fetchLastSync = async () => {
    try {
      const response = await axios.get(`${API}/admin/sync-history`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.history && response.data.history.length > 0) {
        setLastSync(response.data.history[0]);
      }
    } catch (error) {
      console.error('Failed to fetch sync history');
    }
  };

  const handleSyncBlog = async () => {
    setSyncing(true);
    try {
      const response = await axios.post(`${API}/admin/sync-blog`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const { synced, updated, errors } = response.data;
      
      if (errors && errors.length > 0) {
        toast.warning(`Synced ${synced} new, updated ${updated}. ${errors.length} errors occurred.`);
      } else {
        toast.success(`Blog synced! ${synced} new insights, ${updated} updated.`);
      }
      
      fetchInsights();
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to sync blog posts');
    } finally {
      setSyncing(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t)
      };

      if (editingInsight) {
        await axios.put(`${API}/admin/insights/${editingInsight.id}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Insight updated!');
      } else {
        await axios.post(`${API}/admin/insights`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Insight created!');
      }

      setIsDialogOpen(false);
      resetForm();
      fetchInsights();
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to save insight');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (insight) => {
    setEditingInsight(insight);
    setFormData({
      title: insight.title,
      category: insight.category,
      tags: insight.tags.join(', '),
      main_text: insight.main_text,
      source_url: insight.source_url || '',
      premium_only: insight.premium_only
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this insight?')) return;

    try {
      await axios.delete(`${API}/admin/insights/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Insight deleted!');
      fetchInsights();
    } catch (error) {
      toast.error('Failed to delete insight');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: 'AI Unleashed',
      tags: '',
      main_text: '',
      source_url: '',
      premium_only: false
    });
    setEditingInsight(null);
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
            <div className="flex items-center space-x-4">
              <Link to="/admin" className="text-muted-foreground hover:text-foreground" data-testid="back-to-admin">
                <ArrowLeft size={24} />
              </Link>
              <h1 className="text-2xl font-bold" data-testid="insights-management-title">Manage Insights</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                onClick={handleSyncBlog}
                disabled={syncing}
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
                data-testid="sync-blog-button"
              >
                {syncing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Syncing...
                  </>
                ) : (
                  'Sync Blog Posts'
                )}
              </Button>
              <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
                <DialogTrigger asChild>
                  <Button className="glow-effect" data-testid="create-insight-button">
                    <Plus size={20} className="mr-2" />
                    Create Insight
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-[#121212] border-border max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="insight-dialog">
                <DialogHeader>
                  <DialogTitle className="text-2xl">{editingInsight ? 'Edit Insight' : 'Create Insight'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      data-testid="insight-title-input"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                      <SelectTrigger className="mt-2" data-testid="insight-category-select">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((cat) => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="main_text">Content</Label>
                    <Textarea
                      id="main_text"
                      data-testid="insight-content-textarea"
                      value={formData.main_text}
                      onChange={(e) => setFormData({ ...formData, main_text: e.target.value })}
                      required
                      rows={6}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="tags">Tags (comma-separated)</Label>
                    <Input
                      id="tags"
                      data-testid="insight-tags-input"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      placeholder="AI, Machine Learning, Technology"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="source_url">Source URL (optional)</Label>
                    <Input
                      id="source_url"
                      data-testid="insight-source-url-input"
                      value={formData.source_url}
                      onChange={(e) => setFormData({ ...formData, source_url: e.target.value })}
                      placeholder="https://getgeeky.blog/..."
                      className="mt-2"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="premium_only"
                      data-testid="insight-premium-checkbox"
                      checked={formData.premium_only}
                      onChange={(e) => setFormData({ ...formData, premium_only: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <Label htmlFor="premium_only" className="cursor-pointer">Premium Only</Label>
                  </div>

                  <Button type="submit" disabled={submitting} className="w-full glow-effect" data-testid="submit-insight-button">
                    {submitting ? (
                      <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Saving...</>
                    ) : (
                      editingInsight ? 'Update Insight' : 'Create Insight'
                    )}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <div className="text-center py-12">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
          </div>
        ) : insights.length === 0 ? (
          <div className="text-center py-12 glass-card p-8 rounded-md">
            <p className="text-muted-foreground">No insights yet. Create your first one!</p>
          </div>
        ) : (
          <div className="space-y-4" data-testid="insights-list">
            {insights.map((insight, index) => (
              <div key={insight.id} className="glass-card p-6 rounded-md" data-testid={`insight-item-${index}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
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
                        <span className="text-xs font-mono uppercase px-2 py-1 rounded bg-primary/20 text-primary border border-primary">
                          Premium
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{insight.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{insight.main_text}</p>
                    {insight.tags && insight.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {insight.tags.map((tag, i) => (
                          <span key={i} className="text-xs font-mono px-2 py-0.5 bg-muted/30 text-muted-foreground rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(insight)}
                      data-testid={`edit-insight-button-${index}`}
                    >
                      <Edit size={18} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(insight.id)}
                      className="text-destructive hover:text-destructive"
                      data-testid={`delete-insight-button-${index}`}
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminInsights;