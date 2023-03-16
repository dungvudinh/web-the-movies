import { ListItem } from "@material-ui/core";
import {useState, useEffect, useRef} from "react";
import {useParams} from "react-router-dom";
import tmpApi from "../../API/tmdbApi";
function VideoList(props)
{
    const {category}= useParams();
    const [videos, setVideos]= useState([]);
    useEffect(()=>
    {
        const getVideos= async ()=>
        {
            const res= await tmpApi.getVideo(category,props.id);
            setVideos(res.results.slice(0,3));
        }
        getVideos();
    },[props.id,category])
    return (
        <>
        {videos && videos.map(video=>(
            <Video key={video.id} item={video}/>
        ))}
        </>
    )
}
const Video =props=>
{
    const item= props.item;
    const iframeRef= useRef(null);
    useEffect(()=>
    {
        const height= iframeRef.current.offsetHeight*9/16 + "px";
        iframeRef.current.setAttribute('height', height);

    },[])
    return (
        <div className="video">
            <div className="video__title">
                <h2>{item.name}</h2>
            </div>
            <iframe src={`http://www.youtube.com/embed/${item.key}`} frameBorder="0" ref={iframeRef} width="100%"
            title="video" allowFullScreen={true}></iframe>
        </div>
    )
}
export default VideoList;