import React, { useEffect } from 'react'
import { RiShoppingCart2Fill } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { get_index_data } from '../../store/reducers/dashboardReducer'
import MyMoney from '../../utilities/MyMoney'
const Index = () => {
    const dispach = useDispatch();
    const navigate = useNavigate();
    const formatter = new MyMoney();
    const { recentOrders, pendingOrders, totalOrders, cancelledOrders } = useSelector(state => state.dashboard);
    useEffect(() => {
        dispach(get_index_data())
    }, [dispach]);
    const redirect = (order) => {        
        let items = 0;
        for (let index = 0; index < order.products.length; index++) {            
            items = order.products[index].quantity + items;

        }
        navigate(
            '/payment', {
            state: {
                totalPrice: order.price,
                items: items,
                orderId: order._id
            }
        }
        );
    }
    return (
        <div>
            <div className='grid grid-cols-3 md:grid-cols-1 gap-5'>
                <div className='flex justify-center items-center p-5 bg-white rounded-md gap-5'>
                    <div className='bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl'>
                        <span className='text-xl text-green-800'><RiShoppingCart2Fill /></span>
                    </div>
                    <div className='flex flex-col justify-start items-start text-slate-600'>
                        <h2 className='text-3xl font-bold'>{totalOrders}</h2>
                        <span>Orders</span>
                    </div>
                </div>
                <div className='flex justify-center items-center p-5 bg-white rounded-md gap-5'>
                    <div className='bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl'>
                        <span className='text-xl text-green-800'><RiShoppingCart2Fill /></span>
                    </div>
                    <div className='flex flex-col justify-start items-start text-slate-600'>
                        <h2 className='text-3xl font-bold'>{pendingOrders}</h2>
                        <span>Pending Orders</span>
                    </div>
                </div>
                <div className='flex justify-center items-center p-5 bg-white rounded-md gap-5'>
                    <div className='bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl'>
                        <span className='text-xl text-green-800'><RiShoppingCart2Fill /></span>
                    </div>
                    <div className='flex flex-col justify-start items-start text-slate-600'>
                        <h2 className='text-3xl font-bold'>{cancelledOrders}</h2>
                        <span>Cancel Orders</span>
                    </div>
                </div>
            </div>
            <div className='bg-white p-5 mt-5 rounded-md'>
                <h2>Recent Orders</h2>
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
                                {
                                    recentOrders && recentOrders.map((order, i) => {
                                        return <tr key={i} className='bg-white border-b'>
                                            <td className='px-6 py-4 font-medium whitespace-nowrap'>#{order._id}</td>
                                            <td className='px-6 py-4 font-medium whitespace-nowrap'>{formatter.centsToFomattedCurrency(order.price)}</td>
                                            <td className='px-6 py-4 font-medium whitespace-nowrap'>{order.payment_status}</td>
                                            <td className='px-6 py-4 font-medium whitespace-nowrap'>{order.delivery_status}</td>
                                            <td className='px-6 py-4 font-medium whitespace-nowrap'>
                                                <Link to={`/dashboard/order/details/${order._id}`}>
                                                    <span className='bg-green-200 text-green-800 text-md font-semibold mr-2 px-3 py-[2px] rounded'>View</span>
                                                </Link>
                                                {
                                                    order.payment_status !== 'paid' &&
                                                    <span className='bg-green-200 text-green-800 text-md font-semibold mr-2 px-3 py-[2px] rounded hover:cursor-pointer' onClick={() => redirect(order)} >Pay Now</span>

                                                }
                                            </td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index