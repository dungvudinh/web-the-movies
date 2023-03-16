import { Link } from "react-router-dom";
import HeroSlide from "../components/hero-slide/heroSlide";
import { OutlineButton } from "../components/button/button";
import Movies from "../components/movies/movies";
import { movieType, tvType, category } from "../API/tmdbApi";
function Home()
{
    return (
        <div>
            <HeroSlide />
            <div className="container">
                <div className="section mb-3">
                    <div className="section__header mb-2" style={{display:'flex', justifyContent:'space-between'}}>
                        <h2>Trending Movies</h2>
                        <Link to ="/movie">
                            <OutlineButton className="small">View more</OutlineButton>
                        </Link>
                    </div>
                    <Movies  category={category.movie} type={movieType.popular}/>
                </div>
                <div className="section mb-3">
                    <div className="section__header mb-2" style={{display:'flex', justifyContent:'space-between'}}>
                        <h2>Top Rated Movies</h2>
                        <Link to ="/movie">
                            <OutlineButton className="small">View more</OutlineButton>
                        </Link>
                    </div>
                    <Movies  category={category.movie} type={movieType.top_rated}/>
                </div>
                <div className="section mb-3">
                    <div className="section__header mb-2" style={{display:'flex', justifyContent:'space-between'}}>
                        <h2>Trending TV</h2>
                        <Link to ="/tv">
                            <OutlineButton className="small">View more</OutlineButton>
                        </Link>
                    </div>
                    <Movies  category={category.tv} type={tvType.popular}/>
                </div>
                <div className="section mb-3">
                    <div className="section__header mb-2" style={{display:'flex', justifyContent:'space-between'}}>
                        <h2>Top Rated TV</h2>
                        <Link to ="/tv">
                            <OutlineButton className="small">View more</OutlineButton>
                        </Link>
                    </div>
                    <Movies  category={category.tv} type={tvType.top_rated}/>
                </div>
            </div>
        </div>
    )
}
export default Home;