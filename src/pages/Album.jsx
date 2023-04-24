import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    artistName: '',
    collectionName: '',
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
      result,
    });
  };

  render() {
    const { artistName,
      collectionName,
      result } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">{ artistName }</p>
        <p data-testid="album-name">{ collectionName }</p>
        {result.slice(1).map((music) => (
          <div key={ music.trackName }>
            <MusicCard
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
              trackId={ music.trackId }
              objeto={ music }
            />
          </div>
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  id: PropTypes.string,
}.isRequired;
export default Album;
