import React from 'react'

function SpecialCard({ data }) {
    console.log(data)
    return (
        <div className='p-4 max-w-[200px]'>
            <div className='h-40 w-full bg-gray-300 m-2'>
            </div>
            <div>{data.date}</div>
            <h1>{data.title}</h1>
            <div className='truncate'>{data.description}</div>
            <button>open</button>
        </div>
    )
}

export default SpecialCard
