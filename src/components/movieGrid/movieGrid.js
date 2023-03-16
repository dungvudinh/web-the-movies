import "./movieGrid.scss";
import MovieCard from "../movie-card/movieCard";
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import tmpApi, { category, movieType,tvType } from "../../API/tmdbApi";
import {OutlineButton} from "../button/button";
import Input from "../input/input";
import Button from "../button/button";
function MovieGrid(props)
{
    const [items, setItems]= useState([]);
    const [page, setPage]= useState(1);
    const [totalPage, setTotalPage]= useState(0);
    const {keyword}= useParams();
    useEffect(() => {
      const getList =async ()=>
      {
          let res= null;
          if(keyword=== undefined)
          {
              const params= {};
              switch(props.category)
              {
                  case category.movie:
                      res= await tmpApi.getMoviesList(movieType.upcoming, {params});
                      break;
                  default:
                      res= await tmpApi.getTvList(tvType.popular, {params});
              }
          }
          else 
          {
              const params= {
                  query:keyword
              }
              res= await tmpApi.search(props.category, {params})
          }
          setItems(res.results);
          setTotalPage(res.total_pages);
      }
    getList();
    }, [props.category, keyword])
    const handleLoadMore= async ()=>
    {
        let res= null;
        if(keyword=== undefined)
        {
            const params= {
                page:page+1
            };
            switch(props.category)
            {
                case category.movie:
                    res= await tmpApi.getMoviesList(movieType.upcoming, {params});
                    break;
                default:
                    res= await tmpApi.getTvList(tvType.popular, {params});
            }
        }
        else 
        {
            const params= {
                query:keyword,
                page:page+1
            }
            res= await tmpApi.search(props.category, {params})
        }
      setItems([...items, ...res.results]);
      setPage(prevPage=>prevPage+1);
    }
    return (
        <>
        <div className="section mb-3">
            <MovieSearch keyword={keyword} category={props.category}/>
        </div>
        <div className="movie-grid">
            {items && items.map(item=>(
                    <MovieCard category={props.category}  item={item} key= {item.id}/>
            ))}
        </div>
        {page < totalPage ? (
            <div className="movie-grid__loadmore">
                <OutlineButton className="small" onClick={()=>handleLoadMore}>Load more</OutlineButton>
            </div>
        ) : undefined}
        </>
    )
}
export const MovieSearch =props=>
{
    const [keyword, setKeyword]= useState(props.keyword ? props.keyword : '');
    const navigate= useNavigate();
    const goToSearch= useCallback(()=>{
        if(keyword.trim().length>0) navigate(`/${category[props.category]}/search/${keyword}`);
    },[keyword, props.category, navigate]);
     useEffect(()=>
     {
         const enterEvent =e=>
         {
             e.preventDefault();
             if(e.keyCode===13) goToSearch();
         }
        document.addEventListener('keyup', enterEvent);
         return ()=> document.removeEventListener('keyup', enterEvent); 
     }, [keyword, goToSearch])
    return (
        <div className="movie-search">
                 <Input type="text" placeholder="Enter keyword" value={keyword} onChange={e=>setKeyword(e.target.value)}/>
                <Button className="button" type="submit" onClick={()=>goToSearch()}>Search</Button>
        </div>
    )
}
export default MovieGrid;