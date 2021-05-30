import React from 'react';
import logo from './logo.svg';
import './App.scss';
import TDEEInput from "./TDEEInput";
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Container,
  Grid,
  IconButton,
  Toolbar,
  Typography
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import WeightLossGoals from "./WeightLossGoals";
import Timeline from "./Timeline";


function App() {
  return (
    <div className="App" style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
      <AppBar position={"static"}>
        <Toolbar variant="dense">
          {/*<IconButton edge="start" color="inherit" aria-label="menu">*/}
          {/*  <MenuIcon />*/}
          {/*</IconButton>*/}
          <Typography variant="h6" color="inherit">
            Weight Loss Planner and Visualizer
          </Typography>
        </Toolbar>
      </AppBar>
      <Container className="main-container">
        <Grid container xs={12} spacing={4}>
          <Grid item xs={6}>
            <TDEEInput/>
          </Grid>
          <Grid item xs={6}>
            <WeightLossGoals/>
          </Grid>
          <Grid item xs={12}>
            <Timeline/>
          </Grid>
        </Grid>
      </Container>
      {/*<BottomNavigation style={{position: 'absolute', bottom: 0, right: 0, left: 0, display: 'flex'}}>*/}
      {/*  <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />*/}
      {/*  <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />*/}
      {/*  <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />*/}
      {/*</BottomNavigation>*/}
    </div>
  );
}

export default App;
