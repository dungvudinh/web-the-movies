import { useLocation, Link, NavLink } from "react-router-dom";
import { useEffect, useRef } from "react";
import "./header.scss";
import logo from "../../assets/tmovie.png";
const headerNav =[
    {
        display:'Home',
        path:'/'
    },
    {
        display:'Movies',
        path:'/movie'
    },
    {
        display:'TV Series',
        path:'/tv'
    }

]
function Header()
{
    const {pathname}= useLocation();
    const headerRef= useRef(null);
    const active = headerNav.findIndex(e=>e.path===pathname);
    useEffect(()=>
    {
        const shrinkHeader= ()=>
        {
            if(document.body.scrollTop> 100 ||document.documentElement.scrollTop>100) headerRef.current.classList.add('shrink');
            else headerRef.current.classList.remove('shrink');
        }
        window.addEventListener('scroll', shrinkHeader);
        return ()=>window.removeEventListener('scroll', shrinkHeader);
    })
    return (
        <div className="header" ref={headerRef}>
           <div className="header__wrap container">
               <div className="logo">
                   <img src={logo} alt="logo"/>
                   <Link to="/">tMovies</Link>
               </div>
               <ul className="header__nav">
                   {headerNav.map((item, index)=>(
                       <li key={index} className={index === active ? 'active' :''}>
                         <Link to={item.path}>{item.display}</Link>
                       </li>
                   ))}
               </ul>
           </div>
        </div>
    )
}
export default Header;