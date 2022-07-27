import Todo from "./Todo.js";
import Today from "./Today.js";
import Shopping from "./Shopping.js";
import Calendar from "./Calendar.js";

import React, { useState, useEffect } from 'react';

export default function ListApp(props) {
    const [list, setList] = useState(["hello"])

    // useEffect(() => {
    //     fetch("api.com/items")
    //         .then(res => res.json())
    //         .then(li => setList(li))
    // }, [])

    switch (props.style) {
        case "todo":
            return (<Todo />)
        case "calendar":
            return (<Calendar />)
        //     case "today":
        //         return <Today
        //             create={create}
        //             update={update}
        //             remove={remove}
        //             list={list}
        //         />
        //     case "shopping":
        //         return <Shopping
        //             create={create}
        //             update={update}
        //             remove={remove}
        //             list={list}
        //         />
        //     case "Calendar":
        //         return <Calendar
        //             create={create}
        //             update={update}
        //             remove={remove}
        //             list={list}
        //         />




    }
};