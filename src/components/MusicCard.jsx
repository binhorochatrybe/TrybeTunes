import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends Component {
  state = {
    loading: false,
    checked: false,
  };

  componentDidMount() {
    this.saveMusic();
  }

  checkedInput = async () => {
    this.setState({
      loading: true,
    });
    const { objeto } = this.props;
    await addSong(objeto);
    this.setState({
      loading: false,
      checked: true,
    });
  };

  saveMusic = async () => {
    this.setState({
      loading: true,
    });
    const { trackId } = this.props;
    const LSsongs = await getFavoriteSongs();
    this.setState({
      loading: false,
      checked: LSsongs.some((song) => song.trackId === trackId),
    });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, checked } = this.state;
    return (
      <div>
        {loading && <Loading />}
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
        </audio>
        <label
          data-testid={ `checkbox-music-${trackId}` }
          htmlFor={ trackId }
        >
          Favorita
        </label>
        <input
          onClick={ this.checkedInput }
          type="checkbox"
          name="checkbox"
          id={ trackId }
          checked={ checked }
        />
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  result: PropTypes.object,
}.isRequired;

export default MusicCard;
