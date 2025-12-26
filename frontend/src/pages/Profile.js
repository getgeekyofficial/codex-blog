import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { useAuth, API, BACKEND_URL } from '../App';
import { Button } from '../components/ui/button';
import { Crown, Settings, CheckCircle2, Loader2, Menu, X, LogOut } from 'lucide-react';

const CATEGORIES = [
  { id: 'AI Unleashed', name: 'AI Unleashed', color: '#10b981' },
  { id: 'Dark Psychology', name: 'Dark Psychology', color: '#f43f5e' },
  { id: 'Conspiracy Vault', name: 'Conspiracy Vault', color: '#f59e0b' },
  { id: 'Geek Science', name: 'Geek Science', color: '#06b6d4' },
];

const Profile = () => {
  const { user, token, logout, updateUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [checkingPayment, setCheckingPayment] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${API}/user/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(response.data);
      setSelectedInterests(response.data.interests || []);
    } catch (error) {
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const toggleInterest = (categoryId) => {
    setSelectedInterests(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const saveInterests = async () => {
    if (selectedInterests.length === 0) {
      toast.error('Please select at least one interest');
      return;
    }

    setSaving(true);
    try {
      await axios.put(
        `${API}/user/interests`,
        { interests: selectedInterests },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Interests updated!');
      updateUser({ interests: selectedInterests });
    } catch (error) {
      toast.error('Failed to update interests');
    } finally {
      setSaving(false);
    }
  };

  const handleUpgrade = async (plan = 'monthly') => {
    try {
      const originUrl = window.location.origin;
      const response = await axios.post(
        `${API}/payments/checkout/session`,
        { origin_url: originUrl, plan },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      window.location.href = response.data.url;
    } catch (error) {
      toast.error('Failed to initiate checkout');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold" data-testid="codex-logo">GetGeeky Codex</Link>
            
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/dashboard" className="text-muted-foreground hover:text-foreground" data-testid="nav-home">Home</Link>
              <Link to="/library" className="text-muted-foreground hover:text-foreground" data-testid="nav-library">Library</Link>
              <Link to="/profile" className="text-foreground font-medium" data-testid="nav-profile">Profile</Link>
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
              <Link to="/dashboard" className="block text-muted-foreground">Home</Link>
              <Link to="/library" className="block text-muted-foreground">Library</Link>
              <Link to="/profile" className="block text-foreground font-medium">Profile</Link>
              <Button variant="ghost" size="sm" onClick={logout} className="w-full justify-start">
                <LogOut size={16} className="mr-2" />
                Logout
              </Button>
            </div>
          )}
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2" data-testid="profile-title">Profile Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>

        {/* Account Info */}
        <div className="glass-card p-8 rounded-md mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center" data-testid="account-section-title">
            <Settings className="mr-3" size={24} />
            Account Information
          </h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-mono uppercase tracking-wider text-muted-foreground">Name</label>
              <p className="text-lg" data-testid="profile-name">{profile?.name}</p>
            </div>
            <div>
              <label className="text-sm font-mono uppercase tracking-wider text-muted-foreground">Email</label>
              <p className="text-lg" data-testid="profile-email">{profile?.email}</p>
            </div>
            <div>
              <label className="text-sm font-mono uppercase tracking-wider text-muted-foreground">Subscription</label>
              <p className="text-lg capitalize" data-testid="profile-subscription">{profile?.subscription_plan}</p>
            </div>
          </div>
        </div>

        {/* Subscription */}
        {profile?.subscription_plan === 'free' && (
          <div className="glass-card p-8 rounded-md mb-8 border-2 border-primary/30" data-testid="subscription-section">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2 flex items-center">
                  <Crown className="mr-3 text-primary" size={24} />
                  Upgrade to Premium
                </h2>
                <p className="text-muted-foreground">Unlock all premium insights and daily hits every day</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-border rounded-md p-6 hover:border-primary/50 transition-all" data-testid="monthly-plan">
                <h3 className="text-xl font-bold mb-2">Monthly</h3>
                <p className="text-3xl font-bold mb-4">$9.99<span className="text-base text-muted-foreground">/month</span></p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle2 className="mr-2 text-primary mt-1" size={16} />
                    <span className="text-sm">Daily hits every day</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="mr-2 text-primary mt-1" size={16} />
                    <span className="text-sm">Access all premium insights</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="mr-2 text-primary mt-1" size={16} />
                    <span className="text-sm">Cancel anytime</span>
                  </li>
                </ul>
                <Button onClick={() => handleUpgrade('monthly')} className="w-full glow-effect" data-testid="upgrade-monthly-button">
                  Upgrade Monthly
                </Button>
              </div>

              <div className="border-2 border-primary rounded-md p-6 relative" data-testid="yearly-plan">
                <div className="absolute -top-3 right-4 bg-primary text-white text-xs font-mono uppercase px-3 py-1 rounded-full">
                  Save 17%
                </div>
                <h3 className="text-xl font-bold mb-2">Yearly</h3>
                <p className="text-3xl font-bold mb-4">$99.99<span className="text-base text-muted-foreground">/year</span></p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle2 className="mr-2 text-primary mt-1" size={16} />
                    <span className="text-sm">Daily hits every day</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="mr-2 text-primary mt-1" size={16} />
                    <span className="text-sm">Access all premium insights</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="mr-2 text-primary mt-1" size={16} />
                    <span className="text-sm">2 months free</span>
                  </li>
                </ul>
                <Button onClick={() => handleUpgrade('yearly')} className="w-full glow-effect" data-testid="upgrade-yearly-button">
                  Upgrade Yearly
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Interests */}
        <div className="glass-card p-8 rounded-md" data-testid="interests-section">
          <h2 className="text-2xl font-bold mb-6">Your Interests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {CATEGORIES.map((category) => {
              const isSelected = selectedInterests.includes(category.id);
              return (
                <button
                  key={category.id}
                  onClick={() => toggleInterest(category.id)}
                  data-testid={`interest-toggle-${category.id.toLowerCase().replace(' ', '-')}`}
                  className={`p-6 rounded-md border-2 text-left transition-all ${
                    isSelected ? 'border-current' : 'border-border hover:border-border/60'
                  }`}
                  style={{
                    borderColor: isSelected ? category.color : undefined,
                    backgroundColor: isSelected ? `${category.color}10` : '#121212'
                  }}
                >
                  <div className="flex items-center justify-between">
                    <h3
                      className="text-lg font-bold"
                      style={{ color: isSelected ? category.color : '#ffffff' }}
                    >
                      {category.name}
                    </h3>
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? 'border-current' : 'border-muted-foreground'
                      }`}
                      style={{ borderColor: isSelected ? category.color : undefined }}
                    >
                      {isSelected && (
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: category.color }}
                        ></div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          <Button
            onClick={saveInterests}
            disabled={saving || selectedInterests.length === 0}
            className="w-full glow-effect"
            data-testid="save-interests-button"
          >
            {saving ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Interests'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;