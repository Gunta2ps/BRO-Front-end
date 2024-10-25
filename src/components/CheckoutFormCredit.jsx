/* eslint-disable no-unused-vars */
import  {  useState } from 'react';
import { PaymentElement } from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate, useParams } from 'react-router-dom';
import { changeStatusToConfirmFunction } from '../api/api';
import { toast } from 'react-toastify';


export default function CheckoutFormCredit() {

    const elements = useElements();
    const stripe = useStripe();
    const params = useParams()
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const orderId = params.orderId
    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    console.log(orderId);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            if (!stripe || !elements) {
                // Stripe.js ยังโหลดไม่เสร็จ ห้าม submit จนกว่า Stripe.js จะพร้อม
                return;
            }

            setIsProcessing(true);

            // eslint-disable-next-line no-unused-vars
            const { error, paymentIntent } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    // ทำการเปลี่ยนไปยังหน้าสำเร็จหลังจากยืนยันการชำระเงินสำเร็จ
                    // return_url: `http://localhost:5174/customer`,
                },
                redirect: "if_required",
            });

            if (error) {

                if (error.type === "card_error" || error.type === "validation_error") {
                    setMessage(error.message);
                } else {
                    setMessage("An unexpected error occurred.");
                }
            }
            if(paymentIntent.status === "succeeded"){
                await changeStatusToConfirmFunction(token,orderId)
                toast.success('Payment Successful')
                navigate('/customer/order')
            }
            setIsProcessing(false);
        } catch (error) {
            console.error('Error confirming payment:', error);
            setMessage('Payment confirmation failed.');
        }
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" />
            <button className=' w-full bg-[#16325B] mx-auto py-2 mt-2 rounded-lg font-head text-white'
                disabled={isProcessing || !stripe || !elements} id="submit">
                <span id="button-text " >
                    {isProcessing ? "Processing ... " : "Pay now"}
                </span>
            </button>

            {message && <div id="payment-message">{message}</div>}
        </form>
    );
}