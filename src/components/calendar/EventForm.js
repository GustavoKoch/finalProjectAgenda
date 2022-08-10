import { useState, useEffect } from "react";
import AlarmIcon from '@mui/icons-material/Alarm';
import SnoozeIcon from '@mui/icons-material/Snooze';
import TextField from '@mui/material/TextField';
import ClockIcon from '@mui/icons-material/AccessTime';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import Stack from '@mui/material/Stack';
import { brown } from '@mui/material/colors';
import { useParams } from "react-router-dom";
import { Card, CardContent, Avatar, Box, Typography, IconButton } from '@material-ui/core';

import ApiContactsData from "../../services/ApiContactsData";
import { Checkbox } from "@mui/material";




export default function EventForm({ closeForm, dataPicked }) {

  const [event, setEvent] = useState(dataPicked);
  const [contacts, setContacts] = useState(dataPicked.contacts);
  const [popupChangeContacts, setPopupChangeContacts] = useState(false);
  const token=localStorage.getItem('myToken');
  /*   console.log("Hi datepicked", dataPicked.category); */

  const { calendarItemId } = useParams();
  /* const categ = ['Social events', 'Reminders', 'Birthdays', 'Vacation', 'Sports', 'Personal'] */


  const passEvent = (e) => {
    e.preventDefault();
    if (!calendarItemId)
      postPutCalenderData('POST', event, "");
    if (calendarItemId)
      postPutCalenderData('PUT', event, calendarItemId);
    closeForm();
  }

  const postPutCalenderData = (requestMethod, objToPass, id) => {
  /* const token= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmYyZGZiNzY3ZWY0MWY4YWM3NWI5MGYiLCJ1c2VyRW1haWwiOiJndXNvODhAaG90bWFpbC5jb20iLCJpYXQiOjE2NjAwODY0NjMsImV4cCI6MTY2MDE3Mjg2M30.I1aftX-vkHz171Tz_g46sBfoJSiZpqbIz8mtUchvIx0' */
  const token=localStorage.getItem('myToken');
    const extUrl = "calendar";
    const url = `https://projectberlin-backend.herokuapp.com/${extUrl}` + "/" + id;

    const requestOptions = {
      method: requestMethod,
      headers: {'Authorization':"Bearer "+ token, 'Content-Type': 'application/json'  },
      body: JSON.stringify(objToPass)
    }

    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((e) => console.log(e.message));
  }

  /* For editing the contacts */
  let allContacts = ApiContactsData() || [];


  const handleChangeContacts = (e) => {
    console.log(e.target.checked)
    const contactsChecked = document.querySelectorAll("input[type=checkbox]:checked");
    const contactsUpdated = Array.from(contactsChecked).map((x) => { return x.name })
    setEvent({ ...event, "contacts": contactsUpdated })
    setContacts(contactsUpdated);
  }


  const auxEditContact = (contact) => {
    const res = (JSON.stringify(event.contacts)).includes(JSON.stringify(contact));
    return res;
  }


  const deleteCalenderItem = (id) => {
    /*  e.preventDefault(); */
    const url = "https://projectberlin-backend.herokuapp.com/calendar/" + id;

    fetch(url, { method: 'DELETE',headers: {'Authorization':"Bearer "+ token, 'Content-Type': 'application/json'  }, })
      .then((res) => { res.text(); })
      .catch((e) => console.log(e.message));

    const timer = setTimeout(() => { closeForm(); }, 80);
    timer();
    clearTimeout(timer);
  }



  useEffect(() => {
    if (calendarItemId) {
      const url = "https://projectberlin-backend.herokuapp.com/calendar/" + calendarItemId;

      fetch(url, { method: 'GET',  headers: {'Authorization':"Bearer "+ token, 'Content-Type': 'application/json'  }, })
        .then((res) => res.json())
        .then((data) => {
          setEvent(data[0]);
          console.log(data[0]);
        })
        .catch((e) => console.log(e.message));
    }
    else
    setEvent(dataPicked)
  }, [dataPicked, popupChangeContacts]);

  const handleSubmitContacts = (e) => {
    e.preventDefault()
    postPutCalenderData('PUT', event, calendarItemId);
    setTimeout(() => { setPopupChangeContacts(!popupChangeContacts); }, 150);
    /*  closeForm(); */
  }

  return (
    <>
      <form onSubmit={(e) => passEvent(e)} className='containerForm'>
        <legend id='wrappingTitleTop'>Add/Edit your contact</legend>
        <div className='eventForm'>
          <fieldset className='title'>
            <label htmlFor="title">Title:</label>
            <textarea name="title" value={event.title}
              onChange={(e) => setEvent({ ...event, [e.target.name]: e.target.value })} />
          </fieldset>
          <div className='description'>
            <label htmlFor="description">Description:</label>
            <textarea name="description" value={event.description}
              onChange={(e) => setEvent({ ...event, [e.target.name]: e.target.value })} />
          </div>
        </div>

        <LocalizationProvider dateAdapter={AdapterDateFns}>

          <Stack spacing={3}>
            <div>
              <MobileDateTimePicker
                /* style={styleDateTimePicker} */
                value={event.start}
                onChange={(e) => setEvent({ ...event, "start": e.target.value })}


                label="Starts"
                onError={console.log}
                minDate={new Date('2018-01-01T00:00')}
                inputFormat="yyyy/MM/dd hh:mm a"
                mask="___/__/__ __:__ _M"
                renderInput={(params) => <TextField {...params} />}
              />

              <MobileDateTimePicker
                /* style={styleDateTimePicker} */
                value={event.end}
                onChange={(e) => setEvent({ ...event, "end": e.target.value })}

                label="Ends"
                onError={console.log}
                minDate={new Date('2018-01-01T00:00')}
                inputFormat="yyyy/MM/dd hh:mm a"
                mask="___/__/__ __:__ _M"
                renderInput={(params) => <TextField {...params} />}
              />
            </div>

          </Stack>

          <div className="categoryandContacts">

            <fieldset className="category">
              <legend>Category</legend>

              {/*         <input className={event.category ? "filled" : "pleaseFill"} name="category" type='dropdown' value={event.category}
                onChange={handleChangeCategory} /> */}

              <select onChange={(e) => { console.log(e.target.value); setEvent({ ...event, "category": e.target.value }) }} name="categories" id="categories" value={event.category?event.category:""}>
                <option value="Social events">Social events</option>
                <option value="Reminders">Reminders</option>
                <option value="Birthdays">Birthdays</option>
                <option value="Vacation">Vacation</option>
                <option value="Sports">Sports</option>
                <option value="Personal">Personal</option>
              </select>

            </fieldset>

            <fieldset className="contactsListCalender">
              <legend>Contacts </legend>


              {!popupChangeContacts && <ul className="avatarEventCalenderContainer" style={{ alignText: 'center', margin: 10 }}>
                {event && event.contacts.map((contact, index) => {
                  return (
                    <li key={index}>
                      <div className="eachContactCalender">
                        <Avatar className="avatarEventCalender"
                          variant="rounded"
                          sx={{ width: 20, height: 20 }}
                          src={contact.avatar_url}
                        />
                        <label htmlFor={contact.firstName}>{contact.firstName}</label>
                      </div>
                    </li>
                  );
                })}

              </ul>}

              {popupChangeContacts && <ul className="avatarEventCalenderContainer" style={{ alignText: 'center', margin: 10 }}>
                {event && allContacts.map((contact, index) => {
                  return (

                    <li key={index}>
                      <div className="eachContactCalender">
                        {popupChangeContacts && <input name={contact._id} className="contactChecked" type="checkbox" onClick={handleChangeContacts} value={contact.firstName} defaultChecked={auxEditContact(contact)} />}
                        <Avatar className="avatarEventCalender"
                          variant="rounded"
                          sx={{ width: 20, height: 20 }}
                          src={contact.avatar_url}
                        />
                        <label htmlFor={contact.firstName}>{contact.firstName}</label>
                      </div>
                    </li>
                  );
                })}

              </ul>}


              <div className="editButtonCalender">
                <IconButton size="small" onClick={(e) => handleSubmitContacts(e)}>
                  {popupChangeContacts && <img src="https://www.svgrepo.com/show/226357/lock.svg" />}
                  {!popupChangeContacts && <img src="https://www.svgrepo.com/show/226363/lock.svg" />}
                </IconButton>
              </div>
            </fieldset>

          </div>
          <input className='formButton' style={{ alignText: 'center', margin: 20 }} type="submit" value="Create/Modify" />

        </LocalizationProvider>
      </form>
      <button className="delButton" onClick={() => deleteCalenderItem(calendarItemId)} >
        <svg xmlns="http://www.w3.org/2000/svg" height="34" viewBox="0 0 24 24" width="34"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z" /></svg>
      </button>

    </>
  );
}
