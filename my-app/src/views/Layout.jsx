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

const Layout = () => {
  const {user, setUser} = useContext(MediaContext);
  const {getUserByToken} = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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
          <ListItemText primary="Landing" />
        </ListItem>
        {user ? (
          <>
            <ListItem button component={Link} to="/upload">
              <ListItemText primary="Upload" />
            </ListItem>
            <ListItem button component={Link} to="/profile">
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem button component={Link} to="/logout">
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        ) : (
          <ListItem button component={Link} to="/login">
            <ListItemText primary="Login" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={createTheme(themeOptions)}>
      <CssBaseline />
      <Container maxWidth="xl">
        <AppBar position="sticky">
          <Toolbar disableGutters sx={{justifyContent: 'space-between'}}>
            <Typography
              variant="h6"
              sx={{
                m: 2,
                letterSpacing: '.3rem',
              }}
            >
              Activout
            </Typography>
            {isMobile ? (
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
            ) : (
              <Box sx={{mr: 2}}>
                <Button sx={{color: 'white'}} component={Link} to="/">
                  Landing
                </Button>
                {user ? (
                  <>
                    <Button
                      sx={{color: 'white'}}
                      component={Link}
                      to="/profile"
                    >
                      Profile
                    </Button>
                    <Button sx={{color: 'white'}} component={Link} to="/upload">
                      Upload
                    </Button>
                    <Button sx={{color: 'white'}} component={Link} to="/logout">
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button sx={{color: 'white'}} component={Link} to="/login">
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
        <Box sx={{mt: 12}}>
          <Outlet />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Layout;
