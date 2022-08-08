import { useState, useEffect } from "react";


const ApiContactsData = (requestMethod, objToPass) => {

  /* console.log(originalName); */


  const [allContacts, setAllContacts] = useState();

  /* const pokeName = originalName.toLowerCase(); */
  const extUrl = "contacts";
  const url = `https://projectberlin-backend.herokuapp.com/${extUrl}`;

  const requestOptions = {
    method: requestMethod,
    headers: { 'Content-Type': 'application/json' },
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