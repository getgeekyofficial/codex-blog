import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { useAuth, API } from '../App';
import { ArrowLeft, CheckCircle2, XCircle, Clock, Loader2, RefreshCw, Calendar } from 'lucide-react';
import { format } from 'date-fns';

const AdminSyncHistory = () => {
  const { token } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API}/admin/sync-history`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setHistory(response.data.history);
    } catch (error) {
      toast.error('Failed to load sync history');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    if (status === 'success') {
      return <CheckCircle2 className="text-[#10b981]" size={20} />;
    }
    return <XCircle className="text-destructive" size={20} />;
  };

  const getTriggerBadge = (trigger) => {
    const badges = {
      manual: { bg: '#7c3aed20', color: '#7c3aed', label: 'Manual' },
      cron: { bg: '#10b98120', color: '#10b981', label: 'Scheduled' },
      webhook: { bg: '#06b6d420', color: '#06b6d4', label: 'Webhook' }
    };
    const badge = badges[trigger] || badges.manual;
    return (
      <span
        className="text-xs font-mono uppercase px-2 py-1 rounded"
        style={{ backgroundColor: badge.bg, color: badge.color }}
      >
        {badge.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/admin" className="text-muted-foreground hover:text-foreground" data-testid="back-to-admin">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-2xl font-bold" data-testid="sync-history-title">Sync History</h1>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <div className="text-center py-12">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
          </div>
        ) : history.length === 0 ? (
          <div className="text-center py-12 glass-card p-8 rounded-md">
            <p className="text-muted-foreground">No sync history yet. Try syncing your blog posts!</p>
          </div>
        ) : (
          <div className="space-y-4" data-testid="sync-history-list">
            {history.map((sync, index) => (
              <div
                key={sync.id}
                className="glass-card p-6 rounded-md"
                data-testid={`sync-record-${index}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(sync.status)}
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-bold">
                          {sync.status === 'success' ? 'Sync Completed' : 'Sync Failed'}
                        </h3>
                        {getTriggerBadge(sync.triggered_by)}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          {format(new Date(sync.timestamp), 'MMM dd, yyyy HH:mm:ss')}
                        </span>
                        <span className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          {sync.duration_seconds}s
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {sync.status === 'success' && (
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="bg-[#10b981]/10 border border-[#10b981]/30 rounded p-3">
                      <p className="text-xs text-muted-foreground font-mono uppercase mb-1">New</p>
                      <p className="text-2xl font-bold text-[#10b981]">{sync.synced_count || 0}</p>
                    </div>
                    <div className="bg-[#06b6d4]/10 border border-[#06b6d4]/30 rounded p-3">
                      <p className="text-xs text-muted-foreground font-mono uppercase mb-1">Updated</p>
                      <p className="text-2xl font-bold text-[#06b6d4]">{sync.updated_count || 0}</p>
                    </div>
                    <div className="bg-muted/20 border border-border rounded p-3">
                      <p className="text-xs text-muted-foreground font-mono uppercase mb-1">Total Files</p>
                      <p className="text-2xl font-bold">{sync.total_files || 0}</p>
                    </div>
                  </div>
                )}

                {sync.status === 'failed' && sync.error && (
                  <div className="bg-destructive/10 border border-destructive/30 rounded p-3 mb-4">
                    <p className="text-sm text-destructive font-mono">{sync.error}</p>
                  </div>
                )}

                {sync.errors && sync.errors.length > 0 && (
                  <div className="bg-[#f59e0b]/10 border border-[#f59e0b]/30 rounded p-3">
                    <p className="text-xs text-[#f59e0b] font-mono uppercase mb-2">
                      {sync.errors.length} Warning{sync.errors.length !== 1 ? 's' : ''}
                    </p>
                    <div className="space-y-1">
                      {sync.errors.slice(0, 3).map((error, i) => (
                        <p key={i} className="text-xs text-muted-foreground font-mono">• {error}</p>
                      ))}
                      {sync.errors.length > 3 && (
                        <p className="text-xs text-muted-foreground font-mono">
                          ... and {sync.errors.length - 3} more
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSyncHistory;
