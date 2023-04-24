import {
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
  return (
    /*
    <ImageListItem>
      <img src={mediaUrl + file.thumbnails.w640} alt={file.title} />
      <ImageListItemBar
        title={file.title}
        subtitle={file.description}
        actionIcon={
          <Button
            component={Link}
            variant="contained"
            to="/single"
            state={{file}}
          >
            View
          </Button>
        }
      />
    </ImageListItem>
    */

    <Grid container direction="row" bgcolor={'aquamarine'}>
      <Grid container direction="column" bgcolor={'red'}>
        <Typography component="h1" variant="h4">
          {file.title}
        </Typography>
        <Typography component="h1" variant="h5">
          category
        </Typography>
        <Typography component="p">address</Typography>
        <Typography component="p">X ratings</Typography>
        <StarIcon></StarIcon>
      </Grid>
      <Grid container bgcolor={'bisque'}>
        <img src={mediaUrl + file.thumbnails.w640} alt={file.title} />
      </Grid>
    </Grid>
  );
};

MediaRow.propTypes = {
  file: PropTypes.object.isRequired,
};

export default MediaRow;
