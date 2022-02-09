import React from 'react';
import { Spin } from 'antd';
import { SyncOutlined } from '@ant-design/icons';

import './spinner.css';

function Spinner() {
  return (
    <div className="loader">
      <Spin indicator={<SyncOutlined spin />} />
    </div>
  );
}

export default Spinner;
