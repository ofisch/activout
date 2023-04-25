import {ImageList, Stack} from '@mui/material';
import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
import {useMedia, searchResults} from '../hooks/ApiHooks';
import {useWindowSize} from '../hooks/WindowHooks';
import {baseUrl} from '../utils/variables';
import MediaRow from './MediaRow';

const MediaTable = () => {
  const {mediaArray} = useMedia();
  const windowSize = useWindowSize();

  console.log('mediaArray:', mediaArray);
  console.log('searchResults', searchResults);

  return (
    <Stack spacing={2}>
      {searchResults.map((item, index) => {
        return <MediaRow key={index} file={item} />;
      })}
    </Stack>
  );
};

MediaTable.propTypes = {};

export default MediaTable;
