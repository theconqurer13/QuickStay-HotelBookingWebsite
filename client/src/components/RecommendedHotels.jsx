
import HotelCard from './HotelCard'
import Title from './Title'
import { useAppContext } from '../context/AppContext'
import { useEffect,useState } from 'react';
const RecommendedHotels = () => {
    const {rooms,searchedCities} = useAppContext();
    const [recommended, setRecommended] = useState([]);
    const filterHotels = ()=>{
        const filteredHotels = rooms.slice().filter(room => room?.hotel?.city &&
        Array.isArray(searchedCities) && 
        searchedCities.includes(room.hotel.city));
        setRecommended(filteredHotels);

    }
    useEffect(()=>{
        filterHotels();
    },[rooms,searchedCities])
  return recommended.length > 0 &&(
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20'>
        <Title title='Recommended Hotels' subTitle='Discover our handpicked selection of exceptional properties around the world , offering unparalleled luxury and unforgettable experiences' />
        <div className='flex flex-wrap items-center justify-center gap-6 mt-20'>
            {recommended.slice(0,4).map((room,index)=>(
                <HotelCard key={room._id} room={room} index={index}/>
            ))}
        </div>
        <button onClick={()=>{
            navigate('/rooms');
            scrollTo(0,0)
        }} className='my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-50 transition-all cursor-pointer'>
            View All Destination
        </button>
    </div>
  )
}

export default RecommendedHotels