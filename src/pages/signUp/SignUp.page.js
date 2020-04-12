import React from 'react';
import compose from 'recompose/compose';
import { useDispatch } from 'react-redux';
import { withStyles } from '@material-ui/core/styles/index';
import Grid from '@material-ui/core/Grid/index';
import Button from '@material-ui/core/Button/index';
import IconButton from '@material-ui/core/IconButton/index';
import TextField from '@material-ui/core/TextField/index';
import Typography from '@material-ui/core/Typography/index';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link, useNavigate } from '@reach/router';
import { useForm, useField } from 'react-final-form-hooks';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';

import { required, isEmail, composeValidators } from '../../utils/form.util';
import { actions } from '../../modules/auth/auth.reducer';

import styles from './SignUp.page.styles';

const validate = values => {
  const errors = {};
  if (values.password !== values.passwordAgain) {
    errors.passwordAgain = 'Password does not matched';
  }
  return errors;
};

const SignUp = ({ classes }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async values => {
    await dispatch(actions.signUpAction(values));
    navigate('dashboard', { replace: true });
  };

  const { form, handleSubmit, values, submitting } = useForm({
    onSubmit,
    validate,
  });
  const name = useField('name', form, required);
  const email = useField('email', form, composeValidators(required, isEmail));
  const password = useField('password', form, required);
  const passwordAgain = useField('passwordAgain', form, required);
  const role = useField('role', form);
  const policy = useField('policy', form, required);

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container>
        <Grid className={classes.quoteWrapper} item lg={5}>
          <div className={classes.quote}>
            <div className={classes.quoteInner}>
              <Typography className={classes.quoteText} variant="h4">
                Hella narwhal Cosby sweater McSweeney's, salvia kitsch before
                they sold out High Life.
              </Typography>
              <div className={classes.person}>
                <Typography className={classes.name} variant="body1">
                  Takamaru Ayako
                </Typography>
                <Typography className={classes.bio} variant="body2">
                  Manager at inVision
                </Typography>
              </div>
            </div>
          </div>
        </Grid>
        <Grid className={classes.content} item lg={7} xs={12}>
          <div className={classes.content}>
            <div className={classes.contentHeader}>
              <IconButton className={classes.backButton} onClick={handleBack}>
                <ArrowBackIcon />
              </IconButton>
            </div>
            <div className={classes.contentBody}>
              <form className={classes.form} onSubmit={handleSubmit}>
                <Typography className={classes.title} variant="h4">
                  Create new account
                </Typography>
                <Typography className={classes.subtitle} variant="body1">
                  Use your work email to create new account.
                </Typography>
                <div className={classes.fields}>
                  <TextField
                    className={classes.textField}
                    label="name"
                    name="name"
                    type="text"
                    variant="outlined"
                    {...name.input}
                    error={name.meta.touched && name.meta.error}
                    helperText={name.meta.touched && name.meta.error}
                  />
                  <TextField
                    className={classes.textField}
                    label="Email address"
                    name="email"
                    type="text"
                    variant="outlined"
                    {...email.input}
                    error={email.meta.touched && email.meta.error}
                    helperText={email.meta.touched && email.meta.error}
                  />
                  <TextField
                    className={classes.textField}
                    label="Password"
                    name="password"
                    type="password"
                    variant="outlined"
                    {...password.input}
                    error={password.meta.touched && password.meta.error}
                    helperText={password.meta.touched && password.meta.error}
                  />
                  <TextField
                    className={classes.textField}
                    label="Password Again"
                    name="passwordAgain"
                    type="password"
                    variant="outlined"
                    {...passwordAgain.input}
                    error={
                      passwordAgain.meta.touched && passwordAgain.meta.error
                    }
                    helperText={
                      passwordAgain.meta.touched && passwordAgain.meta.error
                    }
                  />
                  <Select
                    className={classes.textField}
                    label="Role"
                    name="role"
                    variant="outlined"
                    inputProps={{
                      name: 'role',
                      id: 'role',
                    }}
                    {...role.input}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                  </Select>
                  <div className={classes.policy}>
                    <Checkbox
                      checked={values.policy}
                      className={classes.policyCheckbox}
                      color="primary"
                      name="policy"
                      {...policy.input}
                      error={policy.meta.touched && policy.meta.error}
                      helperText={policy.meta.touched && policy.meta.error}
                    />
                    <Typography
                      className={classes.policyText}
                      variant="body1"
                      color={
                        policy.meta.touched && policy.meta.error
                          ? 'error'
                          : '#6E6E6E'
                      }>
                      I have read the &nbsp;
                      <Link className={classes.policyUrl} to="#">
                        Terms and Conditions
                      </Link>
                      .
                    </Typography>
                  </div>
                </div>
                <Button
                  className={classes.signInButton}
                  color="primary"
                  size="large"
                  disabled={submitting}
                  type="submit"
                  variant="contained">
                  Sign Up now
                </Button>
                <Typography className={classes.signUp} variant="body1">
                  Have an account?{' '}
                  <Link className={classes.signUpUrl} to="/sign-in">
                    Sign in
                  </Link>
                </Typography>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default compose(withStyles(styles))(SignUp);
