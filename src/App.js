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
import searchAlbumsAPI from './services/searchAlbumsAPI';

const numberThree = 3;

class App extends React.Component {
  state = {
    nameLogin: '',
    loading: false,
    redirect: false,
    inputsearch: '',
    done: false,
    show: false,
    APIResultAlbuns: [],
  };

  buttonSearch = async () => {
    const { inputsearch } = this.state;
    this.setState({
      artist: inputsearch,
      inputsearch: '',
      loading: true,
      show: true,
    });
    const result = await searchAlbumsAPI(inputsearch);
    this.setState({
      loading: false,
      done: true,
      APIResultAlbuns: result,
    });
    const { APIResultAlbuns } = this.state;
    console.log(APIResultAlbuns);
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
    const { nameLogin,
      objectss,
      loading,
      redirect,
      inputsearch,
      done,
      artist,
      show,
      APIResultAlbuns } = this.state;
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
              buttonSearch={ this.buttonSearch }
              doneSearch={ done }
              artistSaved={ artist }
              showOrNo={ show }
              APIResultAlbuns={ APIResultAlbuns }
              noResults={ APIResultAlbuns.length === 0 }
            />) }
          />
          <Route
            path="/album/:id"
            render={ ({ match: { params: { id } } }) => (
              <Album id={ id } />) }
          />
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
