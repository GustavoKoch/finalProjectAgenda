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

  const [popupContactsForm, setPopupContactsFormr] = useState('Show');

  let allContacts = ApiContactsData() || [];
  console.log(allContacts);

  const classes = useStyles();
  /* console.log(classes); */
  return (
    <div className='container'>
      

      <div className='contactsContainer'>
        <div id='contactsTitle'>
          <h1>Contacts</h1>
          <IconButton className="bigButton" >
            <AddIcon />
          </IconButton>
        </div>
        {allContacts && allContacts.map((person, index) => (
          <Card key={index} className={classes?classes.card:''}>
            <CardContent className={classes?classes.content:''}>
              <Avatar
                variant="rounded"
                className={classes?classes.avatar:''}
                src={person.avatar_url}
              />
              <Box px={3}>
                <Typography variant="h6" sx={{
                  lineHeight: 1
                }}>
                  {person.first_name + " " + person.second_name}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  "Twitter"
                </Typography>
              </Box>
              <IconButton size="small" className={classes?classes.button:''}>
                <AddIcon />
              </IconButton>
            </CardContent>
          </Card>
        ))}
      </div>
      {popupContactsForm === 'Show' && <div className="contactsForm"><ContactsForm /></div>}
    </div>

  );

};