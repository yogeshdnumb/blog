import { useContext } from "react";
import { authContext } from "../contexts/authContext";
import axios from "../api/axios.js"

export default function useRefreshToken() {
  const {setAuth}=useContext(authContext)

  async function refresh(){
    const response=await axios.get("/auth/refresh",{withCredentials:true})
    setAuth({refreshToken:response.data.accessToken})
    console.log(response.data.accessToken);
    
    
  }
  return refresh
}