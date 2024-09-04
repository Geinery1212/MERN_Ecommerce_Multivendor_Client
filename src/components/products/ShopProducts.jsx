import React from 'react';
import { FaEye, FaRegHeart } from 'react-icons/fa';
import { RiShoppingCartLine } from 'react-icons/ri';
import Rating from '../Rating';
import { useSelector } from 'react-redux';
import MyMoney from '../../utilities/MyMoney';
const ShopProducts = ({ styles }) => {
    const formatter = new MyMoney();
    const { products } =
        useSelector(state => state.home);
    return (
        <div className={`w-full grid ${styles === 'grid' ? 'grid-cols-3 md-lg:grid-cols-2 md:grid-cols-2' : 'grid-cols-1 md-lg:grid-cols-2 md:grid-cols-2'} gap-3`}>
            {products && products.length > 0 && products.map((product, index) => (
                <div key={index} className={`flex transition-all duration-1000 hover:shadow-md hover:-translate-y-3 ${styles === 'grid' ? 'flex-col justify-start items-start' : 'justify-start items-center md-lg:flex-col md-lg:justify-start md-lg:items-start'} w-full gap-4 bg-white p-1 rounded-md overflow-hidden`}>

                    <div className={`${styles === 'grid' ? 'w-full' : 'md-lg:w-full'} relative group h-[210px] md:h-[270px] overflow-hidden`}>
                        <img className='h-[240px] rounded-md md:h-[270px] xs:h-[170px] w-full object-fill' src={product.images[0]} alt={product.name} />

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

                    <div className='flex flex-col justify-start items-start gap-1 w-full overflow-hidden'>
                        <h2 className='font-bold w-full overflow-hidden text-ellipsis whitespace-wrap'>{product.name}</h2>
                        <div className='flex justify-start items-center gap-3'>
                            <span className='text-md font-semibold'>{formatter.centsToCurrency(product.price)}</span>
                            <div className='flex'>
                                <Rating ratings={product.rating} />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ShopProducts;