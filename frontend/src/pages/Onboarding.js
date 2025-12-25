import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { useAuth, API } from '../App';
import { Button } from '../components/ui/button';
import { Loader2 } from 'lucide-react';

const CATEGORIES = [
  { id: 'AI Unleashed', name: 'AI Unleashed', color: '#10b981', description: 'Artificial Intelligence & Machine Learning' },
  { id: 'Dark Psychology', name: 'Dark Psychology', color: '#f43f5e', description: 'Mind Games & Human Behavior' },
  { id: 'Conspiracy Vault', name: 'Conspiracy Vault', color: '#f59e0b', description: 'Hidden Truths & Mysteries' },
  { id: 'Geek Science', name: 'Geek Science', color: '#06b6d4', description: 'Physics, Chemistry & Beyond' },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const { token, updateUser } = useAuth();
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleInterest = (categoryId) => {
    setSelectedInterests(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSubmit = async () => {
    if (selectedInterests.length === 0) {
      toast.error('Please select at least one interest');
      return;
    }

    setLoading(true);

    try {
      await axios.put(
        `${API}/user/interests`,
        { interests: selectedInterests },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      updateUser({ onboarding_completed: true });
      toast.success('Interests saved! Welcome to GetGeeky Codex');
      navigate('/');
    } catch (error) {
      toast.error('Failed to save interests');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-[#0a0a0a] relative">
      <div className="absolute inset-0 hero-glow"></div>
      
      <div className="w-full max-w-3xl relative z-10 animate-fade-in-up">
        <div className="text-center mb-12">
          <div className="mb-4">
            <span className="text-primary font-mono text-sm uppercase tracking-wider">Initializing System...</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="onboarding-title">Select Your Interests</h1>
          <p className="text-muted-foreground text-lg">Choose the topics that fascinate you. We'll curate your daily knowledge hits accordingly.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12" data-testid="interest-selection-grid">
          {CATEGORIES.map((category) => {
            const isSelected = selectedInterests.includes(category.id);
            return (
              <button
                key={category.id}
                onClick={() => toggleInterest(category.id)}
                data-testid={`interest-option-${category.id.toLowerCase().replace(' ', '-')}`}
                className={`p-8 rounded-md border-2 text-left transition-all duration-300 ${
                  isSelected
                    ? 'border-current glow-effect'
                    : 'border-border hover:border-border/60'
                }`}
                style={{
                  borderColor: isSelected ? category.color : undefined,
                  backgroundColor: isSelected ? `${category.color}10` : '#121212'
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3
                    className="text-xl font-bold"
                    style={{ color: isSelected ? category.color : '#ffffff' }}
                  >
                    {category.name}
                  </h3>
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
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
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </button>
            );
          })}
        </div>

        <div className="text-center">
          <Button
            onClick={handleSubmit}
            disabled={loading || selectedInterests.length === 0}
            className="glow-effect h-14 px-12 text-base font-mono uppercase tracking-wider"
            data-testid="continue-to-codex-button"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Initializing...
              </>
            ) : (
              'Continue to Codex'
            )}
          </Button>
          <p className="text-xs text-muted-foreground mt-4">
            {selectedInterests.length} interest{selectedInterests.length !== 1 ? 's' : ''} selected
          </p>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;