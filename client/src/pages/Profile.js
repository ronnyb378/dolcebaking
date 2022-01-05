import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import PastOrders from '../components/PastOrders'

export default function Profile() {

    const [userOrders, setUserOrders] = useState({})

    const { user } = useSelector(state => state.user)

    useEffect(() => {
        fetch('api/v1/orders/past-orders')
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                setUserOrders(data)
            })
    }, [])

    // console.log(userInfo)
    if (user) {
        (<div className='profile-page'>
            <h1>Profile Page</h1>
            <div className='account-details'>
                <h4>Account Details</h4>
                <p>Name: {user.firstName} {user.lastName}</p>
                <p>Email: {user.email}</p>
                <p>Registered Phone Number: {user.phoneNumber}</p>
                <p>Change Account Details</p>
            </div>
            <div className='order-history'>
                <h4>Order History</h4>
                { userOrders.length ? (userOrders.map((order) => {
                    return <PastOrders key={order.id} order={order} />
                })) : ('')}
                {/* <PastOrders /> */}
            </div>
            {/* <div className=''>
                <h4>Account Details</h4>
            </div> */}

        </div>
    )} else { return null }
}
