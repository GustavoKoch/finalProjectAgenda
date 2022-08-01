
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";
import Home from "./components/Home.js";
import ListApp from "./components/ListApp.js";
import "./App.css"
import Today from "./components/Today.js";
import CalendarView from "./components/CalendarView";
import CalendarOverview from "./components/CalendarOverview";
import Lists from "./components/Lists.js";
import Contacts from "./components/Contacts.js";
import VacationPlaning from "./components/VacationPlaning.js";
import Birthdays from "./components/Birthdays.js";



import Todo from "./components/Todo.js";
import { useState, useEffect } from "react";

// import Todo from "./Todo.js"

export default function App() {


    return (
        <div className="mainContainer" >
            <Navbar />
            <div className="App" >
            <Routes >
                <Route path="/home" element={<Home />} />
                <Route path="/today" element={<Today />} />
                <Route path="/calendar" element={<CalendarOverview/>} />
                <Route path="/lists" element={<Lists />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/vacationPlaning" element={<VacationPlaning />} />
                <Route path="/birthdays" element={<Birthdays />} />
            </Routes>
            </div>
        {/*     <Footer /> */}
            {/*             <Navbar />
            <ListApp style={style} /> */}


        </div>
    )
}

