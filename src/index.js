import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { BrowserRouter } from "react-router-dom";
import CalendarContextProvider from './contexts/CalendarContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <BrowserRouter>
      <CalendarContextProvider>
        <App />
      </CalendarContextProvider>
    </BrowserRouter>
  );

  // calendarContext({theme:"dark", children: [app]})
