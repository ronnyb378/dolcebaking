import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import React, { useEffect } from 'react';
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import { useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './sass/App.scss';
import './sass/Profile.scss';
import Home from './pages/Home';
import Login from './pages/Login';
import Cart from './pages/Cart';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Checkout from './pages/Checkout';
import { actionLoggedIn, actionLoggedOut } from './redux/actions/user';
import ProtectedRoute from './components/ProtectedRoute';
// import Profile from './pages/Profile';
import Alerts from './components/Alerts';
import ScrollToTop from './components/ScrollToTop';
import Recovery from './pages/Recovery';
import ResetPass from './pages/ResetPass';
import Admin from './pages/Admin';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import AdminNav from './components/AdminNav';
import { Container } from 'react-bootstrap';


function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    fetch('/api/v1/users/current')
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          dispatch(actionLoggedIn(data))
        } else {
          // console.log('this ran')
          dispatch(actionLoggedOut())
        }
      })
  }, [dispatch])


  return (
    <div className="App">
      <Router >
        <ScrollToTop>
          <AdminNav />
          <NavBar />
          <Container style={{ minHeight: "4em", maxHeight: "fit-content",padding: "0"}} fluid>
            <Alerts />
          </Container>
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
            <ProtectedRoute path="/cart/checkout" component={Checkout}/>
            {/* <ProtectedRoute path="/profile" component={Profile}/> */}
            <ProtectedAdminRoute path="/admin" component={Admin} />
            <Route path="/recovery">
              <Recovery />
            </Route>
            <Route path="/resetpassword/:token">
              <ResetPass />
            </Route>
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
          <Footer />
        </ScrollToTop>
      </Router>
    </div>
  );
}

export default App;
