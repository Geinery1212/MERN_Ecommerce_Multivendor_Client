import React from 'react'
import imageProduct1 from '../../assets/images//products/1.webp'
import imageProduct2 from '../../assets/images//products/2.webp'
import imageProduct3 from '../../assets/images//products/3.webp'
import imageProduct4 from '../../assets/images//products/4.webp'
import imageProduct5 from '../../assets/images//products/5.webp'
import imageProduct6 from '../../assets/images//products/6.webp'
import imageProduct7 from '../../assets/images//products/7.webp'
import imageProduct8 from '../../assets/images//products/8.webp'
import { FaEye, FaRegHeart } from 'react-icons/fa'
import { RiShoppingCartLine } from 'react-icons/ri'
import Rating from '../Rating'
import { Link } from 'react-router-dom'

const productImages = [imageProduct1, imageProduct2, imageProduct3, imageProduct4, imageProduct5, imageProduct6, imageProduct7, imageProduct8]
const FeatureProducts = () => {
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
                    [1, 2, 3, 4, 5, 6].map((element, index) => {
                        return <div key={index} className='border group transition-all duration-500 hover:shadow-md hover:-mt-3'>
                            <div className='relative overflow-hidden'>
                                <div className='flex justify-center items-center absolute text-white w-[38px] rounded-full bg-red-500 font-semibold
text-sx left-2 top-2'>
                                    8%
                                </div>
                                <img src={productImages[index]} alt="" className='w-full h-[240px]' />
                                <ul className='flex transition-all duration-700 -bottom-10 justify-center
                                items-center gap-2 absolute w-full group-hover:bottom-3'>
                                    <li className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full
hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all'>
                                        <FaRegHeart />
                                    </li>
                                    <li className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full
hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all'>
                                        <Link to={'/product/details/slug'}><FaEye /></Link>
                                    </li>
                                    <li className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full
hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all'>
                                        <RiShoppingCartLine />
                                    </li>
                                </ul>
                            </div>
                            <div className='py-3 text-slate-600 px-2'>
                                <h2 className='font-bold'>Product Name</h2>
                                <div className='flex justify-start items-center gap-3'>
                                    <span className='text-md font-semibold'>$656</span>
                                    <Rating ratings={3.5}/>
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