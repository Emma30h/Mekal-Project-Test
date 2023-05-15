import { useAuth } from "../context/AuthContext";
import { DashboardBody } from "./DashboardBody";
import { DashboardFooter } from "./DashboardFooter";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import  { Toaster, toast } from 'react-hot-toast';

export function Home(){

    const {user, logout, loading} = useAuth()

    console.log(user)

    const handleLogout = async()=>{
        await logout()
    }

    if(loading) return <h1>Loading...</h1>

    return(
        <>
            <div className="dashboard-container">
                <section className="dashboard-header">
                    <h1>{`Dashboard`}</h1>
                    <div className="container-user">
                        <p><FontAwesomeIcon icon={faUser}/><span>{user.email}</span></p>
                        <button onClick={handleLogout}><FontAwesomeIcon icon={faArrowRightFromBracket} />Logout</button>
                    </div>
                </section>
                <DashboardBody/>
                <DashboardFooter/>
                <Toaster toastOptions={{
                    duration: 4000,
                    style:{
                        background: `#363636`,
                        color: "white"
                    },
                    position: "bottom-right"
                }}/>
            </div>
        </>
    )
} 
