
import React, { useState, useEffect } from 'react';

import BottomNavigationBar from './components/BottomNavigationBar.js';
import PostList from './components/PostList.js';
import Console from './components/Console.js';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


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





export default function App(props) {


  const { title } = props;

  return (
    <Router>


      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">

          <Typography variant="h3" component="body">
            {title}
          </Typography>

          <Box
            boxShadow={3}
            bgcolor="background.paper"
            m={3}
            p={3}
            mb={11}
          >

            <Switch>
              <Route path="/my">
                <Console />
              </Route>
              <Route path="/">
                <PostList />
              </Route>
            </Switch>


          </Box>

        </Container>
        <BottomNavigationBar />
      </React.Fragment>
    </Router>

  );

}

