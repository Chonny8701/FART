import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import Button from "react-bootstrap/Button";
import './CheckoutForm.scss'

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/completion`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    // Verificar si el pago se completó correctamente y mostrar la ventana modal en ese caso
    if (!error) {
      openModalGracias();
    }

    setIsProcessing(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />

      <Button variant="primary" type="submit" disabled={isProcessing || !stripe || !elements} style={{width:"100%", marginTop:"20px"}}>
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Continuar con el pago"}
        </span>
      </Button>

      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
