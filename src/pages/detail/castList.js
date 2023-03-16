import {useState,useEffect} from "react";
import {useParams} from "react-router-dom";
import tmpApi from "../../API/tmdbApi";
import apiConfig from "../../API/apiConfig";
import {Swiper, SwiperSlide} from "swiper/react";
import "./detail.scss";
import noImage from "../../assets/noImage.jpg"

function CastList(props)
{
    const {category}= useParams();
    const [casts, setCasts]= useState([]);
    useEffect(()=>
    {
        const getCredits= async ()=>
        {
            const res= await tmpApi.credit(category,props.id);
            setCasts(res.cast);
        }
        getCredits();
    },[props.id,category])
    return (
        <Swiper slidesPerView='auto' grabCursor={true}  spaceBetween={10}  className="casts" autoplay={{delay:1000}}>
            {casts && casts.map(cast=>(
                <SwiperSlide key={cast.id} className="casts__item">
                <div className="casts__item__img" style={{backgroundImage:`url(${cast.profile_path ? apiConfig.img500(cast.profile_path) : noImage})`}}></div>
                <div className="casts__item_name">{cast.name}</div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}
export default CastList;