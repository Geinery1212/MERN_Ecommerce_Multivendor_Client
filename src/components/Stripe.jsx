import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import axios from 'axios';
import CheckoutForm from './CheckoutForm';
import { BASE_URL_API, PUBLIC_KEY_STRIPE } from '../connection/global';
import { FadeLoader } from 'react-spinners';

const stripePromise = loadStripe(PUBLIC_KEY_STRIPE);

const Stripe = ({ totalPrice, orderId }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [clientSecret, setClientSecret] = useState('');
    const apperance = {
        theme: 'stripe'
    }
    const options = {
        apperance,
        clientSecret
    }

    const create_payment = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.post(`${BASE_URL_API}/payment/create-payment-order`, { totalPrice }, { withCredentials: true });
            setClientSecret(data.clientSecret);
            setIsLoading(false);
        } catch (error) {
            console.error(error.response.data);
            setIsLoading(false);
        }
    }
    return (
        <>
            {isLoading && <div className='w-screen h-screen flex justify-center
                items-center fixed left-0 top-0 bg-[#38303033] z-[999]'>
                <FadeLoader />
            </div>}
            <div className='mt-4'>
                {
                    clientSecret ? (
                        <Elements options={options} stripe={stripePromise}>
                            <CheckoutForm orderId={orderId} />
                        </Elements>
                    ) : <button onClick={create_payment} className='px-10 py-[6px] rounded-sm hover:shadow-green-700/30 hover:shadow-lg bg-green-700 text-white'>Start Payment</button>
                }
            </div></>
    )
}

export default Stripe