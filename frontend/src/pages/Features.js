import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../App';
import { Button } from '../components/ui/button';
import { ArrowRight, Brain, Zap, Target, Lock, TrendingUp, Heart, Bookmark, Library, Crown } from 'lucide-react';

const Features = () => {
  const { user } = useAuth();

  const coreFeatures = [
    {
      icon: Brain,
      title: 'Personalized Daily Hits',
      description: 'Wake up to 3 curated insights matched to your interests. No infinite scroll, no algorithm chaos - just focused knowledge.',
      benefits: ['Habit-forming daily delivery', 'Interest-based curation', 'Bite-sized for retention'],
      color: '#7c3aed'
    },
    {
      icon: Library,
      title: 'Searchable Knowledge Library',
      description: 'Browse our full catalog of insights. Filter by category, search by topic, discover connections.',
      benefits: ['14+ blog posts synced', 'Category filtering', 'Real-time search'],
      color: '#10b981'
    },
    {
      icon: Bookmark,
      title: 'Save & Organize',
      description: 'Like insights to track engagement. Save favorites to your personal library. Build your knowledge vault.',
      benefits: ['One-click bookmarking', 'Personal collections', 'Reading history'],
      color: '#06b6d4'
    },
    {
      icon: Crown,
      title: 'Premium Access',
      description: 'Upgrade for daily hits every day (vs 3x/week free), exclusive premium insights, and early access to new features.',
      benefits: ['Daily delivery 7x/week', 'Premium-only content', 'Future feature access'],
      color: '#f59e0b'
    }
  ];

  const categories = [
    {
      name: 'AI Unleashed',
      desc: 'Machine learning, neural networks, AGI debates, and the future of intelligence.',
      color: '#10b981',
      icon: '🤖'
    },
    {
      name: 'Dark Psychology',
      desc: 'Cognitive biases, manipulation tactics, behavioral economics, and the hidden rules of influence.',
      color: '#f43f5e',
      icon: '🧠'
    },
    {
      name: 'Conspiracy Vault',
      desc: 'Hidden histories, the Mandela Effect, surveillance networks, and mysteries that make you think.',
      color: '#f59e0b',
      icon: '🔮'
    },
    {
      name: 'Geek Science',
      desc: 'Quantum physics, fusion energy, space exploration, and the bleeding edge of human knowledge.',
      color: '#06b6d4',
      icon: '⚛️'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navigation */}
      <nav className="border-b border-border/50 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold">
              <span className="text-primary">GetGeeky</span> Codex
            </Link>
            <div className="flex items-center space-x-6">
              <Link to="/features" className="text-foreground font-medium">
                Features
              </Link>
              <a href="https://getgeeky.blog" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </a>
              {user ? (
                <Link to={user.role === 'admin' ? '/admin' : '/'}>
                  <Button className="glow-effect">
                    Go to App
                    <ArrowRight className="ml-2" size={16} />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/login" className="text-muted-foreground hover:text-foreground transition-colors">
                    Login
                  </Link>
                  <Link to="/signup">
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

      {/* Hero */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 hero-glow"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Everything You Need to <span className="text-primary">Level Up</span></h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A complete knowledge platform designed for daily learning, not endless scrolling.
          </p>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {coreFeatures.map((feature, index) => (
              <div key={index} className="glass-card p-8 rounded-md">
                <div
                  className="w-16 h-16 rounded-md flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${feature.color}20`, border: `1px solid ${feature.color}40` }}
                >
                  <feature.icon size={32} style={{ color: feature.color }} />
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3"></div>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-6 bg-gradient-to-b from-black to-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Four Knowledge Universes</h2>
            <p className="text-muted-foreground text-lg">Pick what fascinates you. We'll deliver the rest.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((cat, index) => (
              <div
                key={index}
                className="glass-card p-8 rounded-md border-2 transition-all hover:scale-[1.02]"
                style={{ borderColor: `${cat.color}30` }}
              >
                <div className="text-4xl mb-4">{cat.icon}</div>
                <h3 className="text-2xl font-bold mb-3" style={{ color: cat.color }}>{cat.name}</h3>
                <p className="text-muted-foreground">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Your first daily hit is 60 seconds away. No credit card. No commitment.
          </p>
          <Link to="/signup">
            <Button size="lg" className="glow-effect h-14 px-12 text-lg">
              Create Free Account
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
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

export default Features;