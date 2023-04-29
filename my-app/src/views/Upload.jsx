import {
  Box,
  Button,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
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
    'https://placekitten.com/600/400'
  );
  // 'https://placehold.co/600x400?text=Choose-media'
  const {postMedia} = useMedia();
  const {postTag} = useTag();
  const navigate = useNavigate();

  //dropdown
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

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
              <Stack direction="row" spacing={2}>
                <div>
                  <Button
                    ref={anchorRef}
                    id="composition-button"
                    aria-controls={open ? 'composition-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                  >
                    Category
                  </Button>
                  <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="bottom-start"
                    transition
                    disablePortal
                  >
                    {({TransitionProps, placement}) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin:
                            placement === 'bottom-start'
                              ? 'left top'
                              : 'left bottom',
                        }}
                      >
                        <Paper>
                          <ClickAwayListener onClickAway={handleClose}>
                            <MenuList
                              autoFocusItem={open}
                              id="composition-menu"
                              aria-labelledby="composition-button"
                              onKeyDown={handleListKeyDown}
                            >
                              <MenuItem
                                onClick={function (event) {
                                  handleClose();
                                  handleInputChange();
                                }}
                                type="text"
                                name="category"
                                value={inputs.category}
                              >
                                activity parks
                              </MenuItem>
                              <MenuItem
                                onClick={function (event) {
                                  handleClose();
                                  handleInputChange();
                                }}
                                type="text"
                                name="category"
                                value={inputs.category}
                              >
                                skate parks
                              </MenuItem>
                              <MenuItem
                                onClick={function (event) {
                                  handleClose();
                                  handleInputChange();
                                }}
                                type="text"
                                name="category"
                                value={inputs.category}
                              >
                                dog parks
                              </MenuItem>
                              <MenuItem
                                onClick={function (event) {
                                  handleClose();
                                  handleInputChange();
                                }}
                                type="text"
                                name="category"
                                value={inputs.category}
                              >
                                playgrounds
                              </MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </div>
              </Stack>

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
                label="destription"
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
