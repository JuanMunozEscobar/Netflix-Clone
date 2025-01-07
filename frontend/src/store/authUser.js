import axios from 'axios';
import toast from 'react-hot-toast';
import { create } from 'zustand';

export const useAuthStore = create((set)=>({
    user: null,
    isSigningUp: false, 
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
    logout: async () => {},
    auth: async () => {},
}));