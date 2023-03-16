import React from "react";
import PropTypes from "prop-types";
import "./button.scss";
export const OutlineButton=props=>(
<button className={`btn ${props.className}`} onClick={props.onClick ? props.onClick() : null}>
    {props.children}
</button>)
Button.OutlineButton={
    onClick:PropTypes.func
}
function Button(props)
{
    return (
        <button className={`btn ${props.className}`} onClick={props.onClick ? ()=>props.onClick() : null}>
            {props.children}
        </button>            
    )
}

Button.propTypes={
    onClick:PropTypes.func
}
export default Button;