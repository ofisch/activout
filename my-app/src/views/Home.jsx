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
        sx={{width: '100%'}}
      >
        <Box
          sx={{
            pb: 3,
            mb: 3,
            mx: 'auto',
            mt: 5,
          }}
        >
          <Typography component="h1" variant="h3" sx={{mb: 6}}>
            <IconButton
              sx={{
                color: 'secondary.main',
              }}
              onClick={() => {
                navigate('/');
              }}
            >
              <ArrowBackIcon sx={{scale: '2'}}></ArrowBackIcon>
            </IconButton>
            Search: {userSearch}
          </Typography>
        </Box>
      </Grid>
      <Grid container direction="column" alignItems="center" sx={{mt: '0'}}>
        <MediaTable />
      </Grid>
    </>
  );
};

export default Home;
