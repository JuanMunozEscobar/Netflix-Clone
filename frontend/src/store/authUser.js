import toast from 'react-hot-toast';
import { create } from 'zustand';
import axios from 'axios';



export const useAuthStore = create((set)=>({
    user: null,
    isSigningUp: false, 
    isCheckingAuth: true,
    isLogingOut: false,
    signup: async (credentials) => {
        try {
            const response = await axios.post("/api/v1/auth/signup", credentials);
            set({user:response.data.user, isSigningUp:false});
            toast.success("Account Created successful");
        } catch (error) {
            toast.error(error.response.data.message || "An Error occured");
            set({isSigningUp:false, user:null});
        }
    },
    login: async () => {},
    logout: async () => {
        set({isLogingOut:true});
        try {
            await axios.post("/api/v1/auth/logout");
            set({user: null, isLogingOut:false});
            toast.success("Logged out successfully");
        } catch (error) {
            set({isLogingOut:false});
            toast.error(error.response.data.message || "Logout failed");
        }
    },
    authCheck: async () => {
        set({isCheckingAuth: true});
        try {
            const  response = await axios.get("/api/v1/auth/authCheck");
            set({user:response.data.user, isCheckingAuth:false});
        } catch (error) {
            console.log("An Error Occured in Checking Auth: " ,error.message)            
            set({isCheckingAuth: false, user:null});
        }
    },
}));