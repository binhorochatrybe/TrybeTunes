import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends Component {
  state = {
    loading: false,
  };

  componentDidMount() {
    this.funcaoIa();
  }

  funcaoIa = async () => {
    this.setState({
      loading: true,
    });
    const nome = await getUser();
    this.setState({
      name: nome.name,
      loading: false,
    });
  };

  render() {
    const { loading, name } = this.state;
    return (
      <header
        data-testid="header-component"
      >
        {loading && <Loading />}
        <p data-testid="header-user-name">{ name }</p>
      </header>
    );
  }
}

export default Header;
