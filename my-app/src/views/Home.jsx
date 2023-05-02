import {Box, Grid, Typography} from '@mui/material';
import MediaTable from '../components/MediaTable';
import {userSearch} from '../hooks/ApiHooks';

const Home = () => {
  return (
    <>
      <Grid container direction="column" alignItems="center">
        <Box alignItems="top-left">
          <Typography component="h1" variant="h3" sx={{mb: 6}}>
            Hakuna käytettiin sanaa: "{userSearch}"
          </Typography>
        </Box>
        <MediaTable />
      </Grid>
    </>
  );
};

export default Home;
