import Todo from "./Todo.js";
import Today from "./Today.js";
import Shopping from "./Shopping.js";
import Calendar from "./Calendar.js";

import React, { useState, useEffect } from 'react';

export default function ListApp(props) {
    const [list, setList] = useState([])

    // useEffect(() => {
    //     fetch("api.com/items")
    //         .then(res => res.json())
    //         .then(li => setList(li))
    // }, [])

    const create = () => {
    }
    const update = () => { }
    const remove = () => { }



    // switch (props.style) {
    //     case "todo":
    //         return (<Todo
    //             create={create}
    //             update={update}
    //             remove={remove}
    //             list={list}
    //         />)
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



    // }
    return "this is the list app"

}
