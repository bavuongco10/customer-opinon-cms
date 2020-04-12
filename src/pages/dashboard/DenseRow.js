import React, { useState, useCallback } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { useAsync, useAsyncFn } from 'react-use';
import queryString from 'query-string';
import { find, get, isEmpty, random, reduce, round } from 'lodash';
import tinycolor from 'tinycolor2';

import { API_HOST } from '../../constants/main.constants';

import FormDialogHotelSelector from './FormDialogHotelSelector';

const DenseRow = ({ cities, setAllAspects, rowId, color }) => {
  const [currentCity, setCurrentCity] = useState('');

  const [currentHotel, setCurrentHotel] = useState('');
  const hotelState = useAsync(async () => {
    if (!currentCity) return null;
    const defaultUrl = `${API_HOST}/api/hotels`;
    const fullUrl = `${defaultUrl}?${queryString.stringify({
      city: currentCity,
    })}`;
    const response = await fetch(fullUrl);
    return response.json();
  }, [currentCity]);

  const [reviewScoreState, fetchReviewScore] = useAsyncFn(async () => {
    if (!currentCity) return null;
    const url = `${API_HOST}/api/hotels/${currentHotel}/results`;
    const response = await fetch(url);
    return response.json();
  }, [currentHotel]);

  const hotels = get(hotelState, 'value.items', []);
  const currentHotelObj = find(hotels, ['_id', currentHotel]);
  const currentHotelName = currentHotelObj?.name || 'Open select dialog';
  const reviewScore = get(reviewScoreState, 'value.item.review_score', 'NA');
  const myColor = tinycolor(color).setAlpha(0.3);

  const handleSelectHotel = useCallback(async () => {
    const reviewScoreFetched = await fetchReviewScore();
    const ownReviewScoreState = get(reviewScoreFetched, 'item', {});
    if (!isEmpty(ownReviewScoreState)) {
      setAllAspects(({ allAspects }) => {
        const newAspect = allAspects;
        newAspect[rowId] = reduce(
          ownReviewScoreState.sentiment_scores,
          (result, scoreObj) => {
            // eslint-disable-next-line no-param-reassign
            result[scoreObj.aspect] = Math.abs(scoreObj.sentiment_score) * 100;
            return result;
          },
          {}
        );
        newAspect[rowId].color = color;
        newAspect[rowId].hotelName = currentHotelName;
        newAspect[rowId].sentiment = round(random(0.1, 1), 2);
        return { allAspects: newAspect };
      });
    }
  }, [fetchReviewScore, setAllAspects, rowId, color, currentHotelName]);

  return (
    <TableRow>
      <TableCell
        component="th"
        scope="row"
        style={{ backgroundColor: myColor }}>
        <FormDialogHotelSelector
          cities={cities}
          hotels={hotels}
          currentCity={currentCity}
          setCurrentCity={setCurrentCity}
          currentHotel={currentHotel}
          setCurrentHotel={setCurrentHotel}
          currentHotelName={currentHotelName}
          onOk={handleSelectHotel}
        />
      </TableCell>
      <TableCell>{reviewScore}</TableCell>
    </TableRow>
  );
};

export default DenseRow;
