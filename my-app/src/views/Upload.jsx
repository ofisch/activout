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
  useTheme,
} from '@mui/material';
import PropTypes from 'prop-types';
import useForm from '../hooks/FormHooks';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {appId} from '../utils/variables';
import {useMedia, useTag} from '../hooks/ApiHooks';
import useMediaQuery from '@mui/material/useMediaQuery';
import {upload} from '../utils/errorMessages';
import {uploadValidators} from '../utils/validators';
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator';


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
        maxWidth: '1000px',
        mx: 'auto',
      }}
    >
      <Paper elevation={3}>
        <Box
          sx={{
            pt: 4,
            pb: 4,
            px: 6,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alingItems: 'center',
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
          <ValidatorForm component="form" onSubmit={handleSubmit}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 3,
              }}
            >
              <TextValidator
                id="outlined-basic"
                label="title"
                variant="outlined"
                onChange={handleInputChange}
                type="text"
                name="title"
                value={inputs.title}
                validators={uploadValidators.title}
                errorMessages={upload.title}
              ></TextValidator>

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

              <TextValidator
                id="outlined-basic"
                label="address"
                variant="outlined"
                onChange={handleInputChange}
                type="text"
                name="address"
                value={inputs.address}
                validators={uploadValidators.address}
                errorMessages={upload.address}
              ></TextValidator>
              <TextValidator
                id="outlined-basic"
                label="municipality"
                variant="outlined"
                onChange={handleInputChange}
                type="text"
                name="municipality"
                value={inputs.municipality}
                validators={uploadValidators.municipality}
                errorMessages={upload.municipality}
              ></TextValidator>
              <TextValidator
                id="outlined-basic"
                label="description"
                variant="outlined"
                onChange={handleInputChange}
                name="description"
                value={inputs.description}
                multiline
                rows={4}
                maxRows={6}
                validators={uploadValidators.description}
                errorMessages={upload.description}
              ></TextValidator>
              <Box></Box>
              <Button type="submit" variant="contained" color="secondary">
                upload
              </Button>
            </Box>
          </ValidatorForm>
        </Box>
      </Paper>
    </Box>
  );
};

Upload.propTypes = {};

export default Upload;
