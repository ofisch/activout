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
import {mediaUrl} from '../utils/variables';
import StarIcon from '@mui/icons-material/Star';

const MediaRow = ({file}) => {
  // lokaation kaikki ominaisuudet (kuvaus, kategoria, osoite jne.)
  const fileAttributes = JSON.parse(file.description);

  return (
    <Paper elevation={3}>
      <Box
        component={Link}
        variant="contained"
        to="/single"
        state={{file}}
        style={{textDecoration: 'none', color: 'primary.contrastText'}}
      >
        <Box sx={{bgcolor: 'primary.light', p: 3}}>
          <Typography component="h1" variant="h3" sx={{ml: 2}}>
            {file.title}
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
              <StarIcon></StarIcon>
              <Typography component="p" sx={{mb: 3, pl: 2}}>
                X ratings
              </Typography>
              <Typography component="h1" variant="h6">
                {fileAttributes.address}
              </Typography>
              <Typography component="h1" variant="h6">
                {fileAttributes.category}
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
