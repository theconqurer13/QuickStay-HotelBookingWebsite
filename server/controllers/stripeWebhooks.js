import Stripe from 'stripe';
import Booking from '../models/Booking.js'
// API to handle Stripe webhooks
export const stripeWebhooks = async (req, res) => {
    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        console.error('Webhook signature verification failed:', error.message);
        return res.status(400).send(`Webhook Error: ${error.message}`);
    }

    try {
        // Handle the event
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
            const bookingId = session.metadata?.bookingId;
            if (bookingId) {
                await Booking.findByIdAndUpdate(bookingId, { isPaid: true, paymentMethod: 'Stripe' });
            }
        } else if (event.type === 'payment_intent.succeeded') {
            const paymentIntentId = event.data.object.id;
            const sessions = await stripeInstance.checkout.sessions.list({
                payment_intent: paymentIntentId,
                limit: 1,
            });
            const bookingId = sessions.data?.[0]?.metadata?.bookingId;
            if (bookingId) {
                await Booking.findByIdAndUpdate(bookingId, { isPaid: true, paymentMethod: 'Stripe' });
            }
        } else {
            console.log('Unhandled event type:', event.type);
        }

        res.json({ received: true });
    } catch (error) {
        console.error('Webhook processing error:', error);
        res.status(500).json({ received: false });
    }
}