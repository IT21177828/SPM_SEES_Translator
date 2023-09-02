import mongoose from "../db/conn.js";
const user = new mongoose.Schema({
   
    name: {
        type: String
    }
    
});
export default user;