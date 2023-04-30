import {
  Button,
  FormControlLabel,
  FormGroup,
  Grid,
  ImageList,
  Stack,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
import {useMedia, searchResults} from '../hooks/ApiHooks';
import {useWindowSize} from '../hooks/WindowHooks';
import {baseUrl} from '../utils/variables';
import MediaRow from './MediaRow';

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

  const handleSort = (event) => {
    if (event.target.value == 'a-z') {
      searchResults.sort((a, b) => (a.title > b.title ? 1 : -1));
      handleSearchRes();
      console.log('hakutulokset', searchRes);
    } else if (event.target.value == 'z-a') {
      searchResults.sort((a, b) => (a.title < b.title ? 1 : -1));
      handleSearchRes();
      console.log('hakutulokset', searchRes);
    }
    // TODO: järjestäminen ratingin perusteella (kun saadaan ratingit sovellukseen)
  };

  return (
    <>
      <Button variant="contained" onClick={handleShowSort}>
        järjestä
      </Button>
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
