import React from 'react';

import {
  
    BottomNavigation,
    BottomNavigationAction,
    AppBar,
    makeStyles,
} from '@material-ui/core';

import HomeIcon from '@material-ui/icons/Home';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';


export default function BottomNavigationBar() {
    const useStyles = makeStyles((theme) => ({
        text: {
          padding: theme.spacing(2, 2, 0),
        },
        paper: {
          paddingBottom: 50,
        },
        list: {
          marginBottom: theme.spacing(2),
        },
        subheader: {
          backgroundColor: theme.palette.background.paper,
        },
        appBar: {
          top: 'auto',
          bottom: 0,
        },
        grow: {
          flexGrow: 1,
        },
        fabButton: {
          position: 'absolute',
          zIndex: 1,
          top: -30,
          left: 0,
          right: 0,
          margin: '0 auto',
        },
      }));

      const classes = useStyles();
      
    return (

        <AppBar position="fixed" color="primary" className={classes.appBar}>
            <BottomNavigation
                showLabels
            >
                <BottomNavigationAction label="Home" icon={<HomeIcon />} />
                <BottomNavigationAction label="Down" icon={<ArrowDownwardIcon />} />
                <BottomNavigationAction label="Up" icon={<ArrowUpwardIcon />} />
            </BottomNavigation>
        </AppBar>
    );
}