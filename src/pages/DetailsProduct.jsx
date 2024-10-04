import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { USD } from '@dinero.js/currencies';
import { IoIosArrowForward } from "react-icons/io";
import { Link, useNavigate, useParams } from 'react-router-dom';
import banner from '../assets/images/banner/shop.png'
import imageProduct1 from '../assets/images/products/1.webp'
import imageProduct2 from '../assets/images/products/2.webp'
import imageProduct3 from '../assets/images/products/3.webp'
import imageProduct4 from '../assets/images/products/4.webp'
import imageProduct5 from '../assets/images/products/5.webp'
import imageProduct6 from '../assets/images/products/6.webp'
import imageProduct7 from '../assets/images/products/7.webp'
import imageProduct8 from '../assets/images/products/8.webp'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css'
import Rating from '../components/Rating';
import { FaFacebook, FaHeart, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import Reviews from '../components/Reviews';
import { FadeLoader } from 'react-spinners';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { get_product_details } from '../store/reducers/homeReducer';
import MyMoney from '../utilities/MyMoney';
import toast from 'react-hot-toast';
import { add_cart, messageClear } from '../store/reducers/cartReducer';
import { add_wishlist, wishListMessageClear } from '../store/reducers/wishlistReducer';
const DetailsProduct = () => {
    const { slug } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formatter = new MyMoney();
    const [quantity, setQuantity] = useState(1);
    const { product, relatedProducts, moreProducts, loader } = useSelector(state => state.home);
    const { productLoader } = useSelector(state => state.product);
    const { errorMessage, successMessage } = useSelector(state => state.cart);
    const { wishlistErrorMessage, wishlistSuccessMessage } =
        useSelector(state => state.wishlist);
    const { userInfo } =
        useSelector(state => state.auth);
    const [selectedImage, setSelectedImage] = useState(0);
    const responsive = {
        superLargeDeskTop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 4
        },
        mdtablet: {
            breakpoint: { max: 991, min: 464 },
            items: 4
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 3
        },
        smmobile: {
            breakpoint: { max: 640, min: 0 },
            items: 3
        },
        xsmobile: {
            breakpoint: { max: 440, min: 0 },
            items: 2
        }
    };
    const discount = 10;
    const stock = 10;
    const [data, setData] = useState('reviews');

    const inc = () => {
        if ((quantity + 1) > product.stock) {
            toast.error("Out of stock");
        } else {
            setQuantity(quantity + 1);
        }
    }

    const desc = () => {
        if ((quantity - 1) < 1) {
            setQuantity(1);
        } else {
            setQuantity(quantity - 1);
        }
    }
    const add_to_cart = (product) => {
        if (userInfo) {
            dispatch(add_cart(
                {
                    userId: userInfo.id,
                    productId: product._id,
                    quantity: 1
                }
            ));
        } else {
            navigate("/login")
        }
    }

    const add_to_wishlist = (product) => {
        if (userInfo) {
            dispatch(add_wishlist({
                productId: product._id,
                name: product.name,
                price: product.price,
                image: product.images.length > 0 ? product.images[0] : '',
                discount: product.discount,
                slug: product.slug
            }
            ));
        } else {
            navigate("/login")
        }
    }

    const redirect_to_shipping = (product) => {
        const obj = [{
            sellerId: product.sellerId,
            shopName: product.shopName,
            price: formatter.applyDiscountToCents(product.price, product.discount) * quantity,
            products: [{
                _id: product._id,
                quantity: quantity,
                productInfo: product
            }],
        }];
        navigate('/shipping', {
            state: {
                cart_products: obj,
                price: formatter.centsToDineroObject(formatter.applyDiscountToCents(product.price, product.discount) * quantity, 2),
                shipping_fee: formatter.centsToDineroObject(50, 2),
                items: 1
            }
        });
    }

    useState(() => {
        dispatch(get_product_details(slug));
    }, []);
    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
        }
    }, [successMessage, errorMessage, dispatch]);

    useEffect(() => {
        if (wishlistErrorMessage) {
            toast.error(wishlistErrorMessage);
            dispatch(wishListMessageClear());
        }
        if (wishlistSuccessMessage) {
            toast.success(wishlistSuccessMessage);
            dispatch(wishListMessageClear());
        }
    }, [wishlistSuccessMessage, wishlistErrorMessage, dispatch]);


    return (
        <div>
            {
                (loader && productLoader) ? <div className='w-screen h-screen flex justify-center
                items-center fixed left-0 top-0 bg-[#38303033] z-[999]'>
                    <FadeLoader />
                </div> : <div>
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
                                    <h2 className='text-3xl font-bold'>Product Details</h2>
                                    <div className='flex justify-center items-center gap-2 text-2xl w-full'>
                                        <div className='flex justify-center items-center gap-2 text-2xl w-full'>
                                            <Link to={'/'}>Home</Link>
                                            <span className='pt-1'>
                                                <IoIosArrowForward />
                                            </span>
                                            <span>Product Details</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* bottom banner */}
                    <section>
                        <div className='bg-slate-100 py-5 mb-5'>
                            <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
                                <div className='flex justify-start items-center text-md text-slate-600 w-full'>
                                    <Link to={'/'}>Home</Link>
                                    <span className='pt-1'><IoIosArrowForward /></span>
                                    <Link to={'/'}>{product.category}</Link>
                                    <span className='pt-1'><IoIosArrowForward /></span>
                                    <Link>{product.name}</Link>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
                            <div className='grid grid-cols-2 md-lg:grid-cols-1 gap-8'>
                                {/* Product carousel */}
                                {product.images != null && <div className='p-5 border'>
                                    <img src={product.images[selectedImage]} alt="" className='h-[400px] w-full' />
                                    <div className='py-2'>
                                        {
                                            product.images && <Carousel
                                                autoPlay={true}
                                                infinite={true}
                                                responsive={responsive}
                                                transitionDuration={500}
                                            >
                                                {
                                                    product.images.map((image, index) => {
                                                        return <div key={index} onClick={() => setSelectedImage(index)}>
                                                            <img className='h-[120px] cursor-pointer' src={product.images[index]} alt={`Banner ${index + 1}`} />
                                                        </div>
                                                    })
                                                }
                                            </Carousel>
                                        }
                                    </div>
                                </div>}
                                {/* Product description/details */}
                                <div className='flex flex-col gap-5 mb-6'>
                                    <div className='text-3xl text-slate-600 font-bold'>
                                        <h3>{product.name}</h3>
                                    </div>
                                    <div className='flex justify-start items-center gap-4'>
                                        <div className='flex text-xl'>
                                            <Rating ratings={product.rating} />
                                        </div>
                                        <span className='text-green-500'>(24 reviews)</span>
                                    </div>
                                    <div className='text-2xl text-red-500 font-bold flex gap-3'>
                                        {
                                            product.discount > 0 ? <>
                                                Price: <h2 className='line-through'>{formatter.centsToFomattedCurrency(product.price)}</h2>
                                                <h2>{formatter.applyDiscountToFormattedCurrency(product.price, product.discount)} (-{product.discount}%)</h2>
                                            </> : <h2>{formatter.centsToFomattedCurrency(product.price)}</h2>
                                        }
                                    </div>
                                    {product.description != null && <div className='text-slate-600'>
                                        {product.description.length < 300 ? <p>
                                            {product.description}
                                        </p> : <p>{product.description.substring(0, 300)}{'...'} </p>}
                                    </div>}
                                    <p className='font-bold'>Shop Name: {product.shopName}</p>
                                    {/* increment, decrease buttons and whilist button */}
                                    <div className='flex gap-3 pb-10 border-b'>
                                        {
                                            stock ? <>
                                                <div className='flex bg-slate-200 h-[50px] justify-center items-center text-xl'>
                                                    <div className='px-6 cursor-pointer' onClick={desc}>-</div>
                                                    <div className='px-6 cursor-pointer'>{quantity}</div>
                                                    <div className='px-6 cursor-pointer' onClick={inc}>+</div>
                                                </div>
                                                <div>
                                                    <button onClick={() => add_to_cart(product)} className='px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-green-500/40 bg-[#059473] text-white flex items-center justify-center sm:text-sm'>
                                                        <span>Add To Card</span>
                                                    </button>
                                                </div>
                                            </> : ''
                                        }
                                        <div onClick={() => add_to_wishlist(product)} className='h-[50px] w-[50px] flex justify-center items-center cursor-pointer hover:shadow-lg hover:shadow-cyan-500/40 bg-cyan-500 text-white'>
                                            <FaHeart />
                                        </div>
                                    </div>
                                    {/* stock and social */}
                                    <div className='flex py-5 gap-5'>
                                        <div className='w-[150px] text-black font-bold text-xl flex flex-col gap-5'>
                                            <span>Availability</span>
                                            <span>Share On</span>
                                        </div>
                                        <div className='flex flex-col gap-5'>
                                            <span className={`text-${product.stock ? 'green' : 'red'}-500`}>
                                                {stock ? `In Stock (${product.stock})` : 'Out of Stock'}
                                            </span>
                                            {/* social network buttons */}
                                            <ul className='flex justify-start items-center gap-3'>
                                                <li>
                                                    <a className='w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-indigo-500 rounded-full text-white' href='#'>
                                                        <FaFacebook />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className='w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-cyan-500 rounded-full text-white' href='#'>
                                                        <FaTwitter />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className='w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-pink-500 rounded-full text-white' href='#'>
                                                        <FaInstagram />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className='w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-blue-500 rounded-full text-white' href='#'>
                                                        <FaLinkedin />
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className='flex gap-3 '>
                                        {
                                            product.stock ?
                                                <button className='px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-green-500/40
                                    bg-[#247462] text-white' onClick={() => redirect_to_shipping(product)}>Buy Know</button> : ''
                                        }
                                        <Link to={`/dashboard/chat/${product.sellerId}`} className='px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-red-500/40 bg-red-500 text-white'>
                                            Chat Seller</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto pb-16'>
                            <div className='flex flex-wrap'>
                                <div className='w-[72%] md-lg:w-full'>
                                    <div className='pr-4 md-lg:pr-0'>
                                        <div className='grid grid-cols-2'>
                                            <button onClick={() => setData('reviews')} className={`py-1 hover:text-white px-5 hover:bg-[#059473]
                                    ${data === 'reviews' ? 'bg-[#059473] text-white' : 'bg-slate-200 text-slate-700'}`}>
                                                Reviews
                                            </button>
                                            <button onClick={() => setData('description')} className={`py-1 hover:text-white px-5 hover:bg-[#059473]
                                    ${data === 'description' ? 'bg-[#059473] text-white' : 'bg-slate-200 text-slate-700'}`}>
                                                Description
                                            </button>
                                        </div>
                                        <div>
                                            {
                                                data === 'reviews' ? <Reviews product={product} /> :
                                                    <p className='py-5 text-slate-600'>
                                                        {product.description}
                                                    </p>
                                            }
                                        </div>
                                    </div>
                                </div>
                                {/* Easy shop products */}
                                <div className='w-[28%] md-lg:w-full'>
                                    <div className='pl-4 md-lg:pl-0'>
                                        <div className='px-3 py-2 text-slate-600 bg-slate-200'>
                                            <h2 className='font-bold'>From {product.shopName}</h2>
                                        </div>
                                        <div className='flex flex-col gap-5 mt-3 border p-3'>
                                            {moreProducts.map((element) => (
                                                <Link className='block' key={element._id}>
                                                    <div className='relative h-[270px]'>
                                                        <img src={element.images[0]} alt="" className='w-full h-full' />
                                                        {element.discount > 0 && (
                                                            <div className='flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2'>
                                                                {element.discount}%
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className='py-3 text-slate-600 px-2'>
                                                        <h2 className='font-bold w-full whitespace-normal break-words'>
                                                            {element.name}
                                                        </h2>
                                                        <div className='flex justify-start items-center gap-3'>
                                                            <span className='text-md font-semibold'>
                                                                {element.discount > 0
                                                                    ? formatter.centsToFomattedCurrency(element.price)
                                                                    : formatter.applyDiscountToFormattedCurrency(element.price, element.discount)}
                                                            </span>
                                                            <Rating ratings={element.rating} />
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>
                    <section>
                        <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto pb-16'>
                            <h1 className='text-2xl py-8 text-slate-600'>Related Products</h1>
                            <div>
                                <Swiper
                                    spaceBetween={25}
                                    slidesPerView={'auto'}
                                    pagination={
                                        {
                                            clickable: true,
                                            el: '.custom_bullet'
                                        }
                                    }
                                    modules={[Pagination]}
                                    className='mySwiper'
                                    loop={true}
                                    breakpoints={{
                                        1280: {
                                            slidesPerView: 3
                                        },
                                        565: {
                                            slidesPerView: 2
                                        }
                                    }}

                                >
                                    {
                                        relatedProducts.map((element, index) => {
                                            return <SwiperSlide key={index}>
                                                <Link className='block'>
                                                    <div className='relative h-[270px]'>
                                                        <div className='w-full h-full'>
                                                            <img src={element.images[0]} alt="" className='w-full h-full' />
                                                            <div className='absolute h-full w-full top-0 left-0 bg-[#000] opacity-25
                                                hover:opacity-50 transition-all duration-500'>
                                                            </div>
                                                            {
                                                                element.discount > 0 && <div className='flex justify-center items-center absolute text-white
                                                    w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2'>
                                                                    {element.discount}%                                                        </div>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className='py-3 text-slate-600 px-2'>
                                                        <h2 className='font-bold w-full whitespace-normal break-words'>{element.name}</h2>
                                                        <div className='flex justify-start items-center gap-3'>
                                                            <span className='text-md font-semibold'>{element.discount > 0 ? formatter.centsToFomattedCurrency(element.price) : formatter.applyDiscountToFormattedCurrency(element.price, element.discount)}</span>
                                                            <Rating ratings={element.rating} />
                                                        </div>
                                                    </div>

                                                </Link>
                                            </SwiperSlide>
                                        })
                                    }


                                </Swiper>
                            </div>
                            <div className='w-full flex justify-center items-center py-8'>
                                <div className='custom_bullet justify-center gap-3 !w-auto'>

                                </div>
                            </div>
                        </div>
                    </section>
                    <Footer />
                </div>
            }
        </div>
    )
}

export default DetailsProduct