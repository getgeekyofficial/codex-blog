import { loadStripe } from '@stripe/stripe-js';
import Stripe from 'stripe'

// Get Stripe publishable key from environment variables
const STRIPE_PUBLIC_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

let stripePromise: ReturnType<typeof loadStripe> | null = null;

export const getStripe = () => {
    // Return null if Stripe key is not configured
    if (!STRIPE_PUBLIC_KEY) {
        console.warn('Stripe is not configured. Add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY to enable payments.');
        return null;
    }

    if (!stripePromise) {
        stripePromise = loadStripe(STRIPE_PUBLIC_KEY);
    }
    return stripePromise;
};

// Server-side Stripe instance
export const getServerStripe = () => {
    const secretKey = process.env.STRIPE_SECRET_KEY
    if (!secretKey) {
        console.error('STRIPE_SECRET_KEY is not configured')
        return null
    }
    return new Stripe(secretKey, {
        apiVersion: '2026-01-28.clover',
    })
}
