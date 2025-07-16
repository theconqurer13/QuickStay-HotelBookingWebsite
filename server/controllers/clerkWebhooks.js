import User from "../models/User.js";
import { Webhook } from "svix";



const clerkWebhooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        // getting headers
        const headers = {
            "svix-id":req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],

        }
        // verifying headers
        await whook.verify(JSON.stringyfy(req.body),headers)

        // getting data from req body
        const {data,type} = req.body
        const userData = {
            _id:data.id,
            email:data.email_addresses[0].email_addresses,
            username:data.first_name + " " + data.last_name,
            image: data.image_url,

        }

        // switch cases for different events
        switch(type){
            case "user.created":{
                await User.create(userData);
                break;
            }

            case "user.updated":{
                await User.findOneAndUpdate(data.id,userData);
                break;

            }
            case "user.deleted":{
                await User.findOneAndDelete(data.id);
                break;
             }

             default :
                break;
        }
        res.json({success:true,message:"Webhook Recieved"})

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}

export default clerkWebhooks;