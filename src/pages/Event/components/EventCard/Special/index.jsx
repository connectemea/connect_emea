import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ChevronsRight } from 'lucide-react';
import classNames from 'classnames';

function SpecialCard({ data, color }) {
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault(); // Prevent default button action
        navigate('/event/' + data.id);
    }
    return (
        <div className='sm:p-4 min-w-[180px] max-w-[240px] sm:max-w-[280px] space-y-2 cursor-pointer mx-auto ' onClick={handleClick}>
            <div className={classNames('h-60 w-full bg-gray-300 rounded-md shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out', {
                '': color === 'black',
                'hover:shadow-white/50': color === 'white'
            })} >
                <img src={data.image} alt={data.title} className='w-full h-full object-cover rounded-md' />
            </div>
            <div className='text-[12px] flex justify-between flex-wrap'>
                <p>Date: {data.date}</p>
                <p>Time: {data.time}</p>
            </div>
            <h1 className='font-semibold truncate'>{data.title}</h1>
            <div className='flex justify-end w-full'>
                <button onClick={handleClick} className=' bg-orange-500 rounded-md px-4 py-1 uppercase flex gap-2 items-center text-[12px] justify-center font-semibold text-white transition-all ease-in-out hover:bg-orange-400 '>open<ChevronsRight className='w-4' /></button>
            </div>
        </div >
    )
}

export default SpecialCard