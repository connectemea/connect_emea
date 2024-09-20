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

        <div className='p-1 md:p-4 customMinimumWidth mx-auto  max-w-[280px] space-y-2 flex-grow'>
            <div className='h-80 w-full bg-gray-300 relative flex flex-col justify-end p-3'>
                <img src={`https://picsum.photos/600/350?v=${data.id}`} alt={data.title} className='w-full h-full object-cover absolute top-0 bottom-0 left-0 right-0' />
                <div className='absolute top-2 right-2 cursor-pointer z-10 text-white' onClick={handleClick}>
                    <ArrowUpRight className='w-6' />
                </div>
                <div className='text-[12px] flex justify-between z-10 flex-wrap'>
                    <p>Date: {data.date}</p>
                    <p>Time: {data.time}</p>
                </div>
                <h1 className='z-10 font-semibold'>{data.title}</h1>
                <div className="absolute inset-0 z-0 bg-gradient-to-t from-white/50 via-transparent to-transparent"></div>
            </div>

        </div>
    )
}

export default NormalCard