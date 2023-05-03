import {
  Box,
  Button,
  Paper,
  Container,
  Grid,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {appId, baseUrl, mediaUrl} from '../utils/variables';
import StarIcon from '@mui/icons-material/Star';
import {doFetch, getComments, useTag} from '../hooks/ApiHooks';
import {useEffect, useState} from 'react';

const MediaRow = ({file}) => {
  // lokaation kaikki ominaisuudet (kuvaus, kategoria, osoite jne.)
  const fileAttributes = JSON.parse(file.description);

  console.log('file: ', file.file_id);

  /*
  const [comments, setComments] = useState([]);

  const commentsToLocation = (location) => {
    useEffect(() => {
      getComments(location)
        .then((searchComments) => {
          setComments(searchComments);
          console.log(searchComments);
          console.log('comments: ', comments);
          console.log('rating: ', comments.rating);
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);
  };

  commentsToLocation(file);
  */

  let searchComments = [];

  const getCommentsToLocations = async (loc) => {
    try {
      searchComments = [];

      const files = await useTag().getTag(appId);
      const filesWithId = await Promise.all(
        files.map(async (file) => {
          return await doFetch(baseUrl + 'media/' + file.file_id);
        })
      );

      for (const file of filesWithId) {
        if (file.title.startsWith('{')) {
          const titleId = JSON.parse(file.title);

          if (titleId.id == loc.file_id) {
            const useComments = [];
            useComments.push(file);

            console.log(useComments.length);
            console.log(useComments);

            for (const i of useComments) {
              const commentTitle = JSON.parse(i.title);
              const commentDesc = JSON.parse(i.description);
              const commentId = JSON.parse(i.file_id);

              if (!useComments.includes(commentId)) {
                const commentValues = {
                  title: commentTitle.title,
                  user: commentDesc.user,
                  rating: commentDesc.rating,
                  review: commentDesc.review,
                  thumbnails: i.thumbnails.w640,
                };
                searchComments.push(commentValues);
              }
            }
          }
        }
      }
    } catch (error) {
      alert(error.message);
    }
    return searchComments;
  };

  getCommentsToLocations(file);

  // TODO: eti rating taulukon sisältä
  console.log('MOI: ', searchComments);

  return (
    <Paper
      elevation={7}
      sx={{
        maxWidth: '100%',
        minWidth: '50%',
        pb: 3,
        mb: 3,
        '&:hover': {
          boxShadow: 24,
        },
      }}
    >
      <Box
        component={Link}
        variant="contained"
        to="/single"
        state={{file}}
        style={{textDecoration: 'none', color: 'primary.contrastText'}}
      >
        <Box sx={{bgcolor: 'primary.light', p: 3}}>
          <Typography
            component="h1"
            variant="h3"
            sx={{ml: 3, color: 'primary.contrastText'}}
          >
            {file.title}
          </Typography>
        </Box>
        <Box
          sx={{
            width: '100%',
            height: 312,
            my: 4,
            pb: 3,
            pl: 7,
            backgroundColor: 'white',
          }}
        >
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            flexWrap="nowrap"
          >
            <Grid container direction="column">
              <StarIcon sx={{color: 'primary.contrastText'}}></StarIcon>
              <Typography
                component="p"
                sx={{mb: 3, pl: 2, color: 'primary.contrastText'}}
              >
                {searchComments.description}
              </Typography>
              <Typography
                component="h1"
                variant="h6"
                sx={{color: 'primary.contrastText'}}
              >
                {fileAttributes.address}, {fileAttributes.municipality}
              </Typography>
              <Typography
                component="h1"
                variant="h6"
                sx={{color: 'primary.contrastText'}}
              >
                {fileAttributes.category}
              </Typography>
              <Typography
                component="h1"
                variant="h6"
                sx={{color: 'primary.contrastText'}}
              >
                {fileAttributes.desc}
              </Typography>
            </Grid>
            <Grid container>
              <img
                src={mediaUrl + file.thumbnails.w640}
                alt={file.title}
                style={{width: '85%', height: 'auto'}}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Paper>
  );
};

MediaRow.propTypes = {
  file: PropTypes.object.isRequired,
};

export default MediaRow;
