import { getDay, parse, startOfWeek, format, set } from "date-fns";
import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import './CalendarOverview.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ApiCalenderData from "../../services/ApiCalenderData";
import EventForm from './EventForm';
import { useNavigate } from "react-router-dom";


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

/* const events = [
    {
        "activityList": [],
        "category": "Social events",
        "contacts": [],
        "end": "2022-08-11T22:00:00.000Z",
        "img_url": "https://popmenucloud.com/xrpblwcd/85ba676e-8969-4793-ba64-46c7724547be.jpg",
        "start": "2022-08-05T22:00:00.000Z",
        "title": "Vacation",
        "description": "laalala"
    },
    {
        "activityList": [],
        "category": "Social events",
        "contacts": [],
        "end": "2022-08-21T22:00:00.000Z",
        "img_url": "https://popmenucloud.com/xrpblwcd/85ba676e-8969-4793-ba64-46c7724547be.jpg",
        "start": "2022-08-09T22:00:00.000Z",
        "title": "Cooking",
        "description": "laalala"
    }
] */

export default function CalendarOverview() {
    const [newEvent, setNewEvent] = useState({ title: "", description: "", starts: "", ends: "" });
    const [allEvents, setAllEvents] = useState();

    const [daySelection, setDaySelection] = useState();
    const [selectedEvent, setSelectedEvent] = useState();
    const [popupEventsForm, setPopupEventsForm] = useState();
    
    const navigate = useNavigate()

    const extUrl = "calendar";
    const url = `https://projectberlin-backend.herokuapp.com/${extUrl}`;
  
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
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
            <h1><span>Big calendar</span> 📅</h1>
            {allEvents && <div  onClick={(e) => handleClickCalendar(e)}>
                <Calendar
                    className="bigCalendar"
                    localizer={localizer}
                    events={allEvents} startAccessor="start" endAccessor="end" 
                    onSelectSlot={(slotInfo) => { selectDay(slotInfo) }}
                    onSelectEvent={handleEventSelection}
                    selectable
                    popup={true}
                    eventPropGetter={(eventStyleGetter)} />
            </div>}
        </div>
    );
}