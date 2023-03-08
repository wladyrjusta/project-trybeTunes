import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './pages/Routes';
import './pages/Pages.css';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div
          className="App"
        >
          <h1>TrybeTunes</h1>
        </div>
        <Routes />
      </BrowserRouter>
    );
  }
}

export default App;
