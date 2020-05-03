import React from 'react';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles/index';
import Grid from '@material-ui/core/Grid/index';
import Button from '@material-ui/core/Button/index';
import IconButton from '@material-ui/core/IconButton/index';
import TextField from '@material-ui/core/TextField/index';
import Typography from '@material-ui/core/Typography/index';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link, useNavigate } from '@reach/router';
import { useDispatch } from 'react-redux';
import { useField, useForm } from 'react-final-form-hooks';

import { actions } from '../../modules/auth/auth.reducer';
import { composeValidators, isEmail, required } from '../../utils/form.util';

import styles from './SignIn.page.styles';

const SignIn = ({ classes }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async values => {
    await dispatch(actions.signInAction(values));
    navigate('dashboard', { replace: true });
  };

  const { form, handleSubmit, submitting } = useForm({
    onSubmit,
  });

  const email = useField('email', form, composeValidators(required, isEmail));
  const password = useField('password', form, required);

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container>
        <Grid className={classes.quoteWrapper} item lg={5}>
          <div className={classes.quote}>
            {/*<div className={classes.quoteInner}>*/}
            {/*  <Typography className={classes.quoteText} variant="h4">*/}
            {/*    Hella narwhal Cosby sweater McSweeney's, salvia kitsch before*/}
            {/*    they sold out High Life.*/}
            {/*  </Typography>*/}
            {/*  <div className={classes.person}>*/}
            {/*    <Typography className={classes.name} variant="body1">*/}
            {/*      Takamaru Ayako*/}
            {/*    </Typography>*/}
            {/*    <Typography className={classes.bio} variant="body2">*/}
            {/*      Manager at inVision*/}
            {/*    </Typography>*/}
            {/*  </div>*/}
            {/*</div>*/}
          </div>
        </Grid>
        <Grid className={classes.content} item lg={7} xs={12}>
          <div className={classes.content}>
            <div className={classes.contentHeader}>
              <IconButton className={classes.backButton} onClick={handleBack}>
                <ArrowBackIcon />
              </IconButton>
            </div>
            <div className={classes.contentBody} onSubmit={handleSubmit}>
              <form className={classes.form}>
                <Typography className={classes.title} variant="h4">
                  Sign in
                </Typography>
                <Typography className={classes.subtitle} variant="body1">
                  Sign in with social media
                </Typography>
                <Typography className={classes.sugestion} variant="body1">
                  or login with email address
                </Typography>
                <div className={classes.fields}>
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
                </div>
                <Button
                  className={classes.signInButton}
                  color="primary"
                  size="large"
                  variant="contained"
                  disabled={submitting}
                  type="submit">
                  Sign in now
                </Button>
                <Typography className={classes.signUp} variant="body1">
                  Don't have an account?{' '}
                  <Link className={classes.signUpUrl} to="/sign-up">
                    Sign up
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

export default compose(withStyles(styles))(SignIn);
