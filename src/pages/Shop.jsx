import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import banner from '../assets/images/banner/shop.png'
import { Link } from 'react-router-dom'
import { IoIosArrowForward } from "react-icons/io";
import { Range } from 'react-range'
import { AiFillStar } from 'react-icons/ai'
import { CiStar } from 'react-icons/ci'
import Products from '../components/products/Products'
import { BsFillGridFill } from 'react-icons/bs'
import { FaThList } from 'react-icons/fa'
import ShopProducts from '../components/products/ShopProducts'
import Pagination from '../components/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import { price_range_product, filter_products } from '../store/reducers/homeReducer'
import { FadeLoader } from 'react-spinners'

const Shop = () => {
    const dispatch = useDispatch();

    const { totalProducts, categories, priceRange, latest_products, loader } =
        useSelector(state => state.home);
    const [filter, setFilter] = useState(true);
    const [range, setRange] = useState({ values: [priceRange.min, priceRange.max] });
    const [rating, setRating] = useState('');
    const [styles, setStyles] = useState('grid');
    const [perPage, setPerPage] = useState(12)
    const [pageNumber, setPageNumber] = useState(1)
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortPrice, setSortPrice] = useState('');
    useEffect(() => {
        dispatch(price_range_product());
    }, []);

    useEffect(() => {
        if (priceRange.min > 0 && priceRange.max > 0) {
            setRange({ values: [priceRange.min, priceRange.max] });
        }
    }, [priceRange]);

    const queryCategory = (e, value) => {
        if (e.target.checked) {
            setSelectedCategory(value);
        } else {
            setSelectedCategory('');
        }
    }
    useEffect(() => {
        dispatch(filter_products(
            {
                min: range.values[0],
                max: range.values[1],
                category: selectedCategory,
                rating,
                sortPrice,
                pageNumber
            }
        ))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [range.values[0], range.values[1], selectedCategory, rating, sortPrice, pageNumber]);

    return (
        <>
            {loader && <div className='w-screen h-screen flex justify-center
                items-center fixed left-0 top-0 bg-[#38303033] z-[999]'>
                <FadeLoader />
            </div>}
            <div>
                <Header />
                {/* banner */}
                <section
                    style={{
                        backgroundImage: `url(${banner})`,
                        height: '220px',
                        marginTop: '1.5rem',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'left'
                    }}
                    className="relative"
                >
                    <div className='absolute left-0 top-0 w-full h-full bg-[#2422228a]'>
                        <div className='w-[85%] md:w-[80%] sm:w-[90%] h-full mx-auto'>
                            <div className='flex flex-col justify-center gap-1 items-center h-full w-full text-white'>
                                <h2 className='text-3xl font-bold'>Shop Page</h2>
                                <div className='flex justify-center items-center gap-2 text-2xl w-full'>
                                    <div className='flex justify-center items-center gap-2 text-2xl w-full'>
                                        <Link to={'/'}>Home</Link>
                                        <span className='pt-1'>
                                            <IoIosArrowForward />
                                        </span>
                                        <span>Shop</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='py-16'>
                    <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
                        <div className={`md:block hidden ${!filter ? 'mb-6' : 'mb-0'}`}>
                            <button onClick={() => setFilter(!filter)} className='text-center w-full py-2 px-3
                        bg-indigo-500 text-white'>Filter Product</button>
                        </div>
                        <div className='w-full flex flex-wrap'>
                            <div className={`w-3/12 md-lg:w-4/12 md:w-full pr-8 ${filter ? 'md:h-0 md:overflow-hidden md:mb-6' : 'md:h-auto md:overflow-auto md:mb-0'}`}>
                                {/* Category */}
                                <div className='py-2'>
                                    <h2 className='text-3xl font-bold mb-3 text-slate-600'>Category</h2>
                                    {
                                        categories.map((category, index) => {
                                            return <div className='flex justify-start items-center gap-2 py-1' key={index}>
                                                <input checked={selectedCategory === category.name ? true : false} type="checkbox" id={category._id} onChange={(e) => queryCategory(e, category.name)
                                                } />
                                                <label htmlFor={category._id} className='text-slate-600 block cursor-pointer'>{category.name}</label>
                                            </div>
                                        })
                                    }
                                </div>
                                {/* Price range */}
                                {(priceRange.min && priceRange.max && priceRange.min > 0 && priceRange.max > 0 && range.values[0] > 0 && range.values[1] > 0) && <div className='py-2 flex flex-col gap-5'>
                                    <h2 className='text-3xl font-bold mb-3 text-slate-600'>Price</h2>
                                    <Range
                                        step={5}
                                        min={priceRange.min}
                                        max={priceRange.max}
                                        values={range.values}
                                        onChange={(values) => setRange({ values })}
                                        renderTrack={({ props, children }) => (
                                            <div {...props} className="w-full h-[6px] bg-slate-200 rounded-full cursor-pointer">
                                                {children}
                                            </div>
                                        )}
                                        renderThumb={({ props }) => (
                                            <div {...props} key={props.key} className="w-[15px] h-[15px] bg-[#059473] rounded-full"></div>
                                        )}
                                    />
                                    <span className='text-slate-800 font-bold text-lg'>${Math.floor(range.values[0])} - {Math.floor(range.values[1])}</span>
                                </div>
                                }
                                {/* Rating */}
                                <div className='py-3 flex flex-col gap-4'>
                                    <h2 className='text-3xl font-bold mb-3 text-slate-600'>Rating</h2>
                                    <div className='flex flex-col gap-3'>
                                        <div onClick={() => setRating(5)} className='text-orange-500 flex justify-start items-start gap-2 text-xl
cursor-pointer'>
                                            <span><AiFillStar /></span>
                                            <span><AiFillStar /></span>
                                            <span><AiFillStar /></span>
                                            <span><AiFillStar /></span>
                                            <span><AiFillStar /></span>
                                        </div>
                                        <div onClick={() => setRating(4)} className='text-orange-500 flex justify-start items-start gap-2 text-xl
cursor-pointer'>
                                            <span><AiFillStar /></span>
                                            <span><AiFillStar /></span>
                                            <span><AiFillStar /></span>
                                            <span><AiFillStar /></span>
                                            <span><CiStar /></span>
                                        </div>
                                        <div onClick={() => setRating(3)} className='text-orange-500 flex justify-start items-start gap-2 text-xl
cursor-pointer'>
                                            <span><AiFillStar /></span>
                                            <span><AiFillStar /></span>
                                            <span><AiFillStar /></span>
                                            <span><CiStar /></span>
                                            <span><CiStar /></span>
                                        </div>
                                        <div onClick={() => setRating(2)} className='text-orange-500 flex justify-start items-start gap-2 text-xl
cursor-pointer'>
                                            <span><AiFillStar /></span>
                                            <span><AiFillStar /></span>
                                            <span><CiStar /></span>
                                            <span><CiStar /></span>
                                            <span><CiStar /></span>
                                        </div>
                                        <div onClick={() => setRating(1)} className='text-orange-500 flex justify-start items-start gap-2 text-xl
cursor-pointer'>
                                            <span><AiFillStar /></span>
                                            <span><CiStar /></span>
                                            <span><CiStar /></span>
                                            <span><CiStar /></span>
                                            <span><CiStar /></span>
                                        </div>
                                        <div onClick={() => setRating('')} className='text-orange-500 flex justify-start items-start gap-2 text-xl
cursor-pointer'>
                                            <span><CiStar /></span>
                                            <span><CiStar /></span>
                                            <span><CiStar /></span>
                                            <span><CiStar /></span>
                                            <span><CiStar /></span>
                                        </div>
                                    </div>
                                </div>
                                {/* Latest products */}
                                <div className='py-5 flex flex-col gap-4 md:hidden'>
                                    <Products title='Latest Product' products={latest_products} />
                                </div>
                            </div>
                            <div className='w-9/12 md-lg:w-8/12 md:w-full'>
                                <div className='pl-8 md:pl-0'>
                                    <div className='py-4 bg-white mb-10 px-3 rounded-md flex justify-between items-start border'>
                                        <h2 className='text-lg font-medium text-slate-600'>({totalProducts}) Products</h2>
                                        <div className='flex justify-center items-center gap-3'>
                                            <select className='p-1 border outline-0 text-slate-600 font-semibold' onChange={(e) => setSortPrice(e.target.value)}>
                                                <option value="">Sort By</option>
                                                <option value="low-to-high">Low to High Price</option>
                                                <option value="high-to-low">High to Low Price</option>
                                            </select>
                                            <div className='flex justify-center items-start gap-4 md-lg:hidden'>
                                                <div onClick={() => setStyles('grid')} className={`p-2 ${styles === 'grid' && 'bg-slate-300'} text-slate-600 hover:bg-slate-300
    cursor-pointer rounded-sm`}>
                                                    <BsFillGridFill />
                                                </div>
                                                <div onClick={() => setStyles('list')} className={`p-2 ${styles === 'list' && 'bg-slate-300'} text-slate-600 hover:bg-slate-300
    cursor-pointer rounded-sm`}>
                                                    <FaThList />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='pb-8'>
                                        <ShopProducts styles={styles} />
                                    </div>
                                    <div>
                                        {totalProducts > 0 && <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} totalItems={totalProducts} perPage={perPage} showItem={Math.floor(totalProducts / perPage)} />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        </>
    )
}

export default Shop
