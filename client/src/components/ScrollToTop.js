import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop(props) {
    const location = useLocation();
    useEffect(() => {
        console.log(location)
        window.scrollTo(0, 0);
    }, [location]);

    return <>{props.children}</>
}