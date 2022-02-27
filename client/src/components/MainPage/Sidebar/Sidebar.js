import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import GridViewIcon from '@mui/icons-material/GridView';
import StorefrontIcon from '@mui/icons-material/Storefront';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import App from '../../../App';

import { Divider } from '@mui/material';
import { ReactComponent as Logo } from '../../../assets/logo.svg';
import MenuIcon from '@mui/icons-material/Menu';
import { ReactComponent as AvatarImg } from '../../../assets/accImg.jpeg';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  NavLink,
} from 'react-router-dom';
import EditProfile from '../../AccountSetup/EditProfile/EditProfile';
import styles from './Sidebar.module.css';

const drawerWidth = 300;

const withouSidebarRoutes = [
  '/register',
  '/login',
  '/forgot-password',
  '/congratulations',
  '/bank-account',
  '/verify-profile',
  '/successfully-verified',
  '/account-type',
];

function ResponsiveDrawer(props) {
  const { pathname } = useLocation();

  const [user, setUser] = useState(null);

  useEffect(async () => {
    const response = await fetch(`http://localhost:5000/logged-user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${window.localStorage.accessToken}`,
      },
    });
    const data = await response.json();
    setUser(data);
  }, []);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  if (withouSidebarRoutes.some((item) => pathname.includes(item))) return null;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div style={{ height: '100vh', position: 'relative' }}>
      <Toolbar
        style={{
          padding: '30px 0 60px 0',
          margin: 0,
          alignContent: 'center',
          justifyContent: 'center',
        }}
      >
        {/* <Typography variant="h2" color="primary" sx={{ fontWeight: "bold " }}>
        </Typography> */}
        <Logo style={{ alignSelf: 'center', justifySelf: 'center' }} />
      </Toolbar>

      <List>
        <NavLink
          to="/dashboard"
          style={{ textDecoration: 'none' }}
          className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
          }
        >
          <ListItem disablePadding button component="a">
            <ListItemButton style={{ paddingLeft: '60px' }}>
              <ListItemIcon>
                <GridViewIcon color="white" fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
        </NavLink>
        <NavLink
          to="/market"
          style={{ textDecoration: 'none' }}
          className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
          }
        >
          <ListItem
            disablePadding
            button
            component="a"
            sx={{ '&selected': { bgcolor: '#000' } }}
          >
            <ListItemButton style={{ paddingLeft: '60px' }}>
              <ListItemIcon>
                <StorefrontIcon color="white" fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="Market" />
            </ListItemButton>
          </ListItem>
        </NavLink>
        <NavLink
          to="/edit-profile"
          style={{ textDecoration: 'none' }}
          className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
          }
        >
          <ListItem disablePadding button component="a" href="/edit-profile">
            <ListItemButton style={{ paddingLeft: '60px' }}>
              <ListItemIcon>
                <SettingsIcon
                  color="white"
                  fontSize="large"
                  className="ikonce"
                />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
        </NavLink>
      </List>

      <Grid
        conatiner
        sx={{
          display: 'flex',
          py: '11px',
          alignSelf: 'flex-end',
          position: 'absolute',
          bottom: '0',
          width: '100%',
          borderTop: 1,
          borderColor: '#ccc',
        }}
      >
        <Grid item xs={3}>
          <Avatar style={{ marginLeft: '2rem' }}>
            <PersonOutlineIcon />
          </Avatar>
        </Grid>
        <Grid item xs={6}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 900 }}>
              Ognen Todorovski
            </Typography>
            <Typography variant="body2">ognent@gmail.com</Typography>
          </Box>
        </Grid>
        <Grid item xs={3} sx={{ alignSelf: 'center', justifySelf: 'center' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <LogoutIcon />
          </Box>
        </Grid>
      </Grid>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex', height: 0 }}>
      <AppBar
        position="fixed"
        sx={{
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          ml: { lg: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ display: { lg: 'none' } }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { lg: 'none' } }}
          >
            <MenuIcon sx={{ color: 'white ' }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of NavLinks. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', lg: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        // component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { lg: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {/* <Dashboard /> */}
      </Box>
      <Divider />
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
