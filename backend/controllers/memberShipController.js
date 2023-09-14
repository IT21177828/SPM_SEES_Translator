import mongoose from "../db/conn.js";
import membershipTypeSchema from "../models/membershipTypemodel.js";


export const membershipTypeModel = mongoose.model("membershipType", membershipTypeSchema);



// create membership type
export  async function createMembership(req, res) {
    const{name,price,description} = req.body;

    let membershipType = new membershipTypeModel();

    membershipType.name = name;
    membershipType.price = price;
    membershipType.description = description;

    try{
        // Check if membership type already exists
        const existingMembershipTypeModel = await membershipTypeModel.findOne({ name: req.body.name });
  
        if (existingMembershipTypeModel) {
            return res.status(400).json({
                error: "Membership Type already exists"
            });
        }else{
            // No existing membership type with the same name, proceed to save
            await membershipType.save();
            res.send(membershipType);
        }


    }catch(err){
        res.status(500).json({ error: "Something went wrong" });
    }

}

export function viewMembership(req, res) {
    console.log("sddsavsd")
    membershipTypeModel.find(req.body)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.error(err); // Use console.error for error logging
        res.status(500).json({ message: "something wrong" });
      });
  }
  


export function updateMembershipInfo(req,res){
    const {name,price,description} = req.body;

    membershipTypeModel.updateOne({_id:req.params.id},{
        $set: {
            name:name,
            price:price,
            description:description

        },
    }).then((result)=>{
        res.send(result)
    }).catch((err)=>{
        console.log(err)
        res.status(500).json({message : "Something went wrong"})
    })
}

export function deleteMembership(req, res) {
    membershipTypeModel.deleteOne({ _id: req.params.id })
        .then((result) => {
            if (result.deletedCount === 0) {
                res.status(404).json({ message: "Membership not found" });
            } else {
                res.send(result);
            }
        })
        .catch((err) => {
            console.error(err); // Log the error for debugging
            res.status(500).json({ message: "Something went wrong" });
        });
}



