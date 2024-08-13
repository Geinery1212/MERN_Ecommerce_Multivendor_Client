import React from 'react'
import logo from '../assets/images/logo.png';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
const Footer = () => {
    return (
        <footer className='bg-[#f3f6fa] w-full'>
            <div className='w-[85%] flex flex-wrap mx-auto border-b py-16 md-lg:pb-10 sm:pb-6'>
                <div className='w-3/12 lg:w-4/12 sm:w-full'>
                    <div className='flex flex-col gap-3'>
                        <img className='w-[190px] h-[70px]' src={logo} alt="Logo" />
                        <ul className='flex flex-col gap-2 text-slate-600'>
                            <li>1234 Elm Street, Apt. 567, Springfield, IL 62704, USA</li>
                            <li>Phone: (54) 123 123 3232</li>
                            <li>Email: support@gmail.com</li>
                        </ul>
                    </div>
                </div>
                <div className='w-5/12 lg:w-8/12 sm:w-full'>
                    <div className='flex justify-center sm:justify-start sm:mt-6 w-full'>
                        <div>
                            <h2 className='font-bold text-lg mb-2'>Usefull Links</h2>
                            <div className='flex justify-between gap-[80px] lg:gap-[40px]'>
                                <ul className='flex flex-col gap-2 text-slate-600 text-sm font-semibold'>
                                    <li>
                                        <Link>About us</Link>
                                    </li>
                                    <li>
                                        <Link>About Our Shop</Link>
                                    </li>
                                    <li>
                                        <Link>Delivery Information</Link>
                                    </li>
                                    <li>
                                        <Link>Blog</Link>
                                    </li>
                                </ul>
                                <ul className='flex flex-col gap-2 text-slate-600 text-sm font-semibold'>
                                    <li>
                                        <Link>Our Service</Link>
                                    </li>
                                    <li>
                                        <Link>Company Profile</Link>
                                    </li>
                                    <li>
                                        <Link>Delivery Information</Link>
                                    </li>
                                    <li>
                                        <Link>Blog</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-4/12 lg:w-full lg:mt-6'>
                    <div className='w-full flex flex-col justify-start gap-5'>
                        <h2 className='font-bold text-lg mb-2'>Join Our Shop</h2>
                        <span>Get Email updates about offers and discounts </span>
                        <div className='h-[50px] w-full bg-white border relative'>
                            <input type="text" className='h-full bg-transparent w-full px-3 outline-0' placeholder='Enter Your Email' />
                            <button className='h-full absolute right-0 bg-[#059473] text-white uppercase px-4 font-bold text-sm'>Suscribe</button>
                        </div>
                        <ul className='flex justify-start items-center gap-3'>
                            <li>
                                <a href="#" className='w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-white rounded-full'>
                                    <FaFacebookF />
                                </a>
                            </li>
                            <li>
                                <a href="#" className='w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-white rounded-full'>
                                    <FaLinkedin />
                                </a>
                            </li>
                            <li>
                                <a href="#" className='w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-white rounded-full'>
                                    <FaInstagram />
                                </a>
                            </li>
                            <li>
                                <a href="#" className='w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-white rounded-full'>
                                    <FaTwitter />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='w-[90%] fkex flex-wrap justify-center items-center text-slate-600 mx-auto py-5 text-center'>
                <span>2024 EasyShop. All Rights Reserved.</span>
            </div>
        </footer>
    )
}

export default Footer