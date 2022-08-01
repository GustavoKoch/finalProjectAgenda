import { getDay, parse, startOfWeek, format, set } from "date-fns";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import './CalendarOverview.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useCalenderData from "../services/useCalenderData";
import CustomDateTimePicker from './CustomDateTimePicker';


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

const events = [
    {
        title: "Big Meeting",
        allDay: true,
        start: new Date(2022, 6, 30),
        end: new Date(2022, 6, 30),
    },
    {
        title: "Big Meeting",
        allDay: true,
        start: new Date(2022, 6, 31),
        end: new Date(2022, 6, 31),
    },
    {
        title: "Big Meeting",
        allDay: true,
        start: new Date(2022, 7, 1),
        end: new Date(2022, 7, 1),
    },
    {
        title: "Vacation",
        start: new Date(2022, 6, 7),
        end: new Date(2022, 6, 10),
    },
    {
        title: "Conference",
        start: new Date(2022, 6, 17),
        end: new Date(2022, 6, 22),
    },
    {
        title: "Big Meeting",
        allDay: true,
        start: new Date(2022, 6, 12),
        end: new Date(2022, 6, 14),
    },
    {
        title: "Vacation",
        start: new Date(2022, 6, 7),
        end: new Date(2022, 6, 10),
    },
    {
        title: "Conference",
        start: new Date(2022, 6, 20),
        end: new Date(2022, 6, 23),
    }
];

export default function CalendarOverview() {
    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
    const [allEvents, setAllEvents] = useState(events);
    const [popupDateTimePicker, setPopupDateTimePicker]=useState('Close');
    const [daySelection, setDaySelection]=useState();

    function handleAddEvent() {
        setAllEvents([...allEvents, newEvent]);
        console.log(newEvent);
    }

    const handleClickCalendar = (e) => {
     /*    console.log(e); */
       
        setPopupDateTimePicker("Show");  
    }

    const HandleSlotSelection =(e)=>{
        console.log(e)
    }

    const sendEvent= (title, description, event) => {
/*         console.log(event);
        console.log(title);
        console.log(description); */
        setNewEvent({ ...newEvent, title, event})
       /*  console.log(newEvent); */
        handleAddEvent();
        setPopupDateTimePicker("Close");  
    }

    const calendarItems = useCalenderData();
    /* console.log(calendarItems); */

    const eventStyleGetter=()=>{}

    const selectDay=(slotInfo)=>{
        console.log(slotInfo); 
        setDaySelection(slotInfo);
    }


    return (
        <div >
      
            <div>
                {popupDateTimePicker==='Show'&&<div className="popupDateTimePicker"><CustomDateTimePicker sendEvent={(title, description, event)=>sendEvent(title, description, event)} /></div>}
                <input type="text" placeholder="Add Title" style={{ width: "20%", marginRight: "10px" }} value={newEvent.title} onChange={(e) =>{ setNewEvent({ ...newEvent, title: e.target.value });}} />
                <DatePicker placeholderText="Start Date" style={{ marginRight: "10px" }} selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
                <DatePicker placeholderText="End Date" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} /> */}
                 <button stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
                    Add Event
                </button> 
            </div>
            <div className="solidBackground" onClick={(e) => handleClickCalendar(e)}><Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 1000, margin: "50px" }}   onSelectSlot={(slotInfo) => {
       selectDay(slotInfo)
    }}
    selectable
    popup={true}
    eventPropGetter={(eventStyleGetter)} /></div>
        </div>
    );
}