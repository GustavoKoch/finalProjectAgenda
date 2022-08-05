// try me at https://codesandbox.io/s/user-card-mui4-njoxy8
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  Avatar,
  Box,
  Typography,
  IconButton,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ApiContactsData from "../services/ApiContactsData";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Contacts.css';
import ContactsForm from './ContactsForm'


const useStyles = makeStyles(theme => ({
  card: {
    display: 'inline-block',
    backgroundColor: theme.palette.grey[200],
    margin: theme.spacing(1),
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(2),
    '&:last-child': {
      paddingBottom: theme.spacing(2),
    },
  },
  avatar: {
    width: 48,
    height: 48,
  },
  name: {
    lineHeight: 1,
  },
  button: {
    backgroundColor: '#fff',
    boxShadow: '0 1px 4px 0 rgba(0,0,0,0.12)',
    '&:hover': {
      backgroundColor: '#fff',
      color: '#000',
    },
  },
}));



export default function Contacts() {

  const [popupContactsForm, setPopupContactsForm] = useState(false);
  const [selectedContact, setSelectedContact] = useState();
  const navigate = useNavigate()

  let allContacts = ApiContactsData() || [];

  const selectContact = (contactComponent) => {
    /*     setPopupContactsForm('close')   */

    setSelectedContact(contactComponent)
    setPopupContactsForm(true)
    navigate('/contacts/' + contactComponent._id);

  }

  const toggleContactsForm = () => {
    console.log(popupContactsForm)
    setSelectedContact({
      "firstName": "",
      "lastName": "",
      "birthday": "",
      "nameday": null,
      "category": [],
      "avatar_url": "",
    })
    setPopupContactsForm(!popupContactsForm)
  }



  const classes = useStyles();

  return (
    <div className='container'>
      <div className='contactsContainer'>
        <div id='contactsTitle'>
          <h1>Contacts</h1>
          <IconButton onClick={toggleContactsForm} className="bigButton" >
            <AddIcon />
          </IconButton>
          {/*  current contact: {selectedContact&&selectedContact.firstName}  */}
        </div>
        {allContacts && allContacts.map((person, index) => (
          /*  <NavLink key={index}  to ={`/contacts/${person._id}`} > */
          <Card key={index} onClick={() => selectContact(person)} className={classes ? classes.card : ''}>
            <CardContent className={classes ? classes.content : ''}>
              <Avatar
                variant="rounded"
                className={classes ? classes.avatar : ''}
                src={person.avatar_url}
              />
              <Box px={3}>
                <Typography variant="h6" sx={{
                  lineHeight: 1
                }}>
                  {person.firstName + " " + person.lastName}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  "Twitter"
                </Typography>
              </Box>
              <IconButton size="small" className={classes ? classes.button : ''}>
                <AddIcon />
              </IconButton>
            </CardContent>
          </Card>
          /* </NavLink> */
        ))}
      </div>
      {popupContactsForm === true && <div className="contactsForm"><ContactsForm contactPicked={selectedContact} closeForm={() => setPopupContactsForm('false')} /></div>}
    </div>

  );

};