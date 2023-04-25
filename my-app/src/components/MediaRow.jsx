import {
  Box,
  Button,
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
    <Box
      sx={{
        width: 500,
        height: 300,
        backgroundColor: 'secondary.light',
        '&:hover': {
          backgroundColor: 'secondary.dark',
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        flexWrap="nowrap"
      >
        <Grid container direction="column">
          <Typography component="h1" variant="h4">
            {file.title}
          </Typography>
          <Typography component="h1" variant="h5">
            {fileAttributes.category}
          </Typography>
          <Typography component="p">{fileAttributes.address}</Typography>
          <Typography component="p">X ratings</Typography>
          <StarIcon></StarIcon>
        </Grid>
        <Grid container>
          <img
            src={mediaUrl + file.thumbnails.w640}
            alt={file.title}
            style={{width: 250, height: 200}}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

MediaRow.propTypes = {
  file: PropTypes.object.isRequired,
};

export default MediaRow;
