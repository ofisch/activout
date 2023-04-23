import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import {DraftsOutlined, Radio} from '@mui/icons-material';
import {useState} from 'react';

const Landing = () => {
  const [isShown, setIsShown] = useState(false);

  const handleClick = (event) => {
    setIsShown((current) => !current);
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
                  <SearchIcon></SearchIcon>
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
        {isShown ? (
          <Grid item>
            <FormControl>
              <FormLabel id="category-buttons">Categories</FormLabel>
              <RadioGroup
                aria-labelledby="category-buttons"
                name="category-buttons-group"
              >
                <FormControlLabel
                  value="activity-park"
                  control={<Radio />}
                  label="activity parks"
                />
                <FormControlLabel
                  value="skate-park"
                  control={<Radio />}
                  label="skate parks"
                />
                <FormControlLabel
                  value="dog-park"
                  control={<Radio />}
                  label="dog parks"
                />
                <FormControlLabel
                  value="playgrounds"
                  control={<Radio />}
                  label="playgrounds"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        ) : null}
      </Grid>
    </>
  );
};

export default Landing;
