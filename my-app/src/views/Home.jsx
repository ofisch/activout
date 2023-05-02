import {Grid, IconButton, Typography} from '@mui/material';
import MediaTable from '../components/MediaTable';
import {userSearch} from '../hooks/ApiHooks';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Box} from '@mui/system';
import {useNavigate} from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Grid container direction="column" alignItems="center" sx={{mt: '-7rem'}}>
        <Grid item>
          <Box container direction="column">
            <Typography component="h1" variant="h3" sx={{mt: 8, mb: 6}}>
              <IconButton
                onClick={() => {
                  navigate('/');
                }}
              >
                <ArrowBackIcon sx={{scale: '2'}}></ArrowBackIcon>
              </IconButton>
              {userSearch}
            </Typography>
          </Box>
        </Grid>
        <MediaTable />
      </Grid>
    </>
  );
};

export default Home;
