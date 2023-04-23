import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Login extends Component {
  render() {
    const { nameLogin, onInputChange, disbaleOrNo, sendLogin, loading } = this.props;
    return (
      <div data-testid="page-login">
        <form action="">
          <input
            data-testid="login-name-input"
            value={ nameLogin }
            name="nameLogin"
            type="text"
            onChange={ onInputChange }
          />
          <button
            onClick={ sendLogin }
            disabled={ disbaleOrNo }
            type="button"
            data-testid="login-submit-button"
          >
            Entrar
          </button>
        </form>
        { loading && <p>Carregando...</p> }
      </div>
    );
  }
}

Login.propTypes = {
  nameLogin: PropTypes.string,
  onInputChange: PropTypes.func,
  disbaleOrNo: PropTypes.bool,
  sendLogin: PropTypes.func,
  loading: PropTypes.bool,
}.isRequired;

export default Login;
