"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const accent = "#c8ff00";
const black = "#0a0a0a";
const white = "#f5f5f0";
const grayDark = "#1a1a1a";
const grayMid = "#2a2a2a";
const grayText = "#888";

interface ProjectPaymentFormProps {
  paymentIntentId: string;
}

export default function ProjectPaymentForm({
  paymentIntentId,
}: ProjectPaymentFormProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch payment intent details from Stripe
    fetch(`/api/payment-intent/${paymentIntentId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
          setLoading(false);
        } else {
          setClientSecret(data.client_secret);
          setLoading(false);
        }
      })
      .catch((err) => {
        setError("Failed to load payment details");
        setLoading(false);
      });
  }, [paymentIntentId]);

  if (loading) {
    return (
      <div style={{ paddingTop: "120px", paddingBottom: "4rem", textAlign: "center" }}>
        <p style={{ color: grayText }}>Loading payment details...</p>
      </div>
    );
  }

  if (error || !clientSecret) {
    return (
      <div style={{ paddingTop: "120px", paddingBottom: "4rem", textAlign: "center" }}>
        <p style={{ color: "red" }}>{error || "Payment link invalid or expired"}</p>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm />
    </Elements>
  );
}

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/pay/success`,
      },
    });

    if (error) {
      setMessage(error.message || "An error occurred");
      setIsProcessing(false);
    }
  };

  return (
    <div style={{ paddingTop: "120px", paddingBottom: "4rem" }}>
      <section
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          padding: "0 1.5rem",
        }}
      >
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
            fontWeight: 700,
            letterSpacing: "-1px",
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          Complete Payment
        </div>

        <form onSubmit={handleSubmit}>
          <div
            style={{
              padding: "2rem",
              background: grayDark,
              borderRadius: "12px",
              border: `1px solid ${grayMid}`,
              marginBottom: "1.5rem",
            }}
          >
            <PaymentElement />
          </div>

          <button
            type="submit"
            disabled={isProcessing || !stripe || !elements}
            style={{
              width: "100%",
              padding: "1rem",
              background: isProcessing ? grayMid : accent,
              color: black,
              borderRadius: "8px",
              fontWeight: 700,
              fontSize: "1rem",
              letterSpacing: "0.5px",
              border: "none",
              cursor: isProcessing ? "not-allowed" : "pointer",
              transition: "all 0.3s",
            }}
          >
            {isProcessing ? "Processing..." : "Pay Now"}
          </button>

          {message && (
            <div
              style={{
                marginTop: "1rem",
                padding: "1rem",
                background: grayDark,
                borderRadius: "8px",
                color: "red",
                textAlign: "center",
              }}
            >
              {message}
            </div>
          )}
        </form>
      </section>
    </div>
  );
}
