
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.js";

import Home from "./components/home/Home.js";

import "./App.css"
import Today from "./components/Today.js";

import CalendarOverview from "./components/calendar/CalendarOverview";
import Lists from "./components/Lists.js";
import Contacts from "./components/contacts/Contacts.js";
import VacationPlaning from "./components/VacationPlaning.js";
import Birthdays from "./components/Birthdays.js";



import Todo from "./components/Todo.js";
import { useState, useEffect } from "react";



export default function App() {


    return (
        <div className="mainContainer" >
            <Navbar />
            
            <div className="App" >
            <Routes >
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/today" element={<Today />} />
                <Route path="/calendar" element={<CalendarOverview/>} />
                <Route path="/calendar/:calendarItemId" element={<CalendarOverview/>} />
                <Route path="/lists" element={<Lists />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/contacts/:contactId" element={<Contacts />} />
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

