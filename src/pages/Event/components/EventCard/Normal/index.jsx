import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

function NormalCard({ data }) {
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        navigate('/event/' + data.id);
    }
    return (

        <div className='max-w-[280px] relative p-4 '>
            <div className='h-60 w-full bg-gray-300 overflow-hidden'>
            </div>
            <div className='w-full absolute bottom-5 p-2 '>
            <div className='text-[12px] flex'>
                <p>Date: {data.date}</p>
                <p>Time: {data.time}</p>
            </div>
            <div className='truncate'>{data.title}</div>
            </div>
            <button onClick={handleClick} className='absolute top-5 right-5'><ArrowUpRight /></button>
        </div>
    )
}

export default NormalCard