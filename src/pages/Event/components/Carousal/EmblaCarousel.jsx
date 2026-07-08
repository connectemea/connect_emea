import React from 'react';
import { DotButton, useDotButton } from './EmblaCarouselDotButton';
import { PrevButton, NextButton, usePrevNextButtons } from './EmblaCarouselArrowButtons';
import useEmblaCarousel from 'embla-carousel-react';
import '@/assets/styles/slides.css';
import SpecialCard from '../EventCard/Special';

const EmblaCarousel = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  return (
    <section className="embla relative">
      <div className='relative w-full z-20 '>
        {!prevBtnDisabled && (<PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} className="z-20 absolute top-32 -left-10 max-h-40 max-w-40 cursor-pointer" />)}
        {!nextBtnDisabled && (<NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} className="z-20 absolute top-32 left-[250px] sm:left-[300px] md:left-[300px] max-h-40 max-w-40 cursor-pointer" />)}
      </div>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((event, index) => (
            <div className="embla__slide rounded-xl" key={index}>
              <SpecialCard data={event} />
            </div>
          ))}
        </div>
      </div>


    </section>
  );
};

export default EmblaCarousel;
