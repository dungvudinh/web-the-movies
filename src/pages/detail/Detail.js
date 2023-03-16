import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import tmpAPi from "../../API/tmdbApi";
import apiConfig from "../../API/apiConfig";
import "./detail.scss";
import CastList from "./castList";
import VideoList from "./videoList";
import Movies from "../../components/movies/movies"
function Detail()
{
    const {category,id}= useParams();
    const [item, setItem]= useState(null);

    useEffect(()=>
    {
        const getDetail = async ()=>
        {
            const res= await tmpAPi.detail(category, id, {params:{}});
          
            setItem(res);
            window.scrollTo(0,0);
        }
        getDetail();
    },[category, id]);
    return (
        <>
        { item && (
            <>
            <div className="banner" style={{backgroundImage:`url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})`}}></div>
            <div className="mb-3 movie-content container">

                <div className="movie-content__poster">
                    <div className="movie-content__poster__img" style={{backgroundImage:`url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})`}}></div>
                </div>

                <div className="movie-content__info">

                    <div className="title">
                        {item.title || item.name}
                    </div>

                    <div className="genres">
                        {item.genres && item.genres.map(genre=>(
                            <span key ={genre.id} className="genres__item">{genre.name}</span>
                        ))}
                    </div>
                    <p className="overview">{item.overview}</p>

                    <div className="cast">
                        <div className="section__header">
                            <h2>Casts</h2>
                        </div>
                        <CastList id ={item.id}/>
                    </div>

                </div>
            </div>
            <div className="container">
                <div className="section mb-3">
                    <VideoList  id={item.id}/>
                </div>
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h1>Similar</h1>
                    </div>
                    <Movies category ={category} type="similar" id ={item.id}/>
                </div>
            </div>
            </>
        )}
        </>
    )
}
export default Detail;
