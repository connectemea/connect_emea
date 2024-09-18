import React from 'react';
import QouteUp from '@/assets/avatars/QouteUp.png';
import QouteDown from '@/assets/avatars/QuoteDown.png';

function Card({ item }) {
  // console.log(item.id)
  return (
    <div className={`bg-slate-200 relative rounded-xl  overflow-hidden flex items-center max-w-[500px] mx-auto ${item.id % 2 !== 0 ? ' ' : 'flex flex-row-reverse'}`}>
      <div className={`relative   items-end flex  h-full overflow-hidden `}>
        <div className={`w-40 h-40 bg-orange-500 rounded-full   absolute ${item.id % 2 !== 0 ? '-left-3' : '-right-3'} -bottom-8 `} />
        <img src={item.image} alt='icon' className="object-cover w-40 h-40 z-20" />
      </div>
      <div className="flex-1 p-4 mt-10 ">
        {/* <img src={QouteUp} alt='Quote Up' className="h-16 w-16 mb-2" /> */}
        <img src={QouteDown} alt='Quote Down' className={`top-0 absolute h-14 w-14 mb-4 ${item.id % 2 !== 0 ? 'left-28' : 'right-36'} `} />
        <p className="text-gray-600 mb-2 ">
          <span className=''>
            {/* <span className='font-bold text-black -ml-1'>"</span> */}
            {item.content}
          </span>
          <span className='font-bold text-black'>"</span>
        </p>
        {/* <img src={QouteDown} alt='Quote Down' className="h-4 w-4 mb-4" /> */}
        <div className={`flex flex-col ${item.id % 2 !== 0 ? 'flex items-end' : 'flex items-start'}`}>
          <h5 className="font-bold">{item.name}</h5>
          <p className="text-sm text-gray-500">{item.role}</p>
        </div>

      </div>
    </div>
  );
}

export default Card;