import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { useAuth, API } from '../App';
import { Users, FileText, TrendingUp, Crown, Loader2, ArrowLeft } from 'lucide-react';

const AdminAnalytics = () => {
  const { token } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get(`${API}/admin/analytics`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAnalytics(response.data);
    } catch (error) {
      toast.error('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  const stats = analytics ? [
    {
      label: 'Total Users',
      value: analytics.total_users,
      icon: Users,
      color: '#10b981'
    },
    {
      label: 'Total Insights',
      value: analytics.total_insights,
      icon: FileText,
      color: '#7c3aed'
    },
    {
      label: 'Daily Active Users',
      value: analytics.daily_active_users,
      icon: TrendingUp,
      color: '#06b6d4'
    },
    {
      label: 'Paid Subscribers',
      value: analytics.paid_subscribers,
      icon: Crown,
      color: '#f59e0b'
    },
    {
      label: 'Daily Hits Sent Today',
      value: analytics.daily_hits_sent_today,
      icon: TrendingUp,
      color: '#f43f5e'
    }
  ] : [];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/admin" className="text-muted-foreground hover:text-foreground" data-testid="back-to-admin">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-2xl font-bold" data-testid="analytics-title">Analytics</h1>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <div className="text-center py-12">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="analytics-grid">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="glass-card p-6 rounded-md"
                data-testid={`stat-card-${index}`}
              >
                <div
                  className="w-12 h-12 rounded-md flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <stat.icon size={24} style={{ color: stat.color }} />
                </div>
                <p className="text-sm text-muted-foreground font-mono uppercase tracking-wider mb-2">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold" style={{ color: stat.color }}>
                  {stat.value.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAnalytics;