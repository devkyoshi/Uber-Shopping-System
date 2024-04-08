import React from 'react'

const ConfirmationModal = ({ message ,onConfirm ,onCancel }) =>{
    return(
        <div className='fixed z-10 inset-0 overflow-y-auto'>
            <div className='flex items-center justify-content min-h-screen px-4'>
                <div className='fixed inset-0 transition-opacity'>
                    <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
                </div>
                <div className='bg-white rounded-lg overflow-hidden shadow-xl transform transition-all'>
                     <div className='bg-white px-4 py-6 sm:p-6'>
                         <div className='sm:flex sm:items-start'>
                             <div className='text-center sm:text-left sm:flex-grow'>
                                <h3 className='text-lg leading-6 font-medium text-gray-900'>{message}</h3>
                             </div>
                         </div>
                     </div>
                    <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                        <button onClick={onConfirm} className='mt-3 w-full inline-flex justify-center rounded-md  
                        border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base leading-6 font-medium 
                        text-white hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green  
                        transition ease-in-out duration-150 sm:text-sm sm:leading-5 mr-2'>
                            Confirm
                        </button>
                        <button onClick={onCancel} className='mt-3 w-full inline-flex justify-center rounded-md
                        border border-gray-300 shadow-sm px-4 py-2 bg-white text-base leading-6 font-medium
                        text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue 
                        transition ease-in-out duration-150 sm:text-sm sm:leading-5'>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal;