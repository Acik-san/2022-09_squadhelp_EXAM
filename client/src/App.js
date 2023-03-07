import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import Payment from './pages/Payment/Payment';
import StartContestPage from './pages/StartContestPage/StartContestPage';
import Dashboard from './pages/Dashboard/Dashboard';
import PrivateHoc from './components/PrivateHoc/PrivateHoc';
import NotFound from './components/NotFound/NotFound';
import Home from './pages/Home/Home';
import OnlyNotAuthorizedUserHoc from './components/OnlyNotAuthorizedUserHoc/OnlyNotAuthorizedUserHoc';
import ContestPage from './pages/ContestPage/ContestPage';
import UserProfile from './pages/UserProfile/UserProfile';
import EventsPage from './pages/EventsPage';
import OffersPage from './pages/OffersPage'
import 'react-toastify/dist/ReactToastify.css';
import ContestCreationPage from './pages/ContestCreation/ContestCreationPage';
import browserHistory from './browserHistory';
import ChatContainer from './components/Chat/ChatComponents/ChatContainer/ChatContainer';


class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={OnlyNotAuthorizedUserHoc(LoginPage)} />
          <Route exact path="/registration" component={OnlyNotAuthorizedUserHoc(RegistrationPage)} />
          <Route exact path="/payment" component={PrivateHoc(Payment)} />
          <Route exact path="/startContest" component={PrivateHoc(StartContestPage)} />
          <Route
            exact
            path="/startContest/:contestName"
            component={PrivateHoc(ContestCreationPage)}
          />
          <Route exact path="/dashboard" component={PrivateHoc(Dashboard)} />
          <Route exact path="/contests/:id" component={PrivateHoc(ContestPage)} />
          <Route exact path="/profile" component={PrivateHoc(UserProfile)} />
          <Route exact path="/events" component={PrivateHoc(EventsPage)} />
          <Route exact path="/offers" component={PrivateHoc(OffersPage)} />
          <Route component={NotFound} />
        </Switch>
        <ChatContainer />
      </Router>
    );
  }
}

export default App;
