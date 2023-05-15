import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { async } from "@firebase/util";

export function Login(){
    
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const { login, resetPassword } = useAuth()
    const navigate = useNavigate()
    const [error, setError] = useState()
    
    const handleChange = ({target: {name, value}})=>{
        setUser({...user, [name]: value})
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        setError(``)
        try {
            await login(user.email, user.password);
            navigate(`/`);
        } catch (error) {
            setError(error.message);
        }
    }

    const handleResetPassword = async()=>{
        if(!user.email) return setError("Please enter your email.")
        try {
            await resetPassword(user.email)
            setError("We sent you an email wuth a link to reset your password.")
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
        <div className="login-background">
            <div className="login-container">
                {error && <p className="login-error-message">{error}</p>}

                <form onSubmit={handleSubmit} className="login-form">
                    
                    <div className="login-input-container">
                        <label htmlFor="email">email:</label>
                        <input type="email" name="email" placeholder="user@mail.com" onChange={handleChange} />
                    </div>
                    <div className="login-input-container">
                        <label htmlFor="password">password:</label>
                        <input type={typeText} name="password" placeholder="******" onChange={handleChange}/>
                        <div className="show-password-container">
                            <input type="checkbox" onClick={handleCheckbox}/>
                            <span>show password</span>
                        </div>
                    </div>
                    <div className="login-container-button">
                        <button>Login</button>
                        <a href="#!" onClick={handleResetPassword}>Fogot your password?</a>
                    </div>
                </form>
                <p>Don't have an account? <Link to="/register" className="login-register">Register</Link></p>
            </div>

        </div>
    )
} 