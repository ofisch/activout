import {Grid, Typography} from '@mui/material';
import MediaTable from '../components/MediaTable';
import {userSearch} from '../hooks/ApiHooks';

const Home = () => {
  return (
    <>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Typography component="h1" variant="h3" sx={{mt: 8, mb: 6}}>
            {userSearch}
          </Typography>
        </Grid>
        <MediaTable />
      </Grid>
    </>
  );
};

export default Home;
