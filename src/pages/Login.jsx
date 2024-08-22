import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { FaFacebookF, FaGoogle } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import loginImage from '../assets/images/login.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { customer_login, messageClear } from '../store/reducers/authReducer'
import toast from 'react-hot-toast'
import { FadeLoader } from 'react-spinners'
const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loader, errorMessage, successMessage, userInfo } =
        useSelector(state => state.auth);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const inputHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const login = (e) => {
        e.preventDefault();
        dispatch(customer_login(formData));
    }

    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());            
        }
        if(userInfo){
            navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [successMessage, errorMessage]);
    return (
        <div>
            <Header />
            {
                loader && <div className='w-screen h-screen flex justify-center
                items-center fixed left-0 top-0 bg-[#38303033] z-[999]'>
                    <FadeLoader />
                </div>
            }
            <div className='bg-slate-200 mt-4'>
                <div className='w-full justify-center items-center p-10'>
                    <div className='grid md-lg:grid-cols-1 grid-cols-2 sm:w-[100%] w-[60%] mx-auto bg-white rounded-md'>
                        {/*  Form*/}
                        <div className='px-8 py-8'>
                            <h2 className='text-center w-full text-xl text-slate-600 font-bold mb-4'>Login</h2>
                            <div>
                                <form className='text-slate-600' onSubmit={login}>
                                    <div className='flex flex-col gap-1 mb-2'>
                                        <label htmlFor="email">Email</label>
                                        <input type="email" name='email' id='email' value={formData.email} onChange={inputHandler} placeholder='Email' className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md' required />
                                    </div>
                                    <div className='flex flex-col gap-1 mb-2'>
                                        <label htmlFor="password">Password</label>
                                        <input type="password" name='password' id='password' value={formData.password} onChange={inputHandler} placeholder='Password' className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md' required />
                                    </div>
                                    <button className='px-8 w-full py-2 bg-[#059473] shadow-lg hover:shadow-green-500/40 text-white rounded-md'>
                                        Login
                                    </button>
                                </form>
                                <div className='flex justify-center items-center py-2'>
                                    <div className='h-[1px] bg-slate-300 w-[95%]'></div>
                                    <span className='px-3 text-slate-600'>Or</span>
                                    <div className='h-[1px] bg-slate-300 w-[95%]'></div>
                                </div>
                                <button className='px-8 w-full py-2 bg-blue-600 shadow hover:shadow-blue-600/50 text-white rounded-md flex justify-center items-center gap-2 mb-3'>
                                    <span><FaFacebookF /></span>
                                    <span>Login With Facebook</span>
                                </button>
                                <button className='px-8 w-full py-2 bg-red-500 shadow hover:shadow-red-500/50 text-white rounded-md flex justify-center items-center gap-2 mb-3'>
                                    <span><FaGoogle /></span>
                                    <span>Login With Google</span>
                                </button>
                            </div>
                            <div className='text-center text-slate-600 pt-1'>
                                <p>You don´t have an account? <Link to={'/register'} className='text-blue-500'>Register</Link></p>
                            </div>
                        </div>
                        <div className='w-full h-full py-4 md-lg:px-4 pr-4'>
                            <img src={loginImage} alt="" className='w-full h-full' />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Login