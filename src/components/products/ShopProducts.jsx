import React from 'react';
import imageProduct1 from '../../assets/images/products/1.webp'
import imageProduct2 from '../../assets/images/products/2.webp'
import imageProduct3 from '../../assets/images/products/3.webp'
import imageProduct4 from '../../assets/images/products/4.webp'
import imageProduct5 from '../../assets/images/products/5.webp'
import imageProduct6 from '../../assets/images/products/6.webp'
import imageProduct7 from '../../assets/images/products/7.webp'
import imageProduct8 from '../../assets/images/products/8.webp'
import { FaEye, FaRegHeart } from 'react-icons/fa';
import { RiShoppingCartLine } from 'react-icons/ri';
import Rating from '../Rating';
const productImages = [imageProduct1, imageProduct2, imageProduct3, imageProduct4, imageProduct5, imageProduct6, imageProduct7, imageProduct8]
const ShopProducts = ({ styles }) => {
    return (
        <div className={`w-full grid ${styles === 'grid' ? 'grid-cols-3 md-lg:grid-cols-2 md:grid-cols-2' : 'grid-cols-1 md-lg:grid-cols-2 md:grid-cols-2'} gap-3 `}>
            {
                [1, 2, 3, 4, 5, 6, 7, 8].map((element, index) => <div key={index} className={`flex transition-all duration-1000 hover:shadow-md hover:-translate-y-3 ${styles === 'grid' ? 'flex-col justify-start items-start' : 'justify-start items-center md-lg:flex-col md-lg:justify-start md-lg:items-start'} w-full gap-4 bg-white p-1 rounded-md`}>

                    <div className={styles === 'grid' ? 'w-full relative group h-[210px] md:h-[270px] xs:h-[170px] overflow-hidden' : 'md-lg:w-full relative group h-[210px] md:h-[270px] overflow-hidden'}>
                        <img className='h-[240px] rounded-md md:h-[270px] xs:h-[170px] w-full object-fill' src={productImages[index]} alt="" />

                        <ul className='flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3'>
                            <li className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all'>
                                <FaRegHeart />
                            </li>
                            <li className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all'>
                                <FaEye />
                            </li>
                            <li className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all'>
                                <RiShoppingCartLine />
                            </li>
                        </ul>
                    </div>

                    <div className='flex justify-start items-start flex-col gap-1'>
                        <h2 className='font-bold'>Product Name </h2>
                        <div className='flex justify-start items-center gap-3'>
                            <span className='text-md font-semibold'>$656</span>
                            <div className='flex'>
                                <Rating ratings={4.5} />
                            </div>

                        </div>
                    </div>


                </div>

                )
            }

        </div>
    );
};

export default ShopProducts;