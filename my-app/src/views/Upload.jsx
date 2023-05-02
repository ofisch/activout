import {
  Box,
  Button,
  ClickAwayListener,
  FormControl,
  Grow,
  InputLabel,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import PropTypes from 'prop-types';
import useForm from '../hooks/FormHooks';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {appId} from '../utils/variables';
import {useMedia, useTag} from '../hooks/ApiHooks';

const Upload = (props) => {
  const [file, setFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(
    'https://placehold.co/600x400?text=image'
  );
  // 'https://placekitten.com/600/400'
  const {postMedia} = useMedia();
  const {postTag} = useTag();
  const navigate = useNavigate();

  //  dropdown
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const [dropDownCategory, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
    inputs.category = e.target.value;
    console.log('inputs.', inputs.category);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const initValues = {
    title: '',
    category: '',
    address: '',
    ratings: '',
    averageRating: '',
    description: '',
  };

  const doUpload = async () => {
    try {
      const data = new FormData();
      data.append('title', inputs.title);
      console.log(inputs.title);
      const allData = {
        desc: inputs.description,
        category: inputs.category,
        address: inputs.address,
        municipality: inputs.municipality,
      };
      data.append('description', JSON.stringify(allData));
      data.append('file', file);
      // data.append('category', inputs.category);
      // data.append('address', inputs.address);
      console.log(inputs.address);
      const userToken = localStorage.getItem('userToken');
      const uploadResult = await postMedia(data, userToken);
      const tagResult = await postTag(
        {
          file_id: uploadResult.file_id,
          tag: appId,
        },
        userToken
      );
      console.log('doUpload', tagResult);
      console.log(allData);
      console.log(uploadResult.file_id);
      alert('✅ Location added!');
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
              <TextField
                id="outlined-basic"
                label="title"
                variant="outlined"
                onChange={handleInputChange}
                type="text"
                name="title"
                value={inputs.title}
              ></TextField>

              <FormControl>
                <InputLabel>category</InputLabel>
                <Select
                  label="category"
                  value={dropDownCategory}
                  onChange={handleChange}
                >
                  <MenuItem value={'activity parks'}>activity parks</MenuItem>
                  <MenuItem value={'skate parks'}>skate parks</MenuItem>
                  <MenuItem value={'dog parks'}>dog parks</MenuItem>
                  <MenuItem value={'playgrounds'}>playgrounds</MenuItem>
                </Select>
              </FormControl>

              <TextField
                id="outlined-basic"
                label="address"
                variant="outlined"
                onChange={handleInputChange}
                type="text"
                name="address"
                value={inputs.address}
              ></TextField>
              <TextField
                id="outlined-basic"
                label="municipality"
                variant="outlined"
                onChange={handleInputChange}
                type="text"
                name="municipality"
                value={inputs.municipality}
              ></TextField>
              <TextField
                id="outlined-basic"
                label="description"
                variant="outlined"
                onChange={handleInputChange}
                name="description"
                value={inputs.description}
                multiline
                rows={4}
                maxRows={6}
              ></TextField>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                size="large"
              >
                upload
              </Button>
            </Box>
          </form>
        </Box>
      </Paper>
    </Box>
  );
};

Upload.propTypes = {};

export default Upload;
