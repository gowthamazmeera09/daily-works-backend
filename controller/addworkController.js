const ADDWORK = require ('../model/Addwork');
const User = require ('../model/User');

const workadding = async(req, res)=>{
    const {workname,experiance,location} = req. body;
    try {
        const user = await User.findById(req.userId);
        if(!user){
            return res.status(400).json({message:"user not found"})
        }
        const addedwork = await ADDWORK.findOne({workname});
        if(addedwork){
            return res.status(500).json({message:"this work is already exists"})
        }
        const newwork = new ADDWORK({
            workname,
            experiance,
            location,
            user: user._id
        })
        const savedwork = await newwork.save();

        user.addwork.push(savedwork);

        await user.save();

        res.status(201).json({success:"work added successfully"})
        
    } catch (error) {
        console.log(error);
        res.status(404).json({error:"internal server error"})
    }
}


module.exports = {workadding}