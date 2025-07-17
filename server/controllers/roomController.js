import Hotel from "../models/Hotel.js";



// API to create a new room for hotel
export const createRoom = async (req, res) => {
    try {
        const {roomType,pricePerNight,amenities} = req.body;
        const hotel = await Hotel.findOne({owner:req.auth.userId});
        if(!hotel){
            return res.status(404).json({success:false,message:"Hotel not found"});
        }

        

    } catch (error) {
        
    }
}

// API to get all rooms
export const getRooms = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

// API to get all rooms for a specific hotel
export const getOwnerRooms = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

// API to toggle availability of room 
export const toggleRoomAvailable = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}