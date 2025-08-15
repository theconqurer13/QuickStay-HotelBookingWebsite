import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on('connected',()=>{
            console.log('✅ MongoDB connected successfully')
        });
        
        mongoose.connection.on('error',(err)=>{
            console.error('❌ MongoDB connection error:', err.message)
        });
        
        await mongoose.connect(`${process.env.MONGODB_URI}/hotel-booking`)
        console.log('🚀 Database connection established')
    } catch (error) {
        console.error('💥 Database connection failed:', error.message)
         // Exit process if database connection fails
    }
}

export default connectDB;
