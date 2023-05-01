import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Grid,
  Typography,
} from '@mui/material';
import {useLocation} from 'react-router-dom';
import {mediaUrl} from '../utils/variables';
import StarIcon from '@mui/icons-material/Star';

const Single = () => {
  const {state} = useLocation();
  const file = state.file;
  let allData = {
    desc: file.description,
  };
  try {
    allData = JSON.parse(file.description);
  } catch (error) {
    console.log(error);
  }

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
              {file.title}
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
                    src={mediaUrl + file.thumbnails.w640}
                    alt={file.title}
                    style={{width: '70%', height: 'auto'}}
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
          </Box>
        </Grid>
      </Paper>
    </>
  );
};

export default Single;
