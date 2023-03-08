import React, { Component } from 'react';
import Header from './Header';
import './Pages.css';

export default class Favorites extends Component {
  render() {
    return (
      <div
        className="App"
        data-testid="page-favorites"
      >
        <Header />
      </div>
    );
  }
}
