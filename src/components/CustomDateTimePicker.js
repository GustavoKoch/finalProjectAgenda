import * as React from 'react';
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

export default function CustomDateTimePicker({ sendEvent }) {
  /* const [clearedDate, setClearedDate] = React.useState(null); */
  const [form, setForm] = React.useState('');
  const [value, setValue] = React.useState(new Date('2019-01-01T18:54'));
  /*   console.log(value);
    console.log(clearedDate); */

  const passEvent = (e) => {
    e.preventDefault();
    let title = e.target.title.value;
    let description = e.target.description.value;
    /*     console.log(e.target.title.value);
        console.log(e.target.description.value); */
    sendEvent(title, description, value);
  }
  /* console.log(sendEvent); */

  /*   const styleDateTimePicker = {
      alignText:'center',
      width:1000,
      backgroundColor:'brown',
  }; */
 
  return (
    <>
      <form onSubmit={(e) => passEvent(e)} className='containerForm'>
        <div className='eventForm'>
          <fieldset className='title'>
            <label htmlFor="title">
              Titel:
            </label>
            <textarea name="title" />
          </fieldset>
          <div className='description'>
            <label htmlFor="description">
              Description:
            </label>
            <textarea name="description" />
          </div>
        </div>

        <LocalizationProvider dateAdapter={AdapterDateFns}>

          <Stack spacing={3}>
          <div>
            <MobileDateTimePicker
              /* style={styleDateTimePicker} */
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
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
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}

              label="Ends"
              onError={console.log}
              minDate={new Date('2018-01-01T00:00')}
              inputFormat="yyyy/MM/dd hh:mm a"
              mask="___/__/__ __:__ _M"
              renderInput={(params) => <TextField {...params} />}
            />
            </div>
            {/*     <DateTimePicker      
          value={clearedDate}
          onChange={(newValue) => setClearedDate(newValue)}
          renderInput={(params) => (
            <TextField {...params} helperText="Clear Initial State" />
          )}
        /> */}
            {/* <button  style={{ width: 90, alignText: 'center', margin: 'auto', marginTop: 20 }}>Send</button> */}

          </Stack>
          <input className='sendButton' style={{alignText: 'center', margin: 'auto', marginTop: 20 }} type="submit" value="Send" />

        </LocalizationProvider>
      </form>
    </>
  );
}
