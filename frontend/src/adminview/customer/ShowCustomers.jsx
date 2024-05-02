import { Modal, Button } from 'flowbite-react'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useSelector } from 'react-redux'
import { FaCheck, FaTimes } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function ShowCustomers() {
    const { currentCustomer } = useSelector((state) => state.customer);
    const [customers,setCustomers] = useState([]);
    const [showMore,setShowMore] = useState(true);
    const [showModel,setShowModel] = useState(false);
    const [userIdToDelete,setUserIdToDelete] = useState('');
    const [searchCustomer,setSearchCustomer] = useState('');
    const  location = useLocation();
    const navigate = useNavigate();
    const [searchData ,setSeacrhData] = useState({
        searchTerm: '',
        sort: 'desc'
    });
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermUrl = urlParams.get('searchTerm');
        const sortUrl = urlParams.get('sort');
        if(searchTermUrl){
            setSearchCustomer(searchTermUrl);
        }
        if(searchTermUrl || sortUrl){
            setSeacrhData({
                ...searchData,
                searchTerm: searchTermUrl,
                sort: sortUrl
            })
        }
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const seacrhQuery = urlParams.toString();
                const res = await fetch(`/customer/getusers?${seacrhQuery}`);
                if(!res.ok){
                    setLoading(false);
                    return;
                }
                if(res.ok){
                    const data = await res.json()
                    setCustomers(data.users);
                    setLoading(false);
                    if(data.users.length === 9){
                        setShowMore(true);
                    }
                    else{setShowMore(false)}
                }
            } catch (error) {
                setLoading(false);
                console.log(error.message);
            }
        };
        if(currentCustomer.adminType === 'customer'){
            fetchUsers();
        }
    }, [location.search])

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch('/customer/getusers')
                const data = await res.json()
                if(res.ok){
                    setCustomers(data.users);
                    if(data.users.length < 9){
                        setShowMore(false);
                    }
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        if(currentCustomer.adminType === 'customer'){
            fetchUsers();
        }
    }, [currentCustomer._id])

    const generatePDF = () => {
        const input = document.getElementById('userTable');
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
          pdf.text('User Report', pdfWidth / 2, 20, null, null, 'center');
          pdf.addImage(imgData, 'PNG', offsetX, offsetY + 30, imgWidth, imgHeight);
          pdf.save('user_report.pdf');
        });
      };

    const handleShowMore = async () => {
        const startIndex = customers.length;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex)
        const seacrhQuery = urlParams.toString(); 
        try {
            const res = await fetch(`/customer/getusers?${seacrhQuery}`);
            const data =await res.json();
            if(res.ok){
                setCustomers((prev) => [...prev, ...data.users]);
                if(data.users.length < 9){setShowMore(false);}
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleRemoveUsers = async () => {
        setShowModel(false);
        try {
            const res = await fetch(`/customer/delete/${userIdToDelete}`,
            {method: 'DELETE',}
        );
        const data = await res.json();
        if(!res.ok){
            console.log(data.message);
        }else{
            setCustomers((prev) => prev.filter((user) => user._id !== userIdToDelete));
            setShowModel(false);
            if(data.users.length < 9){setShowMore(false);}
        }
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', searchCustomer);
        const seacrhQuery = urlParams.toString();
        navigate(`?${seacrhQuery}`);
    }
    const handleChange =(e) => {
        if(e.target.id === 'searchTerm'){
            setSeacrhData({
                ...searchData,
                searchTerm: e.target.value
            });
        }
        if(e.target.id === 'sort'){
            const sortOrder = e.target.value || 'desc';
            setSeacrhData({
                ...searchData,
                sort: sortOrder
            });
        }
    }
    const handleSearch = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', searchData.searchTerm);
        urlParams.set('sort', searchData.sort);
        const seacrhQuery = urlParams.toString();
        navigate(`?${seacrhQuery}`);
    }
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 mt-5'>
      {currentCustomer.adminType === 'customer' && customers.length > 0 ? (
        <>
            <div className='mb-10 flex justify-between'>
            {!searchData.searchTerm && (<button className="mb-10"
                    style={{
                        padding: "0.5rem 1rem",
                        fontSize: "1rem",
                        borderRadius: "0.375rem",
                        color: "linear-gradient(90deg, #EC4899, #FFB037)",
                        background: "transparent",
                        border: "1px solid #EC4899",
                        outline: "none",
                        opacity: loading ? "0.7" : "1",
                        pointerEvents: loading ? "none" : "auto",
                        cursor: loading ? "not-allowed" : "pointer",
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.background =
                        "linear-gradient(90deg, #EC4899, #FFB037)";
                        e.target.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.background = "transparent";
                        e.target.style.color = "black";
                    }} onClick={generatePDF}>
                    Download PDF
            </button>)}
            <form onSubmit={handleSubmit} className='mb-10' style={{textAlign: 'right'}}>
                <div style={{ position: 'absolute', right: 80 }}>
                    <input
                        className='shadow-md'
                        type='text'
                        value={searchCustomer}
                        placeholder='Search..'
                        onChange={(e) => setSearchCustomer(e.target.value)}
                        style={{
                            padding: '0.5rem 2rem 0.5rem 1rem',
                            borderRadius: '0.375rem',
                            borderWidth: '1px',
                            borderColor: '#e5e7eb',
                            backgroundColor: '#f9fafb',
                            width: '100%',
                            fontSize: '1rem',
                            outline: 'none',
                        }}
                    />
                    <AiOutlineSearch
                        onClick={handleSubmit}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            right: '0.75rem',
                            transform: 'translateY(-50%)',
                            color: '#6b7280',
                        }}
                    />
                </div>
            </form></div>
            {searchData.searchTerm && (
            <div className='p-7'>
                <form className='flex flex-row gap-2' style={{textAlign: 'left'}} onSubmit={handleSearch}>
                    <div className='flex flex-1 flex-row items-center gap-2'>
                        <label className='whitespace-nowrap font-semibold'>Search Term:</label>
                        <input
                            type='text'
                            placeholder='Search...'
                            id='searchTerm'
                            value={searchData.searchTerm}
                            onChange={handleChange}
                            style={{
                                padding: '0.75rem 1rem',
                                borderRadius: '0.375rem',
                                borderWidth: '1px',
                                borderColor: '#e5e7eb',
                                width: '60%',
                                fontSize: '1rem',
                                outline: 'none',
                                boxShadow: 'none',
                            }}
                        />
                    </div>
                    <div className='flex flex-1 flex-row items-center gap-2'>
                        <label className='whitespace-nowrap font-semibold'>Sort:</label>
                        <select id='sort'
                                defaultValue={searchData.sort}
                                onChange={handleChange}
                                style={{
                                    padding: '0.75rem 1rem',
                                    borderRadius: '0.375rem',
                                    borderWidth: '1px',
                                    borderColor: '#e5e7eb',
                                    width: '60%',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    boxShadow: 'none',
                                }}
                        >
                            <option value='desc'>Latest</option>
                            <option value='asc'>Oldest</option>
                        </select>
                    </div>
                    <button 
                        className=' ml-24'
                        type='submit' 
                        disabled={loading} 
                        style={{
                            padding: '0.5rem 1rem',
                            fontSize: '1rem',
                            borderRadius: '0.375rem',
                            color: 'linear-gradient(90deg, #EC4899, #FFB037)',
                            background: 'transparent',
                            border: '1px solid #EC4899',
                            outline: 'none',
                            opacity: loading ? '0.7' : '1',
                            pointerEvents: loading ? 'none' : 'auto',
                            cursor: loading ? 'not-allowed' : 'pointer'
                        }}
                        onMouseEnter={(e) => { 
                            e.target.style.background = 'linear-gradient(90deg, #EC4899, #FFB037)';
                            e.target.style.color = 'white';
                        }}
                        onMouseLeave={(e) => { 
                            e.target.style.background = 'transparent';
                            e.target.style.color = 'black';
                        }}>
                        {loading ? 'Loading...' : 'Apply filters'}
                    </button>
                </form>
            </div>)}
            {/* <Table hoverable className='shadow-md'>
                <Table.Head>
                    <Table.HeadCell>Date created</Table.HeadCell>
                    <Table.HeadCell>User Image</Table.HeadCell>
                    <Table.HeadCell>Username</Table.HeadCell>
                    <Table.HeadCell>E-Mail</Table.HeadCell>
                    <Table.HeadCell>Admin</Table.HeadCell>
                    <Table.HeadCell>Remove</Table.HeadCell>
                </Table.Head>
                {customers.map((user) => (
                    <Table.Body className='divide-y' key={user._id}>
                        <Table.Row className='bg-white'>
                            <Table.Cell>{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>
                            <Table.Cell><img src='https://th.bing.com/th/id/OIP.eU8MYLNMRBadK-YgTT6FJQHaHw?rs=1&pid=ImgDetMain' alt={user._id} className='rounded-full w-10 h-10 object-cover bg-gray-500'/></Table.Cell>
                            <Table.Cell className='font-medium text-gray-900 '>{user.cus_username}</Table.Cell>
                            <Table.Cell>{user.cus_email}</Table.Cell>
                            <Table.Cell>{user.adminType !== 'null' ? (<FaCheck className='text-green-500'/>) : (<FaTimes className='text-red-500'/>)}</Table.Cell>
                            <Table.Cell>
                                <span onClick={() => {
                                    setShowModel(true);
                                    setUserIdToDelete(user._id);
                                }} className='font-medium text-red-500 hover:underline cursor-pointer'>
                                    Delete
                                </span>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                ))}
            </Table> */}
            {!searchData.searchTerm && (
            <table id='userTable' className='shadow-md mt-2' style={{borderCollapse: 'collapse', width: '100%', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}>
                <thead>
                <tr style={{backgroundColor: '#F3F4F6', borderBottom: '1px solid #D1D5DB'}}>
                    <th style={{padding: '10px', textAlign: 'left'}}>Date created</th>
                    <th style={{padding: '10px', textAlign: 'left'}}>User Image</th>
                    <th style={{padding: '10px', textAlign: 'left'}}>Username</th>
                    <th style={{padding: '10px', textAlign: 'left'}}>E-Mail</th>
                    <th style={{padding: '10px', textAlign: 'left'}}>Admin</th>
                    <th style={{padding: '10px', textAlign: 'left'}}>Remove</th>
                </tr>
                </thead>
                <tbody>
                    {customers.map((user, index) => (
                        <tr style={{backgroundColor: '#FFFFFF', marginBottom: index < customers.length - 1 ? '10px' : 0}} key={user._id}>
                        <td style={{padding: '10px'}}>{new Date(user.createdAt).toLocaleDateString()}</td>
                        <td style={{padding: '10px'}}><img src='https://th.bing.com/th/id/OIP.eU8MYLNMRBadK-YgTT6FJQHaHw?rs=1&pid=ImgDetMain' alt={user._id} style={{borderRadius: '9999px', width: '40px', height: '40px', objectFit: 'cover', backgroundColor: '#D1D5DB'}}/></td>
                        <td style={{padding: '10px', fontWeight: 'bold', color: '#4B5563'}}>{user.cus_username}</td>
                        <td style={{padding: '10px'}}>{user.cus_email}</td>
                        <td style={{padding: '10px'}}>{user.adminType !== 'null' ? (<span style={{color: '#22C55E'}}><FaCheck /></span>) : (<span style={{color: '#EF4444'}}><FaTimes /></span>)}</td>
                        <td style={{padding: '10px'}}>
                        <span onClick={() => {
                            setShowModel(true);
                            setUserIdToDelete(user._id);
                        }} style={{fontWeight: 'bold', color: '#EF4444', cursor: 'pointer', textDecoration: 'underline'}} className='hover:underline'>
                            Delete
                        </span>
                    </td>
                </tr>
                ))}
                </tbody>
            </table>)}
            {searchData.searchTerm && (
                <table className='shadow-md mt-2' style={{borderCollapse: 'collapse', width: '100%', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}>
                <thead>
                <tr style={{backgroundColor: '#F3F4F6', borderBottom: '1px solid #D1D5DB'}}>
                    <th style={{padding: '10px', textAlign: 'left'}}>Date created</th>
                    <th style={{padding: '10px', textAlign: 'left'}}>User Image</th>
                    <th style={{padding: '10px', textAlign: 'left'}}>Username</th>
                    <th style={{padding: '10px', textAlign: 'left'}}>E-Mail</th>
                    <th style={{padding: '10px', textAlign: 'left'}}>Admin</th>
                    <th style={{padding: '10px', textAlign: 'left'}}>Remove</th>
                </tr>
                </thead>
                <tbody>
                    {customers.map((user, index) => (
                        <tr style={{backgroundColor: '#FFFFFF', marginBottom: index < customers.length - 1 ? '10px' : 0}} key={user._id}>
                        <td style={{padding: '10px'}}>{new Date(user.createdAt).toLocaleDateString()}</td>
                        <td style={{padding: '10px'}}><img src='https://th.bing.com/th/id/OIP.eU8MYLNMRBadK-YgTT6FJQHaHw?rs=1&pid=ImgDetMain' alt={user._id} style={{borderRadius: '9999px', width: '40px', height: '40px', objectFit: 'cover', backgroundColor: '#D1D5DB'}}/></td>
                        <td style={{padding: '10px', fontWeight: 'bold', color: '#4B5563'}}>{user.cus_username}</td>
                        <td style={{padding: '10px'}}>{user.cus_email}</td>
                        <td style={{padding: '10px'}}>{user.adminType !== 'null' ? (<span style={{color: '#22C55E'}}><FaCheck /></span>) : (<span style={{color: '#EF4444'}}><FaTimes /></span>)}</td>
                        <td style={{padding: '10px'}}>
                        <span onClick={() => {
                            setShowModel(true);
                            setUserIdToDelete(user._id);
                        }} style={{fontWeight: 'bold', color: '#EF4444', cursor: 'pointer', textDecoration: 'underline'}} className='hover:underline'>
                            Delete
                        </span>
                    </td>
                </tr>
                ))}
                </tbody>
            </table>
            )}
            {
                showMore && (
                    <button onClick={handleShowMore} className='w-full text-teal-500 self-center tect-sm py-7'>Show more</button>
                )
            }
        </>
      ) : (
        <p>No users available in the system.</p>
      )}
      <Modal
        show={showModel}
        onClose={() => setShowModel(false)}
        >
            <Modal.Header/>
            <Modal.Body>
                <div className='text-center'>
                    <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 mb-4 mx-auto'/>
                    <h3 className='mb-5 text-lg text-gray-500 '>Are you sure you want to delete this user?</h3>
                    <div className='flex justify-center gap-4'>
                        <Button color='failure' onClick={handleRemoveUsers}>Yes, I'm sure</Button>
                        <Button color='gray' onClick={() => setShowModel(false)}>Cancel</Button>
                    </div>
                </div>
            </Modal.Body>
      </Modal>
    </div>
  )
}
