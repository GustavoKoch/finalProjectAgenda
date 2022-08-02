import React from "react";
import Navbar from "./Navbar.js";
import Footer from "./Footer.js";
import { useState, useEffect } from "react";
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';




export default function ContactsForm() {
    const [contact, setContact] = useState({
    });


    return (
        <div >
            <div className="container1">

                <fieldset className="contactList">
                    <legend>Form</legend>

                    <ul style={{ alignText: 'center', margin: 10, width: 520 }}>
                        <div className='contactForm'>
                        <fieldset className='description'>
                            <label for="FirstaName">
                                FirstName:
                            </label>
                            <textarea name="FirstName" value={contact.firstName}
                                onChange={e => setContact(...contact, { firstName: e.target.value })} />
                        </fieldset>
                            <div className='description'>
                                <label for="LastName">
                                    LastName
                                </label>
                                <textarea name="lastName" value={contact.lastName}
                                onChange={e => setContact(...contact, { lastName: e.target.value })} />
                            </div>
                        </div>

                        <div className="container2">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <div className='Birthday'>

                                    <MobileDateTimePicker
                                        /* style={styleDateTimePicker} */
                                        value={contact.birthday}
                                        onChange={e => setContact(...contact, { birthday: e.target.value })}

                                        label="Birthday"
                                        onError={console.log}
                                        minDate={new Date('2018-01-01T00:00')}
                                        inputFormat="yyyy/MM/dd hh:mm a"
                                        mask="___/__/__ __:__ _M"
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </div>
                                <div className='Nameday'>

                                    <MobileDateTimePicker
                                        /* style={styleDateTimePicker} */
                                        value={contact.nameday}
                                        onChange={e => setContact(...contact, { nameday: e.target.value })}

                                        label="Nameday"
                                        onError={console.log}
                                        minDate={new Date('2018-01-01T00:00')}
                                        inputFormat="yyyy/MM/dd hh:mm a"
                                        mask="___/__/__ __:__ _M"
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </div>

                            </LocalizationProvider>
                        </div>
                        <div className="container3">
                            <div className='Category'>
                                <label for="Category">
                                    Category:
                                </label>
                                <textarea name="Category" value={contact.lastName}
                                    onChange={e => setContact(...contact, { lastName: e.target.value })} />
                            </div>
                            <div className='Avatar'>
                                <label for="Avatar">
                                    Avatar:
                                </label>
                                <textarea name="Category" value={contact.lastName}
                                    onChange={e => setContact(...contact, { lastName: e.target.value })} />
                            </div>
                        </div>

                    </ul>
                    <input className='sendButton' style={{ alignText: 'center', margin: 20 }} type="submit" value="Add contact" />
                </fieldset>
            </div>


        </div>
    )
}

/*     "first_name": "Bugs",
    "last_name": "Bunny",
    "birthday": "2022-12-03T21:00:00.000Z",
    "nameday": null,
    "category": "friend",
    "avatar_url": "https://findicons.com/files/icons/206/looney_tunes/300/bugs_bunny_country.png",
    "createdAt": "2022-07-27T13:26:31.099Z",
    "updatedAt": "2022-07-27T13:26:31.099Z",
    "__v": 0 */