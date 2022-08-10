import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {  AuthContext } from "../../utils/Auth";






export default function Profile() {

    const navigate=useNavigate()
    /* console.log(useAuth) */
   

    /* const auth = useAuth() */

    const handleLogout = () => {
      /*   auth.logout() */
        navigate('/')
    }

    return (
        <div > 
            {/* Hello {auth.user}! */}
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}