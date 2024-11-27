import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { change_password, messageClear } from '../../store/reducers/authReducer';
import toast from 'react-hot-toast';
import { FadeLoader } from 'react-spinners';

const ChangePassword = () => {
    const { loader, errorMessage, successMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: '',
        old_password: '',
        new_password: '',
        confirm_password: ''
    });

    const inputHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const changePassword = (e) => {
        e.preventDefault();
        dispatch(change_password(formData))
    }

    const [passwordVisibility, setPasswordVisibility] = useState({
        old_password: false,
        new_password: false,
        confirm_password: false,
    });
    const togglePasswordVisibility = (field) => {
        setPasswordVisibility((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };
    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [successMessage, errorMessage]);

    return (
        <>
            {loader && <div className='w-screen h-screen flex justify-center
                items-center fixed left-0 top-0 bg-[#38303033] z-[999]'>
                <FadeLoader />
            </div>}
            <div className="p-4 bg-white">
                <h2 className="text-xl text-slate-600 pb-5">Change Password</h2>
                <form onSubmit={changePassword}>
                    <div className="flex flex-col gap-1 mb-2">
                        <label htmlFor="email">Email</label>
                        <input
                            onChange={inputHandler}
                            value={formData.email}
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            className="outline-none px-3 py-1 border rounded-md text-slate-600"
                            required />
                    </div>
                    {['old_password', 'new_password', 'confirm_password'].map((field, idx) => (
                        <div key={idx} className="flex flex-col gap-1 mb-2 relative">
                            <label htmlFor={field}>
                                {field.replace('_', ' ').replace(/\b\w/g, (char) => char.toUpperCase())}
                            </label>
                            <input
                                type={passwordVisibility[field] ? 'text' : 'password'}
                                onChange={inputHandler}
                                value={formData[field]}
                                name={field}
                                id={field}
                                placeholder={field.replace('_', ' ').replace(/\b\w/g, (char) => char.toUpperCase())}
                                className="outline-none px-3 py-1 border rounded-md text-slate-600"
                                required />
                            <span
                                className="absolute right-3 top-8 cursor-pointer text-gray-500"
                                onClick={() => togglePasswordVisibility(field)}
                            >
                                {passwordVisibility[field] ? '👁️' : '🙈'}
                            </span>
                        </div>
                    ))}
                    {formData.new_password !== formData.confirm_password && (
                        <span className="text-red-500 text-sm">Passwords do not match.</span>
                    )}
                    <div>
                        <button
                            type="submit"
                            className="px-8 py-2 bg-[#059473] shadow-lg hover:shadow-green-500/30 text-white rounded-md"
                            disabled={formData.new_password !== formData.confirm_password}
                        >
                            Update Password
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ChangePassword