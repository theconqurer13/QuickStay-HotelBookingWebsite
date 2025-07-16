import React from 'react'
import SearchForm from './SearchForm'

const Hero = () => {
  return (
    <div className='flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-[url("src/assets/heroImage.png")] bg-no-repeat bg-cover bg-center h-screen'>
    <p className='bg-[#49B9FF]/50 px-3.5 py-1 rounded-full mt-20 '>The Ultimate Hotel Experience</p>
    <h1 className='font-playfair text-2xl md:text-5xl ms:text-[56px] md:leading-[56px] font-bold md:font-extrabold max-w-cl mt-4'>Discover Your Perfect Gateway <br /> Destination</h1>
    <p >
        Unparalleled luxury and comfort await you at our hotel. With its prime location and <br />exceptional service,you'll feel right.Start your journey today!
    </p>
    <SearchForm/>
    </div>
  )
}

export default Hero