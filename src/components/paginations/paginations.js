import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';

import 'antd/dist/antd.css';
import './paginations.css';

function Paginations({ movieData, pages, totalPages, onChangePagination }) {
  const paginations =
    movieData.length !== 0 && totalPages > 10 ? (
      <Pagination
        defaultCurrent={pages}
        total={totalPages}
        showSizeChanger={false}
        current={pages}
        onChange={onChangePagination}
      />
    ) : null;

  return <div className="pagination-wrapper">{paginations}</div>;
}

Paginations.propTypes = {
  movieData: PropTypes.arrayOf(PropTypes.object).isRequired,
  pages: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onChangePagination: PropTypes.func.isRequired,
};

export default Paginations;
