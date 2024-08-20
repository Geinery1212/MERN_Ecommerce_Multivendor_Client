import React, { useEffect } from 'react'
import Header from '../components/Header'
import Banner from '../components/Banner'
import Categories from '../components/Categories'
import FeatureProducts from '../components/products/FeatureProducts'
import Products from '../components/products/Products'
import Footer from '../components/Footer'
import { useSelector } from 'react-redux'
const Home = ({categories}) => {
    const {products, latest_products,
        topRated_products,
        discount_products } =
        useSelector(state => state.home);    
    return (
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
    )
}

export default Home