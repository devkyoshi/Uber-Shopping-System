import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function RefundForm(){
    const [formData,setFormData] = useState({
        orderId : '',
        accountHolder: '',
        accountSortCode: '',
        accountNumber: ''
    })

    const {complaintId , itemId} = useParams();

    return(
        <div>
            
        </div>
    )
}