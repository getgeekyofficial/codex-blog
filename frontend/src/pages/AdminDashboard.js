import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { Button } from '../components/ui/button';
import { BarChart3, FileText, LogOut, ArrowRight } from 'lucide-react';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const adminSections = [
    {
      title: 'Manage Insights',
      description: 'Create, edit, and delete insights',
      icon: FileText,
      path: '/admin/insights',
      color: '#10b981'
    },
    {
      title: 'Analytics',
      description: 'View platform statistics and metrics',
      icon: BarChart3,
      path: '/admin/analytics',
      color: '#7c3aed'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/admin" className="text-2xl font-bold" data-testid="admin-logo">GetGeeky Codex Admin</Link>
            <Button variant="ghost" size="sm" onClick={logout} data-testid="logout-button">
              <LogOut size={16} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <span className="text-primary font-mono text-sm uppercase tracking-wider">Admin Portal</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4" data-testid="admin-dashboard-title">Dashboard</h1>
          <p className="text-muted-foreground">Manage your GetGeeky Codex platform</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-testid="admin-sections-grid">
          {adminSections.map((section, index) => (
            <button
              key={section.path}
              onClick={() => navigate(section.path)}
              data-testid={`admin-section-${index}`}
              className="glass-card p-8 rounded-md text-left group hover:border-primary/30 transition-all"
            >
              <div
                className="w-12 h-12 rounded-md flex items-center justify-center mb-4"
                style={{ backgroundColor: `${section.color}20` }}
              >
                <section.icon size={24} style={{ color: section.color }} />
              </div>
              <h2 className="text-2xl font-bold mb-2 flex items-center justify-between">
                {section.title}
                <ArrowRight className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" size={20} />
              </h2>
              <p className="text-muted-foreground">{section.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;