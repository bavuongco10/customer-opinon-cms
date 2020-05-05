import React, { useState, useCallback } from 'react';
import MUIDataTable from 'mui-datatables';
import { Grid, CircularProgress } from '@material-ui/core';
import { useAsync } from 'react-use';
import { get } from 'lodash';
import queryString from 'query-string';

import { API_HOST } from '../../constants/main.constants';
import Title from '../../components/Title/Title.component';

const columns = [
  {
    name: 'city_id',
    label: 'City Id',
    options: {
      filter: true,
      display: false,
    },
  },
  {
    name: 'city_name',
    label: 'City Name',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'hotel_id',
    label: 'Hotel Id',
    options: {
      filter: true,
      display: false,
    },
  },
  {
    name: 'hotel_name',
    label: 'Hotel Name',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'hotel_review_id',
    label: 'Hotel Review Id',
    options: {
      filter: true,
      display: false,
    },
  },
  {
    name: 'reviewer_country',
    label: 'Reviewer Country',
    options: {
      filter: true,
      sort: true,
      display: false,
    },
  },
  {
    name: 'rating',
    label: 'rating',
    options: {
      filter: true,
      sort: true,
      display: false,
    },
  },
  {
    name: 'travel_type_name',
    label: 'Travel Type Name',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'stay_length',
    label: 'Stay length',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'comment_language',
    label: 'Comment Language',
    options: {
      filter: true,
      sort: true,
      display: false,
    },
  },
  {
    name: 'room_type_name',
    label: 'Room Type Name',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'check_in_date',
    label: 'Check In Date',
    options: {
      filter: true,
      sort: true,
      display: false,
    },
  },
  {
    name: 'review_date',
    label: 'Review Date',
    options: {
      filter: true,
      sort: true,
      display: false,
    },
  },
  {
    name: 'sentiment',
    label: 'Sentiment',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'review_comments',
    label: 'Review Comments',
    options: {
      display: false,
    },
  },
  {
    name: 'sentiment_x',
    options: {
      filter: true,
      sort: true,
      display: false,
    },
  },
  {
    name: 'sentiment_y',
    options: {
      filter: true,
      sort: true,
      display: false,
    },
  },
  {
    name: 'Hi',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'Ri',
    options: {
      filter: true,
      sort: true,
    },
  },
];

const Analyze = () => {
  const defaultUrl = `${API_HOST}/api/results`;
  const [offset, setOffset] = useState(10);
  const [page, setPage] = useState(0);

  const state = useAsync(async () => {
    const fullUrl = `${defaultUrl}?${queryString.stringify({ offset, page })}`;
    const response = await fetch(fullUrl);
    return response.json();
  }, [offset, page]);

  const fetchedData = get(state, 'value.items', []);
  const totalData = get(state, 'value.totalItems', 0);
  const onTableChange = useCallback((action, tableState) => {
    if (action === 'changeRowsPerPage')
      return setOffset(tableState.rowsPerPage);
    if (action === 'changePage') return setPage(tableState.page);
    return null;
  }, []);

  return (
    <>
      <Title>Ranking Data</Title>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Ranking Data"
            data={fetchedData}
            columns={columns}
            options={{
              filterType: 'dropdown',
              responsive: 'stacked',
              serverSide: true,
              count: totalData,
              page: 0,
              onTableChange,
            }}>
            {state.loading && (
              <CircularProgress
                size={24}
                style={{ marginLeft: 15, position: 'relative', top: 4 }}
              />
            )}
          </MUIDataTable>
        </Grid>
      </Grid>
    </>
  );
};

export default Analyze;
