import React,{useEffect,useState} from 'react'
import {useNavigate } from 'react-router-dom'
function protractedRoute(props) {
    let component = props.component
    const navigate = useNavigate ()
    useEffect(()=>{
        if(!localStorage.getItem('token')){
            navigate('/login')
        }
    },[])
  return (
    <div>protractedRoute</div>
  )
}

export default protractedRoute