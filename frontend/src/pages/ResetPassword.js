import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { API } from '../App';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Loader2, Eye, EyeOff } from 'lucide-react';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await axios.post(`${API}/auth/reset-password`, { token, new_password: password });
      toast.success('Password reset successful!');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Password reset failed');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-[#0a0a0a]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive mb-4">Invalid Reset Link</h2>
          <p className="text-muted-foreground mb-6">This password reset link is invalid or has expired.</p>
          <Button onClick={() => navigate('/forgot-password')}>Request New Link</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-[#0a0a0a] relative">
      <div className="absolute inset-0 hero-glow"></div>
      
      <div className="w-full max-w-md relative z-10 animate-fade-in-up">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2" data-testid="reset-password-title">Set New Password</h1>
          <p className="text-muted-foreground text-sm">Enter your new password below</p>
        </div>

        <div className="glass-card p-8 rounded-md">
          <form onSubmit={handleSubmit} className="space-y-6" data-testid="reset-password-form">
            <div>
              <Label htmlFor="password" className="text-sm font-mono uppercase tracking-wider">New Password</Label>
              <div className="relative mt-2">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  data-testid="new-password-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="bg-black/50 border-border focus:border-primary h-12 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  data-testid="toggle-password-visibility"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-sm font-mono uppercase tracking-wider">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                data-testid="confirm-password-input"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-2 bg-black/50 border-border focus:border-primary h-12"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full glow-effect h-12 text-base font-mono uppercase tracking-wider"
              data-testid="reset-password-submit-button"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Resetting...
                </>
              ) : (
                'Reset Password'
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;