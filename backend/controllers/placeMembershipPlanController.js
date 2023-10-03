import mongoose from "../db/conn.js";
import membership from "../models/membershipModel.js";
import membershipTypeSchema from "../models/membershipTypemodel.js";
import user from "../models/usermodel.js";

import jwt from "jsonwebtoken";


export const membershipTypeModel = mongoose.model("membershipType", membershipTypeSchema);
export const membershipModell = mongoose.model("membership", membership);
export const userModel = mongoose.model("user",user)



//acivate new membership
export async function activateMembership(req, res){
    const {email,name} = req.body;

    let membershipType = new membershipTypeModel();
    let user = new userModel();

    membershipType.name = name;
    user.email = email;


    try{
        const userObject = await userModel.findOne({email : req.body.email});
        const existingMembershipTypeModel = await membershipTypeModel.findOne({ name: req.body.name });
        

        if (existingMembershipTypeModel) {

            let membershipModel = new membershipModell();

            membershipModel.user = userObject.firstName;
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


//deactivate membership
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


// reactivate membership after deactivation
export async function reactivateMembership(req,res){
    const {id} = req.params;

    try{
        const membershipModel = await membershipModell.findOne({_id:id});

        if(membershipModel){
            membershipModel.status = "active";
            await membershipModel.save();
            res.send(membershipModel);
        }else{
            res.status(400).json({ error: "Membership does not exist" });
        }

    }catch(err){
        res.status(500).json({ error: "Something went wrong" });
    }
}