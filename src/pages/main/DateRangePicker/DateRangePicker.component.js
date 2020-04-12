import React from 'react';
import { DateRangePicker } from '@material-ui/pickers';
import { useCss } from 'react-use';

const DateRangePickerComponent = props => {
  const className = useCss({
    '& .MuiPickersDateRangePickerInput-toLabelDelimiter': {
      display: 'none',
    },
  });

  return <DateRangePicker {...props} className={className} />;
};

export default DateRangePickerComponent;
