import {Box, Grid, IconButton, Paper, Typography} from '@mui/material';
import MediaTable from '../components/MediaTable';
import {userSearch} from '../hooks/ApiHooks';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useNavigate} from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Grid
        container
        direction="row"
        alignItems="top-left"
        sx={{width: '100%', justifyContent: 'center'}}
      >
        <Box
          sx={{
            mt: 8,
            mb: 3,
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            alignItems: 'flex-start',
            width: '900px',
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: 'flex-start',
            }}
          >
            <IconButton
              sx={{color: 'secondary.main'}}
              onClick={() => {
                navigate('/');
              }}
            >
              <ArrowBackIcon sx={{scale: '2'}}></ArrowBackIcon>
            </IconButton>
          </Box>
          <Typography
            component="h1"
            variant="h3"
            sx={{mx: 3, flexGrow: 1, textAlign: 'center'}}
          >
            Search: {userSearch}
          </Typography>
          <Box sx={{flexGrow: 1}}></Box>
        </Box>
      </Grid>
      <Grid container direction="column" alignItems="center" sx={{mt: '0'}}>
        <MediaTable />
      </Grid>
    </>
  );
};

export default Home;
