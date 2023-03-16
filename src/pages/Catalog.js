import { useParams } from "react-router-dom";
import PageHeader from "../components/pageHeader/pageHeader";
import { category  as cate} from "../API/tmdbApi";
import MovieGrid from "../components/movieGrid/movieGrid";
function Catalog()
{
    const {category}= useParams();
    return (
        <>
       <PageHeader>
           {category ===cate.movie ? 'Movies ' : 'TV Series'}
       </PageHeader>
       <div className="container">
           <div className="section mb-3">
               <MovieGrid category= {category}/>
           </div>
       </div>
        </>
    )
}
export default Catalog;