import {Grid, Icon, TextField, Typography} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';

const Landing = () => {
  return (
    <>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Typography component="h1" variant="h3">
            Activout
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
          ></TextField>
          <SearchIcon></SearchIcon>
        </Grid>
        <Grid item alignItems="flex-start">
          <TuneIcon></TuneIcon>
        </Grid>
      </Grid>
    </>
  );
};

export default Landing;
