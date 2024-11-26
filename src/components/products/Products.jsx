import React from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { Link } from 'react-router-dom'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import MyMoney from '../../utilities/MyMoney';
const Products = ({ title, products }) => {
    const formatter = new MyMoney();
    const responsive = {
        superLargeDeskTop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 1
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    const ButtonGroup = ({ next, previous }) => {
        return (
            <div className='flex justify-between items-center'>
                <div className='text-xl font-bold text-slate-600'> {title} </div>
                <div className='flex justify-center items-center gap-3 text-slate-600'>
                    <button onClick={() => previous()} className='w-[30px] h-[30px] flex justify-center items-center bg-slate-300 border border-slate-200'>
                        <IoIosArrowBack />
                    </button>
                    <button onClick={() => next()} className='w-[30px] h-[30px] flex justify-center items-center bg-slate-300 border border-slate-200'>
                        <IoIosArrowForward />

                    </button>
                </div>

            </div>
        )

    }
    return (
        <div className='overflow-hidden'>
            <div className='flex gap-8 flex-col-reverse'>
                <Carousel
                    autoPlay={false}
                    infinite={false}
                    arrows={false}
                    responsive={responsive}
                    transitionDuration={500}
                    renderButtonGroupOutside={true}
                    customButtonGroup={<ButtonGroup />}
                >
                    {products && products.length > 0 && products.map((product, i) => (
                        <div className='flex flex-col justify-start gap-2' key={i}>
                            {product.map((element, e) => (
                                <Link key={`${i}-${e}`} className='flex justify-start items-start flex-shrink-0' to={`/product/details/${element.slug}`}>
                                    <div className='relative overflow-hidden w-[110px] h-[110px] flex-shrink-0'>
                                        {element.discount > 0 && (
                                            <div className='flex justify-center items-center absolute text-white w-[38px] rounded-full bg-red-500 font-semibold text-xs left-0 top-0'>
                                                {element.discount}%
                                            </div>
                                        )}
                                        <img
                                            src={element.images[0]}
                                            alt={element.name}
                                            className='w-full h-full object-cover'
                                        />
                                    </div>
                                    <div className='px-3 flex justify-start items-start gap-1 flex-col text-slate-600'>
                                        <h2 className='text-sm font-semibold break-words'>{element.name}</h2>
                                        <span className='text-lg font-bold'>
                                            {element.discount > 0
                                                ? formatter.applyDiscountToFormattedCurrency(element.price, element.discount)
                                                : formatter.centsToFomattedCurrency(element.price)}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );    
}

export default Products