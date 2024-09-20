import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Special } from "../EventCard";
import classNames from 'classnames';
import { ChevronRight, ChevronLeft } from 'lucide-react';
function SampleNextArrow(props) {
    const { className, style, onClick, color } = props;
    const isDisabled = className && className.includes("slick-disabled");
    return (
        <div
            className={classNames(className, `rounded-xl flex items-center justify-center text-${color}  absolute left-[20px] top-[310px] sm:top-[330px] z-10 custom-arrow`,
                {
                    '!text-gray-500': isDisabled,
                    [`!text-${color}`]: !isDisabled
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
    console.log('color:', color);
    const isDisabled = className && className.includes("slick-disabled");
    return (
        <div
            className={classNames(className, `rounded-xl flex items-center justify-center text-${color}  absolute left-[-10px] top-[310px] sm:top-[330px] z-10 custom-arrow `,
                {
                    '!text-gray-500': isDisabled,
                    [`text-${color}`]: !isDisabled
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




function SlickCarousel(props) {
    const { slides, color } = props;
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow color={color} />,
        prevArrow: <SamplePrevArrow color={color} />,
        responsive: [
            // {
            //     breakpoint: 1124,
            //     settings: {
            //         slidesToShow: 3,
            //         slidesToScroll: 1,
            //     }
            // },
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
                {slides.map((event, index) => (
                    <div className="rounded-xl  sm:mx-0" key={index}>
                        <Special data={event} />
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default SlickCarousel;
