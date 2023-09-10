import mongoose from "../db/conn.js";


const checkoutSchema = new mongoose.Schema({
  name: String,
  email: String,
  address: String,
  cardNumber: String,
  expirationDate: String,
  cvv: String,
    createdAt: { type: Date, default: Date.now },
});

const CheckOutModel = mongoose.model('Checkout', checkoutSchema);
export default CheckOutModel;

