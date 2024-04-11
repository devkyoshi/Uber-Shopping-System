import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Refund(){
    const { complaintId } = useParams();
  // Fetch bank details using complaintId and display them
    return(
        <div>
            Refund
            console.log(complaintId);
        </div>
    )
}