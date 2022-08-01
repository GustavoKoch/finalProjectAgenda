import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";



function CalendarView() {
    const [date, setDate] = useState([
        new Date(2021, 6, 1),
        new Date(2021, 6, 10)
    ]);
    const saveEvent = (e) => {
        e.preventDefault()
    }


    return (
        <div className="app">
            <h1 className="text-center">Calendar</h1>
            <div className="calendar-container">
                <Calendar onChange={setDate} defaultvalue={date} selectRange={true} />
            </div>
            {/* if we have 2 dates */}
            {/* {date.length > 1 && */}
            <form onSubmit={saveEvent} className="text-center">
                <span className="bold">Add Event:</span> <input />
                <br />
                <span className="bold">Start:</span> {date[0].toDateString()}
                &nbsp;&nbsp;
                <br />
                <span className="bold">End:</span> {date[1].toDateString()}
                <br />
                <button className="submit">Create</button>

            </form >
        </div >
    );
}

export default CalendarView;
