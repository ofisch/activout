import {
  Box,
  Button,
  Paper,
  Container,
  Grid,
  ImageListItem,
  ImageListItemBar,
  Typography,
  Rating,
} from '@mui/material';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {appId, baseUrl, mediaUrl} from '../utils/variables';
import StarIcon from '@mui/icons-material/Star';
import {doFetch, getComments, useTag} from '../hooks/ApiHooks';
import {useEffect, useState} from 'react';
import PlaceIcon from '@mui/icons-material/Place';
import HikingIcon from '@mui/icons-material/Hiking';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

const MediaRow = ({file}) => {
  // lokaation kaikki ominaisuudet (kuvaus, kategoria, osoite jne.)
  const fileAttributes = JSON.parse(file.description);

  let searchComments = [];

  const getCommentsToLocations = async (loc) => {
    let ratingSum = 0;
    let ratingCount = 0;

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
                ratingSum += parseFloat(commentDesc.rating).toFixed(1);

                ratingCount++;
              }
            }
          }
        }
      }
    } catch (error) {
      alert(error.message);
    }
    const avgRating = ratingSum / ratingCount;
    return avgRating;
  };

  const [comments, setComments] = useState();

  getCommentsToLocations(file)
    .then((searchComments) => {
      setComments(searchComments);
    })
    .catch((error) => {
      console.error(error);
    });

  return (
    <Paper
      elevation={7}
      sx={{
        maxWidth: '900px',
        minWidth: '50%',
        width: '100%',
        pb: 0,
        mb: 0,
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
        style={{
          textDecoration: 'none',
          color: 'primary.contrastText',
        }}
      >
        <Box sx={{bgcolor: 'primary.light', pb: 2, pt: 2}}>
          <Typography
            component="h1"
            variant="h3"
            sx={{color: 'primary.contrastText', ml: 2}}
          >
            {file.title}
          </Typography>
        </Box>
        <Box
          sx={{
            height: 'auto',
            backgroundColor: 'white',
          }}
        ></Box>

        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          flexWrap="nowrap"
        >
          <Grid container direction="column" sx={{p: 2}}>
            <Typography
              component="p"
              sx={{mb: 3, color: 'primary.contrastText'}}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'nowrap',
                  alignItems: 'center',
                }}
              >
                <Typography sx={{mr: '15px'}}>{comments}</Typography>
                <Rating name="read-only" value={comments || 0} readOnly />
              </Box>
            </Typography>
            <Typography
              component="h1"
              variant="h6"
              sx={{color: 'primary.contrastText'}}
            >
              <PlaceIcon sx={{mr: 1}}> </PlaceIcon>
              {fileAttributes.address}, {fileAttributes.municipality}
            </Typography>
            <Typography
              component="h1"
              variant="h6"
              sx={{color: 'primary.contrastText'}}
            >
              <HikingIcon sx={{mr: 1}}></HikingIcon>
              {fileAttributes.category}
            </Typography>
            <Typography
              component="h1"
              variant="h6"
              sx={{color: 'primary.contrastText', mt: 3}}
            >
              {fileAttributes.desc}
            </Typography>
            <Grid container>
              <img
                src={mediaUrl + file.thumbnails.w640}
                alt={file.title}
                style={{width: '100%', height: 'auto', overflow: 'hidden'}}
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

MediaRow.propTypes = {
  file: PropTypes.object.isRequired,
};

export default MediaRow;
