import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function CustomerRateTab() {
  const { currentCustomer } = useSelector(state => state.customer)
  const [employees, setEmployees] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [showMore,setShowMore] = useState(true);
  const [currentRating, setCurrentRating] = useState(0);

  // const handleShowMore = async () => {
  //   const startIndex = employees.length;
  //   try {
  //       const res = await fetch(`/Rating/getemployees?startIndex=${startIndex}`);
  //       const data =await res.json();
  //       if(res.ok){
  //           setEmployees((prev) => [...prev, ...data.employees]);
  //           if(data.employees.length < 9){setShowMore(false);}
  //       }
  //   } catch (error) {
  //       console.log(error.message);
  //   }
  // };

  useEffect(() => {
    const getemployeesAndRatings = async () => {
        try {
            const res = await fetch('/Rating/getemployees');
            const data = await res.json();
            if (res.ok) {
                setEmployees(data.employees);
                // if (data.employees.length < 9) {
                //     setShowMore(false);
                // }
                const ratingsData = {};
                for (const employee of data.employees) {
                    await getratings(employee._id, ratingsData);
                }
                setRatings(ratingsData);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    getemployeesAndRatings();
}, [currentCustomer._id]);

    const getratings = async (emp_ID, ratingsData) => {
        try {
            const res = await fetch(`/Rating/getratings/${emp_ID}`);
            const ratingData = await res.json();
            if(res.ok){
              ratingsData[emp_ID] = ratingData.rating;
            }
        } catch (error) {
            console.log(error.message);
        }
    }

  const renderStarRating = (emp_ID,emp_rating,currentRating, onRatingChange) => {
    const handleClick = async (starIndex) => {
      try {
        const res = await fetch(`/Rating/rateemployees/${emp_ID}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cus_rating: starIndex, cus_id: currentCustomer._id}),
        });
        const data = await res.json();
        if(res.ok) {
          try {
            const res = await fetch('/Rating/getemployees');
            const data = await res.json();
            if (res.ok) {
                setEmployees(data.employees);
                // if (data.employees.length < 9) {
                //     setShowMore(false);
                // }
                const ratingsData = {};
                for (const employee of data.employees) {
                    await getratings(employee._id, ratingsData);
                }
                setRatings(ratingsData);
            }
        } catch (error) {
            console.log(error.message);
        }
        }
      } catch (error) {
        console.log(error.message)
      }
    };

    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={(i < currentRating || i < emp_rating) ? 'text-yellow-500 cursor-pointer text-lg' : 'text-gray-300 cursor-pointer text-lg'} onClick={() => handleClick(i+1)}>
          ★
        </span>
      );
    }
    return stars;  
  };
  return (
    <div>
      <h1 className="text-4xl font-bold text-center mt-5 mb-11">Give Employee Rating</h1>
        {currentCustomer ? 
        (
            <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
                <p>Signed in as:</p>
                <img className='h-5 w-5 rounded-full object-cover' src='https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png' alt=''/>
                <Link to={'/Customerprofile?tab=profile'} className='text-xs text-cyan-600 hover:underline'>
                    @{currentCustomer.cus_username}
                </Link>
            </div>
        ): 
        (
            <div className='flex gap-1 text-sm text-teal-500 my-5'>
                You must be signed in to give feedbacks.
                <Link className='text-blue-500 hover:underline' to={'/Customerlogin'}>Login</Link>
            </div>
        )}

        {employees.length === 0 ? (
            <p className='text-sm my-5'>No employees yet!</p>
        ): (
            <>
              <table id='userTable' className='shadow-md mt-2' style={{borderCollapse: 'collapse', width: '100%', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}>
                <thead>
                <tr style={{backgroundColor: '#F3F4F6', borderBottom: '1px solid #D1D5DB'}}>
                    <th style={{padding: '10px', textAlign: 'left'}}>Date joined</th>
                    <th style={{padding: '10px', textAlign: 'left'}}>Employee details</th>
                    <th style={{padding: '10px', textAlign: 'left'}}>Rating</th>
                </tr>
                </thead>
                <tbody>
                {
                  employees.map((employee, index) => (
                    <tr style={{ backgroundColor: '#FFFFFF', marginBottom: index < employees.length - 1 ? '10px' : 0 }} key={employee._id}>
                      <td style={{ padding: '10px' }}>{new Date(employee.createdAt).toLocaleDateString()}</td>
                      <td className='flex' style={{ padding: '10px' }}>
                        <img src="https://www.366icons.com/media/01/profile-avatar-account-icon-16699.png" alt={employee._id} style={{ borderRadius: '9999px', width: '40px', height: '50px', objectFit: 'cover', backgroundColor: '#D1D5DB' }} />
                        <div>
                          <p className='ml-5' style={{ fontWeight: 'bold', color: '#4B5563' }}>{employee.username}</p>
                          <p className='ml-5'>Average rating: {employee.Avg_rating.toFixed(2)}</p>
                        </div>
                      </td>
                      <td>
                        {ratings[employee._id] && renderStarRating(employee._id, ratings[employee._id].cus_rating, currentRating, setCurrentRating)}
                      </td>
                    </tr>))
                }</tbody></table>
            </>
        )}


      {/* {
            showMore && (
                <button onClick={handleShowMore} className='w-full text-teal-500 self-center tect-sm py-7'>Show more</button>
            )
      } */}
    </div>
  )
}
