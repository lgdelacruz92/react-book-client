import {
  getCheckoutSession,
  redirectToCheckout,
} from "@/services/stripe.service";
import { Button } from "@chakra-ui/react";
import React from "react";
import { Stripe } from "stripe";

interface CheckoutPageProps {}

const CheckoutPage: React.FC<CheckoutPageProps> = () => {
  const handleCheckout = async () => {
    const sessionCreateParams: Stripe.Checkout.SessionCreateParams = {
      customer: "cus_NoyCzMBDZWjrIi", // Optional: if you want to associate the Checkout Session with a specific Customer
      payment_method_types: ["card"],
      line_items: [
        {
          price: "price_1N3Qw1IdG01OnvFq9dZGR3g4", // Replace with the actual Price ID from the Dashboard
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url:
        "http://localhost:3000/checkout-page?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:3000/checkout-page",
    };

    try {
      const session = await getCheckoutSession(sessionCreateParams);
      session.success_url = session.success_url.replace(
        "{CHECKOUT_SESSION_ID}",
        session.id
      );
      redirectToCheckout(session.id);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Button onClick={handleCheckout}>Checkout</Button>
    </div>
  );
};

export default CheckoutPage;
