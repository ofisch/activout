import {Card, CardContent, CardMedia, Typography} from '@mui/material';
import {useLocation} from 'react-router-dom';
import {mediaUrl} from '../utils/variables';

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
      <Typography component="h1" variant="h3">
        {file.title}
      </Typography>
      <Card>
        <CardMedia
          component={'img'}
          src={mediaUrl + file.filename}
          title={file.title}
          style={{
            width: '100%',
            height: 400,
          }}
        />
        <CardContent>
          <Typography variant="body1">{allData.desc}</Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default Single;
