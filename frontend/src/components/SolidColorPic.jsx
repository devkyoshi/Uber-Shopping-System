import React from 'react';
import delivery from '../img/delivery.jpg'
import service from '../img/service.jpg'

export function SolidColorPic(){
    return(
        <div className='solid-color-pic'>
            <img src={delivery} alt="delivery" className='delivery-img'></img>
            <img src={service} alt="delivery" className='service-img'></img>
            <div className='text-middle'>
                <h2>About Uber Shopping</h2>
                <p>A convenient way to shop for groceries</p>
            </div>
        </div>
    )
}

