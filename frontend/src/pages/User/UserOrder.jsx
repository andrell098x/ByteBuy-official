import React from 'react'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { Link } from 'react-router-dom'
import { useGetMyOrdersQuery } from '../../redux/api/orderApiSlice.js'


const UserOrder = () => {
    const {data: orders, isLoading, error} = useGetMyOrdersQuery();


  return (
    <div className='container mx-auto mt-[10rem] w-[100vw] flex justify-center flex-col px-[4rem]'>
      <h2 className="text-2xl font-semibold mb-4">
        My Orders
      </h2>

      {isLoading ? (<Loader />) : error ? (<Message variant='danger'>{error?.data?.error || error.error}</Message>) : (
        <table>
            <thead>
                <tr>
                    <td className='py-2 px-[1rem]'>Image</td>
                    <td className='py-2 px-[1rem]'>Id</td>
                    <td className='py-2 px-[1rem]'>Date</td>
                    <td className='py-2 px-[1rem]'>Total</td>
                    <td className='py-2 px-[1rem]'>Paid</td>
                    <td className='py-2 px-[1rem]'>Delivered</td>
                    <td className='py-2 px-[1rem]'></td>
                </tr>
            </thead>

            <tbody>
                {orders.map((order) => (
                    <tr key={order._id}>
                        <img src={order.orderItems[0].image} alt={order.user} className='w-[6rem] h-[6rem] mb-5'/>

                        <td className='p-2'>{order._id}</td>
                        <td className='p-2'>{order.createdAt.substring(0, 10)}</td>
                        <td className='p-2'>$ {order.totalPrice}</td>

                        <td className='py-2'>
                            {order.isPaid ? (
                                <p className="p-1 text-center bg-green-300 w-[6rem] rounded-full">
                                    Completed
                                </p>
                            ) : (
                                <p className="p-1 text-center bg-red-300 w-[6rem] rounded-full">
                                    Pending
                                </p>
                            ) }
                        </td>

                        <td className='py-2'>
                            {order.isDelivered ? (
                                <p className="p-1 text-center bg-green-300 w-[6rem] rounded-full">
                                Completed
                                </p>
                            ) : (
                                <p className="p-1 text-center bg-red-300 w-[6rem] rounded-full">
                                    Pending
                                </p>
                            )}
                        </td>

                        <td>
                            <Link to={`/order/${order._id}`}>
                                <button className='bg-black text-white rounded px-2 py-2'>Details</button>
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      )}
    </div>
  )
}

export default UserOrder