import { useState, useEffect } from "react";


const ApiContactsData = (requestMethod, objToPass) => {

  /* console.log(originalName); */


  const [allContacts, setAllContacts] = useState();
  /* const token= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmYyZGZiNzY3ZWY0MWY4YWM3NWI5MGYiLCJ1c2VyRW1haWwiOiJndXNvODhAaG90bWFpbC5jb20iLCJpYXQiOjE2NjAwODY0NjMsImV4cCI6MTY2MDE3Mjg2M30.I1aftX-vkHz171Tz_g46sBfoJSiZpqbIz8mtUchvIx0' */
  const token=localStorage.getItem('myToken');
  
  /* const pokeName = originalName.toLowerCase(); */
  const extUrl = "contacts";
  const url = `https://projectberlin-backend.herokuapp.com/${extUrl}`;
  const url2 = `http://localhost:3031/${extUrl}`;
  const requestOptions = {
    method: requestMethod,
    headers: {'Authorization':"Bearer "+ token, 'Content-Type': 'application/json'  }, 
    body: JSON.stringify(objToPass)
  }

  useEffect(() => {
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        setAllContacts(data);
        /* console.log(data); */
      })
      .catch((e) => console.log(e.message));
  }, []);
  if (!allContacts) return null;
  return allContacts;
};


export default ApiContactsData;