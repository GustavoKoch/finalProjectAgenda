import { useState, useEffect } from "react";


const ApiBirthdaysData = () => {

  /* console.log(originalName); */


  const [calData, setCalData] = useState();

  /* const pokeName = originalName.toLowerCase(); */
  const extUrl = "calendar/birthdays";
  const url = `https://projectberlin-backend.herokuapp.com/${extUrl}`;
  /* const url2 = `http://localhost:3031/${extUrl}`; */

  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
   
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