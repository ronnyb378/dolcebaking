import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import React, { useEffect } from 'react';
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import { useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import Home from './pages/Home';
import Login from './pages/Login';
import Cart from './pages/Cart';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Checkout from './pages/Checkout';
import { actionLoggedIn } from './redux/actions/user';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    fetch('/api/v1/users/current')
    .then(res => res.json())
    .then(data => {
      dispatch(actionLoggedIn(data))
    })
  }, [dispatch])


  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header> */}
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route exact path="/cart">
          <Cart />
        </Route>
        <Route path="/cart/checkout">
          <Checkout />
        </Route>
        <Route path="*">
          <Redirect to="/"/>
        </Route>
      </Switch>
      <Footer />
    </Router>
    </div>
  );
}

export default App;
