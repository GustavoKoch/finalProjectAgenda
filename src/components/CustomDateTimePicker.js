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

export default function CustomDateTimePicker({ sendEvent, dayPicked }) {

  const [event, setEvent] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value1, setValue1] = useState(dayPicked);
  const [value2, setValue2] = useState(dayPicked);

  console.log(description);
 

  const passEvent = (e) => {
    e.preventDefault(); 
    patchCalenderData('POST', event);
    sendEvent(); 
  }


  const patchCalenderData = (requestMethod, objToPass) => {
    console.log(objToPass);
    const extUrl="calender";
    const url = `https://projectberlin-backend.herokuapp.com/${extUrl}`;
  
    const requestOptions = {
      method: requestMethod,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(objToPass)}  
   
      fetch(url, requestOptions)
      .then((res) =>{ res.json();})     
      .catch((e) => console.log(e.message));
   }

  useEffect(() => {
    setEvent({
      starts_date: value1.toISOString(),
      ends_date: value2.toISOString(),
      title:title, 
      description:description,
      activityList:[],    
      contacts:[],  
      category:"Social events",
      img_url:"https://popmenucloud.com/xrpblwcd/85ba676e-8969-4793-ba64-46c7724547be.jpg"

    })
    
  }, [dayPicked, value1, value2, title, description]);


  return (
    <>
      <form onSubmit={(e) => passEvent(e)} className='containerForm'>
        <div className='eventForm'>
          <fieldset className='title'>
            <label for="title">
              Titel:
            </label>
            <textarea name="title"                  value = {title}
                     onChange={e => setTitle(e.target.value)}/>
          </fieldset>
          <div className='description'>
            <label for="description">
              Description:
            </label>
            <textarea name="description"                  value = {description}
                     onChange={e => setDescription(e.target.value)}/>
          </div>
        </div>

        <LocalizationProvider dateAdapter={AdapterDateFns}>

          <Stack spacing={3}>
          <div>
            <MobileDateTimePicker
              /* style={styleDateTimePicker} */
              value={value1}
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
              value={value2}
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
          <input className='sendButton' style={{alignText: 'center', margin: 'auto', marginTop: 20 }} type="submit" value="Send" />

        </LocalizationProvider>
      </form>
    </>
  );
}
