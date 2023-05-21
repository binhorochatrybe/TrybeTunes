import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
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
        <p
          className="hello-title"
          data-testid="header-user-name"
        >
          {` Hello, ${name} :)`}
        </p>
        <div className="mainLinkS">
          <Link className="linkS" data-testid="link-to-search" to="/search">Search</Link>
          <Link className="linkS" data-testid="link-to-favorites" to="/favorites">Favorites</Link>
          <Link className="linkS" data-testid="link-to-profile" to="/profile">Profile</Link>
        </div>
      </header>
    );
  }
}

export default Header;
