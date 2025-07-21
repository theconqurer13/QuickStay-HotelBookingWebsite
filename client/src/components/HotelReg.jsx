import React, { useState } from 'react';
import { assets, cities } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
// Removed the redundant 'import axios from 'axios';' since it's coming from context

const HotelReg = () => {
    // It's assumed your context provides an axios instance
    const { setShowHotelReg, axios, getToken, setIsOwner } = useAppContext();

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [contact, setContact] = useState("");
    // Set the initial state for the city to an empty string to match the placeholder option
    const [city, setCity] = useState("");

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        
        // Simple validation to ensure a city is selected
        if (!city) {
            toast.error("Please select a city.");
            return;
        }

        try {
            const { data } = await axios.post('/api/hotels', 
                { name, contact, address, city }, 
                { headers: { Authorization: `Bearer ${await getToken()}` } }
            );

            if (data.success) {
                toast.success(data.message);
                setIsOwner(true);
                setShowHotelReg(false);
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            // Provide more specific error feedback from the server if available
            const errorMessage = error.response?.data?.message || error.message;
            toast.error(errorMessage);
        }
    };

    return (
        // Using a standard z-index from Tailwind's scale (z-50 is typically the highest)
        <div onClick={() => setShowHotelReg(false)} className='fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-black/70'>
            <form onSubmit={onSubmitHandler} onClick={(e) => e.stopPropagation()} className='flex bg-white rounded-xl max-w-4xl max:md:mx-2'>
                <img src={assets.regImage} alt="reg-img" className='w-1/2 rounded-xl hidden md:block' />
                <div className='relative flex flex-col items-center md:w-1/2 p-8 md:p-10'>
                    <img src={assets.closeIcon} alt="close-icon" className='absolute top-4 right-4 h-4 w-4 cursor-pointer' onClick={() => setShowHotelReg(false)} />
                    <p className='text-2xl font-semibold mt-6'>
                        Register Your Hotel
                    </p>
                    {/* Hotel Name */}
                    <div className='w-full mt-4'>
                        <label htmlFor="name" className='font-medium text-gray-500 '>Hotel Name</label>
                        <input id='name' onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder='Name of the hotel' className='border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light' required />
                    </div>
                    {/* Phone */}
                    <div className='w-full mt-4'>
                        <label htmlFor="contact" className='font-medium text-gray-500 '>Phone</label>
                        <input id='contact' onChange={(e) => setContact(e.target.value)} value={contact} type="text" placeholder='Enter phone number' className='border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light' required />
                    </div>
                    {/* Hotel Address */}
                    <div className='w-full mt-4'>
                        <label htmlFor="address" className='font-medium text-gray-500 '>Address</label>
                        <input id='address' onChange={(e) => setAddress(e.target.value)} value={address} type="text" placeholder='Enter address' className='border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light' required />
                    </div>
                    {/* {select city dropdown} */}
                    <div className='w-full mt-4 max-w-60 mr-auto'>
                        <label htmlFor="city" className='font-medium text-gray-500 ' >City</label>
                        {/* FIX: Moved onChange and value props from the label to the select element */}
                        <select 
                            id="city" 
                            onChange={(e) => setCity(e.target.value)} 
                            value={city} 
                            className='border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light'
                            required
                        >
                            {/* FIX: Changed value to empty string for a proper placeholder */}
                            <option value="">Select City</option>
                            {cities.map((cityItem) => (
                                <option key={cityItem} value={cityItem}>{cityItem}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className='bg-indigo-500 hover:bg-indigo-600 transition-all text-white mr-auto px-6 py-2 rounded cursor-pointer mt-6'>
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
};

export default HotelReg;
