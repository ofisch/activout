import {
  AppBar,
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ThemeProvider,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {useContext, useEffect, useState} from 'react';
import {Link, Outlet, useLocation, useNavigate} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';
import {useUser} from '../hooks/ApiHooks';
import {themeOptions} from '../theme/themeOptions';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import {AccountCircle} from '@mui/icons-material';

const Layout = () => {
  const {user, setUser} = useContext(MediaContext);
  const {getUserByToken} = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [openDrawer, setOpenDrawer] = useState(false);

  const getUserInfo = async () => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      console.log(userToken);
      const userData = await getUserByToken(userToken);
      if (userData) {
        setUser(userData);
        const target = location.pathname === '/' ? '/home' : location.pathname;
        navigate(target);
        return;
      }
    }
    navigate('/');
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const drawerList = () => (
    <Box
      sx={{
        width: 250,
      }}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <List>
        <ListItem button component={Link} to="/">
          <SearchIcon sx={{mr: 1}}></SearchIcon>
          <p></p>
          <ListItemText primary="Search" />
        </ListItem>
        {user ? (
          <>
            <ListItem button component={Link} to="/upload">
              <AddLocationIcon sx={{mr: 1}}></AddLocationIcon>

              <ListItemText primary="Add location" />
            </ListItem>
            <ListItem button component={Link} to="/profile">
              <AccountCircle sx={{mr: 1}} />
              <p></p>
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem button component={Link} to="/logout">
              <LogoutIcon sx={{mr: 1}}></LogoutIcon>
              <p></p>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        ) : (
          <ListItem button component={Link} to="/login">
            <LoginIcon sx={{mr: 1}}></LoginIcon>
            <ListItemText primary="Login" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={createTheme(themeOptions)}>
      <CssBaseline />
      <Container maxWidth="xxl">
        <AppBar position="sticky">
          <Toolbar disableGutters sx={{justifyContent: 'space-between'}}>
            <Typography
              variant="h6"
              sx={{
                m: 2,
                letterSpacing: '.3rem',
              }}
            >
              <Button sx={{color: 'primary.dark'}} component={Link} to="/">
                Activout
              </Button>
            </Typography>
            {isMobile ? (
              <Box>
                <Button sx={{color: 'primary.dark'}} component={Link} to="/">
                  <SearchIcon></SearchIcon>
                </Button>
                <IconButton
                  size="large"
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  sx={{mr: 2}}
                  onClick={toggleDrawer}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            ) : (
              <Box sx={{mr: 2}}>
                <Button sx={{color: 'primary.dark'}} component={Link} to="/">
                  <SearchIcon sx={{mr: 1}}></SearchIcon>
                  Search
                </Button>
                {user ? (
                  <>
                    <Button
                      sx={{color: 'primary.dark'}}
                      component={Link}
                      to="/profile"
                    >
                      <AccountCircle sx={{mr: 1}} />
                      Profile
                    </Button>
                    <Button
                      sx={{color: 'primary.dark'}}
                      component={Link}
                      to="/upload"
                    >
                      <AddLocationIcon sx={{mr: 1}}></AddLocationIcon>
                      Add location
                    </Button>
                    <Button
                      sx={{color: 'primary.dark'}}
                      component={Link}
                      to="/logout"
                    >
                      <LogoutIcon sx={{mr: 1}}></LogoutIcon>
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button
                    sx={{color: 'secondary.main'}}
                    component={Link}
                    to="/login"
                  >
                    <LoginIcon sx={{mr: 1}}></LoginIcon>
                    Login
                  </Button>
                )}
              </Box>
            )}
            <Drawer
              anchor="right"
              open={openDrawer}
              onClose={toggleDrawer}
              sx={{width: 250}}
            >
              {drawerList()}
            </Drawer>
          </Toolbar>
        </AppBar>
        <Box sx={{mt: 0}}>
          <Outlet />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Layout;
