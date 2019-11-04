import React, { useState } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { useAsync, useAsyncFn } from 'react-use';
import queryString from 'query-string';
import { find, get, isEmpty, reduce } from 'lodash';

import getRandomColor from '../../utils/getRamdomColor.util';

import FormDialogHotelSelector from './FormDialogHotelSelector';

const DenseRow = ({ cities, setAllAspects, rowId }) => {
  const [currentCity, setCurrentCity] = useState('');

  const [currentHotel, setCurrentHotel] = useState('');
  const hotelState = useAsync(async () => {
    if (!currentCity) return null;
    const defaultUrl =
      'https://odss-back-end.buithanhbavuong.now.sh/api/hotels';
    const fullUrl = `${defaultUrl}?${queryString.stringify({
      city: currentCity,
    })}`;
    const response = await fetch(fullUrl);
    return response.json();
  }, [currentCity]);

  const [reviewScoreState, fetchReviewScore] = useAsyncFn(async () => {
    if (!currentCity) return null;
    const url = `https://odss-back-end.buithanhbavuong.now.sh/api/hotels/${currentHotel}/results`;
    const response = await fetch(url);
    return response.json();
  }, [currentHotel]);

  const handleSelectHotel = async () => {
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
        return { allAspects: newAspect };
      });
    }
  };

  const hotels = get(hotelState, 'value.items', []);
  const currentHotelObj = find(hotels, ['_id', currentHotel]);
  const currentHotelName = currentHotelObj?.name || 'Open select dialog';
  const reviewScoreObj = get(reviewScoreState, 'value.item', {});

  return (
    <TableRow>
      <TableCell component="th" scope="row">
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
      <TableCell>{reviewScoreObj.review_score || 'NA'}</TableCell>
    </TableRow>
  );
};

export default DenseRow;
