import mongoose from "../db/conn.js";
import membership from "../models/membershipModel.js";
import membershipTypeSchema from "../models/membershipTypemodel.js";

export const membershipTypeModel = mongoose.model("membershipType", membershipTypeSchema);
export const membershipModell = mongoose.model("membership", membership);


export async function activateMembership(req, res){
    const {name} = req.body;

    let membershipType = new membershipTypeModel();

    membershipType.name = name;

    

    try{

        // Check if membership type already exists
        const existingMembershipTypeModel = await membershipTypeModel.findOne({ name: req.body.name });

  
        if (existingMembershipTypeModel) {

            console.log("wd");

            // No existing membership type with the same name, proceed to save
            let membershipModel = new membershipModell();


            console.log("dcdscdqcvqcvevcwv");
            membershipModel.membershipType = existingMembershipTypeModel._id;
            membershipModel.startDate = new Date();
            membershipModel.endDate = new Date();
            membershipModel.endDate.setDate(membershipModel.endDate.getDate() + existingMembershipTypeModel.duration);
            membershipModel.status = "active";


            await membershipModel.save();
            res.send(membershipModel);
        }else{
            return res.status(400).json({
                error: "Membership Type does not exist"
            });
        }
    }catch(err){
        res.status(500).json({ error: "Something went wrong" });
    }


}

export async function deactivateMemberShip(req,res){
    const {id} = req.params;

    try{
        const membershipModel = await membershipModell.findOne({_id:id});

        if(membershipModel){
            membershipModel.status = "inactive";
            await membershipModel.save();
            res.send(membershipModel);
        }else{
            res.status(400).json({ error: "Membership does not exist" });
        }

    }catch(err){
        res.status(500).json({ error: "Something went wrong" });
    }
}