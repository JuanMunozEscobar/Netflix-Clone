import { User } from '../model/user.model.js';
import bcryptjs from "bcryptjs";

export async function signup(req,res){
    try {
        const {email, password, username} = req.body
        if(!email || !password || !username){
            return res.status(400).json({success: false, message: "All fields are required"});
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({success: false, message: "Invalid Email"});
        }
        if(password.length < 6){
            return res.status(400).json({success: false, message: "Passed Must be at least 6 characters"});
        }

        const existingUserByEmail = await User.findOne({email:email});

        if(existingUserByEmail){
            return res.status(400).json({success: false, message: "Email Already Exist"});
        }


        const existingUserByUsername = await User.findOne({username:username});

        if(existingUserByUsername){
            return res.status(400).json({success: false, message: "Username Already Exist"});
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword  = await bcryptjs.hash(password,salt); // this will keep the Users password unreadable from my view point

        const PROFILE_PICS = ["/avatar1.png", "./avatar2.png", "./avatar3.png"];
        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

        const newUser = new User({
            email:email,
            username:username,
            password:hashedPassword,
            image:image
        });

        await newUser.save();

        res.status(201).json({success: true, Message: { // This will return the User info but not the password
            ...newUser._doc,
            password: ""
        }});

    } catch (error) {
        console.log("Error in Signup controller ", error.message);
        res.status(500).json({success: false, message: "Internal Sever Error"});
    }
}
export async function login(req,res){
    res.send("Login route");
}
export async function logout(req,res){
    res.send("Logout route");
}