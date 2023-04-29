import {Box, Button, Grid, Paper, TextField, Typography} from '@mui/material';
import PropTypes from 'prop-types';
import useForm from '../hooks/FormHooks';
import React, {useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {appId} from '../utils/variables';
import {useMedia, useTag} from '../hooks/ApiHooks';
import {MediaContext} from '../contexts/MediaContext';
import StarIcon from '@mui/icons-material/Star';

const Comment = (props) => {
  const [file, setFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(
    'https://placekitten.com/600/400'
  );
  // 'https://placehold.co/600x400?text=Choose-media'
  const {postMedia} = useMedia();
  const {postTag} = useTag();
  const navigate = useNavigate();

  const {user} = useContext(MediaContext);

  const initValues = {
    title: '',
    rating: '',
    review: '',
  };

  const doUpload = async () => {
    try {
      const data = new FormData();
      data.append('title', inputs.title);
      console.log(inputs.title);
      const allData = {
        desc: inputs.review,
      };

      console.log(inputs.review);

      data.append('review', JSON.stringify(allData));
      data.append('file', file);

      const userToken = localStorage.getItem('userToken');
      const commentResult = await postMedia(data, userToken);
      const tagResult = await postTag(
        {
          file_id: commentResult.file_id,
          tag: appId,
        },
        userToken
      );
      console.log('doUpload', tagResult);
      navigate('/home');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleFileChange = (event) => {
    event.persist();
    setFile(event.target.files[0]);
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setSelectedImage(reader.result);
    });
    reader.readAsDataURL(event.target.files[0]);
  };

  const {inputs, handleSubmit, handleInputChange} = useForm(
    doUpload,
    initValues
  );

  return (
    <Box
      sx={{
        width: '70%',
        mx: 'auto',
      }}
    >
      <Typography component="h1" variant="h3" sx={{mt: 8, mb: 6}}>
        New review
      </Typography>
      <Paper elevation={3}>
        <Box
          sx={{
            pt: 2,
            pb: 2,
            px: 6,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 3,
          }}
        >
          <img
            src={selectedImage}
            alt="preview"
            style={{
              width: '100%',
              height: 400,
              objectFit: 'contain',
            }}
          />
          <input
            onChange={handleFileChange}
            type="file"
            name="file"
            accept="image/*,video/*,audio/*"
          ></input>
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 3,
              }}
            >
              <Grid
                container
                alignItems={'center'}
                sx={{
                  my: 2,
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'nowrap',
                }}
              >
                <Typography alignItems={'center'} sx={{flexGrow: 1}}>
                  {user.username}
                </Typography>
                <Grid
                  container
                  alignItems={'center'}
                  justifyContent="right"
                  sx={{flexGrow: 1}}
                >
                  <TextField
                    id="outlined-basic"
                    label="rating"
                    variant="outlined"
                    onChange={handleInputChange}
                    type="integer"
                    name="rating"
                    value={inputs.rating}
                    sx={{width: '80px', mr: '10px'}}
                  ></TextField>
                  <StarIcon></StarIcon>
                  <StarIcon></StarIcon>
                  <StarIcon></StarIcon>
                  <StarIcon></StarIcon>
                  <StarIcon></StarIcon>
                </Grid>
              </Grid>
              <TextField
                id="outlined-basic"
                label="title"
                variant="outlined"
                onChange={handleInputChange}
                type="text"
                name="title"
                value={inputs.title}
              ></TextField>
              <TextField
                id="outlined-basic"
                label="review"
                variant="outlined"
                onChange={handleInputChange}
                name="review"
                value={inputs.review}
                multiline
                rows={4}
                maxRows={6}
              ></TextField>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                size="large"
                onClick={() => {
                  navigate('/home');
                }}
              >
                Comment
              </Button>
            </Box>
          </form>
        </Box>
      </Paper>
    </Box>
  );
};

Comment.propTypes = {};

export default Comment;
