import { loadStripe } from '@stripe/stripe-js';

// User provided public key
const STRIPE_PUBLIC_KEY = 'pk_test_51Si9CJAMjhICaDRXwDU2ILS0jdeFB3sNX9zheMkZQ9xTf3n0z8lgG8VuURMNiL7gNVjf95Gyg1Z7mRAl90jGHbYK00rnIu1XhZ';

let stripePromise: ReturnType<typeof loadStripe>;

export const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe(STRIPE_PUBLIC_KEY);
    }
    return stripePromise;
};
