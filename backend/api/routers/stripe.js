//DO THIS IN FREE TIME

// const stripe = require('stripe')('sk_test_51JlHhPLabn8L4XuZI15ka8dwbcdLZdkOS9rJjYvmjPscFffR64glPsii1evglfM7dqOKXZoDYkQpiTr21tBaTXkX004lA5Q6qP');
// const express = require('express');
// const stripeRouter = express.Router();
// // app.use(express.static('public'));

// const domain = 'http://localhost:3000/api/stripe';
// //NOTE: Do I need this?? It's giving me 404

// stripeRouter.post('/create-checkout-session', async (req, res) => {

//   const { price } = req.body
//   //NOTE: product price is NOT in the req.body, try require the get product price function??

//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         // TODO: replace this with the `price` of the product you want to sell
//         price: `${price}`,
//         quantity: 1,
//       },
//     ],
//     payment_method_types: [
//       'card',
//     ],
//     mode: 'payment',
//     success_url: `${domain}?success=true`,
//     cancel_url: `${domain}?canceled=true`,
//   });

//   res.redirect(303, session.url)
// });

// module.exports = stripeRouter;
