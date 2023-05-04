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
  title: ['required', 'maxStringLength:70'],
  address: ['required'],
  municipality: ['required'],
  description: ['required', 'maxStringLength:200'],
};

const commentValidators = {
  title: ['required', 'maxStringLength:30'],
  review: ['required', 'maxStringLength:80'],
};

export {
  registerValidators,
  loginValidators,
  uploadValidators,
  commentValidators,
};
