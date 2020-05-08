
import React, { useState, useEffect } from 'react';

import BottomNavigationBar from './components/BottomNavigationBar.js';
import PostList from './components/PostList.js';
import Console from './components/Console.js';
import {Article} from './components/Article.js';
import SinglePost from './components/SinglePost.js';



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

          <Typography variant="h3" component="h1">
            {title}
          </Typography>

          <Link to='/'>Home</Link>

          <Box
            boxShadow={3}
            bgcolor="background.paper"
            // m={1}
            p={5}
            mb={1}
          >

            <Switch>
              <Route path="/" exact>
                <PostList />
              </Route>
              <Route path="/p/:page">
                <SinglePost />
         
              </Route>
              <Route path="/my">
                <Console />
              </Route>

            </Switch>


          </Box>

        </Container>
        <BottomNavigationBar />
      </React.Fragment>
    </Router>

  );

}

