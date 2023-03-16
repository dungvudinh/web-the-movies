import "./movieCard.scss";
import { Link } from "react-router-dom";
import Button from "../button/button";
import { category } from "../../API/tmdbApi";
import apiConfig from "../../API/apiConfig";
function MovieCard(props)
{
    const item= props.item;
    const link =`/${category[props.category]}/${item.id}`;
    const bg = apiConfig.img500(item.poster_path || item.backdrop_path);
    const checkInvalid= item.poster_path || item.backdrop_path;
    return (
        <Link to ={link}> 
            <div className="movie-card"style={{backgroundImage:`url(${checkInvalid ? bg :''})`}} >
                <Button>
                    <i className="fa-solid fa-play"></i>
                </Button>
            </div>
            <h3 style={{fontSize:'1rem'}}>{item.title || item.name}</h3>
        </Link>
    )
}
export default MovieCard;