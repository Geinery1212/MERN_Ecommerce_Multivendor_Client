import React, { useEffect } from 'react';
import { FaEye, FaRegHeart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import Rating from '../Rating';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { get_wishlist, delete_wishlist, wishListMessageClear } from '../../store/reducers/wishlistReducer';
import MyMoney from '../../utilities/MyMoney';
import toast from 'react-hot-toast';
const WishList = () => {
    const dispatch = useDispatch();
    const formatter = new MyMoney();
    const { wishlist, wishlistErrorMessage, wishlistSuccessMessage } =
        useSelector(state => state.wishlist);
    useEffect(() => {
        dispatch(get_wishlist());
    }, [dispatch, wishlist]);

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
                    (wishlist != null && wishlist.length > 0) ? <div className='w-full grid grid-cols-4 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6'> {wishlist.map((p, i) => <div key={i} className='border group transition-all duration-500 hover:shadow-md hover:-mt-3 bg-white'>
                        <div className='relative overflow-hidden'>


                            {p.discount > 0 && <div className='flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2'>{p.discount}% </div>}


                            {p.image.length > 0 && <img className='sm:w-full w-full h-[240px]' src={p.image} alt="" />}

                            <ul className='flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3'>
                                <li onClick={() => dispatch(delete_wishlist(p._id))} className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all'>
                                    <FaRegHeart />
                                </li>
                                <Link to={`/product/details/${p.slug}`} className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all'>
                                    <FaEye />
                                </Link>
                                <li className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all'>
                                    <RiShoppingCartLine />
                                </li>
                            </ul>
                        </div>

                        <div className='py-3 text-slate-600 px-2'>
                            <h2 className='font-bold'>{p.name}</h2>
                            <div className='flex justify-start items-center gap-3'>

                                {p.discount > 0 ? <span className='text-md font-semibold'>{formatter.applyDiscountToFormattedCurrency(p.price, p.discount)}</span> : <span className='text-md font-semibold'>{formatter.centsToFomattedCurrency(p.price)}</span>}
                                <div className='flex'>
                                    <Rating ratings={5} />
                                </div>

                            </div>
                        </div>
                    </div>)}</div> : <div className="font-bold py-2 h-[255px] flex justify-center items-center text-gray-600 bg-gray-100 rounded-md shadow-lg">
                        No items in your wishlist
                    </div>

                }
            </div>    
    );
};

export default WishList;