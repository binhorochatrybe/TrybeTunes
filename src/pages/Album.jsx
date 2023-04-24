import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    artistName: '',
    collectionName: '',
    trackName: '',
    previewUrl: '',
    result: [],
  };

  componentDidMount() {
    this.renderizeMusic();
  }

  renderizeMusic = async () => {
    const { id } = this.props;
    const result = await getMusics(id);
    this.setState({
      artistName: result[0].artistName,
      collectionName: result[0].collectionName,
      trackName: result[1].trackName,
      previewUrl: result[1].previewUrl,
      result,
    });
    console.log(result);
  };

  render() {
    const { artistName,
      collectionName,
      trackName,
      previewUrl,
      result } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">{ artistName }</p>
        <p data-testid="album-name">{ collectionName }</p>
        <MusicCard
          trackName={ trackName }
          previewUrl={ previewUrl }
          result={ result.slice(1) }
        />
      </div>
    );
  }
}

Album.propTypes = {
  id: PropTypes.string,
}.isRequired;
export default Album;
