import React from 'react'
import Title from './Title'
import { testimonials } from '../assets/assets'
import StartRating from './StartRating'
const Testimonial = () => {
  return (
    <div>
        <Title title="What our Guest Say" subTitle="Discover why discerning travelers consistently choose QuickStay for their exclusive and Luxurious accommodations around the world."/>
        <div className="flex flex-wrap items-center justify-center gap-6 mt-20 ">
                {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow max-w-xs">
                        <div className="flex items-center gap-3">
                            <img className="w-12 h-12 rounded-full" src={testimonial.image} alt={testimonial.name} />
                            <div>
                                <p className="font-playfair text-xl">{testimonial.name}</p>
                                <p className="text-gray-500">{testimonial.address}</p>
                            </div>
                        </div>
                        <div className=" items-center gap-1 mt-4">
                            <StartRating/>
                        </div>
                        <p className="text-gray-500 max-w-90 mt-4">"{testimonial.review}"</p>
                    </div>
                ))}
            </div>
    </div>
  )
}

export default Testimonial