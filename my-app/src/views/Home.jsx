import {Grid, Typography} from '@mui/material';
import MediaTable from '../components/MediaTable';
//import {searchResults} from '../hooks/ApiHooks';

const Home = () => {
  //  console.log(searchResults);
  //  const location = JSON.parse(searchResults[0]);
  //  const address = location.address;
  //  console.log(address);
  return (
    <>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Typography component="h1" variant="h3" sx={{mt: 8, mb: 6}}>
            Home
          </Typography>
        </Grid>
        <MediaTable />
      </Grid>
    </>
  );
};

export default Home;
