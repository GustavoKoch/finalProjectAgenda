import { useState, useEffect } from "react";


const ApiCalenderData = (requestMethod, objToPass) => {

  /* console.log(originalName); */


  const [calData, setCalData] = useState();

  /* const pokeName = originalName.toLowerCase(); */
  const extUrl = "calendar";
  const url = `https://projectberlin-backend.herokuapp.com/${extUrl}`;
  const url2 = `http://localhost:3031/${extUrl}`;

  const requestOptions = {
    method: requestMethod,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(objToPass)
  }

  useEffect(() => {
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        setCalData(data);
        /* console.log(data); */
      })
      .catch((e) => console.log(e.message));
  }, []);
  if (!calData) return null;
  return calData;
};

export default ApiCalenderData;