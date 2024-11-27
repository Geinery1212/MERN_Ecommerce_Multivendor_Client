import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import { loadStripe } from '@stripe/stripe-js'
import { BASE_URL_API, PUBLIC_KEY_STRIPE } from '../connection/global';
import error from '../assets/images/error.png';
import success from '../assets/images/success.png';
import api from '../connection/api';
const load = async () => {
    return await loadStripe(PUBLIC_KEY_STRIPE);
}

const ConfirmOrder = () => {

    const [loader, setLoader] = useState(true)
    const [stripe, setStripe] = useState('')
    const [message, setMessage] = useState(null)

    useEffect(() => {
        if (!stripe) {
            return
        }
        const clientSecret = new URLSearchParams(window.location.search).get('payment_intent_client_secret')
        if (!clientSecret) {
            return
        }
        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage('succeeded')
                    break
                case "processing":
                    setMessage('processing')
                    break
                case "requires_payment_method":
                    setMessage('failed')
                    break
                default:
                    setMessage('failed')

            }
        })
    }, [stripe])

    const get_load = async () => {
        const tempStripe = await load()
        setStripe(tempStripe)
    }

    const update_payment = async () => {
        const orderId = localStorage.getItem('orderId')
        if (orderId) {
            try {                
                console.log(`${BASE_URL_API}/order/confirm/${orderId}`);
                await api.put(`/customer/order/confirm/${orderId}`, {}, { withCredentials: true });
                localStorage.removeItem('orderId');
                setLoader(false);
            } catch (error) {
                console.log(error.response.data)
            }
        }
    }

    useEffect(() => {
        if (message === 'succeeded') {
            update_payment()
        }
    }, [message])

    useEffect(() => {
        get_load()
    }, [])


    return (
        <div className='w-screen h-screen flex justify-center items-center flex-col gap-4'>
            {
                (message === 'failed' || message === 'processing') ? <>
                    <img src={error} alt="" />
                    <Link className='px-5 py-2 bg-green-500 rounded-sm text-white' to="/dashboard/my-orders">Back to Dashboard </Link>
                </> : message === 'succeeded' ? loader ? <FadeLoader /> : <>
                    <img src={success} alt="" />
                    <Link className='px-5 py-2 bg-green-500 rounded-sm text-white' to="/dashboard/my-orders">Back to Dashboard </Link>
                </> : <FadeLoader />
            }
        </div>
    );
};

export default ConfirmOrder;