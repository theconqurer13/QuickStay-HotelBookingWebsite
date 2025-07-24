import React, { useState } from 'react'
import Title from '../../components/Title'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const AddRoom = () => {

    const {axios,getToken} = useAppContext();

    const [images,setImages] = useState({
        1:null,
        2:null,
        3:null,
        4:null
    })
    const [inputs,setInputs] =useState({
        roomType:'',
        pricePerNight:0,
        amenities:{
            'Free Wi-Fi':false,
            'Free Brekfast':false,
            'Room Service':false,
            'Mountain View':false,
            'Pool Access':false
        }
    })

    const [loading,setLoading] = useState(false);

    const onSubmitHandler = async (e)=>{
        e.preventDefault()
        // check if all inputs are filled
        if(!inputs.roomType || !inputs.pricePerNight || !inputs.amenities || !Object.values(images).some(image => image)){
            toast.error("Please fill all the fields")
        }
        setLoading(true);
        try {
            const formData = new FormData()
            formData.append('roomType',inputs.roomType)
            formData.append('pricePerNight',inputs.pricePerNight)

            // Converting amenities to Arrays & keeping only enabled amenities
            const amenities = Object.keys(inputs.amenities).filter(key => inputs.amenities[key])
            formData.append('amenities',JSON.stringify(amenities))
            // Adding images to the form data
            Object.keys(images).forEach((key)=>{
                images[key] && formData.append(`images`,images[key])
            })
            
            const {data} = await axios.post('/api/rooms/',formData,{headers:{Authorization:`Bearer ${await getToken()}`}});

            if(data.success){
                toast.success(data.message);
                setInputs({
                    roomType:'',
                    pricePerNight:0,
                    amenities:{
                        'Free Wi-Fi':false,
                        'Free Brekfast':false,
                        'Room Service':false,
                        'Mountain View':false,
                        'Pool Access':false
                    }
                })
                setImages({1 : null,2 : null,3 : null,4:null})
            }else{
                // toast.error(data.message)
                toast.error("error at onSubmit handler")
            }



        } catch (error) {
            // toast.error(error.message)
            toast.error("error at catch of onSubmithandler") 
        }
        finally{
            setLoading(false)
        }
    }





  return (
    
        <form onSubmit={onSubmitHandler} >
            <Title align='left' font='outfit' title='Add Room' subTitle='Fill in the details carefully and accurate room details,pricing and amenities,to enhance he user booking experince'/>
            {/* {Upload area forimgaes} */}
            <p className='text-gray-800 mt-10'>Images</p>
            <div className='grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap'>
                {Object.keys(images).map((key)=>(
                    <label htmlFor={`roomImage${key}` } key={key}>
                        <img src={images[key] ? URL.createObjectURL(images[key]) : assets.uploadArea} alt=""  className='max-h-25 object-cover rounded cursor-pointer opacity-80'/>
                        <input type="file" name="" id={`roomImage${key}`} accept='image/*' hidden onChange={
                            (e)=>(
                                setImages({...images,[key]:e.target.files[0]})
                            )
                        } />
                    </label>
                ))}
            </div>
            <div className='w-full flex max-sm:flex-col sm:gap-4 mt-4'>
                <div className='flex-1 max-w-48'>
                    <p className='text-gray-800'>Room Type</p>
                    <select value={inputs.roomType} onChange={(e)=>(
                        setInputs({...inputs,roomType:e.target.value})
                    )}
                    className='border opacity-70 border-gray-300 mt-1 rounded p-2 w-full'>
                        <option value="">Select Room Type</option>
                        <option value="Single Bed">Single Bed</option>
                        <option value="Double Bed">Double Bed</option>
                        <option value="Luxury Room">Luxury Room</option>
                        <option value="Familty Suite">Familty Suite</option>
                    </select>
                </div>
                <div>
                    <p className=' text-gray-800'>Price <span className='text-xs'>/night</span></p>
                    <input 
                        type="number" 
                        placeholder='0' 
                        className='border border-gray-300 mt-1 rounded p-2 w-24' 
                        value={isNaN(inputs.pricePerNight) ? '' : inputs.pricePerNight} 
                        onChange={(e)=>(
                            setInputs({...inputs, pricePerNight: e.target.valueAsNumber})
                        )}
                    />
                </div>
            </div>
            <p className='text-gray-800 mt-4'>
                Amenities
            </p>
            <div className='flex flex-col flex-wrap mt-1 text-gray-400 max-w-sm'>
                    {Object.keys(inputs.amenities).map((amenity,index)=>(
                        <div key={index} className='flex items-center gap-2 '>
                            <input type="checkbox" id={`amenities${index+1}`} checked={inputs.amenities[amenity]} onChange={(e)=>(
                                setInputs({...inputs,amenities:{...inputs.amenities,[amenity]: !inputs.amenities[amenity]}})
                            )} className='cursor-pointer'/>
                            <label htmlFor={`amenities${index+1}`} className='text-gray-400 cursor-pointer'>{amenity}</label>
                        </div>  
                    ))}
            </div>
            <button className='bg-[#2563EB] text-white px-8 rounded py-2 mt-8 cursor-pointer' type='submit' disabled={loading}>
                { loading ? 'Adding...' : 'Add Room' }
            </button>
        </form>
    
  )
}

export default AddRoom