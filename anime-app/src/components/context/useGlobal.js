import {create} from "zustand"
import axios from "axios";
import toast from "react-hot-toast";


const BASE_URL = "http://localhost:5000";

export const useAnimeStore = create((set, get) => ({
    animes: [],
    loading: false,
    error: null,
    currentAnime: null,
    isAdmin: false,
    isLoggedIn: false,


    // Action to fetch anime data
    fetchAnimes: async () => {
        set({ loading: true});
        const timeout = setTimeout(()=>{
            set({loading:true})
          },100000000)
        try {
            const response = await axios.get(`${BASE_URL}/api/getAnimes`);
            set({ animes: response.data, error:null });
            toast.success("BINGO! You can watch animes now");
        } catch (err) {
            if(err.status === 429){set({ error: "Rate limit exceeded"});};
            console.log("Error fetching animes", err);
            toast.error("Failed to fetch animes");
        }finally{
            
            clearTimeout(timeout);
            set({loading: false});
        }
    },
    fetchAnime: async (id) => {
        set({loading: true});
        try{
            const response = await axios.get(`${BASE_URL}/api/getAnimeById/${id}`);
            set({currentAnime: response.data});
            toast.success("Success");
        }catch(err){
            console.log("Error fetching anime", err);
            toast.error("Failed to fetch anime");
        }finally{
            set({loading:false});
        }
    },
    fetchAdmin: async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return; 
    
            const response = await axios.get(`${BASE_URL}/admin/dashboard`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data?.message === "Welcome to the admin dashboard!") {
                set({ isAdmin: true });
            } else {
                set({ isAdmin: false }); 
            }
        } catch (err) {
            console.log("Error in fetchAdmin:", err);
            set({ isAdmin: false }); 
        }
    }
}));