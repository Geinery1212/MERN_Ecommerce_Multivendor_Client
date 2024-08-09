import React from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import imageProduct1 from '../../assets/images/products/1.webp'
import imageProduct2 from '../../assets/images/products/2.webp'
import imageProduct3 from '../../assets/images/products/3.webp'
import imageProduct4 from '../../assets/images/products/4.webp'
import imageProduct5 from '../../assets/images/products/5.webp'
import imageProduct6 from '../../assets/images/products/6.webp'
import imageProduct7 from '../../assets/images/products/7.webp'
import imageProduct8 from '../../assets/images/products/8.webp'
import { Link } from 'react-router-dom'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
const productImages = [imageProduct1, imageProduct2, imageProduct3, imageProduct4, imageProduct5, imageProduct6, imageProduct7, imageProduct8]
const Products = ({title}) => {
    const products = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7]
    ];
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
    const ButtonGroup = ({next,previous}) => {
        return (
            <div className='flex justify-between items-center'>
                <div className='text-xl font-bold text-slate-600'> {title} </div>
                <div className='flex justify-center items-center gap-3 text-slate-600'>
                    <button onClick={()=>previous()} className='w-[30px] h-[30px] flex justify-center items-center bg-slate-300 border border-slate-200'>
                        <IoIosArrowBack />
                    </button>
                    <button onClick={()=>next()} className='w-[30px] h-[30px] flex justify-center items-center bg-slate-300 border border-slate-200'>
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
                    {products.map((product, i) => (
                        <div className='flex flex-col justify-start gap-2' key={i}>
                            {product.map((element, e) => (
                                <Link key={`${i}-${e}`} className='flex justify-start items-start' to='#'>
                                    <img
                                        src={productImages[element]}
                                        alt={`Product ${element + 1}`}
                                        className='w-[110px] h-[110px]' />
                                    <div className='px-3 flex justify-start items-start gap-1 flex-col text-slate-600'>
                                        <h2>Product Name </h2>
                                        <span className='text-lg font-bold'>$434</span>
                                    </div>

                                </Link>
                            ))}
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    )
}

export default Products