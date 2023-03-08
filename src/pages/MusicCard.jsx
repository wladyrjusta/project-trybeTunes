import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Pages.css';

export default class MusicCard extends Component {
  render() {
    const { trackName, previewUrl, trackId, handleChange, isFavorite } = this.props;
    return (
      <div
        className="music-box"
      >
        <h3>{ trackName }</h3>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
        </audio>
        <label
          htmlFor="favorita"
        >
          Favorita
          { isFavorite ? (<input
            type="checkbox"
            id={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
            name="favoritesMusicId"
            checked
            onChange={ (event) => handleChange(event, trackId) }
          />) : (<input
            type="checkbox"
            id={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
            name="favoritesMusicId"
            onChange={ (event) => handleChange(event, trackId) }
          />) }
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
};
