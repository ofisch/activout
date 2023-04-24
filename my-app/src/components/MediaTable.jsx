import {ImageList, Stack} from '@mui/material';
import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
import {useMedia} from '../hooks/apiHooks';
import {useWindowSize} from '../hooks/WindowHooks';
import {baseUrl} from '../utils/variables';
import MediaRow from './MediaRow';

const MediaTable = () => {
  const {mediaArray} = useMedia();
  const windowSize = useWindowSize();

  return (
    /*
    <ImageList cols={windowSize.width > 768 ? 3 : 2} gap={8}>
      {mediaArray.map((item, index) => {
        return <MediaRow key={index} file={item} />;
      })}
    </ImageList>
    */

    /*
    <ImageList cols={1}>
      {mediaArray.map((item, index) => {
        return <MediaRow key={index} file={item} />;
      })}
    </ImageList>
    */

    <Stack spacing={2}>
      {mediaArray.map((item, index) => {
        return <MediaRow key={index} file={item} />;
      })}
    </Stack>
  );
};

MediaTable.propTypes = {};

export default MediaTable;
