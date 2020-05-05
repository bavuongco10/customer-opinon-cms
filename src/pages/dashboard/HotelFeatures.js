import React from 'react';
import { get, map } from 'lodash';
import { makeStyles } from '@material-ui/styles';
import { useAsync } from 'react-use';
import Chip from '@material-ui/core/Chip';
import LocalOffer from '@material-ui/icons/LocalOffer';

import { API_HOST } from '../../constants/main.constants';

const useStyles = makeStyles(theme => ({
  radarContainer: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  blur: {
    filter: 'blur(4px)',
  },
}));

const HotelFeatures = () => {
  const classes = useStyles();
  const defaultUrl = `${API_HOST}/api/features`;

  const state = useAsync(async () => {
    const response = await fetch(defaultUrl);
    return response.json();
  }, []);

  const features = get(state, 'value.items', []);

  return (
    <div className={classes.radarContainer}>
      {map(features, ({ name }) => (
        <Chip
          variant="outlined"
          label={name}
          color="secondary"
          icon={<LocalOffer />}
        />
      ))}
    </div>
  );
};
export default HotelFeatures;
