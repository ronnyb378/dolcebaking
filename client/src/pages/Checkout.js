import React from 'react'
import CheckoutDetails from '../components/CheckoutDetails'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const PUBLIC_KEY = "pk_test_51K6L2WFnzIDS2zCuOkXkQtzlWgrm3ogDUToDIByEZGQ7kCgtOOPnm7holtEcIUK37QavWFs0Y0j3Ls0wBDJsAVJZ00aB4yfYRz"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function Checkout() {





    return (
        <Elements stripe={stripeTestPromise}>
            <CheckoutDetails />
        </Elements>
    )
}
