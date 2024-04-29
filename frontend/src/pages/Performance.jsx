import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SideBar } from '../components/SideBar';
import { Button, Card, CardBody, CardFooter, Input, Typography } from '@material-tailwind/react';

const PerformanceReport = () => {
  // State variables for report data, month, and year
  const [reportData, setReportData] = useState(null);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  // Effect to fetch report data when month or year changes
  useEffect(() => {
    const fetchReport = async () => {
      try {
        // Check if month and year are not empty
        if (month && year) {
          // Fetch report data from the server
          const response = await axios.get(`http://localhost:8070/Quality/Generate/quality-generate?month=${month}&year=${year}`, { responseType: 'blob' });
          // Set the fetched report data
          setReportData(response.data);
        }
      } catch (error) {
        console.error('Error fetching report:', error);
      }
    };

    fetchReport();
  }, [month, year]); // Dependency array for useEffect

  // Function to handle downloading the report
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
    <div>
        {/* Title */}
        <Typography variant="h5" color="blue-gray">
          Performance Report
        </Typography>
        
        {/* Description */}
        <Typography color="gray" className="mt-1 font-normal mb-5">
          These are details about the performance
        </Typography>
        
        {/* Card containing input fields and download button */}
        <Card className='bg-gray-100 border border-gray-300'>
          <CardBody>
            {/* Input fields for month and year */}
            <div className="flex w-full shrink-0 gap-2 md:w-max">
              <Input
                label='Month'
                color='black'
                value={month}
                className='w-full md:w-72'
                onChange={(e) => setMonth(e.target.value)}
              />
              <Input
                label='Year'
                color='black'
                value={year}
                className='w-full md:w-72'
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
          </CardBody>
          
          {/* Card footer containing the download button */}
          <CardFooter className="justify-center text-center">
            {reportData ? (
              // Render download button if report data is available
              <Button onClick={handleDownload}>Download Report</Button>
            ) : (
              // Render loading text if report data is not available
              <Typography color="gray" className="mt-1 font-normal justify-center">
                Loading...
              </Typography>
            )}
          </CardFooter>
        </Card>
     
    </div>
  );
};

export default PerformanceReport;
