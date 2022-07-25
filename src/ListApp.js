import Todo from "./Todo.js";
import Today from "./Today.js";
import Shopping from "./Shopping.js";
import React, { useState, useEffect } from 'react';

export default function ListApp() {
    const [list, setList] = useState([])
    useEffect(() => {
        fetch("api.com/items")
            .then(res => res.json())
            .then(li => setList(li))
    }, [])

    switch (style) {
        case "todo":
            return (<Todo
                create={create}
                update={update}
                remove={remove}
                list={list}
            />)
        case "today":
            return <Today
                create={create}
                update={update}
                remove={remove}
                list={list}
            />
        case "shopping":
            return <Shopping
                create={create}
                update={update}
                remove={remove}
                list={list}
            />


    }
}
