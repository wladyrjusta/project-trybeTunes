import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from './Carregando';
import Header from './Header';
import './Pages.css';

export default class Search extends Component {
  state = {
    artistSearchIput: '',
    carregando: undefined,
    artistList: [],
    nameArtist: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState(
      {
        [name]: value,
      },
    );
  };

  searchBtn = async () => {
    const { artistSearchIput } = this.state;
    this.setState(
      { carregando: true, nameArtist: artistSearchIput },
      async () => {
        const artistList = await searchAlbumsAPI(artistSearchIput);
        this.setState({
          carregando: false,
          artistSearchIput: '',
          artistList,
        });
      },
    );
  };

  render() {
    const { artistSearchIput,
      carregando, artistList, nameArtist } = this.state;
    const minNameLength = 2;

    const albumList = (
      <>
        <div>
          <h1>{`Resultado de álbuns de: ${nameArtist}` }</h1>
        </div>
        <ul
          className="artists-container"
        >
          {artistList
            .map((artist) => (
              <div
                className="artist-box"
                key={ `${artist.artistId}${artist.collectionId}` }
              >
                <h3>{ artist.artistName }</h3>
                <img src={ artist.artworkUrl100 } alt={ artist.artistName } />
                <p>{ artist.collectionName }</p>
                <Link
                  className="album-link"
                  data-testid={ `link-to-album-${artist.collectionId}` }
                  to={ `/album/${artist.collectionId}` }
                >
                  Acessar Àlbum
                </Link>
              </div>
            ))}
        </ul>
      </>
    );

    return (
      <div
        className="App"
        data-testid="page-search"
      >
        <Header />
        <form>
          <label
            htmlFor="artist-input"
          >
            <input
              className="login-input"
              data-testid="search-artist-input"
              placeholder="Nome do Artista"
              type="text"
              id="artistSearchIput"
              name="artistSearchIput"
              value={ artistSearchIput }
              onChange={ this.handleChange }
            />
          </label>
          <button
            className="login-btn"
            disabled={ artistSearchIput.length < minNameLength }
            type="button"
            data-testid="search-artist-button"
            onClick={ this.searchBtn }
          >
            Pesquisar
          </button>
        </form>
        <div
          className="artists-container"
        >
          { carregando === true ? <Carregando /> : <br /> }
          { (carregando === false && artistList.length === 0)
            ? <h2>Nenhum álbum foi encontrado</h2> : albumList }
        </div>
      </div>
    );
  }
}
