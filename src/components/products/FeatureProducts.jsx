import React from 'react'
import { FaEye, FaRegHeart } from 'react-icons/fa'
import { RiShoppingCartLine } from 'react-icons/ri'
import Rating from '../Rating'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { add_cart } from '../../store/reducers/cartReducer'
import MyMoney from '../../utilities/MyMoney';
import { add_wishlist} from '../../store/reducers/wishlistReducer'
const FeatureProducts = ({ products }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const formatter = new MyMoney();
    const { userInfo } =
        useSelector(state => state.auth);
    
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
            dispatch(add_wishlist(
                {
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
    return (
        <div className='w-[85%] flex flex-wrap mx-auto'>
            <div className='w-full'>
                <div className='text-center flex justify-center items-center
                flex-col text-4xl text-slate-600 font-bold relative pb-[45px]'>
                    <h2>Feature Products</h2>
                    <div className='w-[100px] h-[2px] bg-[#059473] mt-4'></div>
                </div>
            </div>
            <div className='w-full grid grid-cols-4 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6'>
                {
                    (products && products.length > 0) && products.map((product, index) => {
                        return <div key={index} className='border group transition-all duration-500 hover:shadow-md hover:-mt-3'>
                            <div className='relative overflow-hidden'>
                                {product.discount > 0 &&
                                    <div className='flex justify-center items-center absolute text-white w-[38px] rounded-full bg-red-500 font-semiboldtext-sx left-2 top-2'>
                                        {product.discount}%
                                    </div>
                                }
                                <img src={product.images[0]} alt="" className='w-full h-[240px]' />
                                <ul className='flex transition-all duration-700 -bottom-10 justify-center
                                items-center gap-2 absolute w-full group-hover:bottom-3'>
                                    <li className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full
hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all' onClick={() => add_to_wishlist(product)}>
                                        <FaRegHeart />
                                    </li>
                                    <Link to={`/product/details/${product.slug}`}><li className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full
hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all'>
                                        <FaEye />
                                    </li></Link>
                                    <li onClick={() => add_to_cart(product)} className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full
hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all'>
                                        <RiShoppingCartLine />
                                    </li>
                                </ul>
                            </div>
                            <div className='py-3 text-slate-600 px-2'>
                                <h2 className='font-bold w-full whitespace-normal break-words'>{product.name}</h2>
                                <div className='flex justify-start items-center gap-3'>
                                    <span className='text-md font-semibold'>{product.discount > 0 ? formatter.centsToFomattedCurrency(product.price) : formatter.applyDiscountToFormattedCurrency(product.price, product.discount)}</span>
                                    <Rating ratings={product.rating} />
                                </div>
                            </div>
                        </div>

                    })
                }
            </div>
        </div>
    )
}

export default FeatureProducts