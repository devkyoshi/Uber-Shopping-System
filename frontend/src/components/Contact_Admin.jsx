

import React from 'react';

function Contact_Admin() {
  const styles = {
    container: {
      backgroundColor: '#f0f0f0', 
      padding: '30px', 
     
    },
    contactUsPage: {
      fontFamily: 'Arial, sans-serif',
    },
    sectionHeader: {
      textAlign: 'center',
      fontWeight: 'bold',
      textDecoration: 'underline',
      fontSize: '24px', // You can adjust this value for the desired font size
    },
    employeeSupport: {
      marginBottom: '20px',
    },
    hrManagement: {
      borderTop: '1px solid #ccc',
      paddingTop: '20px',
    },
  };

  return (

    <div className="ml-60 mr-60 flex-1 justify-center flex flex-col" >
      <div className=' p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'  style={styles.contactUsPage}>
        <div style={styles.employeeSupport}>
          <h2 style={styles.sectionHeader}>Employee Support</h2>
          <p>Contact Number: +1234567890</p>
          <p>Email: employeesupport@example.com</p>
          <p>Headquarters Location: 123 Main Street, City, Country</p>
        </div>
        <br />
        <div style={styles.hrManagement}>
          <h2 style={styles.sectionHeader}>HR Management</h2>
          <p>Contact Number: +9876543210</p>
          <p>Name: John Doe</p>
          <p>Email: hrmanager@example.com</p>
        </div>
      </div>
    </div>
  );
}

export default Contact_Admin;


