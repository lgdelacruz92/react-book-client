import { loadStripe } from "@stripe/stripe-js";
import { post } from "@/lib/api/post";

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY || "");

const getCheckoutSession = async (): Promise<string> => {
  const response = await post("/stripe/checkout-session/create");
  const data = await response.json();
  return data.sessionId;
};

const expireCheckoutSession = async (csSessionId: string): Promise<string> => {
  const response = await post(`/stripe/checkout-session/${csSessionId}/expire`);
  return await response.json();
};

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

export {
  stripePromise,
  redirectToCheckout,
  getCheckoutSession,
  expireCheckoutSession,
};
