const registerForm = {
  username: [
    'this field is required',
    'minimum length 3',
    'username not available',
  ],
  password: ['this field is required', 'minimum length 5'],
  confirm: ['this field is required', 'passwords dont match'],
  email: ['this field is required', 'email is not valid'],
  full_name: ['minimum length 2'],
};

const loginForm = {
  username: ['this field is required'],
  password: ['this field is required'],
};

const upload = {
  title: ['this field is required', 'Max length is 50 letters'],
  address: ['this field is required'],
  municipality: ['this field is required'],
  description: ['this field is required', 'Max length is 150 letters'],
};

const comment = {
  title: ['this field is required', 'Max length is 50 letters'],
  review: ['this field is required', 'Max length is 150 letters'],
};

export {registerForm, loginForm, upload, comment};
