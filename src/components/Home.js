import React, { useState, useEffect } from "react";
import { Button } from '@mui/material';
import { Avatar } from '@mui/material';
import "./Home.css";
import { useNavigate } from "react-router-dom";

/* import NavBar from "../NavBar/NavBar"; */

/* import { useParams } from "react-router-dom"; */



function Home() {
    const [style, setStyle] = useState("calendar")
    const navigate = useNavigate();

    /*     const [fieldToSearch, setfieldToSearch] = useState();
    
        const handlePrevPage = () => {
          const prevSet = skip - limit;
          const currentPage = skip / limit;
          if (0 >= currentPage) return;
          setSkip(prevSet);
        }; */

    return (
        <div className="Home">
            <div className="containerHome">           
                <Button sx={{ m: "2rem" }} className="todayButton" variant="contained" color="warning" startIcon={<Avatar alt="list" src={'https://img.freepik.com/premium-vector/procrastination-work-time-action-today-timeline-management-postpone-schedule-task-job_159757-607.jpg?w=2000'} />} onClick={() => navigate("/today")}>Today</Button>
                <Button sx={{ m: "2rem" }} variant="contained" color="info" startIcon={<Avatar alt="calendar" src={'https://media.istockphoto.com/photos/calendar-2022-picture-id1332100729'} />} onClick={() => navigate("/calendar")}>Calendar</Button>
                <Button sx={{ m: "2rem" }} className="lists" variant="contained" color="warning" startIcon={<Avatar alt="list" src={'https://www.wikihow.com/images/thumb/3/38/Make-a-To-Do-List-Step-5-Version-3.jpg/v4-728px-Make-a-To-Do-List-Step-5-Version-3.jpg.webp'} />} onClick={() => navigate("/lists")}>All Lists: Todos, Shopping, Wish...</Button>
                <Button sx={{ m: "2rem" }} className="contacts" variant="contained" color="primary" startIcon={<Avatar alst="contacts" src={'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Contacts_iOS.svg/600px-Contacts_iOS.svg.png'} />} onClick={() => navigate("/contacts")}>Contacts</Button>
                <Button sx={{ m: "2rem" }} variant="contained" color="success" startIcon={<Avatar alst="vacation planing" src={'https://cdn.vectorstock.com/i/1000x1000/02/00/travel-vacation-airplane-flying-vector-21480200.webp'} />} onClick={() => navigate("/vacationplaning")}>Vacation planing</Button>
                <Button sx={{ m: "2rem" }} className="birthdays" variant="contained" color="primary" startIcon={<Avatar alst="birthdays" src={'https://img.freepik.com/fotos-premium/zwei-geschenkboxen-nahe-dem-kuchen-mit-alles-gute-zum-geburtstagkerzen-gegen-blauen-hintergrund_23-2148190488.jpg?w=1380'} />} onClick={() => navigate("/birthdays")}>Birthdays</Button>
            </div>
        </div>
    );
}

export default Home;
