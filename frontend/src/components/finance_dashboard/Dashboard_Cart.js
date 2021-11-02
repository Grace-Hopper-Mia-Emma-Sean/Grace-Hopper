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

import {
    CartTable
  } from "..";

const mdTheme = createTheme();

export function Dashboard_Cart() {
  
  return (
    <ThemeProvider theme={mdTheme}>
    <Box sx={
        { display: 'flex',
          minHeight: '100%',
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
          <Container >
            <Grid >
                        
            <Grid sx={{
              height: '60vh',
              width: '85vh',
            }}>
                <Paper
                  sx={{
                    height: '100%',
                    width: '100%'
                  }}
                >
                  <CartTable />
                </Paper>
              </Grid>

            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

