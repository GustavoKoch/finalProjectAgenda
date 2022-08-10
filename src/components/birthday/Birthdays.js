
import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getDay, parse, startOfWeek, format, set } from "date-fns";
import ApiContactsData from "../../services/ApiContactsData";
import ApiBirthdaysData from "../../services/ApiBirthdaysData";
import "./birthday.css"



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

    let birthdays2 = ApiBirthdaysData() || [];
    let allContacts = ApiContactsData() || [];


    const allBirthdays2=[
        {
            "start": "2022-08-04T00:00:00Z",
            "end":"2022-08-04T00:00:00Z",
            "title":"Birthday", 
            "description": "Ask before if they have also Vegan meals",
            "activityList":[],    
            "contacts":[],  
            "category":"Birthdays",
            "img_url":"https://popmenucloud.com/xrpblwcd/85ba676e-8969-4793-ba64-46c7724547be.jpg"
        },
        {
            "start": "2022-08-05T00:00:00Z",
            "end":"2022-08-05T00:00:00Z",
            "title":"Birthday", 
            "description": "training in the Park",
            "activityList":[],    
            "contacts":[],  
            "category":"Birthdays",
            "img_url":"https://img.theculturetrip.com/1440x/smart/wp-content/uploads/2018/11/p9k2ym.jpg"
        }
    ]

   /*  console.log(birthdays2); */
    
   let birthdays;
   
     if (allContacts.length>0) {
       birthdays = allContacts.map(contact =>{
            return {
            "start": contact.birthday,
            "end":contact.birthday,
            "title":contact.firstName+" 🎁", 
            "description": contact.firstName,
            "activityList":[], 
            "category":"Birthdays",
            "img_url":contact.avatar_url
        }})  
    } 

    
    useEffect(() => {
     
    }, []);

    console.log(birthdays);

    const eventStyleGetter = () => { }
    const handleEventSelection = () => { }
    const selectDay = (day) => { }

    return (
        <div className="birthdayWrappingContainer" >
            <h1><span> Birthday calendar </span> 🎂🥳</h1>
            {birthdays&& <div className="birthdayMainContainer">
                <Calendar className="birthdayCalender"
                    localizer={localizer}
                    events={birthdays} startAccessor="start" endAccessor="end" 
                    onSelectSlot={(slotInfo) => { selectDay(slotInfo) }}
                    onSelectEvent={handleEventSelection}
                    selectable
                    popup={true}
                    eventPropGetter={(eventStyleGetter)} />
            </div>}

        </div>
    )
}