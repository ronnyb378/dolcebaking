import React from 'react'
import { Pagination } from 'react-bootstrap'

export default function Paginate(props) {

    const { currentPage, totalPosts, paginate, postsPerPage } = props

    let active = currentPage
    let items = [];
    for (let number = 1; number <= Math.ceil( totalPosts / postsPerPage ); number++) {
        items.push(
            <Pagination.Item key={number} active={number === active} onClick={() => paginate(number)}>
                {number}
            </Pagination.Item>,
        );
    }

    return (
        <div>
            <Pagination>{items}</Pagination>
        </div>
    )
}
