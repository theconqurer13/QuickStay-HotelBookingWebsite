import stripe from 'stripe';
import Booking from '../models/Booking.js'
// API to handel stripe webhooks
export const stripeWebhook = async (req, res) => {
    // stripe Gateway initialize
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
    const sig = request.headers['stripe-signature'];
    let event;

    try {
        event = stripeInstance.webhoooks.constructEvent(req.body,sig,process.env.STRIPE_WEBHOOK_SECRET);

    } catch (error) {
        res.status(400).send(`Webhook Error:${err.message}`);

    }

    // handel the event
    if(event.type === 'payment_intent.succeeded'){
        const paymentIntent = event.data.object;
        const paymentIntentId = paymentIntent.id;

        const session = await stripeInstance.checkout.sessions.list({
            payment_intent:paymentIntentId,
        });

        const {bookingId} = session.data[0].metadata;
        // mark payment as Paid
        await Booking.findByIdAndUpdate(bookingId,{isPaid:true,paymentMethod:"Stripe"} )
    }else{
        console.log("Unhadeled event type:",event.type)
    }
    res.json({received:true});
}