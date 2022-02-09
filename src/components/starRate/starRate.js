import React from 'react';
import PropTypes from 'prop-types';
import { Rate } from 'antd';

function StarRate({ onPostRate, id, rating }) {
  return (
    <Rate
      allowHalf
      count={8}
      defaultValue={rating}
      onChange={(event) => {
        onPostRate(event, id);
      }}
    />
  );
}

StarRate.defaultProps = {
  rating: null,
};

StarRate.propTypes = {
  onPostRate: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  rating: PropTypes.number,
};

export default StarRate;
