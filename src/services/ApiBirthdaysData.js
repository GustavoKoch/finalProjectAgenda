import { useState, useEffect } from "react";


const ApiBirthdaysData = () => {

  /* console.log(originalName); */


  const [calData, setCalData] = useState();

  /* const token= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmYyZGZiNzY3ZWY0MWY4YWM3NWI5MGYiLCJ1c2VyRW1haWwiOiJndXNvODhAaG90bWFpbC5jb20iLCJpYXQiOjE2NjAwODY0NjMsImV4cCI6MTY2MDE3Mjg2M30.I1aftX-vkHz171Tz_g46sBfoJSiZpqbIz8mtUchvIx0' */
  const token=localStorage.getItem('myToken');
  /* const pokeName = originalName.toLowerCase(); */
  const extUrl = "calendar/birthdays";
  const url = `https://projectberlin-backend.herokuapp.com/${extUrl}`;
   const url2 = `http://localhost:3031/${extUrl}`;

   const requestOptions = {
    method: 'GET',
    headers: {'Authorization':"Bearer "+ token, 'Content-Type': 'application/json'  }, 
   
  }

  useEffect(() => {
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        setCalData(data);
        console.log(data); 
      })
      .catch((e) => console.log(e.message));
  }, []);
  if (!calData) return null;
  return calData;
};

export default ApiBirthdaysData;