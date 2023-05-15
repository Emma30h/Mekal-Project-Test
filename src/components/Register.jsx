import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { async } from "@firebase/util";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from "react";

export function Register(){
    
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const { signup } = useAuth()
    const navigate = useNavigate()
    const [error, setError] = useState()
    
    const handleChange = ({target: {name, value}})=>{
        setUser({...user, [name]: value})
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        setError(``)
        try {
            await signup(user.email, user.password);
            navigate(`/`);
        } catch (error) {
            setError(error.message);
        }
    }

    const [typeText, setTypeText] = useState("password")
    const [checkbox, setCheckbox] = useState(false)

    const handleCheckbox = (e)=>{
       setCheckbox(e.target.checked)
       if(!checkbox){
            setTypeText("text")
       }else{
            setTypeText("password")
       }
    }


    return(
        <div className="register-background">

            <div className="register-container">
                {error && <p className="register-error-message">{error}</p>}

                <form onSubmit={handleSubmit} className="register-form">
                    
                    <div className="register-input-container">
                        <label htmlFor="email">email:</label>
                        <input type="email" name="email" placeholder="email" onChange={handleChange} />
                    </div>
                    <div className="register-input-container">
                        <label htmlFor="password">password:</label>
                        <input type={typeText} name="password" placeholder="******" onChange={handleChange}/>
                        <div className="show-password-container">
                            <input type="checkbox" onClick={handleCheckbox}/>
                            <span>show password</span>
                        </div>
                    </div>

                    <button>Register</button>
                </form>
            </div>
             
        </div>
    )
} 