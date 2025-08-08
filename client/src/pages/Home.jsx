import React from 'react'
import Hero from '../components/Hero'
import FeatureDestination from '../components/FeatureDestination'
import ExclusivOffers from '../components/ExclusivOffers'
import Testimonial from '../components/Testimonial'
import NewsLetter from '../components/NewsLetter'
import Footer from '../components/Footer'
import RecommendedHotels from '../components/RecommendedHotels'

const Home = () => {
  return (
    <>
        <Hero/>
        <RecommendedHotels/>
        <FeatureDestination/>
        <ExclusivOffers/>
        <Testimonial/>
        <NewsLetter/>
       
    </>
  )
}

export default Home