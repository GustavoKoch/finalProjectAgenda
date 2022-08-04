import React from "react";

import { useState, useEffect } from "react";
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ApiContactsData from "../services/ApiContactsData";


let categories = ['family', 'friend', 'other']
let categObj = { categ0: '', categ1: '', categ2: '' };
let categValues;
let updatedContact;

export default function ContactsForm() {
    const [contact, setContact] = useState({ firstName: '', lastName: '', birthday: '2018-01-01T00:00', nameday: '2018-01-01T00:00', category: [], avatar: '' });

    let allContacts = ApiContactsData() || [];
    /* console.log(allContacts); */



    const handleChange = (e, newValue, birthNameday) => {
        /*     console.log(newValue);
            console.log(birthNameday); */
        if (!birthNameday) {
            const { name, value } = e.target;
            /*      console.log(e.target);
                 console.log(name, value); */
            setContact(prevContact => ({
                ...prevContact,
                [name]: value
            }));
            /* I found 2 ways to pass the value in dateTimePicker: interesting! */
        } else {
            setContact(prevContact => ({
                ...prevContact,
                [birthNameday]: newValue
            }));
        };
    }




    const handleChangeCategory = (e, position) => {
        /* We check with every change wich category remains checked. For that we use map over the categories */
        categories.map((item, index) => {
            const categCheck = document.getElementById(`custom-checkbox-${index}`).checked;
            const categName = document.getElementById(`custom-checkbox-${index}`).name;
            /* console.log(categName); */

            if (categCheck) {
                categObj['categ' + index] = categName;
                /* console.log(categName); */

            }
            else {
                ;
                categObj['categ' + index] = '';
                /* console.log(categObj); */

            }
            categValues = Object.values(categObj);
            return categValues;
        })

    }
    const submitContact = (e) => {
        e.preventDefault();
        /*  console.log(categObj);
         console.log(categValues); */

        updatedContact = {
            ...contact,
            'category': categValues
        };
        console.log(updatedContact);
        setContact(updatedContact);
       /*  ApiContactsData('POST', updatedContact); */

         postContactData('POST', updatedContact); 
       
     
    }

    
    
      const postContactData = (requestMethod, objToPass) => {
        console.log(objToPass);
        const extUrl = "contacts";
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







    return (
        <div >
            <form className="containerForm" onSubmit={(e) => submitContact(e)}>
                <legend>Form</legend>
                <div className="container1">
                    <fieldset className="firstName">
                        <label for="firstName">
                            FirstName:
                        </label>
                        <textarea name="firstName" value={contact.firstName}
                            onChange={handleChange} />
                    </fieldset>
                    <div className="lastName">
                        <label for="lastName">
                            LastName
                        </label>
                        <textarea name="lastName" value={contact.lastName}
                            onChange={handleChange} />
                    </div>
                </div>

                <div className="container2">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <div className="birthday">

                            <MobileDateTimePicker

                                value={contact.birthday}
                                /* I found 2 ways to pass the value: interesting! */
                                onChange={(newValue) => {
                                    setContact({
                                        ...contact,
                                        'birthday': newValue
                                    })

                                }}

                                label="birthday"
                                onError={console.log}
                                minDate={new Date('2018-01-01T00:00')}
                                inputFormat="yyyy/MM/dd hh:mm a"
                                mask="___/__/__ __:__ _M"
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </div>
                        <div className="nameday">

                            <MobileDateTimePicker

                                value={contact.nameday}
                                /* I found 2 ways to pass the value: interesting! */
                                onChange={(newValue) => handleChange('', newValue, 'nameday')}
                                name="nameday"
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
                    <div className="category">
                        <label for="category">
                            Category:
                        </label>
                        <fieldset className="categForm" >

                            {categories.map((cat, index) => {
                                return (
                                    <li key={index}>
                                        <div className="categories-list">
                                            <div className="left-section">
                                                <input
                                                    type="checkbox"
                                                    id={`custom-checkbox-${index}`}
                                                    name={cat}
                                                    value={cat}
                                                    onChange={(e) => handleChangeCategory(e, index)}
                                                />
                                                <label htmlFor={`custom-checkbox-${index}`}>{cat}</label>
                                            </div>
                                            <div className="right-section"></div>
                                        </div>
                                    </li>
                                );
                            })}


                        </fieldset>

                    </div>
                    <div className="avatar">
                        <label for="avatar">
                            Avatar:
                        </label>
                        <textarea name="avatar" value={contact.avatar} onChange={handleChange}
                        />
                    </div>


                    <input className="formButton" style={{ alignText: 'center', margin: 20 }} type="submit" value="Add contact" />
                    <input className="formButton" style={{ alignText: 'center', margin: 20 }} type="submit" value="Delete contact" />
                </div>
            </form >
        </div>
    )
}
