import { Modal, Table, Button } from 'flowbite-react'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useSelector } from 'react-redux'
import { FaCheck, FaTimes } from 'react-icons/fa';

export default function ShowCustomers() {
    const { currentCustomer } = useSelector((state) => state.customer);
    const [customers,setCustomers] = useState([]);
    const [showMore,setShowMore] = useState(true);
    const [showModel,setShowModel] = useState(false);
    const [userIdToDelete,setUserIdToDelete] = useState('');
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch(`/customer/getusers`)
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

    const handleShowMore = async () => {
        const startIndex = customers.length;
        try {
            const res = await fetch(`/customer/getusers?startIndex=${startIndex}`);
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
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 mt-5'>
      {currentCustomer.adminType === 'customer' && customers.length > 0 ? (
        <>
            <Table hoverable className='shadow-md'>
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
            </Table>
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
        popup
        size='md'>
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
