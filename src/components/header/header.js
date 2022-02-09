import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'antd';

import './header.css';

export default class HeaderSearch extends Component {
  state = {
    currentTab: 'Search',
  };

  static propTypes = {
    updateMovieCard: PropTypes.func.isRequired,
    updateCard: PropTypes.func.isRequired,
  };

  handleClick = (event) => {
    this.setState({ currentTab: event.key });
  };

  render() {
    const { currentTab } = this.state;
    const { updateMovieCard, updateCard } = this.props;

    return (
      <div className="header-search" current={currentTab}>
        <Menu className="search" mode="horizontal" selectedKeys={[currentTab]} onClick={this.handleClick}>
          <Menu.Item key="1" onClick={updateMovieCard}>
            Search
          </Menu.Item>
          <Menu.Item key="2" onClick={updateCard}>
            Rated
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}
