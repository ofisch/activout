import {Box, Button, Container, TextField} from '@mui/material';
import {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';
import {useAuthentication} from '../hooks/apiHooks';
import useForm from '../hooks/FormHooks';
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator';

const LoginForm = (props) => {
  const {setUser} = useContext(MediaContext);
  const {postLogin} = useAuthentication();
  const navigate = useNavigate();

  const initValues = {
    username: '',
    password: '',
  };

  const doLogin = async () => {
    try {
      const loginResult = await postLogin(inputs);
      localStorage.setItem('userToken', loginResult.token);
      setUser(loginResult.user);
      navigate('/home');
    } catch (error) {
      alert(error.message);
    }
  };

  const {inputs, handleSubmit, handleInputChange} = useForm(
    doLogin,
    initValues
  );

  return (
    <Container maxWidth="xs">
      <ValidatorForm component="form" onSubmit={handleSubmit}>
        <TextValidator
          fullWidth
          margin="dense"
          sx={{mt: 2}}
          name="username"
          label="Username"
          onChange={handleInputChange}
          value={inputs.username}
          style={{width:'300px'}}
        />
        <TextValidator
          fullWidth
          margin="dense"
          name="password"
          type="password"
          label="Password"
          onChange={handleInputChange}
          value={inputs.password}
        />
        <Button fullWidth sx={{mt: 3}} variant="contained" type="submit">
          Login
        </Button>
      </ValidatorForm>
    </Container>
  );
};

LoginForm.propTypes = {};

export default LoginForm;
