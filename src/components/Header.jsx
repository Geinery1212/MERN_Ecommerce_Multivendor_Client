import React, { useState } from 'react'
import { FaFacebook, FaHeart, FaInstagram, FaLinkedin, FaList, FaLock, FaPhoneAlt, FaTwitter, FaUser } from 'react-icons/fa'
import { IoIosArrowDown, IoMdArrowDropdown, IoMdPhonePortrait } from 'react-icons/io'
import { MdEmail } from 'react-icons/md'
import languagePng from '../assets/images/language.png'
import logo from '../assets/images/logo.png';
import { Link, useLocation } from 'react-router-dom'
import { FaCartShopping } from 'react-icons/fa6'
const Header = () => {
    const { pathname } = useLocation();
    const user = true;
    const [showSidebar, setShowSidebar] = useState(true);
    const [categoryShow, setCategoryShow] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const [category, setCategory] = useState('');
    const wishlist_count = 1;
    const cart_count = 5;
    const categories = [
        'Technology',
        'Health',
        'Finance',
        'Education',
        'Entertainment',
        'Travel',
        'Food & Drink',
        'Sports',
        'Lifestyle',
        'Science',
        'Art & Culture',
        'Business',
        'Politics',
        'Environment',
        'Gaming'
    ];
    return (
        <div className='w-full bg-white'>
            <div className='header-top bg-[#caddff] md-lg:hidden'>
                {/* header top bar */}
                <div className='w-[85%] lg:w-[90%] mx-auto'>
                    <div className='flex w-full justify-between items-center h-[50px] text-slate-500'>
                        {/* phone number and email */}
                        <ul className='flex justify-start items-center gap-8 font-semibold text-black'>
                            <li className='flex relative justify-center items-center gap-2 text-sm after:absolute after:h-[18px] after:w-[1px]
after:bg-[#afafaf] after:-right-[16px]'>
                                <span><MdEmail /></span>
                                <span>support@gmail.com</span>
                            </li>
                            <li className='flex relative justify-center items-center gap-2 text-sm'>
                                <span><IoMdPhonePortrait /></span>
                                <span>+(54) 123 123 3232</span>
                            </li>
                        </ul>
                        {/* social network, dropdown, user */}
                        <div>
                            <div className='flex justify-center items-center gap-10'>
                                <div className='flex justify-center items-center gap-4 text-black'>
                                    <a href="#"><FaFacebook /></a>
                                    <a href="#"><FaTwitter /></a>
                                    <a href="#"><FaInstagram /></a>
                                    <a href="#"><FaLinkedin /></a>
                                </div>
                                <div className='flex group cursor-pointer text-slate-800 text-sm justify-center
items-center gap-1 relative after:absolute after:h-[18px] after:w-[1px]
after:bg-[#afafaf] after:-right-[16px] before:absolute before:h-[18px] before:w-[1px]
before:bg-[#afafaf] before:-left-[20px]'>
                                    <img src={languagePng} alt="" />
                                    <span>
                                        <IoMdArrowDropdown />
                                    </span>
                                    <ul className='absolute invisible transition-all top-12 rounded-sm duration-200
                                    text-white p-2 w-[100px] flex flex-col gap-3 group-hover:visible group-hover:top-6
                                        group-hover:bg-black z-10'>
                                        <li>English</li>
                                        <li>Spanish</li>
                                    </ul>
                                </div>
                                {
                                    !user ?
                                        <Link className='flex cursor-pointer justify-center items-center gap-2 text-sm text-black' to={'/dashboard'}>
                                            <span><FaUser /></span>
                                            <span>Ervin Diaz</span>
                                        </Link>
                                        : <Link className='flex cursor-pointer justify-center items-center gap-2 text-sm text-black' to={'/dashboard'}>
                                            <span><FaLock /></span>
                                            <span>Login</span>
                                        </Link>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full'>
                <div className='w-[85%] lg:w-[90%] mx-auto'>
                    <div className='h-[80px] md-lg:h-[100px] flex justify-between
                    items-center flex-wrap'>
                        {/* logo and hamburger menu */}
                        <div className='md-lg:w-full w-3/12 md-lg:pt-4'>
                            <div className='flex justify-between items-center'>
                                <Link to={'/'}>
                                    <img src={logo} alt="" />
                                </Link>
                                <div className='justify-center items-center w-[30px]
                        h-[30px] bg-white text-slate-600 border border-slate-600
                        rounded-sm cursor-pointer lg:hidden md-lg:flex xl:hidden hidden'
                                    onClick={() => setShowSidebar(false)}>
                                    <span><FaList /></span>
                                </div>
                            </div>
                        </div>
                        {/* desktop - menu, wishlist and cart icon */}
                        <div className='md-lg:w-full w-9/12'>
                            <div className='flex justify-between md-lg:justify-center items-center
                        flex-wrap pl-8'>
                                {/* menu */}
                                <ul className='flex justify-start items-start gap-8 text-sm font-bold
                            uppercase md-lg:hidden'>
                                    <li>
                                        <Link className={`p-2 block ${pathname === '/' ? 'text-[#059473]'
                                            : 'text-slate-600'
                                            }`}>Home</Link>
                                    </li>
                                    <li>
                                        <Link className={`p-2 block ${pathname === '/shop' ? 'text-[#059473]'
                                            : 'text-slate-600'
                                            }`}>Shop</Link>
                                    </li>
                                    <li>
                                        <Link className={`p-2 block ${pathname === '/blog' ? 'text-[#059473]'
                                            : 'text-slate-600'
                                            }`}>Blog</Link>
                                    </li>
                                    <li>
                                        <Link className={`p-2 block ${pathname === '/about' ? 'text-[#059473]'
                                            : 'text-slate-600'
                                            }`}>About us</Link>
                                    </li>
                                    <li>
                                        <Link className={`p-2 block ${pathname === '/contact' ? 'text-[#059473]'
                                            : 'text-slate-600'
                                            }`}>Contact us</Link>
                                    </li>
                                </ul>
                                {/* wishlist and cart */}
                                <div className='flex md-lg:hidden justify-center items-center gap-5'>
                                    <div className='flex justify-center gap-5'>
                                        <div className='relative flex justify-center items-center
                                            cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]'>
                                            <span className='text-xl text-green-500'><FaHeart /></span>
                                            <div className='w-[20px] h-[20px] absolute bg-red-500 rounded-full
                                            text-white flex justify-center items-center -top-[3px] -right-[5px]'>
                                                {
                                                    wishlist_count
                                                }
                                            </div>
                                        </div>
                                        <div className='relative flex justify-center items-center
                                            cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]'>
                                            <span className='text-xl text-green-500'><FaCartShopping /></span>
                                            <div className='w-[20px] h-[20px] absolute bg-red-500 rounded-full
                                            text-white flex justify-center items-center -top-[3px] -right-[5px]'>
                                                {
                                                    cart_count
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* mobile menu */}
                        <div className='hidden md-lg:block'>
                            <div onClick={() => setShowSidebar(true)} className={`fixed duration-200 transition-all ${showSidebar ? 'invisible' : 'visible'}
    hidden md-lg:block w-screen h-screen bg-[rgba(0,0,0,0.5)] top-0 left-0 z-20`}>
                            </div>
                            <div className={`w-[300px] z-[999] transition-all duration-200 fixed ${showSidebar ? '-left-[300px]' : 'left-0 top-0'}
    overflow-y-auto bg-white h-screen py-6 px-8`}>
                                <div className='flex justify-start flex-col gap-6
                                    '>
                                    {/* icon */}
                                    <Link to={'/'}>
                                        <img src={logo} alt="" />
                                    </Link>
                                    {/* Language and user */}
                                    <div className='flex justify-start items-center gap-10'>
                                        <div className='flex group cursor-pointer text-slate-800 text-sm justify-center
items-center gap-1 relative after:absolute after:h-[18px] after:w-[1px]
after:bg-[#afafaf] after:-right-[16px]'>
                                            <img src={languagePng} alt="" />
                                            <span>
                                                <IoMdArrowDropdown />
                                            </span>
                                            <ul className='absolute invisible transition-all top-12 rounded-sm duration-200
                                    text-white p-2 w-[100px] flex flex-col gap-3 group-hover:visible group-hover:top-6
                                        group-hover:bg-black z-10'>
                                                <li>English</li>
                                                <li>Spanish</li>
                                            </ul>
                                        </div>
                                        {
                                            !user ?
                                                <Link className='flex cursor-pointer justify-center items-center gap-2 text-sm text-black' to={'/dashboard'}>
                                                    <span><FaUser /></span>
                                                    <span>Ervin Diaz</span>
                                                </Link>
                                                : <Link className='flex cursor-pointer justify-center items-center gap-2 text-sm text-black' to={'/dashboard'}>
                                                    <span><FaLock /></span>
                                                    <span>Login</span>
                                                </Link>
                                        }
                                    </div>
                                    {/* Menu */}
                                    <ul className='flex flex-col justify-start items-start text-sm font-bold
                            uppercase'>
                                        <li>
                                            <Link className={`py-2 block ${pathname === '/' ? 'text-[#059473]'
                                                : 'text-slate-600'
                                                }`}>Home</Link>
                                        </li>
                                        <li>
                                            <Link className={`py-2 block ${pathname === '/shop' ? 'text-[#059473]'
                                                : 'text-slate-600'
                                                }`}>Shop</Link>
                                        </li>
                                        <li>
                                            <Link className={`py-2 block ${pathname === '/blog' ? 'text-[#059473]'
                                                : 'text-slate-600'
                                                }`}>Blog</Link>
                                        </li>
                                        <li>
                                            <Link className={`py-2 block ${pathname === '/about' ? 'text-[#059473]'
                                                : 'text-slate-600'
                                                }`}>About us</Link>
                                        </li>
                                        <li>
                                            <Link className={`py-2 block ${pathname === '/contact' ? 'text-[#059473]'
                                                : 'text-slate-600'
                                                }`}>Contact us</Link>
                                        </li>
                                    </ul>
                                    {/* Social network */}
                                    <div className='flex justify-start items-center gap-4 text-black'>
                                        <a href="#"><FaFacebook /></a>
                                        <a href="#"><FaTwitter /></a>
                                        <a href="#"><FaInstagram /></a>
                                        <a href="#"><FaLinkedin /></a>
                                    </div>
                                    {/* phone support */}
                                    <div className='w-full flex justify-end md-lg:justify-start gap-3 items-center'>
                                        <div className='w-[48px] h-[48px] rounded-full flex bg-[#f5f5f5] justify-center items-center'>
                                            <span><FaPhoneAlt /></span>
                                        </div>
                                        <div className='flex flex-col justify-end gap-1'>
                                            <h2 className='text-sm font-medium text-slate-700'>+(54) 123 123 3232</h2>
                                            <span className='text-xs'>Support 24/7</span>
                                        </div>
                                    </div>
                                    {/* email support */}
                                    <ul className='flex flex-col justify-start items-start gap-3 text-[#1c1c1c]'>
                                        <li className='flex justify-start items-center gap-2 text-sm'>
                                            <span><MdEmail /></span>
                                            <span>support@gmail.com</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='w-[85%] lg:w-[90%] mx-auto'>
                            <div className='flex w-full flex-wrap md-lg:gap-8'>
                                {/* categories dropdown */}
                                <div className='w-3/12 md-lg:w-full'>
                                    <div className='bg-white relative'>
                                        <div className='h-[50px] bg-[#059473]
                                        text-white flex justify-center md-lg:justify-between md-lg:px-6
                                        items-center gap-3 font-bold text-md cursor-pointer' onClick={() => setCategoryShow(!categoryShow)}>
                                            <div className='flex justify-center items-center gap-3'>
                                                <span><FaList /></span>
                                                <span>All Category</span>
                                            </div>
                                            <span className='pt-1'><IoIosArrowDown /></span>
                                        </div>
                                        <div className={`${categoryShow ? 'h-0' : 'h-[400px]'} overflow-hidden transition-all md-lg:relative duration-500
                                            absolute z-[9999] bg-[#dbf3ed] w-full border-x`}>
                                            <ul className='py-2 text-slate-600 font-medium'>
                                                {
                                                    categories.length > 0 && categories.map((element, index) => {
                                                        return <li key={index} className='flex justify-start items-center gap-2 px-[24px] py-[6px]'>
                                                            <Link className='text-sm block'>{element}</Link></li>
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-9/12 md-lg:pl-0 md-lg:w-full pl-8'>
                                    <div className='flex flex-wrap w-full justify-between items-center md-lg:gap-6'>
                                        <div className='w-8/12 md-lg:w-full'>
                                            <div className='flex border h-[50px] items-center relative gap-6'>
                                                <div className='relative after:absolute after:h-[25px] after:w-[1px] after:bg-[#afafaf] after:-right-[15px] md:hidden'>
                                                    <select name="" id="" className='w-[150px] text-slate-600 font-semibold bg-transparent px-2 h-full outline-0 border-none' onChange={(e) => setCategory(e.target.value)}>
                                                        <option value="">Select Category</option>
                                                        {
                                                            categories.length > 0 && categories.map((element, index) => {
                                                                return <option value={element} key={index}>{element}</option>
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                                <input type="text" onChange={(e) => setSearchValue(e.target.value)} placeholder='What do you need?' className='w-full relative bg-transparent
                                                text-slate-500 outline-0 px-3 h-full' />
                                                <button className='bg-[#059473] right-0 absolute px-8 h-full font-semibold uppercase text-white'>
                                                    Search
                                                </button>
                                            </div>
                                        </div>
                                        <div className='w-4/12 block md-lg:hidden pl-2 md-lg:w-full md-lg:pl-0'>
                                            {/* phone support */}
                                            <div className='w-full flex justify-end md-lg:justify-start gap-3 items-center'>
                                                <div className='w-[48px] h-[48px] rounded-full flex bg-[#f5f5f5] justify-center items-center'>
                                                    <span><FaPhoneAlt /></span>
                                                </div>
                                                <div className='flex flex-col justify-end gap-1'>
                                                    <h2 className='text-md font-medium text-slate-700'>+(54) 123 123 3232</h2>
                                                    <span className='text-sm'>Support 24/7</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header