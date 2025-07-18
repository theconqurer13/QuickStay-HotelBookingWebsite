import Booking from "../models/Booking.js"
import Room from "../models/Room.js";



    // Fucntion to check availability of room
    const checkAvailability = async ({checkInDate,checkOutDate,room}) => {
        try {
            const bookings = await Booking.find({
                room,
                checkInDate: { $lte: checkOutDate },
                checkOutDate: { $gte: checkInDate }
            });
            const isAvailable = bookings.length === 0;
            return isAvailable;
        } catch (error) {
            console.error(error.message);
        }

    }



// API To check availablity of room

export const checkAvailabilityAPI = async (req, res) => {
    try {
        const {room,checkInDate,checkOutDate} = req.body;
        const isAvailable = await checkAvailability({checkInDate,checkOutDate,room});
        res.json({isAvailable,success:true});
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}


// API to create a booking (new)
// POST/api/bookings/book

export const createBooking = async (req,res)=>{
    try {
        const {room,checkInDate,checkOutDate,guests} = req.body;
        const user = req.user._id;
        // before booking check availability
        const isAvailable = await checkAvailability({checkInDate,checkOutDate,room});

        if(!isAvailable){
            return res.json({success:false,message:"Room is not available for the given dates."});
        }

        // get total price for room
        const roomData = await Room.findById(room).populate("hotel");
        let totalPrice = roomData.pricePerNight;
        // calculate totalprice based on nights
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);

        const timeDiff = checkOut.getTime() - checkIn.getTime();
        const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

        totalPrice*= nights;
        const booking = await Booking.create({
            user,
            room,
            hotel:roomData.hotel._id,
            guests:+guests,
            totalPrice,
            checkInDate,
            checkOutDate
        });
        res.json({success:true,message:"Booking Created Successfully"})

    } catch (error) {
        res.json({success:false,message:"failed  create booking",error:error.message})
    }
}