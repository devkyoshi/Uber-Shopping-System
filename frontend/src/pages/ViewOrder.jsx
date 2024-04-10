import React from 'react';
import { OrdersTable } from '../components/viewOrderCom/OrdersTable';
import { DeliveryCard } from '../components/viewOrderCom/DeliveryCard';
import { NoteCard } from '../components/viewOrderCom/NoteCard';

export default function ViewOrder() {
  return (
    <div>
      <div className='main-layout bg'>
        <div className='inner-layout flex flex-wrap pb-3 justify-center'>
          <OrdersTable />
            <div className="ml-4 pt-14">
            <DeliveryCard />
          </div>
          <div className="ml-4 pt-14">
            <NoteCard />
          </div>
        </div>
      </div>
    </div>
  );
}

