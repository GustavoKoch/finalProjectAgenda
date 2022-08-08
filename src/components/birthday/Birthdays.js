
import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getDay, parse, startOfWeek, format, set } from "date-fns";
import ApiContactsData from "../../services/ApiContactsData";
import ApiCalenderData from "../../services/ApiCalenderData";



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





export default function Birthdays() {

    const [allBirthdays, setAllBirthdays] = useState();

    let birthdays2 = ApiCalenderData() || [];
    let allContacts = ApiContactsData() || [];
    console.log(birthdays2);
    let birthdays;
    /* For each contact 1 Birthday */
    if (allContacts) {
        birthdays = allContacts.map((contact) => (
            {
                category: "Birthdays",
                contacts: [],
                end: contact.birthday,
                img_url: '',
                start: contact.birthday,
                title: '',
                description: '',
                activityList: []
            }
    
        ))
        console.log(birthdays);
       
    }
    const eventStyleGetter = () => { }
    const handleEventSelection = () => { }
    const selectDay = (day) => { }

    return (
        <div >
            Hello Birthdays!
            {allBirthdays && <div className="solidBackground">
                <Calendar
                    localizer={localizer}
                    events={allBirthdays} startAccessor="start" endAccessor="end" style={{ height: 1000, margin: "50px" }}
                    onSelectSlot={(slotInfo) => { selectDay(slotInfo) }}
                    onSelectEvent={handleEventSelection}
                    selectable
                    popup={true}
                    eventPropGetter={(eventStyleGetter)} />
            </div>}

        </div>
    )
}