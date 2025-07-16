import React from 'react'
import Hero from '../components/Hero'
import FeatureDestination from '../components/FeatureDestination'
import ExclusivOffers from '../components/ExclusivOffers'
import Testimonial from '../components/Testimonial'
import NewsLetter from '../components/NewsLetter'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
        <Hero/>
        <FeatureDestination/>
        <ExclusivOffers/>
        <Testimonial/>
        <NewsLetter/>
       
    </>
  )
}

export default Home