import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SideBar } from '../components/SideBar';
import {Button, Card, CardBody, CardFooter, Input, Typography} from '@material-tailwind/react'

const PerformanceReport = () => {
  const [reportData, setReportData] = useState(null);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    const fetchReport = async () => {
      try {
        if (month && year) {
          const response = await axios.get(`http://localhost:8070/Quality/Generate/quality-generate?month=${month}&year=${year}`, { responseType: 'blob' });
          setReportData(response.data);
        }
      } catch (error) {
        console.error('Error fetching report:', error);
      }
    };

    fetchReport();
  }, [month, year]);

  const handleDownload = () => {
    if (reportData) {
      const url = window.URL.createObjectURL(new Blob([reportData]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'performance_report.pdf');
      document.body.appendChild(link);
      link.click();
    }
  };

  return (
    <div className='main-layout'>
        <SideBar/>
     <div className="inner-layout">
     <Typography variant="h5" color="blue-gray">
      Performance Report
     </Typography>
     <Typography color="gray" className="mt-1 font-normal mb-5">
          These are details about the performance
     </Typography>
     <Card className=' bg-gradient-to-r from-pink-50 via-red-50 to-orange-50 border border-gray-300 '>
     <CardBody>
     <div className="flex w-full shrink-0 gap-2 md:w-max ">
        <Input type="number" 
               label='Month'
               color='blue-gray'
               value={month} 
               className='w-full md:w-72 '
               onChange={(e) => setMonth(e.target.value)} />

        <Input type="number"
               label='Year'
               color='blue-gray'
               value={year} 
               className='w-full md:w-72 '
               onChange={(e) => setYear(e.target.value)} />
      </div>
      </CardBody>
      <CardFooter className="justify-center text-center" >
      {reportData ? (
        <div >
          <Button onClick={handleDownload}>Download Report</Button>
        </div>
      ) : (
        <Typography color="gray" className="mt-1 font-normal justify-center">
          Loading...
        </Typography>
      )}
      </CardFooter>
      
      </Card>
      </div>
    </div>
    
  );
};

export default PerformanceReport;
