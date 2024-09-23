import React, { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks } from '../../features/recommendedSlice';
import CircularProgress from "@mui/material/CircularProgress";
import BigSearchItems from '../search items/BigSearchItems';
import SliderItem from './SliderItem';

export default function RecommendedSlider() {
   const disPatch = useDispatch()
   const {loading, books, error} = useSelector(state => state.recommended)

    useEffect(() => {
      disPatch(fetchBooks())
    },[])
   


  return (
    <Swiper
    className=' m-auto sm:w-[90%]'
      spaceBetween={10}
      slidesPerView={1}
      breakpoints={{
        1174:{
          sliderPeeView: 4
        },
        1150:{
          slidesPerView: 3
        },

      }}
    >

      {
        loading ? 
        (<CircularProgress/>) 
        : 
        (books.map((book) => (
          <SwiperSlide key={book.id}><SliderItem {...book}/></SwiperSlide>
        )))
        
      }
    </Swiper>
  )
}
