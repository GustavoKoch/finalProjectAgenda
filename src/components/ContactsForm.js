import React from "react";
import Navbar from "./Navbar.js";
import Footer from "./Footer.js";
import { useState, useEffect } from "react";
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


let categories=['family','friend', 'other']
let categObj={categ0:'', categ1:'', categ2:''};

export default function ContactsForm() {
    const [contact, setContact] = useState({ firstName: '', lastName: '', birthday: 0, nameday: 0, category: [], avatar: '' });
    const [checkedState, setCheckedState] = useState({categ0:'family', categ1:'friend', categ2:'other'})
    const[category, setCategory]=useState();

    const addContact=()=>{
    }
    const handleOnChange = (e, position) => {
        categories.map((item, index) =>{      
               
         const categChecks= document.getElementById(`custom-checkbox-${index}`).checked;
         const categName= document.getElementById(`custom-checkbox-${index}`).name;
         console.log(categName);

         if (categChecks){
            categObj['categ'+index]=categName;
         console.log(categName);}
         else{
            categObj['categ'+index]='';
         }
        console.log(categObj);        
        })
    }
        const submitContact = (e) => {
            e.preventDefault();
            console.log(contact);
            let checkbox = document.getElementsByClassName('category').value;
            console.log(checkbox);
        }

        return (
            <div >
                <form className='containerForm' onSubmit={(e) => submitContact(e)}>
                    <legend>Form</legend>
                    <div className='container1'>
                        <fieldset className='firstName'>
                            <label for="firstName">
                                FirstName:
                            </label>
                            <textarea name="firstName" value={contact.firstName}
                                onChange={addContact} />
                        </fieldset>
                        <div className='lastName'>
                            <label for="lastName">
                                LastName
                            </label>
                            <textarea name="lastName" value={contact.lastName}
                                onChange={addContact} />
                        </div>
                    </div>

                    <div className="container2">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <div className='Birthday'>

                                <MobileDateTimePicker
                                    /* style={styleDateTimePicker} */
                                    value={contact.birthday}
                                    onChange={addContact}

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
                                    onChange={addContact}

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
                        <div className='category'>
                            <label for="category">
                                Category:
                            </label>
                            <form className="categForm" onChange={addContact}>

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
                                                      
                                                        onChange={(e) => handleOnChange(e, index)}
                                                    />
                                                    <label htmlFor={`custom-checkbox-${index}`}>{cat}</label>
                                                </div>
                                                <div className="right-section"></div>
                                            </div>
                                        </li>
                                    );
                                })} 


                            </form>

                        </div>
                        <div className='Avatar'>
                            <label for="Avatar">
                                Avatar:
                            </label>
                            <textarea name="Category" value={contact.avatar} onChange={addContact}
                            />
                        </div>


                        <input className='sendButton' style={{ alignText: 'center', margin: 20 }} type="submit" value="Add contact" />
                    </div>
                </form >
            </div>
        )
}
