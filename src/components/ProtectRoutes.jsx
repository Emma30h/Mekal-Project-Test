import { useAuth } from "../context/authContext"
import { Navigate } from "react-router-dom";
import  { Toaster, toast } from 'react-hot-toast';

toast.loading("Loading")

export function ProtectedRoutes({children}){
    
    const {user, loading} = useAuth()

    if(loading) return   <h1>Loading...</h1>
    

    if(!user) return <Navigate to="/login" />

    return(
        <>
            {children}
        </>
    )
}