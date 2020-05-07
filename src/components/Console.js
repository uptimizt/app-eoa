
import React, { useState, useEffect } from 'react';

import Login from './Login.js';
import Dashboard from './Dashboard.js';

import {
  Container,
  List,
  ListItem,
  Button,
  CssBaseline,
  Typography,
  Box,
  makeStyles,

} from '@material-ui/core';


import '@wordpress/components/build-style/style.css';



export default function Console(props) {

  const [login, setLogin] = useState('');
  const siteURL = 'https://bizzapps.ru';

  useEffect(() => {
    const localLogin = localStorage.getItem('login');
    // If we have logged in, set it.
    // console.log(localLogin);
    if ( localLogin ) {
      setLogin( localLogin );
    }
  }, [login]);


  const { name } = props;

  return (


        <Box
       
        >
          <Typography variant="h5" component="body">
            My Account
          </Typography>

          {
            login && <Dashboard url={siteURL} token={login} setLogin={setLogin} />
          }

          {
            !login && <Login url={siteURL} setLogin={setLogin} />
          }

    


        </Box>


  );

}

