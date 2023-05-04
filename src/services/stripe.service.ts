import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY || "");

const redirectToCheckout = async (sessionId: string) => {
  try {
    const stripe = await stripePromise;
    if (!stripe) {
      throw Error(`Stripe object null: ${stripe}`);
    }
    await stripe.redirectToCheckout({ sessionId });
  } catch (error) {
    console.error("Error redirecting to Checkout:", error);
  }
};

export { stripePromise, redirectToCheckout };
