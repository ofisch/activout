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

  const [showCategories, setIsShown] = useState(true);

  const [searchString, setSearchString] = useState('');
  const [updatedSearch, setUpdatedSearch] = useState(searchString);

  const [searchCategories, setCategories] = useState({
    categories: [],
    response: [],
  });

  const [categories, setCategoriesTest] = useState([]);

  const handleCategory = (e) => {
    e.persist() && e.persist();
    const {value, checked} = e.target;

    if (checked) {
      categories.push(value);
    } else {
      for (const i of categories) {
        if (i.includes(value)) {
          const index = categories.indexOf(i);
          const x = categories.splice(index, 1);
          //  console.log(x);
        }
      }
    }
    //  console.log(categories);
  };

  const handleShowCategory = (event) => {
    setIsShown((current) => !current);
  };

  const handleChange = (event) => {
    setSearchString(event.target.value);
    //  console.log('categoryArray:', categories);
  };

  const handleSearchString = () => {
    setUpdatedSearch(searchString);
  };

  return (
    <>
      <Grid container direction="column" alignItems="center" sx={{mt: '15%'}}>
        <Grid item>
          <Typography component="h4" variant="h4" sx={{mb: 6}}>
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
                    sx={{
                      color: 'secondary.main',
                    }}
                    onClick={() => {
                      handleSearchString();
                      doSearch(searchString, categories);
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
        <Grid item sx={{mt: 4, mb: 2}}>
          <IconButton
            sx={{
              color: 'secondary.main',
            }}
            onClick={handleShowCategory}
          >
            <TuneIcon></TuneIcon>
          </IconButton>
        </Grid>
        {showCategories ? (
          <Grid item>
            <Typography component="p">Categories</Typography>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                label="activity parks"
                value="activity parks"
                onChange={handleCategory}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="skate parks"
                value="skate parks"
                onChange={handleCategory}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="dog parks"
                value="dog parks"
                onChange={handleCategory}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="playgrounds"
                value="playgrounds"
                onChange={handleCategory}
              />
            </FormGroup>
          </Grid>
        ) : null}
      </Grid>
    </>
  );
};

export default Landing;
