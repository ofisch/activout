import {
  Box,
  Button,
  Drawer,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import React, {useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useMedia, useTag} from '../hooks/ApiHooks';
import {MediaContext} from '../contexts/MediaContext';
import useForm from '../hooks/FormHooks';
import {useLocation} from 'react-router-dom';
import {mediaUrl} from '../utils/variables';
import StarIcon from '@mui/icons-material/Star';
import {appId} from '../utils/variables';

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
  };

  const doComment = async () => {
    try {
      const data = new FormData();
      const titleData = {
        id: location.file_id,
        title: inputs.title,
      };
      const allData = {
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

      //console.log('doUpload', tagResult);
      console.log(titleData);
      console.log(allData);
      console.log('file id ' + uploadResult.file_id);

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
      <Grid
        container
        direction="column"
        alignItems="center"
        sx={{maxWidth: '70%', mx: 'auto'}}
      >
        <Typography component="h1" variant="h4" textAlign={'center'}>
          {location.title}
        </Typography>
        <Box
          sx={{
            width: '100%',
            my: 4,
            p: 1,
            backgroundColor: 'secondary.light',
            '&:hover': {
              backgroundColor: 'secondary.dark',
              opacity: [0.9, 0.8, 0.7],
            },
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
            <Grid container width={'100%'} justifyContent="center" sx={{my: 2}}>
              <img
                src={mediaUrl + location.thumbnails.w640}
                alt={location.title}
                style={{width: 500, height: 400}}
              />
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

        <Button
          variant="contained"
          style={{textDecoration: 'none', color: 'primary.contrastText'}}
          onClick={toggleDrawer}
        >
          Add a comment
        </Button>
      </Grid>
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
