import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'; 
import { topMeels } from './topMeels';
import CarouselItem from './CarouselItem';

const MultiItemCarousel = () => {
  return (
     <div>
         <slider>
           {topMeels.map((item)=>(<CarouselItem image={item.image} title={item.title}/>
           ))}
         </slider>
     </div>
  );
}

export default MultiItemCarousel