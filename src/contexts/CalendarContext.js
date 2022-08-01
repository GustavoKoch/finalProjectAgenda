import { createContext, useState, useEffect } from "react";

export const CalendarContext = createContext();

const CalendarContextProvider = ({ children }) => {
  const [calendarData, setCalendarData] = useState([5,4,3,2,1]);


  /* initialise the state from API */
  useEffect(() => {

  }, []);


    // /* NAIVE OPTIMISTIC triggers API call to POST new state */
    // useEffect(() => {
    //   fetch(POST calendarData)
    // }, [calendarData]);
  
  
    /* STANDARD OPTIMISTIC */
    const addSomethingToCalendar = (newItem) => {
      setCalendarData(p=> [...p, newItem])
      // fetch(POST calendarData)
  }

    // /* STANDARD PESSIMISTIC */
    // const addSomethingToCalendar = (newItem) => {
    //   fetch(POST calendarData).then(
    //     setCalendarData(p=> [...p, newObject])
    //   )
    // }

  return (
    <CalendarContext.Provider
      value={{
        calendarData,
        setCalendarData,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
export default CalendarContextProvider


{/* <form onSubmit={()=>setCalendarData(p=> [...p, newObject])}></form> */}





// function UserAvatar (props) {
//   return <img src={props.img} />
// }

// function UserProfile (props) {
//   return <div>welcome, {props.name} <UserAvatar img={props.img}/> </div>
// }



// function userAvatar (props) {
//   return `<img src=${props.img} />`
// }

// function userProfile (props) {
//   return `<div>welcome, ${props.name} ${userAvatar({img:props.img})} </div>`
// }
