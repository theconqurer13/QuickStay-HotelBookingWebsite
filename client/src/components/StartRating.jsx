import React from 'react'
import { assets } from '../assets/assets'

const StartRating = ({rating=3}) => {
  return (
    <div className='flex gap-1'>
        {Array(5).fill(0).map((_, index) => (
             <img src={rating > index ? assets.starIconFilled : assets.starIconOutlined} alt="staricon"  className='w-4.5 h-4.5'/>
          ))}
    </div>
  )
}

export default StartRating