import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowUpRight, ChevronsRight } from 'lucide-react'

function NormalCard({ data }) {
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        navigate('/event/' + data.id);
    }
    return (

        <div className='p-4 min-w-[260px] space-y-2'>
            <div className='h-80 w-full bg-gray-300 relative flex flex-col justify-end p-3'>
                <div className='absolute top-2 right-2' onClick={handleClick}>
                    <ArrowUpRight className='w-6' />
                </div>
                <div className='text-[12px] flex justify-between'>
                    <p>Date: {data.date}</p>
                    <p>Time: {data.time}</p>
                </div>
                <h1>{data.title}</h1>
            </div>

        </div>
    )
}

export default NormalCard