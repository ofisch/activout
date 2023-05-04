import {
  Button,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  ImageList,
  Stack,
  Typography,
} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
import {
  useMedia,
  searchResults,
  getComments,
  useTag,
  doFetch,
} from '../hooks/ApiHooks';
import {useWindowSize} from '../hooks/WindowHooks';
import {appId, baseUrl} from '../utils/variables';
import MediaRow from './MediaRow';
import SearchIcon from '@mui/icons-material/Search';

const MediaTable = () => {
  const {mediaArray} = useMedia();
  const windowSize = useWindowSize();

  const [showSort, setIsShown] = useState(false);

  let [searchRes, setSearchRes] = useState([]);

  searchRes = searchResults;

  const handleShowSort = (event) => {
    setIsShown((current) => !current);
  };

  const handleSearchRes = () => {
    setSearchRes((searchRes = searchResults));
  };

  console.log(searchRes);

  const handleSort = (event) => {
    if (event.target.value == 'a-z') {
      searchResults.sort((a, b) => (a.title > b.title ? 1 : -1));
      handleSearchRes();
      handleShowSort();
      //  console.log('hakutulokset', searchRes);
    } else if (event.target.value == 'z-a') {
      searchResults.sort((a, b) => (a.title < b.title ? 1 : -1));
      handleSearchRes();
      handleShowSort();
      //  console.log('hakutulokset', searchRes);
    } else if (event.target.value == 'highest') {
      console.log(event.target.value);
    } else if (event.target.value == 'lowest') {
      console.log(event.target.value);
    } else if (event.target.value == 'most') {
      console.log(event.target.value);
    }
    // TODO: järjestäminen ratingin perusteella (kun saadaan ratingit sovellukseen)
  };

  return (
    <>
      <Typography
        variant="p"
        sx={{mb: 3}}
      >{`${searchResults.length} results`}</Typography>
      <IconButton
        sx={{
          color: 'secondary.main',
        }}
        variant="contained"
        onClick={handleShowSort}
      >
        <FilterAltIcon sx={{scale: '2', mb: 5}}></FilterAltIcon>
      </IconButton>
      {showSort ? (
        <Grid item>
          <Typography component="p">Sort</Typography>
          <FormGroup>
            <Button
              variant="outlined"
              value="a-z"
              onClick={(event) => handleSort(event, 'value')}
            >
              A - Z
            </Button>
            <Button
              variant="outlined"
              value="z-a"
              onClick={(event) => handleSort(event, 'value')}
            >
              Z - A
            </Button>
            <Button
              variant="outlined"
              value="highest"
              onClick={(event) => handleSort(event, 'value')}
            >
              Highest rating
            </Button>
            <Button
              variant="outlined"
              value="lowest"
              onClick={(event) => handleSort(event, 'value')}
            >
              Lowest rating
            </Button>
            <Button
              variant="outlined"
              value="most"
              onClick={(event) => handleSort(event, 'value')}
            >
              Most ratings
            </Button>
          </FormGroup>
        </Grid>
      ) : null}

      <Stack spacing={2}>
        {searchRes.map((item, index) => {
          return <MediaRow key={index} file={item} />;
        })}
      </Stack>
    </>
  );
};

MediaTable.propTypes = {};

export default MediaTable;
