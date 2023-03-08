import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import MusicCard from './MusicCard';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

export default class Album extends Component {
  state = {
    favoritesSongs: [],
    albumMusics: [],
    artistName: '',
    albumTitle: '',
    carregando: false,
  };

  async componentDidMount() {
    this.getFavoritesSongs();
    this.getAlbumsMusics();
  }

  getFavoritesSongs = async () => {
    const favoritesSongs = await getFavoriteSongs();
    this.setState(
      { favoritesSongs },
    );
  };

  handleChange = ({ target }, music) => {
    console.log(music);
    const value = target.type === 'checkbox' ? target.checked : target.value;
    if (value) {
      this.setState(
        { carregando: true },
        async () => {
          await addSong({ trackId: music });
          await this.getFavoritesSongs();
          this.setState({ carregando: false });
        },
      );
    }
  };

  getAlbumsMusics = async () => {
    const { match: { params } } = this.props;
    const albumMusics = await getMusics(params.id);
    this.setState({
      artistName: albumMusics[0].artistName,
      albumTitle: albumMusics[0].collectionName,
      albumMusics,
    });
  };

  hasFavorite = (trackId) => {
    const { favoritesSongs } = this.state;
    return favoritesSongs.some((id) => id.trackId === trackId);
  };

  render() {
    const { albumMusics, albumTitle,
      artistName, carregando } = this.state;
    const musics = albumMusics.slice(1, albumMusics.length);
    return (
      <div
        className="App"
        data-testid="page-album"
      >
        <Header />
        <h2
          data-testid="artist-name"
        >
          {artistName}
        </h2>
        <h3
          data-testid="album-name"
        >
          {albumTitle}
        </h3>
        {carregando ? <Carregando />
          : (
            <section
              className="musics-container"
            >
              { musics.map(({ trackName, previewUrl, trackId }) => (
                <MusicCard
                  key={ trackId }
                  trackName={ trackName }
                  previewUrl={ previewUrl }
                  isFavorite={ this.hasFavorite(trackId) }
                  trackId={ trackId }
                  handleChange={ this.handleChange }
                />
              ))}
            </section>)}

      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};
