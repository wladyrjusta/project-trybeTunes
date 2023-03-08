import React, { Component } from 'react';
import Header from './Header';
import './Pages.css';

export default class ProfileEdit extends Component {
  render() {
    return (
      <div
        className="App"
        data-testid="page-profile-edit"
      >
        <Header />
      </div>
    );
  }
}
