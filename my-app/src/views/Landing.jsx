import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import {DraftsOutlined} from '@mui/icons-material';
import {useState} from 'react';
import {useTag} from '../hooks/apiHooks';
import {appId} from '../utils/variables';

const Landing = () => {
  const [showCategories, setIsShown] = useState(false);

  const handleClick = (event) => {
    setIsShown((current) => !current);
  };

  const doSearch = async () => {
    try {
      // haetaan kaikki
      const files = await useTag().getTag(appId);
      // tulostetaan alkion 5 description-json (josta löytyy kategoria ja osoite)
      console.log(JSON.parse(files[6].description));
      // TODO: haku-stringin ja kategorioiden vertailu json-olion tietoihin
    } catch (error) {
      alert(error);
    }
  };

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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton onClick={doSearch}>
                    <SearchIcon></SearchIcon>
                  </IconButton>
                </InputAdornment>
              ),
            }}
          ></TextField>
        </Grid>
        <Grid item>
          <IconButton onClick={handleClick}>
            <TuneIcon></TuneIcon>
          </IconButton>
        </Grid>
        {showCategories ? (
          <Grid item>
            <Typography component="p">Categories</Typography>
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="activity parks" />
              <FormControlLabel control={<Checkbox />} label="skate parks" />
              <FormControlLabel control={<Checkbox />} label="dog parks" />
              <FormControlLabel control={<Checkbox />} label="playgrounds" />
            </FormGroup>
          </Grid>
        ) : null}
      </Grid>
    </>
  );
};

export default Landing;
