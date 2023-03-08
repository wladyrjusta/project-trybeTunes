import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Carregando from './Carregando';
import './Pages.css';

export default class Login extends Component {
  state = {
    nameLogin: '',
    carregando: undefined,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState(
      {
        [name]: value,
      },
    );
  };

  saveBtn = async () => {
    this.setState(
      { carregando: true },
      async () => {
        const { nameLogin } = this.state;
        await createUser({ name: nameLogin });
        this.setState({ carregando: false });
      },
    );
  };

  render() {
    const minNameLength = 3;
    const { nameLogin, carregando } = this.state;

    return (
      <div
        className="App"
        data-testid="page-login"
      >
        <form
          className="login-form"
        >
          <label
            htmlFor="name"
          >
            Nome
            <input
              placeholder="Digite seu nome de usuário aqui"
              className="login-input"
              onChange={ this.handleChange }
              data-testid="login-name-input"
              type="name"
              name="nameLogin"
              value={ nameLogin }
            />
          </label>
          <button
            className="login-btn"
            type="button"
            data-testid="login-submit-button"
            onClick={ this.saveBtn }
            disabled={ nameLogin.length < minNameLength }
          >
            Entrar
          </button>
          <div>
            { carregando === false ? <Redirect to="/search" /> : <br /> }
            { carregando === true ? <Carregando /> : <br /> }
          </div>
        </form>
      </div>
    );
  }
}
