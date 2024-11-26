import React from 'react'
import Header from '../components/Header'
import Banner from '../components/Banner'
import Categories from '../components/Categories'
import FeatureProducts from '../components/products/FeatureProducts'
import Products from '../components/products/Products'
import Footer from '../components/Footer'
import { useSelector } from 'react-redux'
import { FadeLoader } from 'react-spinners'
const Home = ({ categories }) => {
    const { loader, products, latest_products,
        topRated_products,
        discount_products } =
        useSelector(state => state.home);
    return (
        <>
            {loader && <div className='w-screen h-screen flex justify-center
                items-center fixed left-0 top-0 bg-[#38303033] z-[999]'>
                <FadeLoader />
            </div>}
            <div className='w-full'>
                <Header />
                <Banner />
                <Categories />
                <div className='py-[45px]'>
                    <FeatureProducts products={products} />
                </div>
                <div className='py-10'>
                    <div className='w-[85%] flex flex-wrap mx-auto'>
                        <div className='grid w-full grid-cols-3 md-lg:grid-cols-2 md:grid-cols-1 gap-7'>
                            <Products title='Latest Product' products={latest_products} />
                            <Products title='Top Rated Product' products={topRated_products} />
                            <Products title='Discount Product' products={discount_products} />
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default Home