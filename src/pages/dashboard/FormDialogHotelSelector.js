import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { map } from 'lodash';
import { useToggle } from 'react-use';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const FormDialogHotelSelector = ({
  cities,
  hotels,
  currentCity,
  setCurrentCity,
  currentHotel,
  currentHotelName,
  setCurrentHotel,
  onOk,
}) => {
  const classes = useStyles();
  const [openDialog, toggleOpenDialog] = useToggle(false);

  const handleOpen = () => toggleOpenDialog(true);

  const handleOk = () => {
    onOk();
    toggleOpenDialog(false);
  };

  const handleCancel = () => {
    setCurrentHotel('');
    setCurrentCity('');
    toggleOpenDialog(false);
  };

  const handleCityChange = event => {
    setCurrentCity(event.target.value);
    setCurrentHotel('');
  };

  const handleHotelChange = event => setCurrentHotel(event.target.value);

  return (
    <div>
      <Button onClick={handleOpen}>{currentHotelName}</Button>
      <Dialog disableBackdropClick open={openDialog} onClose={handleCancel}>
        <DialogTitle>Fill the form</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel>City</InputLabel>
              <Select value={currentCity} onChange={handleCityChange}>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {map(cities, item => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel>Hotel</InputLabel>
              <Select value={currentHotel} onChange={handleHotelChange}>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {map(hotels, item => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleOk} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormDialogHotelSelector;
