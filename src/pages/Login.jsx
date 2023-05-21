import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';

class Login extends Component {
  render() {
    const { nameLogin, onInputChange, disbaleOrNo, sendLogin, loading } = this.props;
    return (
      <div data-testid="page-login" className="mainLogin">
        <form action="" className="mainForm">
          <p className="main-title">Trybetunes</p>
          <input
            className="inputLogin"
            data-testid="login-name-input"
            value={ nameLogin }
            name="nameLogin"
            type="text"
            onChange={ onInputChange }
          />
          <button
            className="buttonLogin"
            onClick={ sendLogin }
            disabled={ disbaleOrNo }
            type="button"
            data-testid="login-submit-button"
          >
            Entrar
          </button>
        </form>
        { loading && <Loading /> }
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
