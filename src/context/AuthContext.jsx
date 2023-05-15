import { createContext, useContext, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Context = createContext()

export const useAuth = ()=>{
    const authContext = useContext(Context)
    if(!authContext) throw new Error(`There is not auth provider`)
    return authContext
}

export function AuthProvider ({children}){
    
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const signup = (email, password)=> createUserWithEmailAndPassword(auth, email, password);

    const login = (email, password)=> signInWithEmailAndPassword(auth, email, password);

    const navigate = useNavigate()
    const logout = ()=> {
        signOut(auth)
    };

    const resetPassword = (email)=> sendPasswordResetEmail(auth, email)

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser)
            setLoading(false)
        })

        return ()=> unsubscribe();

    }, [])
    
    return(
        <Context.Provider value={{signup, login, user, logout, loading, resetPassword}}>
            {children}
        </Context.Provider>
    )
}