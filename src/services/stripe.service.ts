import { loadStripe } from "@stripe/stripe-js";
import { post } from "@/lib/api/post";
import Stripe from "stripe";

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY || "");

const getCheckoutSession = async (
  sessionCreateParams: Stripe.Checkout.SessionCreateParams
): Promise<Stripe.Checkout.Session> => {
  return await post("/stripe/checkout-session/create", {
    body: JSON.stringify(sessionCreateParams),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const expireCheckoutSession = async (csSessionId: string): Promise<string> => {
  const response = await post(`/stripe/checkout-session/${csSessionId}/expire`);
  return response;
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
  Stripe,
};
