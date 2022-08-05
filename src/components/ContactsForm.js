import React from "react";

import { useState, useEffect } from "react";
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ApiContactsData from "../services/ApiContactsData";
import { useParams} from "react-router-dom";


let categories = ['family', 'friend', 'other']
let categObj = { categ0: '', categ1: '', categ2: '' };
let categValues;
let categValuesNoEmpty;
let updatedContact;
let allContacts;
export default function ContactsForm({contactPicked, closeForm}) {

    
    

    const [contact, setContact] = useState(contactPicked);
    /* Useffect for rerendering again if initial state (contactPicked) changes */
    useEffect(() => {
        setContact(contactPicked)
    }, [contactPicked]);
    console.log(contact);

    const {contactId}=useParams();

    allContacts = ApiContactsData() || [];

    const handleChange = (e, newValue, birthNameday) => {
        /* For first and lastname */
        console.log(e.target.value)
        if (!birthNameday) {
            const { name, value } = e.target;

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




    const handleChangeCategory = () => {
        /* We check with every change wich category remains checked. For that we use map over the categories */
        categories.map((item, index) => {
            const categCheck = document.getElementById(`custom-checkbox-${index}`).checked;
            const categName = document.getElementById(`custom-checkbox-${index}`).name;

            if (categCheck) {
                categObj['categ' + index] = categName;
          
            }
            else {
                categObj['categ' + index] = null;
            }
            categValues = Object.values(categObj);

            categValuesNoEmpty = categValues.filter(n => n)
            console.log(categValuesNoEmpty);
            return categValuesNoEmpty;
        })
    }

    const updatedContact2 = {
        "firstName": "Bugs",
        "lastName": "Carrots22",
        "birthday": "2022-12-03T21:00:00Z",
        "nameday": "",
        "category": ["friend", "family"],
        "avatar_url": "https://findicons.com/files/icons/206/looney_tunes/300/bugs_bunny_country.png"
    }

    const submitContact = (e) => {
        e.preventDefault();

        updatedContact = {
            ...contact,
            'category': categValuesNoEmpty
        };
        console.log(updatedContact);
        setContact(updatedContact);
        /*   ApiContactsData('POST', updatedContact);  */
        if(!contactId)
        postPutContactData('POST', updatedContact);
        else
        postPutContactData('PUT', updatedContact, contactId);
        closeForm()
    }

    const handleDelete=(id)=>{
        const url = "https://projectberlin-backend.herokuapp.com/contacts/"+id;
     

        fetch(url, {method:'DELETE', })
            .then((res) => { res.json(); })
            .catch((e) => console.log(e.message));
    }
    


    const postPutContactData = (requestMethod, objToPass, id) => {     
        let extUrl = "contacts";
        if (requestMethod==='PUT')
        extUrl = "contacts"+"/"+id;

        const url = `https://projectberlin-backend.herokuapp.com/${extUrl}`;

        const requestOptions = {
            /* mode: 'no-cors',  */
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
                                            
                                                <input
                                                    type="checkbox"
                                                    id={`custom-checkbox-${index}`}
                                                    name={cat}
                                                    value={cat}
                                                    onChange={() => handleChangeCategory()}
                                                />
                                                <label htmlFor={`custom-checkbox-${index}`}>{cat}</label>
                                           
                                            
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

                        <textarea name="avatar_url" value={contact.avatar_url} onChange={handleChange}
                        />
                    </div>
                    <input className="formButton" style={{ alignText: 'center', margin: 20 }} type="submit" value="Add contact" />
                   
                </div>
                
            </form >
            <button className="delButton"  onClick={()=>handleDelete(contactId)} >Delete</button>
        </div>
    )
}
