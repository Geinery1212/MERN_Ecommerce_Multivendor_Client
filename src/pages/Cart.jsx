import React, { useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link, useNavigate } from 'react-router-dom'
import { IoIosArrowForward } from "react-icons/io";
import banner from '../assets/images/banner/shop.png'
import { useDispatch, useSelector } from 'react-redux';
import { get_cart_products, delete_cart_product, messageClear, quantity_inc, quantity_dec } from '../store/reducers/cartReducer';
import { dinero, toDecimal, add } from 'dinero.js';
import MyMoney from '../utilities/MyMoney';
import toast from 'react-hot-toast';
const Cart = () => {
    const formatter = new MyMoney();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userInfo } =
        useSelector(state => state.auth);
    const { successMessage,
        errorMessage,
        cart_products,
        cart_products_count,//All the products, even if they are out of stock
        wishlist,
        wishlist_count,
        price,//Total price with discount applied, if there is
        shipping_fee,
        outofstock_products,
        buy_product_items } =
        useSelector(state => state.cart);
    const out_of_stock = [1, 2];
    const redirect_to_shipping = () => {
        navigate('/shipping', {
            state: {
                cart_products,
                price: price,
                shipping_fee: shipping_fee,
                items: buy_product_items
            }
        });
    }
    const inc = (quantity, stock, cartId) => {
        // console.log(quantity, stock, cartId)
        let temp = quantity + 1;
        if (temp <= stock) {
            dispatch(quantity_inc(cartId));
        } else {
            toast('There is no more in stock!', {
                icon: '⚠️',
            });
        }
    }

    const dec = (quantity, stock, cartId) => {
        let temp = quantity - 1;
        if (temp > 0) {
            dispatch(quantity_dec(cartId));
        } else {
            dispatch(delete_cart_product(cartId));
        }
    }
    useEffect(() => {
        if (userInfo) {
            dispatch(get_cart_products(userInfo.id));
        }
    }, []);
    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
            dispatch(get_cart_products(userInfo.id));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [successMessage, errorMessage]);
    return (
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
                            <h2 className='text-3xl font-bold'>Cart Page</h2>
                            <div className='flex justify-center items-center gap-2 text-2xl w-full'>
                                <div className='flex justify-center items-center gap-2 text-2xl w-full'>
                                    <Link to={'/'}>Home</Link>
                                    <span className='pt-1'>
                                        <IoIosArrowForward />
                                    </span>
                                    <span>Cart</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='bg-[#eeeeee]'>
                <div className='w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16'>
                    {
                        cart_products.length > 0 || out_of_stock > 0
                            ? <div className='flex flex-wrap'>
                                <div className='w-[67%] md-lg:w-full'>
                                    <div className='pr-3 md-lg:pr-0'>
                                        <div className='flex flex-col gap-3'>
                                            <div className='bg-white p-4'>
                                                <h2 className='text-md text-green-500 font-semibold'>Stock Products {buy_product_items}</h2>
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
                                                                        <div className='flex flex-col gap-2'>
                                                                            <div className='flex bg-slate-200 h-[30px] justify-center items-center text-xl'>
                                                                                <div className='px-3 cursor-pointer' onClick={() => dec(element.quantity, element.productInfo.stock, element._id)}>-</div>
                                                                                <div className='px-3'>{element.quantity}</div>
                                                                                <div className='px-3 cursor-pointer' onClick={() => inc(element.quantity, element.productInfo.stock, element._id)} >+</div>
                                                                            </div>
                                                                            <button className='px-5 py-[3px] bg-red-500 text-white' onClick={() => dispatch(delete_cart_product(element._id))}>Delete</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            })
                                                        }
                                                    </div>
                                                })
                                            }
                                            {
                                                outofstock_products.length > 0 && <div className='flex flex-col gap-3'>
                                                    <div className='bg-white p-4'>
                                                        <h2 className='text-md text-red-500 font-semibold'>Out Of Stock {outofstock_products.length}</h2>
                                                    </div>
                                                    <div className='flex bg-white p-4 flex-col gap-2'>
                                                        {
                                                            outofstock_products.map((element, index) => {
                                                                return <div key={index} className='w-full flex flex-wrap'>
                                                                    <div className='flex sm:w-full gap-2 w-7/12'>
                                                                        <div className='flex gap-2 justify-start items-center'>
                                                                            <img className='w-[80px] h-[80px]' src={element.products[0].images[0]} alt="" />
                                                                            <div className='pr-4 text-slate-600'>
                                                                                <h2 className='text-md font-semibold'>{element.products[0].name}</h2>
                                                                                <span className='text-sm'>Brand: {element.products[0].brand}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className='flex justify-between sm:mt-3 sm:w-full gap-2 w-5/12'>
                                                                        {element.products[0].discount > 0 ? <div className='pl-4 sm:pl-0'>
                                                                            <h2 className='text-lg text-orange-500'>
                                                                                {formatter.applyDiscountToFormattedCurrency(element.products[0].price, element.products[0].discount)}
                                                                            </h2>
                                                                            <p className='line-through'>{formatter.centsToFomattedCurrency(element.products[0].price)}</p>
                                                                            <p>-{element.products[0].discount}%</p>
                                                                        </div> : <div className='pl-4 sm:pl-0'>
                                                                            <p className='text-lg'>{formatter.centsToFomattedCurrency(element.products[0].price)}</p>
                                                                        </div>}
                                                                        <div className='flex flex-col gap-2'>
                                                                            <div className='flex bg-slate-200 h-[30px] justify-center items-center text-xl'>
                                                                                <div className='px-3 cursor-pointer' onClick={() => dec(element.quantity, element.products[0].stock, element._id)}>-</div>
                                                                                <div className='px-3'>{element.quantity}</div>
                                                                                <div className='px-3 cursor-pointer'>+</div>
                                                                            </div>
                                                                            <button className='px-5 py-[3px] bg-red-500 text-white' onClick={() => dispatch(delete_cart_product(element._id))}>Delete</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className='w-[33%] md-lg:w-full'>
                                    <div className='pl-3 md-lg:pl-0 md-lg:mt-5'>
                                        {
                                            cart_products.length > 0 && <div className='bg-white p-3 text-slate-600 flex flex-col gap-3'>
                                                <h2 className='text-xl font-bold'>Order Summary</h2>
                                                <div className='flex justify-between items-center'>
                                                    <span>{buy_product_items} Items</span>
                                                    <span>{formatter.dineroObjectToFomattedCurrency(price)}</span>
                                                </div>
                                                <div className='flex justify-between items-center'>
                                                    <span>Shipping Fee</span>
                                                    <span>{formatter.dineroObjectToFomattedCurrency(shipping_fee)}</span>
                                                </div>
                                                <div className='flex gap-2'>
                                                    <input type="text" className='w-full px-3 py-2 border border-slate-200 outline-0 focus:border-green-500 rounded-sm'
                                                        placeholder='Enter Your Coupon' />
                                                    <button className='px-5 py-[1px] bg-[#059473] text-white rounded-sm uppercase text-sm'>
                                                        Apply
                                                    </button>
                                                </div>
                                                <div className='flex justify-between items-center'>
                                                    <span>Total</span>
                                                    <span className='text-lg text-[#059473]'>{formatter.decimalToFormattedCurrency(toDecimal(add(dinero(price), dinero(shipping_fee))))}</span>
                                                </div>
                                                <button onClick={redirect_to_shipping} className='px-5 py-[6px] rounded-sm hover:shadow-red-500/50 hover:shadow-lg bg-red-500 text-sm
                                                    text-white uppercase'>
                                                    Process to Checkout
                                                </button>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                            : <div>
                                <Link className='px-4 py-1 bg-indigo-500 text-white' to={'/shop'}>Shop Now</Link>
                            </div>
                    }
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Cart