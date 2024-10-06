const User = require ('../model/User');
const jwt = require ('jsonwebtoken');
const bcrypt = require ('bcryptjs');
const dotEnv = require ('dotenv');
const path = require ('path');

dotEnv.config();

const secretKey = process.env.MyNameIsMySecretKey 

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });




const userRegister = async(req, res)=>{
    const {username,email,password,phonenumber} = req.body;
    const profilePicture = req.file ? req.file.path : ''; 

    try {

        const userEmail = await User.findOne({email})
        if(userEmail){
            return res.status(400).json({taken:"email already taken"})
        }
        const userPhoneNumber = await User.findOne({phonenumber})
        if(userPhoneNumber){
            return res.status(400).json({taken:"this phonenumber is already used"})
        }

        const hashedpassword = await bcrypt.hash(password, 10)


        const newuser = new User({
            username,
            email,
            password:hashedpassword,
            phonenumber,
            profilePicture 

        });
        await newuser.save();
        res.status(201).json({message:"user registered successfully",user: newuser});
        console.log('registered')

    } catch (error) {
        console.error(error);
        res.status(400).json({error:"internal server error"})
    }
}

const userLogin = async(req, res)=>{
    const{email,password} = req.body
    try{
        const user = await User.findOne({email})
        if(!user || !(await bcrypt.compare(password, user.password))){
            return res.status(401).json({error:"invalid username or password"})
        }
        const token = jwt.sign({userId:user._id},secretKey,{expiresIn:"1h"})
        


        res.status(200).json({success:"Login successful",token,userId:user._id,profilePicture: user.profilePicture ? `${"https://daily-work-backend.onrender.com/"}${user.profilePicture}` : ''})
        console.log(email,token,user._id);
    }catch(error){
        console.log(error);
        res.status(405).json({error:"internal server error"})
    }
}

const getAllUsers = async(req, res)=>{
    try {
        const users = await User.find().populate('addwork');
        res.json({users})
    } catch (error) {
        console.error(error);
        res.status(404).json({error:"internal server error"})
    }
}
const getUserById = async(req, res)=>{
    const userId = req.params.id
    try {
        const user = await User.findById(userId).populate('addwork');
        if(!user){
            return res.status(400).json({error:"user not found"});
        }
        res.status(201).json({user})
        
    } catch (error) {
        console.error(error);
        res.status(404).json({error:"internal server error"})
    }
}



module.exports = {
    userRegister: [upload.single('profilePicture'), userRegister],
    userLogin,
    getAllUsers,
    getUserById
};