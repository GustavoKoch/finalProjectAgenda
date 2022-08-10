import React from "react";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
/* import { useAuth } from "../../utils/Auth"; */






export default function RequireAuth({children}) {
    const location=useLocation()
    /* const auth=useAuth() */
 
 /*   if(!auth.user){
    return <Navigate to='/login' state={{path: location.pathname}}/>
   } */

    return children
}