import React, { useEffect, useState } from 'react';
import { Button } from 'flowbite-react';
import { useSelector } from 'react-redux';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export default function ManageEmp_salary() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser._id]);

  const generatePDF = () => {
    const input = document.getElementById('Salary');
    html2canvas(input, { scrollY: -window.scrollY, logging: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const offsetX = (pdfWidth - imgWidth) / 2;
      const offsetY = 10;
      pdf.setFontSize(20);
      pdf.text('Salary Details', pdfWidth / 2, 20, null, null, 'center');
      pdf.addImage(imgData, 'PNG', offsetX, offsetY + 30, imgWidth, imgHeight);
      pdf.save('Salary.pdf');
    });
  };
  const usersWithTotalAmount = users.map(user => {
    
    const totalAmount = ((user.salary * user.Avg_rating) / 100) + user.salary;
    return { ...user, totalAmount }; // Adding totalAmount to the user object
  });

const totalSalary = usersWithTotalAmount.reduce((total, user) => total + user.totalAmount, 0);
const averageSalary = totalSalary / usersWithTotalAmount.length;
const highestSalary = Math.max(...usersWithTotalAmount.map(user => user.totalAmount), 0);
const lowestSalary = Math.min(...usersWithTotalAmount.map(user => user.totalAmount), Infinity);
const totalUsers = usersWithTotalAmount.length; 

const etfRate = 3.5; 
const epfRate = 11;

const etfContribution = (totalSalary * etfRate) / 100;
const epfContribution = (totalSalary * epfRate) / 100;

  // const totalSalary = users.reduce((total, user) => total + (user.salary || 0), 0);
  // const averageSalary = totalSalary / users.length;
  // const highestSalary = Math.max(...users.map(user => user.salary || 0), 0);
  // const lowestSalary = Math.min(...users.map(user => user.salary || Infinity), Infinity);
  // const totalUsers = users.length;

  // ETF and EPF rates (in percentage)
  

  // // Calculate ETF and EPF contributions
  // const etfContribution = (totalSalary * etfRate) / 100;
  // const epfContribution = (totalSalary * epfRate) / 100;

  return (
    <div style={{ width: '600px' }}>
      <>
      <h1 className=' ml-3 mt-3' style={{ fontWeight: '600', fontSize: '1.875rem' }}>Finance Details</h1>
      <p className='ml-3 mr-3 mb-3 '>
  This section provides a comprehensive overview of the financial details related to employee salaries within the organization.Use the "Generate PDF" button to export these details for further analysis or record-keeping.
</p>

        <Button className='m-3' gradientDuoTone='purpleToPink' type='button' style={{ backgroundColor: '#00008B' }} onClick={generatePDF}>Generate PDF</Button>
        <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid #000', borderRadius: '10px', overflow: 'hidden' }} id='Salary'className='m-3'>
          <div style={{ display: 'flex' ,borderBottom: '1px solid #000' }}>
            <div style={{ flex: 2, padding: '10px', borderRight: '1px solid #000', backgroundColor: '#ccc' }}>Category</div>
            <div style={{ flex: 1, padding: '10px', borderRight: '1px solid #000', backgroundColor: '#ccc' }}>Value in LKR</div>
          </div>
          <div style={{ display: 'flex' ,borderBottom: '1px solid #000' }}>
            <div style={{ flex: 2, padding: '10px', borderRight: '1px solid #000' }}>Funds needed</div>
            <div style={{ flex: 1, padding: '10px', borderRight: '1px solid #000' }}>{totalSalary.toFixed(2)}</div>
          </div>
          <div style={{ display: 'flex' ,borderBottom: '1px solid #000' }}>
            <div style={{ flex: 2, padding: '10px', borderRight: '1px solid #000' }}>Total Users</div>
            <div style={{ flex: 1, padding: '10px', borderRight: '1px solid #000' }}>{totalUsers}</div>
          </div>
          <div style={{ display: 'flex' ,borderBottom: '1px solid #000' }}>
            <div style={{ flex: 2, padding: '10px', borderRight: '1px solid #000' }}>Average Salary</div>
            <div style={{ flex: 1, padding: '10px', borderRight: '1px solid #000' }}>{averageSalary.toFixed(2)}</div>
          </div>
          <div style={{ display: 'flex' ,borderBottom: '1px solid #000' }}>
            <div style={{ flex: 2, padding: '10px', borderRight: '1px solid #000' }}>Highest Salary</div>
            <div style={{ flex: 1, padding: '10px', borderRight: '1px solid #000' }}>{highestSalary.toFixed(2)}</div>
          </div>
          <div style={{ display: 'flex' ,borderBottom: '1px solid #000' }}>
            <div style={{ flex: 2, padding: '10px', borderRight: '1px solid #000' }}>Lowest Salary</div>
            <div style={{ flex: 1, padding: '10px', borderRight: '1px solid #000' }}>{lowestSalary === Infinity ? "N/A" : lowestSalary.toFixed(2)}</div>
          </div>
          <div style={{ display: 'flex' ,borderBottom: '1px solid #000' }}>
            <div style={{ flex: 2, padding: '10px', borderRight: '1px solid #000' }}>Average ETF Contribution</div>
            <div style={{ flex: 1, padding: '10px', borderRight: '1px solid #000' }}>{etfContribution.toFixed(2)}</div>
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 2, padding: '10px', borderRight: '1px solid #000' }}>Average EPF Contribution</div>
            <div style={{ flex: 1, padding: '10px', borderRight: '1px solid #000' }}>{epfContribution.toFixed(2)}</div>
          </div>
        </div>
      </>
    </div>
  );
}
