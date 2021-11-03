import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems } from './listItems';
import Chart from './Chart';
import Orders from './Orders';
import Revenue from './Revenue';
import { useState } from 'react';

const mdTheme = createTheme();


export function Dashboard({
  currentRevenue, 
  setCurrentRevenue,
  cardNumber,
  setCardNumber,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  city,
  setCity,
  state,
  setState,
  currentTotal,
  setCurrentTotal

}) {

  
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={
          { display: 'flex',
            minHeight: '100vh',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
        <CssBaseline />
         
        <Divider sx={{
            width: '1%',
        }}/>
        <List sx={{
            width: '10%'
        }}
        >{mainListItems}</List>

        <Divider />

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
             Dashboard
            <Grid container spacing={3}>

           

              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 300,
                  }}
                >
                  <Chart />
                </Paper>
              </Grid>


              {/* Revenue */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 300,
                  }}
                >
                  <Revenue 
                  currentRevenue={currentRevenue}
                  setCurrentRevenue={setCurrentRevenue}
                  />

                </Paper>
              </Grid>


              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Orders 
                  currentRevenue={currentRevenue}
                  setCurrentRevenue={setCurrentRevenue}
                  cardNumber={cardNumber}
                  setCardNumber={setCardNumber}
                  firstName={firstName}
                  setFirstName={setFirstName}
                  lastName={lastName}
                  setLastName={setLastName}
                  city={city}
                  setCity={setCity}
                  state={state}
                  setState={setState}
                  currentTotal={currentTotal}
                  setCurrentTotal={setCurrentTotal}
                  />
                </Paper>
              </Grid>
            </Grid>


          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

