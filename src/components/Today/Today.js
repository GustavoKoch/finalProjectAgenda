import { getDay, parse, startOfWeek, format, set } from "date-fns";
import React, { useState, useEffect, useContext } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
/* import './CalendarOverview.css'; */
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ApiCalenderData from "../../services/ApiCalenderData";
import EventForm from './../calendar/EventForm';
import { useNavigate } from "react-router-dom";
import AuthContext from "../../utils/Auth"


const locales = {
    /*  "en-US": require("date-fns/locale/en-US"), */
    "en-GB": require("date-fns/locale/en-GB"),//We should change this to europe
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});



export default function Today() {
    const [newEvent, setNewEvent] = useState({ title: "", description: "", starts: "", ends: "" });
    const [allEvents, setAllEvents] = useState();

    const [daySelection, setDaySelection] = useState();
    const [selectedEvent, setSelectedEvent] = useState();
    const [popupEventsForm, setPopupEventsForm] = useState();
    
    const navigate = useNavigate()
    const { auth } = useContext(AuthContext); 
    /* console.log(auth)
    console.log(auth.accessToken) */
    const token=localStorage.getItem('myToken');
    console.log(token)
    /* const token= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmYyZGZiNzY3ZWY0MWY4YWM3NWI5MGYiLCJ1c2VyRW1haWwiOiJndXNvODhAaG90bWFpbC5jb20iLCJpYXQiOjE2NjAwODY0NjMsImV4cCI6MTY2MDE3Mjg2M30.I1aftX-vkHz171Tz_g46sBfoJSiZpqbIz8mtUchvIx0' */
    const extUrl = "calendar";
    const url = `https://projectberlin-backend.herokuapp.com/${extUrl}`;
    const url2 = `http://localhost:3031/${extUrl}`;
  
    const requestOptions = {
      method: 'GET',
      headers: {'Authorization':"Bearer "+ token, 'Content-Type': 'application/json'  },
    }
    useEffect(() => {
      fetch(url, requestOptions)
        .then((res) => res.json())
        .then((data) => {
          setAllEvents(data);
        /*   console.log(data); */
        })
        .catch((e) => console.log(e.message));
    }, [popupEventsForm]);


   /*  console.log(allCalendarItems); */

    function handleAddEvent() {
        setAllEvents([...allEvents, newEvent]);
    }
   
    const handleClickCalendar = (e) => {
        /*    console.log(e); */
    }

    const allEventsCalender=allEvents?.map((e)=>({
      "start":new Date(e.start),
      "end":new Date(e.end),
      "title":e.title,
      "description":e.description,
      "_id":e._id,
    }))

    const eventStyleGetter = () => { }

    const selectDay = (slotInfo) => {
        setSelectedEvent(
            {
                "activityList": [],
                "category":"",
                "contacts": [],
                "end": slotInfo.start,
                "img_url": '',
                "start": slotInfo.start,
                "title": '',
                "description": ''
            }
        );
        console.log(selectedEvent);
        console.log(slotInfo.start);
        setPopupEventsForm(true);
        navigate("/calendar");
    }

    const sendRequestandCloseForm = () => {
        handleAddEvent();
        setPopupEventsForm(false);
        setSelectedEvent(
            {
                "activityList": [],
                "category":null,
                "contacts": [],
                "end": "",
                "img_url": '',
                "start": "",
                "title": '',
                "description": ''
            }
        );
        navigate('/calendar');
    }

    const handleEventSelection = (e) => {
         console.log(e, "Event data"); 
        setSelectedEvent({
            "activityList": e.activityList,
            "category": e.category,
            "contacts": e.contacts,
            "end": e.end,
            "img_url": e.img_url,
            "start": e.start,
            "title": e.title,
            "description": e.description
        })
        setPopupEventsForm(true);
        navigate('/calendar/' + e._id);
    };

 /*    if (selectedEvent)
        console.log("hello", selectedEvent.start); */

    useEffect(() => {

        /* handleEventSelection(); */
    }, [selectedEvent]);
    return (
        <div className="bigCalendarContainer" >

            <div>
                {popupEventsForm && <div className="mainContainerForm"><EventForm dataPicked={selectedEvent} closeForm={sendRequestandCloseForm} /></div>}
            </div >
            <h1><span>Today</span> 📆</h1>
            {allEvents && <div  onClick={(e) => handleClickCalendar(e)}>
                <Calendar
                    defaultView='day'
                    className="bigCalendar"
                    localizer={localizer}
                    events={allEventsCalender} startAccessor="start" endAccessor="end" 
                    onSelectSlot={(slotInfo) => { selectDay(slotInfo) }}
                    onSelectEvent={handleEventSelection}
                    selectable
                    popup={true}
                    eventPropGetter={(eventStyleGetter)} />
            </div>}
        </div>
    );
}