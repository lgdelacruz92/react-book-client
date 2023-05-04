import {
  getCheckoutSession,
  redirectToCheckout,
} from "@/services/stripe.service";
import { Button } from "@chakra-ui/react";
import React from "react";

interface CheckoutPageProps {}

const CheckoutPage: React.FC<CheckoutPageProps> = () => {
  const handleCheckout = async () => {
    const sessionId = await getCheckoutSession();
    redirectToCheckout(sessionId);
  };

  return (
    <div>
      <Button onClick={handleCheckout}>Checkout</Button>
    </div>
  );
};

export default CheckoutPage;
