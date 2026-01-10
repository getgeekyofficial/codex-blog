import { loadStripe } from '@stripe/stripe-js';

// Get Stripe publishable key from environment variables
const STRIPE_PUBLIC_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

if (!STRIPE_PUBLIC_KEY) {
    throw new Error(
        'Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY environment variable. ' +
        'Please add it to your .env.local file. See .env.example for reference.'
    );
}

let stripePromise: ReturnType<typeof loadStripe>;

export const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe(STRIPE_PUBLIC_KEY);
    }
    return stripePromise;
};
