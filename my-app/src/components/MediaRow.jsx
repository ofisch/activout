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
import {mediaUrl} from '../utils/variables';
import StarIcon from '@mui/icons-material/Star';

const MediaRow = ({file}) => {
  // lokaation kaikki ominaisuudet (kuvaus, kategoria, osoite jne.)
  const fileAttributes = JSON.parse(file.description);

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
              <Box>
                <Rating name="read-only" value={2} readOnly />
              </Box>
              <Typography
                component="p"
                sx={{mb: 3, pl: 2, color: 'primary.contrastText'}}
              >
                X ratings
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
