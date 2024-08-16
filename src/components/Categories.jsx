import React from 'react'
import Carousel from 'react-multi-carousel'
import { Link } from 'react-router-dom'
import 'react-multi-carousel/lib/styles.css'
// Import images Banner
import categoryImg1 from '../assets/images//products/1.webp'
import categoryImg2 from '../assets/images//products/2.webp'
import categoryImg3 from '../assets/images//products/3.webp'
import categoryImg4 from '../assets/images//products/4.webp'
import categoryImg5 from '../assets/images//products/5.webp'
import categoryImg6 from '../assets/images//products/6.webp'
import categoryImg7 from '../assets/images//products/7.webp'
import categoryImg8 from '../assets/images//products/8.webp'

const bannerImages = [categoryImg1, categoryImg2, categoryImg3, categoryImg4, categoryImg5, categoryImg6, categoryImg7, categoryImg8]

const Categories = () => {
        const responsive = {
        superLargeDeskTop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 6
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 6
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
    const categories = [
        'Technology',
        'Health',
        'Finance',
        'Education',
        'Entertainment',
        'Travel',
        'Food & Drink',
        'Sports'
        // 'Lifestyle',
        // 'Science',
        // 'Art & Culture',
        // 'Business',
        // 'Politics',
        // 'Environment',
        // 'Gaming'
    ];
    return (
        <div className='w-[87%] mx-auto relative'>
            <div className='w-full'>
                <div className='text-center flex justify-center items-center
                flex-col text-3xl text-slate-600 font-bold relative pb-[35px]'>
                    <h2>Top Category</h2>
                    <div className='w-[100px] h-[2px] bg-[#059473] mt-4'></div>
                </div>
            </div>
            <Carousel
                autoPlay={true}
                infinite={true}
                arrows={true}
                responsive={responsive}
                transitionDuration={500}
            >
                {
                    bannerImages.map((image, index) => {
                        return <Link key={index} to="#" className='h-[185px] border block'>
                            <div className='w-full h-full relative p-3'>
                                <img src={image} alt={`Banner ${index + 1}`} />
                                <div className='absolute bottom-6 w-full mx-auto font-bold left-0 flex justify-center items-center'>
                                    <span className='py-[2px] px-6 bg-[#33303305d] text-white'>{categories[index]}</span>
                                </div>
                            </div>
                        </Link>
                    })
                }
            </Carousel>
        </div>

    )
}

export default Categories
