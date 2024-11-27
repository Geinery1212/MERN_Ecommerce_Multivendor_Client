import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { IoIosArrowForward } from "react-icons/io";
import banner from '../assets/images/banner/shop.png'
import MyMoney from '../utilities/MyMoney';
import { dinero, toDecimal, add, toSnapshot } from 'dinero.js';
import { useDispatch, useSelector } from 'react-redux';
import { place_order } from '../store/reducers/orderReducer';
import { FadeLoader } from 'react-spinners';

const Shipping = () => {
    const formatter = new MyMoney();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { state: { cart_products, price, shipping_fee, items } } = useLocation();
    const { userInfo } = useSelector(state => state.auth);
    const { loader } = useSelector(state => state.order);

    const [res, setRes] = useState(false);
    const [data, setData] = useState({
        name: '',
        country: '',
        phone: '',
        zip_code: '',
        state: '',
        city: '',
        street_address: ''
    });
    const inputHandler = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }
    const saveAddress = (e) => {
        e.preventDefault();
        const { name, country, phone, zip_code, state, city, street_address } = data;
        if (name && country && phone && zip_code && state && city && street_address) {
            setRes(true);
        }
    }
    const placeOrder = () => {
        if (userInfo) {
            dispatch(place_order({
                price,
                totalPrice: toSnapshot(add(dinero(price), dinero(shipping_fee))).amount,
                products: cart_products,
                shipping_fee,
                items,
                shippingInfo: data,
                userId: userInfo.id,
                navigate
            }));
        }else{
            navigate('/login');
        }
    }
    return (
        <>
            {
                loader && <div className='w-screen h-screen flex justify-center
                items-center fixed left-0 top-0 bg-[#38303033] z-[999]'>
                    <FadeLoader />
                </div>
            }
            <div>
                <Header />
                {/* banner */}
                <section
                    style={{
                        backgroundImage: `url(${banner})`,
                        height: '220px',
                        marginTop: '1.5rem',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'left'
                    }}
                    className="relative"
                >
                    <div className='absolute left-0 top-0 w-full h-full bg-[#2422228a]'>
                        <div className='w-[85%] md:w-[80%] sm:w-[90%] h-full mx-auto'>
                            <div className='flex flex-col justify-center gap-1 items-center h-full w-full text-white'>
                                <h2 className='text-3xl font-bold'>Shipping Page</h2>
                                <div className='flex justify-center items-center gap-2 text-2xl w-full'>
                                    <div className='flex justify-center items-center gap-2 text-2xl w-full'>
                                        <Link to={'/'}>Home</Link>
                                        <span className='pt-1'>
                                            <IoIosArrowForward />
                                        </span>
                                        <span>Shipping</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='bg-[#eeeeee]'>
                    <div className='w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16'>
                        <div className='w-full flex flex-wrap'>
                            <div className='w-[67%] md-lg:w-full'>
                                <div className='flex flex-col gap-3'>
                                    {/* Address */}
                                    <div className='bg-white p-6 shadow-sm rounded-md'>
                                        <h2 className='text-slate-600 font-bold pb-3'>Shipping Information</h2>
                                        {
                                            !res && <form onSubmit={saveAddress}>
                                                <div className='flex md:flex-col md:gap-2 w-full gap-5 text-slate-600'>
                                                    <div className='flex flex-col gap-1 mb-2 w-full'>
                                                        <label htmlFor="name">Name </label>
                                                        <input type="text" className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'
                                                            name='name' id='name' onChange={inputHandler} value={data.name} placeholder='Name' required />
                                                    </div>
                                                    <div className='flex flex-col gap-1 mb-2 w-full'>
                                                        <label htmlFor="phone">Phone </label>
                                                        <input type="text" className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'
                                                            name='phone' id='phone' onChange={inputHandler} value={data.phone} placeholder='Phone' required />
                                                    </div>
                                                </div>
                                                <div className='flex md:flex-col md:gap-2 w-full gap-5 text-slate-600'>
                                                    <div className='flex flex-col gap-1 mb-2 w-full'>
                                                        <label htmlFor="country">Country </label>
                                                        <input type="text" className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'
                                                            name='country' id='country' onChange={inputHandler} value={data.country} placeholder='Country' required />
                                                    </div>
                                                    <div className='flex flex-col gap-1 mb-2 w-full'>
                                                        <label htmlFor="zip_code">Postal/ZIP Code</label>
                                                        <input type="text" className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'
                                                            name='zip_code' id='zip_code' onChange={inputHandler} value={data.zip_code} placeholder='Zip code' required />
                                                    </div>
                                                </div>
                                                <div className='flex md:flex-col md:gap-2 w-full gap-5 text-slate-600'>
                                                    <div className='flex flex-col gap-1 mb-2 w-full'>
                                                        <label htmlFor="state">State/Province/Region </label>
                                                        <input type="text" className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'
                                                            name='state' id='state' onChange={inputHandler} value={data.state} placeholder='State' required />
                                                    </div>
                                                    <div className='flex flex-col gap-1 mb-2 w-full'>
                                                        <label htmlFor="city">City </label>
                                                        <input type="text" className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'
                                                            name='city' id='city' placeholder='City' onChange={inputHandler} value={data.city} required />
                                                    </div>
                                                </div>
                                                <div className='flex md:flex-col md:gap-2 w-full gap-5 text-slate-600'>
                                                    <div className='flex flex-col gap-1 mb-2 w-full'>
                                                        <label htmlFor="street_address">Street Address </label>
                                                        <input type="text" className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'
                                                            name='street_address' id='street_address' onChange={inputHandler} value={data.street_address} placeholder='Street Address' required />
                                                    </div>
                                                    <div className='flex flex-col gap-1 mt-8 mb-2 w-full'>
                                                        <button className='px-3 py-[6px] rounded-sm hover:shadow-green-500/50 hover:shadow-lg bg-green-500 text-white'>
                                                            Save Changes
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        }
                                        {
                                            res && <div className='flex flex-col gap-1'>
                                                <h2 className='text-slate-600 font-semibold pb-2'>Deliver To</h2>
                                                <p>
                                                    <span className='bg-blue-200 text-blue-800 text-sm font-medium
                                        mr-2 px-2 py-1 rounded'>Home</span>
                                                    <span>{data.street_address}, {data.city}, {data.state}, {data.zip_code}, {data.country} </span>
                                                    <span onClick={() => setRes(false)} className='text-indigo-500 cursor-pointer'>Change</span>
                                                </p>
                                                <p className='text-slate-600 text-sm'>
                                                    Email To example@example.com
                                                </p>
                                            </div>
                                        }
                                    </div>
                                    {
                                        cart_products.map((shop, indexShop) => {
                                            return <div className='flex bg-white p-4 flex-col gap-2' key={indexShop}>
                                                <div className='flex justify-start items-center'>
                                                    <h2 className='text-md text-slate-600 font-bold'>{shop.shopName}</h2>
                                                </div>
                                                {
                                                    shop.products.map((element, index) => {
                                                        return <div key={index} className='w-full flex flex-wrap'>
                                                            <div className='flex sm:w-full gap-2 w-7/12'>
                                                                <div className='flex gap-2 justify-start items-center'>
                                                                    <img className='w-[80px] h-[80px]' src={element.productInfo.images[0]} alt="" />
                                                                    <div className='pr-4 text-slate-600'>
                                                                        <h2 className='text-md font-semibold'>{element.productInfo.name}</h2>
                                                                        <span className='text-sm'>Brand: {element.productInfo.brand}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='flex justify-between sm:mt-3 sm:w-full gap-2 w-5/12'>
                                                                {element.productInfo.discount > 0 ? <div className='pl-4 sm:pl-0'>
                                                                    <h2 className='text-lg text-orange-500'>
                                                                        {formatter.applyDiscountToFormattedCurrency(element.productInfo.price, element.productInfo.discount)}
                                                                    </h2>
                                                                    <p className='line-through'>{formatter.centsToFomattedCurrency(element.productInfo.price)}</p>
                                                                    <p>-{element.productInfo.discount}%</p>
                                                                </div> : <div className='pl-4 sm:pl-0'>
                                                                    <p className='text-lg'>{formatter.centsToFomattedCurrency(element.productInfo.price)}</p>
                                                                </div>}
                                                            </div>
                                                        </div>
                                                    })
                                                }
                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                            <div className='w-[33%] md-lg:w-full'>
                                <div className='pl-3 md-lg:pl-0 md-lg:mt-5'>
                                    {
                                        cart_products.length > 0 && <div className='bg-white p-3 text-slate-600 flex flex-col gap-3'>
                                            <h2 className='text-xl font-bold'>Order Summary</h2>
                                            <div className='flex justify-between items-center'>
                                                <span>Total Items({items})</span>
                                                <span>{formatter.dineroObjectToFomattedCurrency(price)}</span>
                                            </div>
                                            <div className='flex justify-between items-center'>
                                                <span>Shipping Fee</span>
                                                <span>{formatter.dineroObjectToFomattedCurrency(shipping_fee)}</span>
                                            </div>
                                            <div className='flex justify-between items-center'>
                                                <span>Total Payment</span>
                                                <span>{formatter.decimalToFormattedCurrency(toDecimal(add(dinero(price), dinero(shipping_fee))))}</span>
                                            </div>
                                            {/* <div className='flex justify-between items-center'>
                                            <span>Total</span>
                                            <span>$500</span>
                                        </div> */}
                                            <button disabled={res ? false : true} className={`
                                            px-5 py-[6px] rounded-sm hover:shadow-red-500/50 hover:shadow-lg ${res ? 'bg-red-500' : 'bg-red-300'} text-sm
                                                    text-white uppercase`} onClick={placeOrder}>
                                                PLACE ORDER
                                            </button>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        </>
    )
}

export default Shipping