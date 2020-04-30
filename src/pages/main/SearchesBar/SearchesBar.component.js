import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, withStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { differenceInDays } from 'date-fns';
import { useField, useForm } from 'react-final-form-hooks';

import { actions } from '../main.reducer';
import DateRangePicker from '../DateRangePicker/DateRangePicker.component';

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginLeft: -theme.spacing(1),
  },
  iconButtonAvatar: {
    padding: 4,
  },
  appBar: {
    boxShadow: 'rgba(53, 64, 82, 0.05) 0px 0px 14px 0px',
    background: '#20274D',
  },
  option: {
    fontSize: 13,
    '& > span': {
      fontSize: 13,
    },
  },
  inputRoot: {
    borderRadius: 8,
    '&.MuiInputBase-root': {
      backgroundColor: '#FFF',
    },
  },
}));

const CssTextField = withStyles({
  root: {
    width: 200,
    '& .MuiInputBase-root': {
      backgroundColor: '#FFF',
    },
    '& > .MuiPickersDateRangePickerInput-toLabelDelimiter': {
      display: 'none',
    },
  },
})(TextField);

const SearchesBar = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  useEffect(() => {
    dispatch(actions.getTravelTypesAction());
  }, [dispatch]);

  const cities = useSelector(state => state?.main?.cities || []);
  const travelTypes = useSelector(state => state?.main?.travelTypes || []);

  const onSubmit = values =>
    dispatch(
      actions.getRankingsAction({
        cityId: values.city._id,
        travelType: values.travel.name,
        stayLength: Math.abs(differenceInDays(...values.dateRange)),
      })
    );

  const { form, handleSubmit, submitting } = useForm({
    onSubmit,
  });

  const handleInputChange = (e, searchText) => {
    dispatch(actions.searchCitiesAction({ searchText }));
  };
  const city = useField('city', form);
  const travelType = useField('travel', form);
  const dateRange = useField('dateRange', form);
  return (
    <AppBar position="sticky" className={classes.appBar}>
      <Toolbar style={{ padding: '8px 24px' }}>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Grid container spacing={1} alignItems="center" justify="center">
            <Grid item>
              <Autocomplete
                style={{ width: 200 }}
                size="small"
                name="city"
                classes={{
                  inputRoot: classes.inputRoot,
                  option: classes.option,
                }}
                autoHighlight
                autoComplete
                autoSelect
                onInputChange={handleInputChange}
                options={cities}
                getOptionLabel={option => option.name}
                renderInput={params => (
                  <TextField {...params} label="City" variant="filled" />
                )}
                noOptionsText="Type to search city"
                onChange={(e, value) => {
                  city.input.onChange(value);
                }}
                value={city.input.value}
              />
            </Grid>
            <Grid item>
              <DateRangePicker
                startText="Check-in"
                endText="Check-out"
                calendars={2}
                disablePast
                reduceAnimations
                TextFieldComponent={params => (
                  <CssTextField {...params} variant="filled" size="small" />
                )}
                onChange={range => {
                  dateRange.input.onChange(range);
                }}
              />
            </Grid>
            <Grid item>
              <Autocomplete
                style={{ width: 200 }}
                size="small"
                classes={{
                  inputRoot: classes.inputRoot,
                  option: classes.option,
                }}
                autoHighlight
                autoComplete
                autoSelect
                options={travelTypes}
                getOptionLabel={option => option.name}
                renderInput={params => (
                  <TextField {...params} label="Travel Type" variant="filled" />
                )}
                onChange={(e, value) => {
                  travelType.input.onChange(value);
                }}
                value={travelType.input.value}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={submitting}
                style={{ padding: '12px 24px' }}>
                Search
              </Button>
            </Grid>
          </Grid>
        </form>
      </Toolbar>
    </AppBar>
  );
};

export default SearchesBar;
