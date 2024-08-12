import React from 'react';
import QouteUp from '../../../assets/avatars/QouteUp.png';
import QouteDown from '../../../assets/avatars/QuoteDown.png';

function PointCard({ card, key }) {
  console.log(card.id)
  return (
    <div className={`bg-slate-100 rounded-lg m-4 flex items-center ${card.id % 2 !== 0 ? ' mr-4 ' : 'flex flex-row-reverse'}`}>
      <div className={`relative   items-end flex  h-full overflow-hidden `}>
        <div className={`w-24 h-24 bg-orange-500 rounded-full   absolute ${card.id % 2 !== 0 ? '-left-3' : '-right-3'} -bottom-5 `} />
        <img src={card.image} alt='icon' className="object-cover w-24 h-24 z-20" />
      </div>
      <div className="flex-1">
        <img src={QouteUp} alt='Quote Up' className="h-4 w-4 mb-2" />
        <p className="text-gray-600 mb-2">
          {card.content}
        </p>
        <img src={QouteDown} alt='Quote Down' className="h-4 w-4 mb-4" />
        <h5 className="font-bold">{card.name}</h5>
        <p className="text-sm text-gray-500">{card.role}</p>
      </div>
    </div>
  );
}

export default PointCard;