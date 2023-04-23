import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import { createUser } from './services/userAPI';
import Loading from './pages/Loading';

const numberThree = 3;

class App extends React.Component {
  state = {
    nameLogin: '',
    loading: false,
    redirect: false,
    inputsearch: '',
  };

  sendLogin = async () => {
    const { nameLogin } = this.state;
    const savedName = {
      name: nameLogin,
    };
    this.setState({
      objectss: savedName,
      loading: true,
    });
    await createUser(savedName);
    this.setState({
      loading: false,
      redirect: true,
    });
  };

  onInputChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
    console.log(value);
  };

  render() {
    const { nameLogin, objectss, loading, redirect, inputsearch } = this.state;
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={ () => (<Login
              nameLogin={ nameLogin }
              onInputChange={ this.onInputChange }
              disbaleOrNo={ nameLogin.length < numberThree }
              sendLogin={ this.sendLogin }
              objectss={ objectss }
            />) }
          />
          <Route
            path="/search"
            render={ () => (<Search
              inputsearch={ inputsearch }
              onInputChange={ this.onInputChange }
              disbaleOrNo={ inputsearch.length < 2 }
            />) }
          />
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="/*" component={ NotFound } />
        </Switch>
        {loading && <Loading />}
        {redirect && <Redirect to="/search" />}
      </Router>
    );
  }
}

export default App;
