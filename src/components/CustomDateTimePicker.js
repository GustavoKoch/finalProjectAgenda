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
import ApiCalenderData from "../services/ApiCalenderData";

export default function CustomDateTimePicker({ closeForm, dataPicked }) {

  const [event, setEvent] = useState('');
  const [title, setTitle] = useState(dataPicked.title);
  const [description, setDescription] = useState(dataPicked.description);
  const [value1, setValue1] = useState(dataPicked.start);
  const [value2, setValue2] = useState(dataPicked.end);

   console.log("Hidatepicked",dataPicked);


  const passEvent = (e) => {
    e.preventDefault();
    postCalenderData('POST', event);
    closeForm();
  }


  const postCalenderData = (requestMethod, objToPass) => {
    console.log(objToPass);
    const extUrl = "calendar";
    const url = `https://projectberlin-backend.herokuapp.com/${extUrl}`;

    const requestOptions = {
      method: requestMethod,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(objToPass)
    }

    fetch(url, requestOptions)
      .then((res) => { res.json(); })
      .catch((e) => console.log(e.message));
  }

  useEffect(() => {
    setEvent({
      start: dataPicked.start,
      end: dataPicked.end,
      title: dataPicked.title,
      description: description,
      activityList: [],
      contacts: [],
      category: "Social events",
      img_url: "https://popmenucloud.com/xrpblwcd/85ba676e-8969-4793-ba64-46c7724547be.jpg"

    })

  }, [dataPicked, value1, value2, title, description]);


  return (
    <>
      <form onSubmit={(e) => passEvent(e)} className='containerForm'>
        <div className='eventForm'>
          <fieldset className='title'>
            <label for="title">
              Titel:
            </label>
            <textarea name="title" value={event.title}
              onChange={e => setTitle(e.target.value)} />
          </fieldset>
          <div className='description'>
            <label for="description">
              Description:
            </label>
            <textarea name="description" value={event.description}
              onChange={e => setDescription(e.target.value)} />
          </div>
        </div>

        <LocalizationProvider dateAdapter={AdapterDateFns}>

          <Stack spacing={3}>
            <div>
              <MobileDateTimePicker
                /* style={styleDateTimePicker} */
                value={event.start}
                onChange={(newValue) => {
                  setValue1(newValue);
                }}

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
                onChange={(newValue) => {
                  setValue2(newValue);
                }}

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
          <fieldset className="categoryCheckbox">
            <legend>Category</legend>

            <div style={{ alignText: 'center', margin: 10}}>
              <input type="checkbox" id="scales" name="scales" checked/>
                <label for="scales">Scales</label>
            </div>

            <div style={{ alignText: 'center', margin: 10}}>
              <input type="checkbox" id="horns" name="horns"/>
                <label for="horns">Horns</label>
            </div>
          </fieldset>   



          <fieldset className="contactsList">
            <legend>Contacts</legend>
          <ul style={{ alignText: 'center', margin: 15}}>          
                <li>Link 1</li>
                <li>Link 2</li>
                <li>Link 3</li>
                <li>Link 4</li>
                <li>Link 5</li>      

            </ul>
          </fieldset>
          </div>
          <input className='formButton' style={{ alignText: 'center', margin:20}} type="submit" value="Send" />

        </LocalizationProvider>
      </form>
    </>
  );
}
