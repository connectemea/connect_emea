import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ChevronsRight } from 'lucide-react';

function SpecialCard({ data }) {
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault(); // Prevent default button action
        navigate('/event/' + data.id);
    }
    return (
        <div className='p-4 min-w-[280px] max-w-[280px] space-y-2'>
            <div className='h-60 w-full bg-gray-300'>
                <img src={`https://picsum.photos/600/350?v=${data.id}`} alt={data.title} className='w-full h-full object-cover' />
            </div>
            <div className='text-[12px] flex justify-between'>
                <p>Date: {data.date}</p>
                <p>Time: {data.time}</p>
            </div>
            <h1 className='font-semibold'>{data.title}</h1>
            <div className='flex justify-end w-full'>
                <button onClick={handleClick} className=' bg-orange-500 rounded-md px-2 uppercase flex gap-2 items-center text-[12px] justify-center font-semibold text-white'>open <ChevronsRight className='w-4' /></button>
            </div>
        </div>
    )
}

export default SpecialCard