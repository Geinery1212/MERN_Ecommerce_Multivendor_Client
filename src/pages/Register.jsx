import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { FaFacebookF, FaGoogle } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import loginImage from '../assets/images/login.jpg'
const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const inputHandler = (e)=>{        
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const register = (e)=>{
        e.preventDefault();
        console.log(formData);
    }
    return (
        <div>
            <Header />
            <div className='bg-slate-200 mt-4'>
                <div className='w-full justify-center items-center p-10'>
                    <div className='grid grid-cols-2 w-[60%] mx-auto bg-white rounded-md'>
                        {/*  Form*/}
                        <div className='px-8 py-8'>
                            <h2 className='text-center w-full text-xl text-slate-600 font-bold mb-4'>Register</h2>
                            <div>
                                <form className='text-slate-600' onSubmit={register}>
                                    <div className='flex flex-col gap-1 mb-2'>
                                        <label htmlFor="name">Name</label>
                                        <input type="text" name='name' id='name' value={formData.name} onChange={inputHandler} placeholder='Name' className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md' required />
                                    </div>
                                    <div className='flex flex-col gap-1 mb-2'>
                                        <label htmlFor="email">Email</label>
                                        <input type="email" name='email' id='email' value={formData.email} onChange={inputHandler} placeholder='Email' className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md' required />
                                    </div>
                                    <div className='flex flex-col gap-1 mb-2'>
                                        <label htmlFor="password">Password</label>
                                        <input type="password" name='password' id='password' value={formData.password} onChange={inputHandler} placeholder='Password' className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md' required />
                                    </div>
                                    <button className='px-8 w-full py-2 bg-[#059473] shadow-lg hover:shadow-green-500/40 text-white rounded-md'>
                                        Register
                                    </button>
                                </form>
                                <div className='flex justify-center items-center py-2'>
                                    <div className='h-[1px] bg-slate-300 w-[95%]'></div>
                                    <span className='px-3 text-slate-600'>Or</span>
                                    <div className='h-[1px] bg-slate-300 w-[95%]'></div>
                                </div>
                                <button className='px-8 w-full py-2 bg-blue-600 shadow hover:shadow-blue-600/50 text-white rounded-md flex justify-center items-center gap-2 mb-3'>
                                    <span><FaFacebookF /></span>
                                    <span>Register With Facebook</span>
                                </button>
                                <button className='px-8 w-full py-2 bg-red-500 shadow hover:shadow-red-500/50 text-white rounded-md flex justify-center items-center gap-2 mb-3'>
                                    <span><FaGoogle /></span>
                                    <span>Register With Google</span>
                                </button>
                            </div>
                            <div className='text-center text-slate-600 pt-1'>
                                <p>You already have an account? <Link to={'/login'} className='text-blue-500'>Login</Link></p>
                            </div>
                        </div>
                        <div className='w-full h-full py-4 pr-4'>
                            <img src={loginImage} alt="" className='w-full h-full' />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Register