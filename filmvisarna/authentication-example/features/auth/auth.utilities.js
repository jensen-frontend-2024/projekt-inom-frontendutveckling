import crypto from 'crypto';

export const encrypt = (password) => {
  return crypto
    .createHmac('sha256', 'anySaltYouChooseCouldBeAnything')
    .update(password)
    .digest('hex');
};
