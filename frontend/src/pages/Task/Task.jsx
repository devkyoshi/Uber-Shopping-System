import React from "react";
import { AddTask } from "../../components/task/AddTask";
import { ViewTask } from "../../components/task/ViewTask";
import { ViewTasks } from "../../components/task/ViewTasks";
import { ManageTask } from "../../components/task/ManageTask";
import DriverTable from "../../components/task/DriverTable";
import OrderTable from "../../components/task/OrderTable";
import { SideBar } from "../../components/SideBar";
import { Footer } from "../../components/Footer";

export default function Task( props ) {
    const {taskId, orderId, driverId, branchID}  = props;
  return (
    <div>
        <div className='main-layout bg'>
            <SideBar/>
            <div className='inner-layout'> 
                <AddTask orderId={orderId} driverId={driverId}/>
            </div>
            <div className='inner-layout'> 
                <ViewTask taskId={taskId} />
            </div>
            <div className='inner-layout'> 
                <ManageTask taskId={taskId} />
            </div>
            <div className='inner-layout'> 
                <ViewTasks/>
            </div>
            <div className='inner-layout'> 
                <OrderTable  orderId={orderId}   />
            </div>
            <div className='inner-layout'> 
                <DriverTable  driverId={driverId} branchID={branchID}/>
            </div>
           
        </div>
         <Footer/>
    </div>
  )
}