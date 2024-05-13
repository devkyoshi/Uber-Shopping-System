import React, { useState } from 'react';
import { Button, Typography } from '@material-tailwind/react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Textarea, TextInput, Label } from 'flowbite-react';
import DashSidebar from '../../components/DashSidebar';

export default function DriverComplaintForm() {
    const { item_name, sm_name } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        driver_id:'',
        market_name: sm_name,
        sm_location: '',
        sm_latitude: '',
        sm_longitude: '',
        item_name:item_name,
        issue_type: '',
        description: ''
    });

    const [uploading, setUploading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
   

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setUploading(true);

            const response = await axios.post(
                'http://localhost:8070/Report/quality-report-add',
                formData
            );

            setSuccessMessage(response.data.message);
            navigate('/Dashboard?tab=Employee_DeliveriesDone');
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.error);
            } else {
                setErrorMessage('An error occurred, please try again later.');
            }
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            <div className="md:w-56">
                <DashSidebar />
            </div>
            <div className="inner-layout mt-5 ml-2 mr-5">
                <Typography variant="h1" className="mt-2 text-center font-semibold text-3xl mb-20">
                    Report Issue
                </Typography>
                <form onSubmit={handleSubmit} className="flex flex-col mb-2 gap-4">
                    <div className="flex flex-row gap-7 ml-5 mr-5">
                        <div className="flex flex-col flex-1 gap-2">
                            <div>
                                <Label htmlFor="customerId" className="block mb-2 font-bold">
                                    Driver Name:
                                </Label>
                                <TextInput
                                    type="text"
                                    id="customerId"
                                    name="driver_id"
                                    value={formData.driver_id}
                                    onChange={handleChange}
                                    className="w-full p-1"
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="itemName" className="block mb-2 font-bold">
                                    Item Name:
                                </Label>
                                <TextInput
                                    type="text"
                                    id="itemName"
                                    name="item_name"
                                    value={formData.item_name}
                                    onChange={handleChange}
                                    className="w-full p-1"
                                    required
                                    /*readOnly*/
                                />
                            </div>
                            <div>
                                <Label htmlFor="issueType" className="block mb-2 font-bold">
                                    Issue Type:
                                </Label>
                                <TextInput
                                    type="text"
                                    id="issueType"
                                    name="issue_type"
                                    value={formData.issue_type}
                                    onChange={handleChange}
                                    className="w-full p-1"
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="supmarketDescription" className="block mb-2 font-bold">
                                    Description:
                                </Label>
                                <Textarea
                                    type="text"
                                    id="supmarketDescription"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full p-2"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex flex-col flex-1 gap-2">
                            <div>
                                <Label htmlFor="supmarketName" className="block mb-2 font-bold">
                                    Supmarket Name:
                                </Label>
                                <TextInput
                                    type="text"
                                    id="supmarketName"
                                    name="market_name"
                                    value={formData.market_name}
                                    onChange={handleChange}
                                    className="w-full p-1"
                                    required
                                   /* readOnly*/
                                />
                            </div>
                            <div>
                                <Label htmlFor="supmarketLocation" className="block mb-2 font-bold">
                                    Supmarket Location:
                                </Label>
                                <TextInput
                                    type="text"
                                    id="supmarketLocation"
                                    name="sm_location"
                                    value={formData.sm_location}
                                    onChange={handleChange}
                                    className="w-full p-1"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 flex-1 gap-2">
                                <div>
                                    <Label htmlFor="supmarketLatitude" className="block mb-2 font-bold">
                                        Supmarket Latitude:
                                    </Label>
                                    <TextInput
                                        type="text"
                                        id="supmarketLatitude"
                                        name="sm_latitude"
                                        value={formData.sm_latitude}
                                        onChange={handleChange}
                                        className="w-full p-1"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="supmarketLongitude" className="block mb-2 font-bold">
                                        Supmarket Longitude:
                                    </Label>
                                    <TextInput
                                        type="text"
                                        id="supmarketLongitude"
                                        name="sm_longitude"
                                        value={formData.sm_longitude}
                                        onChange={handleChange}
                                        className="w-full p-1"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <Typography>
                        {errorMessage && <div className="text-red-800 mb-4">{errorMessage}</div>}
                    </Typography>
                    <Typography>
                        {successMessage && (
                            <div className="text-green-500 mb-4">{successMessage}</div>
                        )}
                    </Typography>
                    <Button
                        type="submit"
                        disabled={uploading}
                        className="bg-custom-gradient w-40 h-10 mx-auto mt-5 text-white py-2 px-4 border border-transparent rounded-md hover:bg-custom-gradient transition duration-300"
                    >
                        {uploading ? 'Uploading...' : 'Submit'}
                    </Button>
                </form>
            </div>
        </div>
    );
}
