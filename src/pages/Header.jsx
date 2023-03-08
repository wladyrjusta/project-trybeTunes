import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';
import './Pages.css';

export default class Header extends Component {
  state = {
    name: '',
    carregando: undefined,
  };

  componentDidMount() {
    this.userName();
  }

  userName = async () => {
    this.setState(
      { carregando: true },
      async () => {
        const userObj = await getUser();
        const userName = userObj.name;
        this.setState({
          name: userName,
          carregando: false,
        });
      },
    );
  };

  render() {
    const { name, carregando } = this.state;
    return (
      <header
        className="App"
        data-testid="header-component"
      >
        <nav
          className="links-container"
        >
          <div>
            <Link
              className="links-box"
              data-testid="link-to-search"
              to="/search"
            >
              Pesquisa
            </Link>
          </div>
          <div>
            <Link
              className="links-box"
              data-testid="link-to-favorites"
              to="/favorites"
            >
              Favoritas
            </Link>
          </div>
          <div>
            <Link
              className="links-box"
              data-testid="link-to-profile"
              to="/profile"
            >
              Perfil
            </Link>
          </div>
        </nav>
        <div
          data-testid="header-user-name"
        >
          {carregando === true ? <Carregando /> : <br />}
          {carregando === false ? <h2>{ name }</h2> : <br />}
        </div>
      </header>
    );
  }
}
