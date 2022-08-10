import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/Auth";
import "./profile.css"






export default function Profile() {

    const navigate = useNavigate()
    /* console.log(useAuth) */


    /* const auth = useAuth() */



    return (

        <div className="profile">
            <h2 >User Profile Card</h2>
            <div >
                <img className="imgprofile" src="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="John" />
            </div>
            <h1>John Doe</h1>
            <p className="title">Freelancer</p>
            <p>guso88@hotmail.com</p>
            <div>
                <a href="#"><i className="fa fa-dribbble"></i></a>
                <a href="#"><i className="fa fa-twitter"></i></a>
                <a href="#"><i className="fa fa-linkedin"></i></a>
                <a href="#"><i className="fa fa-facebook"></i></a>
            </div>
            <p><button id="buttonprof">Contact</button></p>

        </div>
    )
}