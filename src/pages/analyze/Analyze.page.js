import React, { useState, useCallback } from 'react';
import MUIDataTable from 'mui-datatables';
import { Grid, CircularProgress } from '@material-ui/core';
import { useAsync } from 'react-use';
import { get } from 'lodash';
import queryString from 'query-string';

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
    name: 'review_date',
    label: 'Review Date',
    options: {
      filter: true,
      sort: true,
      display: false,
    },
  },
  {
    name: 'review_score',
    label: 'Reviewer Score',
    options: {
      filter: true,
    },
  },
  {
    name: 'reviewer_name',
    label: 'Reviewer Name',
    options: {
      filter: true,
      sort: true,
    },
  },
];

const Analyze = () => {
  const defaultUrl = 'https://odss-back-end.buithanhbavuong.now.sh/api/results';
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
      <Title>Source</Title>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Crawled Data"
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
