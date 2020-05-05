import React from 'react';
import { Grid } from '@material-ui/core';
import { useAsync } from 'react-use';
import { map, get } from 'lodash';
import Chip from '@material-ui/core/Chip';
import LocalOffer from '@material-ui/icons/LocalOffer';
import { makeStyles } from '@material-ui/styles';

import Title from '../../components/Title/Title.component';
import { API_HOST } from '../../constants/main.constants';

const useStyles = makeStyles(theme => ({
  tags: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
    },
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
    <>
      <Title>Source</Title>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <div className={classes.tags}>
            {map(features, feature => (
              <Chip
                variant="outlined"
                label={feature}
                color="secondary"
                icon={<LocalOffer />}
              />
            ))}
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default HotelFeatures;
