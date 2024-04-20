import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div>
      <h1>Performance Report</h1>
      <div>
        <label>Month:</label>
        <input type="number" value={month} onChange={(e) => setMonth(e.target.value)} />
      </div>
      <div>
        <label>Year:</label>
        <input type="number" value={year} onChange={(e) => setYear(e.target.value)} />
      </div>
      {reportData ? (
        <div>
          <button onClick={handleDownload}>Download Report</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PerformanceReport;
