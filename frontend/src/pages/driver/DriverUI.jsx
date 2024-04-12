import React from 'react'
import { SideBar } from '../../components/SideBar';
import { DriverTab } from '../../components/driver/driverTab';

export default function DriverUI() {
  return (
    <div className="main-layout">
        <SideBar/>
        <div className="inner-layout">
          <DriverTab/>
        </div>
    </div>
  );
}
