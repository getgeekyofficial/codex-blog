import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { API } from '../App';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Loader2, ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API}/auth/forgot-password`, { email });
      setSent(true);
      toast.success('Reset link sent! Check your email.');
    } catch (error) {
      toast.error('Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-[#0a0a0a] relative">
      <div className="absolute inset-0 hero-glow"></div>
      
      <div className="w-full max-w-md relative z-10 animate-fade-in-up">
        <Link to="/login" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-8" data-testid="back-to-login">
          <ArrowLeft size={16} className="mr-2" />
          Back to Login
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2" data-testid="forgot-password-title">Reset Password</h1>
          <p className="text-muted-foreground text-sm">Enter your email to receive a reset link</p>
        </div>

        <div className="glass-card p-8 rounded-md">
          {sent ? (
            <div className="text-center space-y-4" data-testid="reset-link-sent-message">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Check Your Email</h3>
              <p className="text-muted-foreground">If an account exists for {email}, you'll receive a password reset link shortly.</p>
              <Button onClick={() => setSent(false)} variant="outline" className="mt-4" data-testid="send-another-link-button">
                Send Another Link
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" data-testid="forgot-password-form">
              <div>
                <Label htmlFor="email" className="text-sm font-mono uppercase tracking-wider">Email</Label>
                <Input
                  id="email"
                  type="email"
                  data-testid="forgot-password-email-input"
                  placeholder="your.email@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-2 bg-black/50 border-border focus:border-primary h-12"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full glow-effect h-12 text-base font-mono uppercase tracking-wider"
                data-testid="send-reset-link-button"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Reset Link'
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;