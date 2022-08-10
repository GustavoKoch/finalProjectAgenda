import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.js";

import "./App.css";

import Today from "./components/Today/Today.js";

import CalendarOverview from "./components/calendar/CalendarOverview";
import Lists from "./components/Lists.js";
import Contacts from "./components/contacts/Contacts.js";
import VacationPlaning from "./components/vacationPlaning/VacationPlaning.js";
import Birthdays from "./components/birthday/Birthdays.js";
import Profile from "./components/profile/Profile.js";
import Login from "./components/loginOrRegister/Login";
import Register from "./components/loginOrRegister/Register";
import { Button } from '@mui/material';
import { Avatar } from '@mui/material';
import RequireAuth from "./components/requireAuth.js/RequireAuth.js";

import "./components/home/Home";
import { useNavigate } from "react-router-dom";









/* MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedWarning MuiButton-sizeMedium MuiButton-containedSizeMedium todayButton css-1r2x2uj-MuiButtonBase-root-MuiButton-root */
/* MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedWarning MuiButton-sizeMedium MuiButton-containedSizeMedium todayButton css-1r2x2uj-MuiButtonBase-root-MuiButton-root */


export default function App() {
    const navigate = useNavigate();

    return (
        <div className="mainContainer" >
           
                <Navbar />
                <div className="mainContainer2" >
                    <div className="Home">
                        <div className="menuHome">
                            <Button sx={{ m: "2rem" }} className="todayButton" variant="contained" color="warning" startIcon={<Avatar alt="list" src={'https://img.freepik.com/premium-vector/procrastination-work-time-action-today-timeline-management-postpone-schedule-task-job_159757-607.jpg?w=2000'} />} onClick={() => navigate("/today")}>Today</Button>
                            <Button sx={{ m: "2rem" }}  className="calendarButtonMenu" variant="contained" color="info" startIcon={<Avatar alt="calendar" src={'https://media.istockphoto.com/photos/calendar-2022-picture-id1332100729'} />} onClick={() => navigate("/calendar")}>Calendar</Button>
                            <Button sx={{ m: "2rem" }} className="listsMenu" variant="contained" color="warning" startIcon={<Avatar alt="list" src={'https://www.wikihow.com/images/thumb/3/38/Make-a-To-Do-List-Step-5-Version-3.jpg/v4-728px-Make-a-To-Do-List-Step-5-Version-3.jpg.webp'} />} onClick={() => navigate("/lists")}>All Lists: Todos, Shopping, Wish...</Button>
                            <Button sx={{ m: "2rem" }} className="contactsMenu" variant="contained" color="primary" startIcon={<Avatar alt="contacts" src={'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Contacts_iOS.svg/600px-Contacts_iOS.svg.png'} />} onClick={() => navigate("/contacts")}>Contacts</Button>
                            <Button sx={{ m: "2rem" }} className="vacationPlaningMenu" variant="contained" color="success" startIcon={<Avatar alt="vacation planing" src={'https://cdn.vectorstock.com/i/1000x1000/02/00/travel-vacation-airplane-flying-vector-21480200.webp'} />} onClick={() => navigate("/vacationplaning")}>Vacation planing</Button>
                            <Button sx={{ m: "2rem" }} className="birthdaysMenu" variant="contained" color="primary" startIcon={<Avatar alt="birthdays" src={'https://img.freepik.com/fotos-premium/zwei-geschenkboxen-nahe-dem-kuchen-mit-alles-gute-zum-geburtstagkerzen-gegen-blauen-hintergrund_23-2148190488.jpg?w=1380'} />} onClick={() => navigate("/birthdays")}>Birthdays</Button>
                        </div>
                    </div>
                    <div className="App" >
                        <Routes >
                            <Route path="/" element={<Login />} />
                            <Route path="/home" element={<CalendarOverview />} />
                            <Route path="/today" element={<Today />} />
                            <Route path="/calendar" element={<CalendarOverview />} />
                            <Route path="/calendar/:calendarItemId" element={<CalendarOverview />} />
                            <Route path="/lists" element={<Lists />} />
                            <Route path="/contacts/:contactId" element={<Contacts />} />
                            <Route path="/contacts" element={<Contacts />} />
                            <Route path="/vacationPlaning" element={<VacationPlaning />} />
                            <Route path="/birthdays" element={<Birthdays />} />
                            <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </Routes>
                    </div>
                    {/*     <Footer /> */}
                    {/*             <Navbar />
            <ListApp style={style} /> */}

                </div>
           
        </div >
    )

}
