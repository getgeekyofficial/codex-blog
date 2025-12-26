import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth, API } from '../App';
import { Button } from '../components/ui/button';
import { CheckCircle2, Loader2 } from 'lucide-react';

const SubscriptionSuccess = () => {
  const navigate = useNavigate();
  const { token, updateUser } = useAuth();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [status, setStatus] = useState('checking');
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    if (sessionId) {
      checkPaymentStatus();
    }
  }, [sessionId]);

  const checkPaymentStatus = async () => {
    if (attempts >= 5) {
      setStatus('timeout');
      return;
    }

    try {
      const response = await axios.get(`${API}/payments/checkout/status/${sessionId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.payment_status === 'paid') {
        setStatus('success');
        updateUser({ subscription_plan: 'paid' });
      } else if (response.data.status === 'expired') {
        setStatus('failed');
      } else {
        setTimeout(() => {
          setAttempts(prev => prev + 1);
          checkPaymentStatus();
        }, 2000);
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-[#0a0a0a] relative">
      <div className="absolute inset-0 hero-glow"></div>
      
      <div className="w-full max-w-md relative z-10 text-center" data-testid="subscription-success-container">
        {status === 'checking' && (
          <div data-testid="checking-status">
            <Loader2 className="h-16 w-16 animate-spin mx-auto mb-6 text-primary" />
            <h2 className="text-2xl font-bold mb-2">Processing Payment...</h2>
            <p className="text-muted-foreground">Please wait while we confirm your subscription</p>
          </div>
        )}

        {status === 'success' && (
          <div className="animate-fade-in-up" data-testid="payment-success">
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Welcome to Premium!</h1>
            <p className="text-muted-foreground mb-8">
              Your subscription is now active. Enjoy unlimited access to all premium insights and daily hits every day.
            </p>
            <Button onClick={() => navigate('/dashboard')} className="glow-effect" data-testid="go-to-dashboard-button">
              Go to Dashboard
            </Button>
          </div>
        )}

        {status === 'failed' && (
          <div data-testid="payment-failed">
            <div className="w-20 h-20 bg-destructive/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="h-12 w-12 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">Payment Failed</h2>
            <p className="text-muted-foreground mb-8">Your payment session has expired. Please try again.</p>
            <Button onClick={() => navigate('/profile')} data-testid="try-again-button">Try Again</Button>
          </div>
        )}

        {status === 'timeout' && (
          <div data-testid="payment-timeout">
            <h2 className="text-2xl font-bold mb-4">Processing Taking Longer</h2>
            <p className="text-muted-foreground mb-8">
              We're still processing your payment. Please check your email for confirmation or contact support.
            </p>
            <Button onClick={() => navigate('/profile')}>Go to Profile</Button>
          </div>
        )}

        {status === 'error' && (
          <div data-testid="payment-error">
            <h2 className="text-2xl font-bold mb-4">Something Went Wrong</h2>
            <p className="text-muted-foreground mb-8">Please contact support if the issue persists.</p>
            <Button onClick={() => navigate('/profile')}>Go to Profile</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionSuccess;