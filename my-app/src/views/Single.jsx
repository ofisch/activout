import {
  Box,
  Button,
  Drawer,
  Paper,
  Grid,
  TextField,
  Typography,
  Stack,
} from '@mui/material';
import React, {useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {doFetch, searchComments, useMedia, useTag} from '../hooks/ApiHooks';
import {MediaContext} from '../contexts/MediaContext';
import useForm from '../hooks/FormHooks';
import {useLocation} from 'react-router-dom';
import {mediaUrl} from '../utils/variables';
import StarIcon from '@mui/icons-material/Star';
import {appId} from '../utils/variables';
import {baseUrl} from '../utils/variables';
import {getComments} from '../hooks/ApiHooks';

const Single = () => {
  const {state} = useLocation();
  const location = state.file;
  let allData = {
    desc: location.description,
  };
  try {
    allData = JSON.parse(location.description);
  } catch (error) {
    console.log(error);
  }

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
    rating: '',
    review: '',
    user: '',
  };

  const doComment = async () => {
    try {
      const data = new FormData();
      const titleData = {
        id: location.file_id,
        title: inputs.title,
      };
      const allData = {
        user: user.username,
        rating: inputs.rating,
        review: inputs.review,
      };
      data.append('title', JSON.stringify(titleData));
      data.append('description', JSON.stringify(allData));
      data.append('file', file);

      const userToken = localStorage.getItem('userToken');
      const uploadResult = await postMedia(data, userToken);
      const tagResult = await postTag(
        {
          file_id: uploadResult.file_id,
          tag: appId,
        },
        userToken
      );

      navigate('/home');
    } catch (error) {
      alert(error.message);
    }
  };

  // haetaan kaikki kommentit
  getComments(location)
    .then((searchComments) => {
      console.log(searchComments);
    })
    .catch((error) => {
      console.error(error);
    });

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
    doComment,
    initValues
  );

  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const drawerList = () => (
    <Box
      sx={{
        width: 250,
      }}
      role="presentation"
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
                    type="text"
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
                onClick={toggleDrawer}
              >
                Comment
              </Button>
            </Box>
          </form>
        </Box>
      </Paper>
    </Box>
  );

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          maxWidth: '70%',
          mx: 'auto',
        }}
      >
        <Grid
          container
          direction="column"
          alignItems="center"
          sx={{maxWidth: '100%'}}
        >
          <Box
            sx={{
              backgroundColor: 'primary.main',
            }}
          >
            <Typography component="h1" variant="h2" textAlign={'center'}>
              {location.title}
            </Typography>
            <Box
              sx={{
                width: '100%',
                p: 1,
                backgroundColor: 'primary.light',
              }}
            >
              <Grid
                container
                direction="column"
                justifyContent="flex-start"
                flexWrap="nowrap"
              >
                <Grid container direction="column">
                  <Typography component="h1" variant="h6" sx={{pl: 2}}>
                    {allData.category}
                  </Typography>
                  <Typography component="p" sx={{pl: 2}}>
                    {allData.address}
                  </Typography>
                </Grid>
                <Grid
                  container
                  width={'100%'}
                  justifyContent="center"
                  sx={{my: 2}}
                >
                  <img
                    src={mediaUrl + location.thumbnails.w640}
                    alt={location.title}
                    style={{width: '70%', height: 'auto'}}
                  />
                </Grid>
                <Grid container direction="column">
                  <Typography component="p" sx={{pl: 2}}>
                    {allData.desc}
                  </Typography>
                </Grid>
                <Grid container direction="column">
                  <Typography component="p" sx={{pl: 2}} textAlign={'center'}>
                    X ratings
                  </Typography>
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    sx={{my: 2}}
                  >
                    <Typography component="p" variant="h6" sx={{px: 2}}>
                      5
                    </Typography>
                    <StarIcon></StarIcon>
                    <StarIcon></StarIcon>
                    <StarIcon></StarIcon>
                    <StarIcon></StarIcon>
                    <StarIcon></StarIcon>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Box>

          <Button
            variant="contained"
            style={{textDecoration: 'none', color: 'primary.contrastText'}}
            onClick={toggleDrawer}
          >
            Add a comment
          </Button>

          <Stack spacing={2}></Stack>
        </Grid>
      </Paper>
      <Drawer
        anchor="bottom"
        open={openDrawer}
        onClose={toggleDrawer}
        sx={{width: '100%', height: '60vh'}}
      >
        {drawerList()}
      </Drawer>
    </>
  );
};

export default Single;
