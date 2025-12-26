import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../App';
import { Button } from '../components/ui/button';
import { ArrowRight, Zap, Brain, Target, Lock, TrendingUp, Users, CheckCircle } from 'lucide-react';

const Landing = () => {
  const { user } = useAuth();
  const [activeFaq, setActiveFaq] = useState(null);

  const stats = [
    { label: 'Daily Insights', value: '3', suffix: '/day' },
    { label: 'Knowledge Areas', value: '4', suffix: ' categories' },
    { label: 'Curated Sources', value: '14+', suffix: ' posts' }
  ];

  const features = [
    {
      icon: Brain,
      title: 'Personalized Daily Hits',
      description: 'Get 3 curated insights every day based on your interests. AI, Psychology, Conspiracy, or Science - you choose.',
      color: '#7c3aed'
    },
    {
      icon: Target,
      title: 'Interest-Based Curation',
      description: 'Tell us what fascinates you. Our algorithm delivers only what matters to your curiosity.',
      color: '#10b981'
    },
    {
      icon: Zap,
      title: 'Knowledge Library',
      description: 'Browse, search, and save insights. Build your personal knowledge vault with one-click bookmarking.',
      color: '#06b6d4'
    },
    {
      icon: Lock,
      title: 'Premium Insights',
      description: 'Upgrade to access exclusive deep-dives, early content, and advanced features.',
      color: '#f59e0b'
    }
  ];

  const socialProof = [
    { metric: '10K+', label: 'Insights Delivered' },
    { metric: '500+', label: 'Active Readers' },
    { metric: '95%', label: 'Daily Return Rate' }
  ];

  const faqs = [
    {
      q: 'How does GetGeeky Codex work?',
      a: 'Sign up, pick your interests (AI, Psychology, Conspiracy, Science), and get 3 personalized insights every day. Read, like, save, and explore more in our library.'
    },
    {
      q: 'What makes this different from other knowledge platforms?',
      a: 'We deliver bite-sized, curated knowledge directly to you daily - no infinite scrolling, no algorithmic chaos. Just focused learning matched to your curiosity.'
    },
    {
      q: 'Is it really free?',
      a: 'Yes! Free users get 3 daily insights, 3 days per week, plus access to non-premium library content. Upgrade anytime for daily hits every day and premium insights.'
    },
    {
      q: 'Can I change my interests later?',
      a: 'Absolutely! Update your interest profile anytime from your dashboard. Your daily hits adapt immediately.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navigation */}
      <nav className="border-b border-border/50 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold" data-testid="landing-logo">
              <span className="text-primary">GetGeeky</span> Codex
            </Link>
            <div className="flex items-center space-x-6">
              <Link to="/features" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="nav-features">
                Features
              </Link>
              <a href="https://getgeeky.blog" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </a>
              {user ? (
                <Link to={user.role === 'admin' ? '/admin' : '/'} data-testid="go-to-app-button">
                  <Button className="glow-effect">
                    Go to App
                    <ArrowRight className="ml-2" size={16} />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/login" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="nav-login">
                    Login
                  </Link>
                  <Link to="/signup" data-testid="nav-signup">
                    <Button className="glow-effect">
                      Start Free
                      <ArrowRight className="ml-2" size={16} />
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 hero-glow"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-mono uppercase tracking-wider">
                Knowledge Platform for Curious Minds
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight" data-testid="hero-headline">
              3 Mind-Expanding Insights.
              <br />
              <span className="text-primary">Every Single Day.</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Stop drowning in information. Get personalized knowledge hits on AI, Dark Psychology, Conspiracy Theories, and Geek Science - curated just for you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup" data-testid="hero-cta-primary">
                <Button size="lg" className="glow-effect h-14 px-8 text-lg">
                  Start Your Daily Hits - Free
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Link to="/features" data-testid="hero-cta-secondary">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-primary/30 hover:bg-primary/10">
                  See How It Works
                </Button>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Free forever • No credit card required • 2 minute setup
            </p>
          </div>

          {/* Social Proof Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-16">
            {socialProof.map((item, index) => (
              <div key={index} className="text-center" data-testid={`social-proof-${index}`}>
                <div className="text-4xl font-bold text-primary mb-2">{item.metric}</div>
                <div className="text-sm text-muted-foreground font-mono uppercase tracking-wider">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-black to-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-primary font-mono text-sm uppercase tracking-wider">How It Works</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">Your Daily Knowledge System</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built for habit-forming learning. Designed for retention, not distraction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="glass-card p-8 rounded-md card-hover"
                data-testid={`feature-card-${index}`}
              >
                <div
                  className="w-14 h-14 rounded-md flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${feature.color}20`, border: `1px solid ${feature.color}40` }}
                >
                  <feature.icon size={28} style={{ color: feature.color }} />
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-12">The Numbers Tell the Story</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="glass-card p-8 rounded-md" data-testid={`stat-${index}`}>
                <div className="text-5xl font-bold text-primary mb-2">
                  {stat.value}<span className="text-2xl text-muted-foreground">{stat.suffix}</span>
                </div>
                <div className="text-muted-foreground font-mono uppercase text-sm tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Timeline */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#0a0a0a] to-black">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Get Started in 60 Seconds</h2>
            <p className="text-xl text-muted-foreground">From zero to daily knowledge in three simple steps.</p>
          </div>

          <div className="space-y-8">
            {[
              { step: '1', title: 'Create Your Free Account', desc: 'Sign up with email. No credit card. No commitment.' },
              { step: '2', title: 'Pick Your Interests', desc: 'Choose from AI Unleashed, Dark Psychology, Conspiracy Vault, or Geek Science.' },
              { step: '3', title: 'Get Your Daily Hits', desc: 'Receive 3 personalized insights every day. Read, like, save, and grow.' }
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-6 glass-card p-8 rounded-md" data-testid={`step-${index}`}>
                <div className="flex-shrink-0 w-12 h-12 bg-primary/20 border-2 border-primary rounded-full flex items-center justify-center text-2xl font-bold text-primary">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-lg">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Common Questions</h2>
            <p className="text-muted-foreground text-lg">Everything you need to know before you start.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="glass-card rounded-md overflow-hidden" data-testid={`faq-${index}`}>
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                >
                  <span className="text-lg font-semibold">{faq.q}</span>
                  <ArrowRight
                    className={`transform transition-transform ${activeFaq === index ? 'rotate-90' : ''}`}
                    size={20}
                  />
                </button>
                {activeFaq === index && (
                  <div className="px-6 pb-5 text-muted-foreground">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 hero-glow"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Make Learning a Daily Habit?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join hundreds of curious minds getting smarter every single day. Your first daily hit is waiting.
          </p>
          <Link to="/signup" data-testid="final-cta">
            <Button size="lg" className="glow-effect h-14 px-12 text-lg">
              Start Your Free Account Now
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground mt-4">
            Takes 2 minutes • Free forever • Upgrade anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <p className="text-muted-foreground text-sm">
                © 2025 GetGeeky Codex. A feast of knowledge for curious minds.
              </p>
            </div>
            <div className="flex items-center space-x-6">
              <a href="https://getgeeky.blog" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                Blog
              </a>
              <Link to="/features" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                Features
              </Link>
              <Link to="/login" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                Login
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;