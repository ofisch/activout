const registerValidators = {
  username: ['required', 'minStringLength:3', 'isUsernameAvailable'],
  password: ['required', 'minStringLength:5'],
  confirm: ['required', 'isPasswordMatch'],
  email: ['required', 'isEmail'],
  full_name: ['matchRegexp:^(.{2,})?$'],
};

const loginValidators = {
  username: ['required'],
  password: ['required'],
};

const uploadValidators = {
  title: ['required'],
  category: ['required'],
  address: ['required'],
  municipality: ['required'],
  description: ['required'],
};

const commentValidators = {
  title: ['required'],
  review: ['required', 'maxStringLength:150'],
};

export {
  registerValidators,
  loginValidators,
  uploadValidators,
  commentValidators,
};
