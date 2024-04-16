import React,{useEffect, useState} from 'react'
import { SideBar } from '../../components/SideBar'
import {Typography} from '@material-tailwind/react'


export default function ComplaintAdmin(){
    return(
        <div className='main-layout'>
            <SideBar/>
            <div className='inner-layout'>
            <Typography variant="h5" color="blue-gray">
              Recent Complaints
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              These are details about the last complaints
            </Typography>

            </div>

        </div>
    )
}