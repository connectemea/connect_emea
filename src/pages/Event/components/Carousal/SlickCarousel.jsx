import React, { useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Special } from "../EventCard";
import classNames from 'classnames';
import { ChevronRight, ChevronsRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';


function SampleNextArrow(props) {
    const { className, style, onClick, color } = props;
    const isDisabled = className && className.includes("slick-disabled");
    // console.log('color:', color);
    return (
        <div
            className={classNames(className, `rounded-xl flex items-center justify-center   absolute left-[20px] top-[310px] sm:top-[330px] z-10 custom-arrow `,
                {
                    '!text-gray-500': isDisabled,
                    [`${color === 'black' ? '!text-black' : '!text-white'}`]: !isDisabled
                })}
            style={{
                ...style,
                display: "block",
                background: "",
                fontSize: "40px",
                lineHeight: "1",
            }}
            onClick={onClick}
        >
            <ChevronRight size={40} />
        </div>
    );
}


function SamplePrevArrow(props) {
    const { className, style, onClick, color } = props;
    // console.log('color:', color);
    const isDisabled = className && className.includes("slick-disabled");
    return (
        <div
            className={classNames(className, `rounded-xl flex items-center justify-center  absolute left-[-10px] top-[310px] sm:top-[330px] z-10 custom-arrow  `,
                {
                    '!text-gray-500': isDisabled,
                    [`${color === 'black' ? '!text-black' : '!text-white'}`]: !isDisabled
                }
            )}
            style={{
                ...style,
                display: "block",
                background: "",
                fontSize: "40px",
                lineHeight: "1",
            }}
            onClick={onClick}
        >
            <ChevronLeft size={40} />
        </div >
    );
}




function SlickCarousel({ slides, color, onEventClick }) {
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow color={color} />,
        prevArrow: <SamplePrevArrow color={color} />,
        responsive: [
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 550,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <div className="slider-container w-full max-w-[1100px] mx-auto relative overflow-hidden">
            <Slider {...settings} >
                {slides.map((event) => (
                    <div className="rounded-xl p-1 sm:mx-0" key={event.id}>
                        <Special 
                            data={event} 
                            color={color}
                            onClick={() => onEventClick(event)} 
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default SlickCarousel;

