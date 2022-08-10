// try me at https://codesandbox.io/s/user-card-mui4-njoxy8
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Avatar,
  Box,
  Typography,
  IconButton,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ApiContactsData from "../../services/ApiContactsData";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../contacts/Contacts.css";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "inline-block",
    backgroundColor: theme.palette.grey[300],
    margin: theme.spacing(1),
  },
  content: {
    display: "flex",
    alignItems: "center",
    paddingTop: theme.spacing(2),
    "&:last-child": {
      paddingBottom: theme.spacing(2),
    },
  },
  avatar: {
    width: 55,
    height: 55,
  },
  name: {
    lineHeight: 1,
  },
  button: {
    backgroundColor: "#fff",
    boxShadow: "0 1px 4px 0 rgba(0,0,0,0.12)",
    "&:hover": {
      backgroundColor: "#ff5f",
      color: "#000",
    },
  },
}));

export default function Contacts() {
  const [popupContactsForm, setPopupContactsForm] = useState();
  const [selectedContact, setSelectedContact] = useState();
  const navigate = useNavigate();

  /*  let allCalendarEvents2 = ApiContactsData() || []; */

  const [allCalendarEvents, setallCalendarEvents] = useState();
  /*  console.log(popupContactsForm) */

  const extUrl = "calendar";
  const url = `https://projectberlin-backend.herokuapp.com/${extUrl}`;
  const token= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmYyZGZiNzY3ZWY0MWY4YWM3NWI5MGYiLCJ1c2VyRW1haWwiOiJndXNvODhAaG90bWFpbC5jb20iLCJpYXQiOjE2NjAwODY0NjMsImV4cCI6MTY2MDE3Mjg2M30.I1aftX-vkHz171Tz_g46sBfoJSiZpqbIz8mtUchvIx0'
  const requestOptions = {
    method: "GET",
    headers: {'Authorization':"Bearer "+ token, 'Content-Type': 'application/json'  },
  };
  useEffect(() => {
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        setallCalendarEvents(data);
        console.log(data);
      })
      .catch((e) => console.log(e.message));
  }, [popupContactsForm]);

  const selectContact = (contactComponent) => {
    setSelectedContact(contactComponent);
    setPopupContactsForm(true);
    navigate("/contacts/" + contactComponent._id);
  };
  const closeFormAndReload = () => {
    setPopupContactsForm(!popupContactsForm);
    setSelectedContact({
      title: "",
      lastName: "",
      birthday: "Jan 01 2022 00:00:00",
      nameday: "Jan 01 2022 00:00:00",
      category: [],
      avatar_url: "",
    });

    navigate("/contacts");
  };
  /*  console.log(popupContactsForm) */

  const toggleContactsForm = () => {
    setSelectedContact({
      title: "",
      lastName: "",
      birthday: "Jan 01 2022 00:00:00",
      nameday: "Jan 01 2022 00:00:00",
      category: [],
      avatar_url: "",
    });
    navigate("/contacts");
    setPopupContactsForm(!popupContactsForm);
  };
  /*   console.log(popupContactsForm)
  console.log(allCalendarEvents2) */

  const classes = useStyles();

  return (
    <div>
      <div className="container">
        <div id="contactsTitle">
          <h1>Today</h1>
          <IconButton
            onClick={() => toggleContactsForm()}
            className="bigButton"
          >
            <AddIcon />
          </IconButton>
        </div>
        <div className="contactsAndForm">
          <div className="contacts">
            {allCalendarEvents &&
              allCalendarEvents.filter.map((calendarEvent, index) => (
                <Card
                  key={index}
                  onClick={() => selectContact(calendarEvent)}
                  className={classes ? classes.card : ""}
                >
                  <CardContent className={classes ? classes.content : ""}>
                    <Box px={3}>
                      <Typography
                        variant="h6"
                        sx={{
                          lineHeight: 1,
                        }}
                      >
                        {calendarEvent.title}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {calendarEvent.category}
                        {calendarEvent.start}
                        {calendarEvent.end}
                      </Typography>
                    </Box>
                    <IconButton
                      size="small"
                      className={classes ? classes.button : ""}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z" />
                      </svg>
                    </IconButton>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
