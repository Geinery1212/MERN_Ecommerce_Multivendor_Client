import React from 'react'
import Carousel from 'react-multi-carousel'
import { Link } from 'react-router-dom'
import 'react-multi-carousel/lib/styles.css'
// Import images Banner
import bannerImg1 from '../assets/images/banner/1.jpg'
import bannerImg2 from '../assets/images/banner/2.jpg'
import bannerImg3 from '../assets/images/banner/3.jpg'
import bannerImg4 from '../assets/images/banner/4.jpg'
import bannerImg5 from '../assets/images/banner/5.jpg'
import bannerImg6 from '../assets/images/banner/6.jpg'

const bannerImages = [bannerImg1, bannerImg2, bannerImg3, bannerImg4, bannerImg5, bannerImg6]

const Banner = () => {
    const responsive = {
        superLargeDeskTop: {
            breakpoint: {max: 4000, min: 3000},
            items: 1
        },
        desktop: {
            breakpoint: {max: 3000, min: 1024},
            items: 1
        },
        tablet: {
            breakpoint: {max: 1024, min: 464},
            items: 1
        },
        mobile: {
            breakpoint: {max: 464, min: 0},
            items: 1
        }
    };
    return (
        <div className='w-full md:mt-6'>
            <div className='w-[85%] lg:w-[90%] mx-auto'>
                <div className='w-full flex flex-wrap gap-8'>
                    <div className='w-full'>
                        <div className='my-8'>
                            <Carousel
                                autoPlay={true}
                                infinite={true}
                                arrows={true}
                                showDots={true}
                                responsive={responsive}
                            >
                                {
                                    bannerImages.map((image, index) => {
                                        return <Link key={index} to="#">
                                            <img src={image} alt={`Banner ${index + 1}`} />
                                        </Link>
                                    })
                                }
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner
