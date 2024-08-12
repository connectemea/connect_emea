// Points.js
import React from 'react';
import Cards from '../../../const/data/Cards';
import PointCard from './pointCard';

function Points() {
    return (
        <div className="container mx-auto px-4">
            <h1 className='text-2xl font-semibold text-center my-8'>
                Your journey of growth right at your campus!
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Cards.map((card, index) => (
                    <PointCard card={card} key={card.id} />
                ))}
            </div>
        </div>
    );
}

export default Points;