import { useState, useEffect } from "react";


const useCalenderData = () => {

  /* console.log(originalName); */


  const [calData, setCalData] = useState();

  /* const pokeName = originalName.toLowerCase(); */
  const extUrl="calender";
  const url = `https://projectberlin-backend.herokuapp.com/${extUrl}`;

  useEffect(() => {
        fetch(url)
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

export default useCalenderData;