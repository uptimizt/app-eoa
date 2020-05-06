
import React, { useState, useEffect } from 'react';

import BottomNavigationBar from './components/BottomNavigationBar.js';

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
import Login from './components/Login';
import Dashboard from './components/Dashboard';



export default function App(props) {

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


    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box
          boxShadow={3}
          bgcolor="background.paper"
          m={3}
          p={3}
          mb={11}
        >
          <Typography variant="h1" component="h2">
            Posts {name}
          </Typography>

          {
            login && <Dashboard url={siteURL} token={login} setLogin={setLogin} />
          }

          {
            !login && <Login url={siteURL} setLogin={setLogin} />
          }

          <List className="posts-list">


          </List>


        </Box>

      </Container>
      <BottomNavigationBar />
    </React.Fragment>

  );

}

