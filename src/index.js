import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { BrowserRouter } from "react-router-dom";
import CalendarContextProvider from './contexts/CalendarContext';
import {AuthProvider} from "./utils/Auth";

const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <BrowserRouter>
    <AuthProvider>
      
        <App />
      
    </AuthProvider>
    </BrowserRouter>
  );

  // calendarContext({theme:"dark", children: [app]})
