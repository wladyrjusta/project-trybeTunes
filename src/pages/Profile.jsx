import React, { Component } from 'react';
import Header from './Header';
import './Pages.css';

export default class Profile extends Component {
  render() {
    return (
      <div
        className="App"
        data-testid="page-profile"
      >
        <Header />
      </div>
    );
  }
}
