import React,{useState} from 'react';

export default function ComplaintForm(){
    const [orderId , setOrderId] = useState('');
    const [paymentId,setPaymentId] = useState('');
    const [complaintType,setComplaintType] = useState('');
    const [resolvingOption,setResolvingOption] = useState('');
    const [quantity,setQuantity] = useState(0);

    return(
        <div>
            complaint
        </div>
    )
}