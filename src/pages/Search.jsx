import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Search extends Component {
  render() {
    const { onInputChange, inputsearch, disbaleOrNo } = this.props;
    return (
      <div data-testid="page-search">
        <Header />
        <form action="">
          <input
            type="text"
            data-testid="search-artist-input"
            onChange={ onInputChange }
            value={ inputsearch }
            name="inputsearch"
          />
          <button
            disabled={ disbaleOrNo }
            data-testid="search-artist-button"
            type="button"
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}
Search.propTypes = {
  inputsearch: PropTypes.string,
  onInputChange: PropTypes.func,
  disbaleOrNo: PropTypes.bool,
}.isRequired;

export default Search;
