import React, { useEffect, useState } from 'react';
import Rating from './Rating';
import RatingTemp from './RatingTemp';
import Pagination from './Pagination';
import { Link } from 'react-router-dom';
import RatingReact from 'react-rating'
import { FaStar } from 'react-icons/fa';
import { CiStar } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { get_reviews, productMessageClear, save_review } from '../store/reducers/productReducer';

const Reviews = ({ product }) => {
    const dispatch = useDispatch();
    const [perPage, setPerPage] = useState(5);
    const [pageNumber, setPageNumber] = useState(1);
    const { userInfo } = useSelector(state => state.auth);
    const { reviews, totalReviews, ratingReviews } = useSelector(state => state.product);
    const { productErrorMessage, productSuccessMessage } = useSelector(state => state.product);

    const [rating, setRating] = useState('');
    const [review, setReview] = useState('');
    const saveReview = (e) => {
        e.preventDefault();
        if (rating > 0) {
            let obj = {
                userName: userInfo.name,
                productId: product._id,
                review,
                rating
            }
            dispatch(save_review(obj));

        } else {
            toast('Rate the product first', {
                icon: '⚠️',
            });
        }
    }

    useEffect(() => {
        if (productErrorMessage) {
            toast.error(productErrorMessage);
            dispatch(productMessageClear());
        }
        if (productSuccessMessage) {
            setRating('');
            setReview('');
            toast.success(productSuccessMessage);
            dispatch(productMessageClear());
        }
    }, [dispatch, productErrorMessage, productSuccessMessage]);

    useEffect(() => {
        if (product != null && product._id != null) {
            dispatch(get_reviews({
                productId: product._id,
                pageNumber: pageNumber
            }));
        }

    }, [product, pageNumber]);

    return (
        <div className='mt-8'>
            {/* Rating */}
            <div className='flex gap-10 md-lg:flex-col'>
                <div className='flex flex-col gap-2 justify-start items-start py-4'>
                    <div>
                        <span className='text-6xl font-semibold'>{product.rating}</span>
                        <span className='text-3xl font-semibold text-slate-600'>/5</span>
                    </div>
                    <div className='flex text-3xl'>
                        <Rating ratings={product.rating} />
                    </div>
                    <p className='text-sm text-slate-600'>{totalReviews} Reviews</p>
                </div>
                <div className='flex gap-2 flex-col py-4'>
                    <div className='flex justify-start items-center gap-5'>
                        <div className='text-md flex gap-1 w-[93px]'>
                            <RatingTemp rating={5} />
                        </div>
                        <div className='w-[200px] h-[14px] bg-slate-200 relative'>
                            <div
                                className='h-full bg-[#Edbb0E]'
                                style={{ width: `${(ratingReviews[0]?.sum / totalReviews) * 100}%` }}
                            >
                            </div>
                        </div>
                        <p className='text-sm text-slate-600'>{ratingReviews[0]?.sum}</p>
                    </div>

                    <div className='flex justify-start items-center gap-5'>
                        <div className='text-md flex gap-1 w-[93px]'>
                            <RatingTemp rating={4} />
                        </div>
                        <div className='w-[200px] h-[14px] bg-slate-200 relative'>
                            <div
                                className='h-full bg-[#Edbb0E]'
                                style={{ width: `${(ratingReviews[1]?.sum / totalReviews) * 100}%` }}
                            >
                            </div>
                        </div>
                        <p className='text-sm text-slate-600'>{ratingReviews[1]?.sum}</p>
                    </div>

                    <div className='flex justify-start items-center gap-5'>
                        <div className='text-md flex gap-1 w-[93px]'>
                            <RatingTemp rating={3} />
                        </div>
                        <div className='w-[200px] h-[14px] bg-slate-200 relative'>
                            <div
                                className='h-full bg-[#Edbb0E]'
                                style={{ width: `${(ratingReviews[2]?.sum / totalReviews) * 100}%` }}
                            >
                            </div>
                        </div>
                        <p className='text-sm text-slate-600'>{ratingReviews[2]?.sum}</p>
                    </div>

                    <div className='flex justify-start items-center gap-5'>
                        <div className='text-md flex gap-1 w-[93px]'>
                            <RatingTemp rating={2} />
                        </div>
                        <div className='w-[200px] h-[14px] bg-slate-200 relative'>
                            <div
                                className='h-full bg-[#Edbb0E]'
                                style={{ width: `${(ratingReviews[3]?.sum / totalReviews) * 100}%` }}
                            >
                            </div>
                        </div>
                        <p className='text-sm text-slate-600'>{ratingReviews[3]?.sum}</p>
                    </div>

                    <div className='flex justify-start items-center gap-5'>
                        <div className='text-md flex gap-1 w-[93px]'>
                            <RatingTemp rating={1} />
                        </div>
                        <div className='w-[200px] h-[14px] bg-slate-200 relative'>
                            <div
                                className='h-full bg-[#Edbb0E]'
                                style={{ width: `${(ratingReviews[4]?.sum / totalReviews) * 100}%` }}
                            >
                            </div>
                        </div>
                        <p className='text-sm text-slate-600'>{ratingReviews[4]?.sum}</p>
                    </div>

                    <div className='flex justify-start items-center gap-5'>
                        <div className='text-md flex gap-1 w-[93px]'>
                            <RatingTemp rating={0} />
                        </div>
                        <div className='w-[200px] h-[14px] bg-slate-200 relative'>
                            <div className='h-full bg-[#Edbb0E] w-[0%]'>
                            </div>
                        </div>
                        <p className='text-sm text-slate-600'>0</p>
                    </div>

                </div>
            </div>
            {/* Reviews with pagination */}
            <h2 className='text-slate-600 text-xl font-bold py-5'>Product Review ({totalReviews})</h2>
            <div className='flex flex-col gap-8 pb-10 pt-4'>
                {
                    reviews.map((r, i) => <div key={i} className='flex flex-col gap-1'>
                        <div className='flex justify-between items-center'>
                            <div className='flex gap-1 text-xl'>
                                <RatingTemp rating={r.rating} />
                            </div>
                            <span className='text-slate-600'>{r.date}</span>
                        </div>
                        <span className='text-slate-600 text-md'>{r.userName}</span>
                        <p className='text-slate-600 text-sm'>{r.review}</p>
                    </div>
                    )
                }
                <div className='flex justify-end'>
                    {
                        <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} totalItems={totalReviews} perPage={perPage} showItem={Math.floor(totalReviews / perPage)} />
                    }
                </div>
            </div>

            <div>
                {
                    userInfo ? <div className='flex flex-col gap-3'>
                        <div className='flex gap-1'>
                            <RatingReact
                                onChange={(e) => setRating(e)}
                                initialRating={rating}
                                emptySymbol={<span className='text-slate-600 text-4xl'><CiStar /></span>}
                                fullSymbol={<span className='text-[#Edbb0E] text-4xl'><FaStar /></span>}
                            />
                        </div>
                        <form onSubmit={saveReview}>
                            <textarea required value={review} onChange={(e) => setReview(e.target.value)} className='border outline-0 p-3 w-full' name="" id="" cols="30" rows="5"></textarea>
                            <div className='mt-2'>
                                <button className='py-1 px-5 bg-indigo-500 text-white rounded-sm'>Submit</button>
                            </div>
                        </form>


                    </div> : <div>
                        <Link to='/login' className='py-1 px-5 bg-red-500 text-white rounded-sm'> Login First </Link>
                    </div>
                }
            </div>




        </div>
    );
};

export default Reviews;