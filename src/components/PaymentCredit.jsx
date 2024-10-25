/* eslint-disable react/prop-types */
import  { useEffect, useState } from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutFormCredit from './CheckoutFormCredit';
import axios from 'axios';

function PaymentCredit({amount}) {
    console.log(amount);
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");

    const fetchPublishableKey = async () => {
        try {
            const response = await axios.get("/payment/config")
            const { publishableKey } = response.data;
            setStripePromise(await loadStripe(publishableKey));
        } catch (error) {
            console.error("Error fetching publishable key:", error);
        }
    };

    const createPaymentIntent = async () => {
        try {
            console.log(amount,'amount');
            if(!amount){
                return;
            }
            const response = await axios.post("/payment/create-payment-intent", {
                amount: +amount,
            });
            console.log(response,'test');
            setClientSecret(response.data.clientSecret);
        } catch (error) {
            console.error("Error creating payment intent:", error);
        }
    };

    useEffect(() => {
        fetchPublishableKey();
        createPaymentIntent();
    }, []);

    return (
        <>
            {clientSecret && stripePromise && (
                <Elements stripe={stripePromise||null} options={{ clientSecret }}>
                    <CheckoutFormCredit />
                </Elements>
            )}
        </>
    );
}

export default PaymentCredit;