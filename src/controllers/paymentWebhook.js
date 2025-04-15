import Stripe from "stripe";
import fetch from 'node-fetch';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('❌ Webhook verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const {
      email,
      user_id,
      venue_id,
      sport_id,
      type,
      ticketInfo,
      date,
      time,
      owner_email
    } = session.metadata;

    console.log("Tewst"+JSON.stringify(session.metadata))

    const parsedTicket = typeof ticketInfo === 'string' ? JSON.parse(ticketInfo) : ticketInfo;
    const totalAmount = session.amount_total / 100;

    try {
      if (type === 'event') {
        await fetch('https://gateway-service-latest-k8uc.onrender.com/main/api/event-bookings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event_id: parseInt(venue_id),
            user_id: parseInt(user_id),
            user_email: email,
            number_of_tickets: parseInt(parsedTicket.quantity || '1'),
            total_amount: totalAmount,
            status: 'confirmed',
            email_sent: true,
            booking_date: new Date().toISOString()
          })
        });
        console.log("venue booked")
      } else if (type === 'venue') {
        await fetch('https://gateway-service-latest-k8uc.onrender.com/main/api/venue-bookings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            venue_id: parseInt(venue_id),
            sport_id: parseInt(sport_id),
            user_id: parseInt(user_id),
            user_email: email,
            number_of_courts: parseInt(parsedTicket.courts || '1'),
            total_amount: totalAmount,
            booking_date: date,
            start_time: time,
            end_time: time,
            status: 'confirmed',
            email_sent: true
          })
        });
        console.log("event booked")
      }

      await fetch('https://gateway-service-latest-k8uc.onrender.com/email/api/send-booking-emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userEmail: email,
          ownerEmail: owner_email,
          bookingDetails: {
            venue: type === 'venue' ? `Venue ID ${venue_id}` : `Event ID ${venue_id}`,
            date,
            time
          }
        })
      });

      console.log(`  email sent`);
    } catch (err) {
      console.error('❌ Failed to save booking or send email:', err.message);
    }
  }

  res.status(200).json({ received: true });
};

