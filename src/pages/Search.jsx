import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from './Loading';

class Search extends Component {
  render() {
    const { onInputChange,
      inputsearch,
      disbaleOrNo,
      buttonSearch,
      loading,
      doneSearch,
      artistSaved,
      showOrNo,
      APIResultAlbuns,
      noResults } = this.props;
    return (
      <div>
        {doneSearch && <p>{`Resultado de álbuns de: ${artistSaved}`}</p>}
        <Header />
        <form action="">
          <input
            hidden={ showOrNo }
            type="text"
            data-testid="search-artist-input"
            onChange={ onInputChange }
            value={ inputsearch }
            name="inputsearch"
          />
          <button
            hidden={ showOrNo }
            disabled={ disbaleOrNo }
            data-testid="search-artist-button"
            type="button"
            onClick={ buttonSearch }
          >
            Pesquisar
          </button>
        </form>
        <section>
          {loading && <Loading />}
          {APIResultAlbuns
            .map(({ collectionId, artistName, artworkUrl100, collectionName }, i) => (
              <div key={ i }>
                <img src={ artworkUrl100 } alt={ artistName } />
                <p>{artistName}</p>
                <p>{collectionName}</p>
                <Link
                  data-testid={ `link-to-album-${collectionId}` }
                  to={ `/album/${collectionId}` }
                >
                  LINK
                </Link>
              </div>))}
        </section>
        {noResults && doneSearch && <p>Nenhum álbum foi encontrado</p>}
      </div>
    );
  }
}
Search.propTypes = {
  inputsearch: PropTypes.string,
  onInputChange: PropTypes.func,
  disbaleOrNo: PropTypes.bool,
  buttonSearch: PropTypes.func,
  loading: PropTypes.bool,
}.isRequired;

export default Search;
