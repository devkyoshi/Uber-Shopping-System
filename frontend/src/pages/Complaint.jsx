import React,{useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import axios  from 'axios'

export default function Complaint(){
    const userId = useSelector((state) => state.userId);
    const [complaints,setComplaints] = useState([]);

    
    return(
        <div className='inner-layout'>
         Complaint
        </div>
    )
}