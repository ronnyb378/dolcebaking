import React from 'react'
import PastOrders from '../components/PastOrders'

export default function Profile() {
    return (
        <div className='profile-page'>
            <h1>Profile Page</h1>
            <div className='account-details'>
                <h4>Account Details</h4>
                <p>Name: 'First Name' 'Last Name'</p>
                <p>Email</p>
                <p>Phone Number</p>
                <p>Change Account Details</p>
            </div>
            <div className='order-history'>
                <h4>Order History</h4>
                <PastOrders />
            </div>
            {/* <div className=''>
                <h4>Account Details</h4>
            </div> */}

        </div>
    )
}
