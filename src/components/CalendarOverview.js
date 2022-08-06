import { getDay, parse, startOfWeek, format, set } from "date-fns";
import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import './CalendarOverview.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ApiCalenderData from "../services/ApiCalenderData";
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
]

export default function CalendarOverview() {
    const [newEvent, setNewEvent] = useState({ title: "", description: "", starts: "", ends: "" });
    const [allEvents, setAllEvents] = useState(events);
    const [popupDateTimePicker, setPopupDateTimePicker] = useState('Close');
    const [daySelection, setDaySelection] = useState();
    const [selectedEvent, setSelectedEvent] = useState();

    let allCalendarItems=ApiCalenderData('GET',)||[];
    allCalendarItems.push(      
        {
        "activityList": [],
        "category": "Social events",
        "contacts": [],
        "end": "2020-08-16T00:00:00.000Z",
        "img_url": "https://popmenucloud.com/xrpblwcd/85ba676e-8969-4793-ba64-46c7724547be.jpg",
        "start": "2022-08-14T00:00:00.000Z",
        "title": "Cooking",
        "description": "laalala"
    });

  
      
   
    console.log(allCalendarItems);

    function handleAddEvent() {
        setAllEvents([...allEvents, newEvent]);
    }
    /* console.log(allEvents); */
    const handleClickCalendar = (e) => {
        /*    console.log(e); */
    }

    const HandleSlotSelection = (e) => {
        console.log(e)
    }


/*     console.log("allCalendarItems!!!!!", allCalendarItems); */

    const eventStyleGetter = () => { }
    const selectDay = (slotInfo) => {

        setSelectedEvent(
            {
                "activityList": [],
                "category": '',
                "contacts": [],
                "end": slotInfo.start,
                "img_url": '',
                "start": slotInfo.start,
                "title": '',
                "description": ''
            }
        );
        console.log(selectedEvent);
        setPopupDateTimePicker("Show");
    }

    const clickSend = () => {
        handleAddEvent();
        setPopupDateTimePicker("Close");
    }

    const handleEventSelection = (e) => {
        /* console.log(e, "Event data"); */
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
        setPopupDateTimePicker("Show");
    };


    if (selectedEvent)
        console.log("hello", selectedEvent.start);

    useEffect(() => {

        /* handleEventSelection(); */
    }, [selectedEvent]);
    return (
        <div >

            <div>
                {popupDateTimePicker === 'Show' && <div className="popupDateTimePicker"><CustomDateTimePicker dataPicked={selectedEvent} closeForm={clickSend} /></div>}
            </div>
            {allCalendarItems && <div className="solidBackground" onClick={(e) => handleClickCalendar(e)}>
                <Calendar
                    localizer={localizer}
                    events={allCalendarItems} startAccessor="start" endAccessor="end" style={{ height: 1000, margin: "50px" }}
                    onSelectSlot={(slotInfo) => { selectDay(slotInfo) }}
                    onSelectEvent={handleEventSelection}
                    selectable
                    popup={true}
                    eventPropGetter={(eventStyleGetter)} />
            </div>}
        </div>
    );
}