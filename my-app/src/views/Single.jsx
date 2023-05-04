import {
  Box,
  Button,
  Drawer,
  Paper,
  Grid,
  TextField,
  Typography,
  Stack,
  Rating,
} from '@mui/material';
import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {
  doFetch,
  searchComments,
  useMedia,
  useTag,
  useUser,
} from '../hooks/ApiHooks';
import {MediaContext} from '../contexts/MediaContext';
import useForm from '../hooks/FormHooks';
import {useLocation} from 'react-router-dom';
import {mediaUrl} from '../utils/variables';
import StarIcon from '@mui/icons-material/Star';
import {appId} from '../utils/variables';
import {baseUrl} from '../utils/variables';
import {getComments} from '../hooks/ApiHooks';
import {comment} from '../utils/errorMessages';
import {commentValidators} from '../utils/validators';
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator';

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

  // Tarkistetaan, että submit menee läpi ennen drawerin sulkemista
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);

  const handleOnClick = async () => {
    try {
      setIsSubmitSuccessful(true);
    } catch (error) {
      console.error(error);
      setIsSubmitSuccessful(false);
    }

    toggleDrawerIfSubmitSuccessful();
  };

  const toggleDrawerIfSubmitSuccessful = () => {
    if (isSubmitSuccessful) {
      toggleDrawer();
      setIsSubmitSuccessful(false);
    }
  };

  const [file, setFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(
    'https://placehold.co/600x400?text=image'
  );
  const {postMedia} = useMedia();
  const {postTag} = useTag();
  const navigate = useNavigate();

  const {getUserByToken} = useUser();
  const {user, setUser} = useContext(MediaContext);

  const getUserInfo = async () => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      console.log(userToken);
      const userData = await getUserByToken(userToken);
      if (userData) {
        setUser(userData);
        return true;
      }
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const initValues = {
    rating: '',
    review: '',
    user: '',
  };

  // arvostelun labelit
  const labels = {
    1: 'Poor',
    2: 'Decent',
    3: 'Ok',
    4: 'Good',
    5: 'Excellent',
  };

  const getLabelText = (value) => {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
  };

  const [ratingValue, setRatingValue] = useState(3);
  const [hoverRating, setHoverRating] = useState(-1);

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

  const commentsList = () => {
    console.log('testi' + Date.now());
    const [comments, setComments] = useState([]);

    useEffect(() => {
      getComments(location)
        .then((searchComments) => {
          setComments(searchComments);
        })
        .catch((error) => {
          console.error(error);
        });
    }, [location]);

    return (
      <div>
        {comments.slice(0, -1).map((searchComment) => (
          <Paper elevation={3} key={searchComment.id}>
            <Box
              style={{textDecoration: 'none', color: 'primary.contrastText'}}
            >
              <Box sx={{bgcolor: 'primary.light', p: 3}}>
                <Typography component="h1" variant="h3" sx={{ml: 2}}>
                  {searchComment.title}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: 700,
                  height: 300,
                  my: 4,
                  pl: 7,
                  backgroundColor: 'primary.medium',
                }}
              >
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  flexWrap="nowrap"
                >
                  <Grid container direction="column">
                    <Typography component="h1" variant="h6">
                      {searchComment.user}
                    </Typography>
                    <Box>
                      <Rating
                        name="read-only"
                        value={searchComment.rating}
                        readOnly
                      />
                    </Box>
                    <Typography component="h1" variant="h6">
                      {searchComment.review}
                    </Typography>
                  </Grid>
                  <Grid container>
                    <img
                      src={mediaUrl + searchComment.thumbnails}
                      alt={searchComment.title}
                      style={{width: '85%', height: 'auto'}}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Paper>
        ))}
      </div>
    );
  };

  const amount = searchComments.length - 1;
  const avgRating = searchComments[searchComments.length - 1];

  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const drawerList = () => (
    <Box
      sx={{
        width: 350,
      }}
      role="presentation"
    >
      <Typography
        component="h1"
        variant="h3"
        textAlign="center"
        sx={{mt: 8, mb: 6}}
      >
        New review
      </Typography>
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
        <ValidatorForm component="form" onSubmit={handleSubmit}>
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
              <Grid
                container
                alignItems={'center'}
                justifyContent="center"
                sx={{flexGrow: 1}}
              >
                <Box>
                  <Rating
                    value={ratingValue}
                    precision={1}
                    getLabelText={getLabelText}
                    onChange={(event, newValue) => {
                      setRatingValue(newValue);
                      inputs.rating = newValue;
                    }}
                    onChangeActive={(event, newHover) => {
                      setHoverRating(newHover);
                    }}
                    emptyIcon={<StarIcon style={{opacity: 0.55}} />}
                  />
                  {ratingValue !== null && (
                    <Box sx={{ml: 2}}>
                      {labels[hoverRating !== -1 ? hoverRating : ratingValue]}
                    </Box>
                  )}
                </Box>
              </Grid>
            </Grid>
            <TextValidator
              id="outlined-basic"
              label="title"
              variant="outlined"
              onChange={handleInputChange}
              type="text"
              name="title"
              value={inputs.title}
              validators={commentValidators.title}
              errorMessages={comment.title}
            ></TextValidator>
            <TextValidator
              id="outlined-basic"
              label="review"
              variant="outlined"
              onChange={handleInputChange}
              name="review"
              value={inputs.review}
              multiline
              rows={4}
              maxRows={6}
              validators={commentValidators.review}
              errorMessages={comment.review}
            ></TextValidator>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              size="large"
              onClick={handleOnClick}
            >
              Review
            </Button>
          </Box>
        </ValidatorForm>
      </Box>
    </Box>
  );

  return (
    <>
      <Box
        sx={{
          maxWidth: '100%',
          mx: 'auto',
          mt: 4,
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
                p: 4,
                backgroundColor: 'primary.light',
              }}
            >
              <Grid
                container
                direction="column"
                alignItems="center"
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
                    {amount} ratings
                  </Typography>
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    sx={{my: 2}}
                  >
                    <Box>
                      <Rating
                        name="read-only"
                        value={avgRating || 0}
                        readOnly
                      />
                    </Box>
                  </Grid>
                </Grid>
                {user ? (
                  <Button
                    variant="contained"
                    sx={{
                      textDecoration: 'none',
                      backgroundColor: 'secondary.main',
                      color: 'white',
                      width: '200px',
                      '&:hover': {
                        backgroundColor: 'secondary.dark',
                      },
                    }}
                    onClick={toggleDrawer}
                  >
                    Add a review
                  </Button>
                ) : (
                  <Button
                    button
                    component={Link}
                    to="/login"
                    variant="contained"
                    style={{
                      textDecoration: 'none',
                      color: 'primary.contrastText',
                    }}
                  >
                    Login to add review
                  </Button>
                )}
              </Grid>
            </Box>
          </Box>

          <Stack spacing={2}>{commentsList()}</Stack>
        </Grid>
      </Box>
      <Drawer
        anchor="left"
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
