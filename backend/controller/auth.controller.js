import { User } from '../model/user.model.js';
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from '../utils/generateToken.js';


export async function signup(req, res) {
    try {
        const { email, password, username } = req.body
        if (!email || !password || !username) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "Invalid Email" });
        }
        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Password Must be at least 6 characters" });
        }

        const existingUserByEmail = await User.findOne({ email: email });

        if (existingUserByEmail) {
            return res.status(400).json({ success: false, message: "Email Already Exist" });
        }


        const existingUserByUsername = await User.findOne({ username: username });

        if (existingUserByUsername) {
            return res.status(400).json({ success: false, message: "Username Already Exist" });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt); // this will keep the Users password unreadable from my view point

        const PROFILE_PICS = ["/avatar1.png", "./avatar2.png", "./avatar3.png"];
        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

        const newUser = new User({
            email: email,
            username: username,
            password: hashedPassword,
            image: image
        });


        generateTokenAndSetCookie(newUser._id, res);

        await newUser.save();

        res.status(201).json({
            success: true, user: { // This will return the User info but not the password
                ...newUser._doc,
                password: ""
            }
        });

    } catch (error) {
        console.log("Error in Signup controller ", error.message);
        res.status(500).json({ success: false, message: "Internal Sever Error" });
    }
}
export async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required To Login" });
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ success: false, message: "Invalid email or password" }); //this is so other user cant tell what is missing
        }
        const isPasswordCorrect = await bcryptjs.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            success: true,
            user: {
                ...user._doc,
                password: ""
            }
        });


    } catch (error) {
        console.log("Error in login controller ", error.message)
        res.status(500).json({ success: false, message: "Internal Sever Error" });
    }
}
export async function logout(req, res) {
    try {
        res.clearCookie("jwt-netflix");
        res.status(200).json({ success: true, message: "Logged Out Successful" });
    } catch (error) {
        console.log("Error in Logout Controller ", error.message)
        res.status(400).json({ success: false, message: "Internal sever error" })
    }
}
export async function authCheck(req, res) {
    try {
        console.log("req.user: ", req.user);
        res.status(200).json({ success: true, user: req.user })
    } catch (error) {
        console.log("Error in authCheck: ", error.message);
        res.status(500).json({ success: false, message: "Internal Sever Error" });
    }
}