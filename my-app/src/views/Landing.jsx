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
import {useTag, doSearch} from '../hooks/ApiHooks';
import {appId} from '../utils/variables';
import {useNavigate} from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  const [showCategories, setIsShown] = useState(false);

  const [searchString, setSearchString] = useState('');
  const [updatedSearch, setUpdatedSearch] = useState(searchString);

  const handleShowCategory = (event) => {
    setIsShown((current) => !current);
  };

  const handleChange = (event) => {
    setSearchString(event.target.value);
  };

  const handleSearchString = () => {
    setUpdatedSearch(searchString);
  };

  return (
    <>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Typography component="h1" variant="h3" sx={{mt: 8, mb:6}}>
            Activout
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            name="search"
            onChange={handleChange}
            value={searchString}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    onClick={() => {
                      doSearch(searchString);
                      handleSearchString();
                      // mennään hakutulokset-sivulle kun painetaan hakua
                      navigate('/home');
                    }}
                  >
                    <SearchIcon></SearchIcon>
                  </IconButton>
                </InputAdornment>
              ),
            }}
          ></TextField>
        </Grid>
        <Grid item sx={{mt: 4, mb:2}}>
          <IconButton onClick={handleShowCategory}>
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
