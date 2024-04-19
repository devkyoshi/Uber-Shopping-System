import React, { useState } from 'react';
import axios from 'axios';

const AddOrderDelivery = ({ orderId, deliveryId, onDeliveryAdded, onDeliveryUpdated }) => {
    const [distance, setDistance] = useState('');
    const [costPerkm, setCostPerkm] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const charges = parseFloat(distance) * parseFloat(costPerkm);

        const deliveryData = {
            distance: parseFloat(distance),
            costPerkm: parseFloat(costPerkm),
            charges
        };

        try {
            if (onDeliveryUpdated) {
                await axios.put(`http://localhost:8070/Order/update-delivery/${orderId}/update-delivery/${deliveryId}`, deliveryData);
                onDeliveryUpdated();
            } else {
                await axios.post(`http://localhost:8070/Order/add-delivery/${orderId}`, deliveryData);
                onDeliveryAdded();
            }
            setDistance('');
            setCostPerkm('');
        } catch (error) {
            console.error('Error adding/updating delivery:', error);
        }
    };

    return (
        <div>
            <h3>{onDeliveryUpdated ? 'Update Delivery Details' : 'Add Delivery Details'}</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Distance (km):</label>
                    <input
                        type="number"
                        value={distance}
                        onChange={(e) => setDistance(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Cost Per km:</label>
                    <input
                        type="number"
                        value={costPerkm}
                        onChange={(e) => setCostPerkm(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">{onDeliveryUpdated ? 'Update' : 'Add'}</button>
            </form>
        </div>
    );
};

export default AddOrderDelivery;
