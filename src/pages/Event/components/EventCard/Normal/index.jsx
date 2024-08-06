import React from 'react'

function NormalCard({data}) {
    return (
        <div className='p-4 max-w-[200px]'>
            <div className='h-40 w-full bg-gray-300 m-2'>
            </div>
            <div>{data.date}</div>
            <div className='truncate'>{data.description}</div>
            <button>open</button>
        </div>
    )
}

export default NormalCard