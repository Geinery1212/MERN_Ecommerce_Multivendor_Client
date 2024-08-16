import React, { useEffect } from 'react'
import Header from '../components/Header'
import Banner from '../components/Banner'
import Categories from '../components/Categories'
import FeatureProducts from '../components/products/FeatureProducts'
import Products from '../components/products/Products'
import Footer from '../components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { get_categories, get_products } from '../store/reducers/homeReducer'
const Home = () => {
    const { loader, errorMessage, successMessage, categories, products } =
        useSelector(state => state.home);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(get_categories())
        dispatch(get_products())
    }, []);
    return (
        <div className='w-full'>
            <Header categories={categories} />
            <Banner />
            <Categories categories={categories} />
            <div className='py-[45px]'>
                <FeatureProducts />
            </div>
            <div className='py-10'>
                <div className='w-[85%] flex flex-wrap mx-auto'>
                    <div className='grid w-full grid-cols-3 md-lg:grid-cols-2 md:grid-cols-1 gap-7'>
                        <Products title='Latest Product' />
                        <Products title='Top Rated Product' />
                        <Products title='Discount Product' />
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default Home