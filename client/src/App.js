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
import { actionLoggedIn, actionLoggedOut } from './redux/actions/user';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';
import Alerts from './components/Alerts';
import ScrollToTop from './components/ScrollToTop';
import Recovery from './pages/Recovery';
import ResetPass from './pages/ResetPass';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    fetch('/api/v1/users/current')
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          dispatch(actionLoggedIn(data))
        } else {
          dispatch(actionLoggedOut())
        }
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
        <ScrollToTop>
          <NavBar />
          <Alerts />
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
            <ProtectedRoute path="/cart/checkout">
              <Checkout />
            </ProtectedRoute>
            {/* <Route path="*">
          <Redirect to="/"/>
        </Route> */}
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/recovery">
              <Recovery />
            </Route>
            <Route path="/resetpassword/:token">
              <ResetPass />
            </Route>
          </Switch>
          <Footer />
        </ScrollToTop>
      </Router>
    </div>
  );
}

export default App;
