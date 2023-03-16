import PropTypes from "prop-types";
import { SwiperSlide, Swiper } from "swiper/react";
import tmpApi,{category} from "../../API/tmdbApi";
import LazyLoad from "react-lazyload";
import { useState, useEffect } from "react";
import "./movies.scss";
import MovieCard from "../movie-card/movieCard.js";
function Movies(props)
{

    const [items,setItems]= useState([]);
    useEffect(() => {
      const getList= async ()=>
      {
          let res= null;
          const params= {};
          if(props.type !== 'similar')
          {
              switch(props.category)
              {
                  case category.movie:
                      res= await tmpApi.getMoviesList(props.type, {params});
                      break;
                default:
                    res= await tmpApi.getMoviesList(props.type, {params});
                    break;
              }
          } 
          else res= await tmpApi.similar(props.category, props.id);
          setItems(res.results);
      }
      getList();  
    }, [])
    
    return (
        <div className="movie-list">
            <Swiper grabCursor={true} spaceBetween={10} slidesPerView='auto'>
                {items && items.map(item=>(
                    <SwiperSlide key ={item.id}>
                            <MovieCard item={item} category={props.category}/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
Movies.propTypes={
    category:PropTypes.string.isRequired,
    type:PropTypes.string.isRequired
}
export default Movies;