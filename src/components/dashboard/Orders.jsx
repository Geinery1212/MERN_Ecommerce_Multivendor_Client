import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { get_orders } from '../../store/reducers/orderReducer';
import MyMoney from '../../utilities/MyMoney'
const Orders = () => {
    const [state, setState] = useState('all');
    const navigate = useNavigate();
    const formatter = new MyMoney();
    const dispath = useDispatch();
    const { orderId } = useParams();
    const { myOrders } = useSelector(state => state.order);
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
    useEffect(() => {
        dispath(get_orders(state));
    }, [orderId, dispath, state]);

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
                            {
                                myOrders && myOrders.map((order, i) => {
                                    return <tr className='bg-white border-b'>
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
    )
}

export default Orders