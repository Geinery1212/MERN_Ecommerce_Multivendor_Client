import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const Orders = () => {
    const [state, setState] = useState('all');
    return (
        <div className='bg-white p-4 rounded-md'>
            <div className='flex justify-between items-center'>
                <h2 className='text-xl font-semibold text-slate-600'>My Orders</h2>
                <select className='outline-none px-3 py-1 border rounded-md text-slate-600' value={state} onChange={(e) => setState(e.target.value)}>
                    <option value="all">--order status--</option>
                    <option value="placed">Placed</option>
                    <option value="peding">Pending</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="warehouse">Warehouse</option>
                </select>
            </div>
            <div className='pt-4'>
                <div className='relative overflow-x-auto'>
                    <table className='w-full text-sm text-left text-gray-500'>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-200'>
                            <tr>
                                <th scope='col' className='px-6 py-3'>
                                    Order Id
                                </th>
                                <th scope='col' className='px-6 py-3'>
                                    Price
                                </th>
                                <th scope='col' className='px-6 py-3'>
                                    Payment Status
                                </th>
                                <th scope='col' className='px-6 py-3'>
                                    Order Status
                                </th>
                                <th scope='col' className='px-6 py-3'>
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='bg-white border-b'>
                                <td className='px-6 py-4 font-medium whitespace-nowrap'>#233</td>
                                <td className='px-6 py-4 font-medium whitespace-nowrap'>$100.99</td>
                                <td className='px-6 py-4 font-medium whitespace-nowrap'>pending</td>
                                <td className='px-6 py-4 font-medium whitespace-nowrap'>pending</td>
                                <td className='px-6 py-4 font-medium whitespace-nowrap'>
                                    <Link>
                                        <span className='bg-green-200 text-green-800 text-md font-semibold mr-2 px-3 py-[2px] rounded'>View</span>
                                    </Link>
                                    <Link>
                                        <span className='bg-green-200 text-green-800 text-md font-semibold mr-2 px-3 py-[2px] rounded'>Pay Now</span>
                                    </Link>
                                    Link
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Orders