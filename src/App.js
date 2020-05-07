
import React, { useState, useEffect } from 'react';

import BottomNavigationBar from './components/BottomNavigationBar.js';
import PostList from './components/PostList.js';

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

          <PostList/>

          <List className="posts-list">


          </List>


        </Box>

      </Container>
      <BottomNavigationBar />
    </React.Fragment>

  );

}

