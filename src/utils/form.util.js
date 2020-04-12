import Isemail from 'isemail';
import { reduce } from 'lodash';

export const required = value => (value ? undefined : 'Required');

export const isEmail = value =>
  Isemail.validate(value) ? undefined : 'Must be an email';

export const composeValidators = (...validators) => value =>
  reduce(
    validators,
    (error, validator) => error || validator(value),
    undefined
  );
