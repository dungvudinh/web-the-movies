import "./input.scss";
import * as React from "react"

function Input(props)
{
    return (
       <input type={props.type} value={props.value} placeholder={props.placeholder} 
       onChange={props.onChange ? props.onChange :null} onKeyUp={props.onKeyUp}/>
    )
}
export default Input;