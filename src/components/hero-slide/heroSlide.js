import tmdbApi, {category, movieType, tvType} from "../../API/tmdbApi";
import apiConfig from "../../API/apiConfig";
import { useState, useEffect, useRef } from "react";
import SwiperCore, {Autoplay} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import LazyLoad from "react-lazyload";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "swiper/css";
import "swiper/css/autoplay"
import './heroSlide.scss';
import { useNavigate } from "react-router-dom";
import Button, {OutlineButton} from "../button/button.js";
import Modal, {ModalContent} from "../modal/modal";

function HeroSlide(props)
{
    const [movieItem, setMovieItem]= useState([]);
    SwiperCore.use([Autoplay])
    useEffect(() => {
      const getMovies = async ()=>
      {
          const params = {page:1};
          try{
              const res = await tmdbApi.getMoviesList(movieType.popular, {params});
              setMovieItem(res.results.slice(0,4));
          }
          catch(error)
          {
              console.log(error)
          }
      }
      getMovies();
    }, [])
    
    return (
        <div className="hero-slide">
           <Swiper modules={[Autoplay]} grabCursor={true}  spaceBetween={0} slidesPerView={1}  autoplay={{delay:3000}}>
               {movieItem.map(item=>(
                   <SwiperSlide key={item.id}>
                       {({isActive})=>(
                          <HeroSlideItem item={item} className={isActive ? 'active' : ''}/>
                       )}
                   </SwiperSlide>
               ))}
           </Swiper>
           {movieItem.map(item=>(<TrailerModal key ={item.id} item={item}/>))}
        </div>
    )
}
const HeroSlideItem=props=>
{
    const navigate =useNavigate();
    const item= props.item;
    const background=apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path);
    const setModalActive = async ()=>
    {
        const modal = document.querySelector(`#modal_${item.id}`);

        const videos =await tmdbApi.getVideo(category.movie, item.id);
        if(videos.results.length >0)
        {
           const  videoSrc =`http://www.youtube.com/embed/${videos.results[0].key}`;
           modal?.querySelector('.modal__content > iframe').setAttribute('src', videoSrc);
        }
        else modal.querySelector('.modal__content').innerHTML="No Trailer"
        modal?.classList.toggle('active');
    }
    return (
        <div className={`hero-slide__item  ${props.className}`} 
        style={{
            backgroundImage:`url(${background})`}} >
            <div className="hero-slide__item__content container">
                <div className="hero-slide__item__content__info">
                    <h2 className="title" >{item.title}</h2>
                    <div className="overview">{item.overview}</div>
                    <div className="btns">
                        <Button onClick={()=>navigate(`/movie/${item.id}`)} className="button">Watch now</Button>
                        <OutlineButton className="btn-outline" onClick={()=>setModalActive}>Watch trailer</OutlineButton>
                    </div>
                </div>
                <div className="hero-slide__item__content__poster">
                    <img src={apiConfig.img500(item.poster_path)} alt={item.title}  />
                </div>
            </div>
        </div>
    )
}
const TrailerModal =props =>
{
    const item =props.item;
    const iframeRef= useRef(null);
    const onClose= ()=> iframeRef.current.setAttribute('src', '');
    return (
        <Modal active ={false} id ={`modal_${item.id}`}>
            <ModalContent onClose={onClose} >
            <iframe ref={iframeRef} width="100%" height="500px" title="trailer"></iframe>
            </ModalContent>
        </Modal>
    )
}
export default HeroSlide;