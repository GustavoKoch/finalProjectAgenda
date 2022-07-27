import { useState } from "react";
import Calendar from "react-calendar";
import "./App.css";
import "react-calendar/dist/Calendar.css";

function CalendarView() {
    const [date, setDate] = useState([
        new Date(2021, 6, 1),
        new Date(2021, 6, 10)
    ]);

    return (
        <div className="app">
            <h1 className="text-center">Calendar</h1>
            <div className="calendar-container">
                <Calendar onChange={setDate} defaultvalue={date} selectRange={true} />
            </div>
            {/* if we have 2 dates */}
            {/* {date.length > 1 && */}
            <p className="text-center">
                <span className="bold">Start:</span> {date[0].toDateString()}
                &nbsp;|&nbsp;
                <span className="bold">End:</span> {date[1].toDateString()}
                <span className="bold">Description:</span> <input />

            </p>
        </div>
    );
}

export default CalendarView;
