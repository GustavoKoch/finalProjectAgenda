import Navbar from "./Navbar.js"
import Footer from "./Footer.js"
import ListApp from "./ListApp.js"
import { useState, useEffect } from "react";

// import Todo from "./Todo.js"




export default function App() {
    const [style, setStyle] = useState("calendar")

    return (
        <div>
            <button onClick={() => setStyle("todo")}>Todo List</button>
            <button onClick={() => setStyle("calendar")}>Calendar</button>
            <Navbar />
            <ListApp style={style} />
            <Footer />
        </div>
    )
}

