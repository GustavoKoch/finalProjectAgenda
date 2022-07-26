import Navbar from "./Navbar.js"
import Footer from "./Footer.js"
import ListApp from "./ListApp.js"



const { useState, useEffect } = require("react");

export default function App() {
    const [style, setStyle] = useState("todo")
    return (
        <div>
            <Navbar />
            {/* <ListApp style={style} />
            <Footer /> */}
        </div>
    )
}

