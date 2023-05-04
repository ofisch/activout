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

  // shows sort buttons
  const handleShowSort = (event) => {
    setIsShown((current) => !current);
  };

  // sets the value of searchesRes to searchResults-array
  const handleSearchRes = () => {
    setSearchRes((searchRes = searchResults));
  };

  // triggered when a sort option is selected from the dropdown
  const handleSort = (event) => {
    if (event.target.value == 'a-z') {
      searchResults.sort((a, b) => (a.title > b.title ? 1 : -1));
      handleSearchRes();
      handleShowSort();
    } else if (event.target.value == 'z-a') {
      searchResults.sort((a, b) => (a.title < b.title ? 1 : -1));
      handleSearchRes();
      handleShowSort();
    }
  };

  // renders a search results display with sorting options.
  // shows the number of search results, a button to trigger the sorting options, and a list of search results
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
