// import stripe from 'stripe';
// import mongoose from '../db/conn.js'
// import paymentSchema from '../models/paymentModel.js';

// export const userModel = mongoose.model("user", userSchema);
// export const paymentModel = mongoose.model("payment", paymentSchema);
// export const membershipTypeModel = mongoose.model("membershipType", membershipTypeSchema);

// export async function makePayment(req,res){
//     const {firstName, address, price, paymentMethod,currency  } = req.body;

//     let payment = new paymentModel();

//     payment.user.firstName = firstName;
//     payment.user.address = address;
//     payment.membershipType.price = price;
//     payment.paymentMethod = paymentMethod;
//     payment.currency = currency;



// }




import stripe from 'stripe'; // Assuming you've properly configured the Stripe package
import mongoose from '../db/conn.js';
import paymentSchema from '../models/paymentModel.js';

// export const userModel = mongoose.model("user", userSchema);
export const paymentModel = mongoose.model("payment", paymentSchema);
// export const membershipTypeModel = mongoose.model("membershipType", membershipTypeSchema);

export async function makePayment(req, res) {
  const { firstName, address, price, paymentMethod, currency } = req.body;

  try {
    // Create a new payment in the database
    const payment = new paymentModel({
      user: {
        firstName: firstName,
        address: address,
      },
      membershipType: {
        price: price,
      },
      paymentMethod: paymentMethod,
      currency: currency,
    });

    // Save the payment to the database
    await payment.save();

    // Use Stripe to process the payment
    const stripe = stripe('your_stripe_secret_key_here'); // Replace with your Stripe secret key
    const paymentIntent = await stripe.paymentIntents.create({
      amount: price * 100, // Stripe requires the amount in cents
      currency: currency,
      payment_method_types: [paymentMethod], // e.g., 'card'
    });

    // Send the client secret back to the client for payment confirmation
    res.json({ clientSecret: paymentIntent.client_secret });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Payment processing failed' });
  }
}
