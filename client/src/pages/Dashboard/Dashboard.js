import React from 'react';
import { connect } from 'react-redux';
import CONSTANTS from '../../constants';
import CustomerDashboard from '../../components/CustomerDashboard/CustomerDashboard';
import CreatorDashboard from '../../components/CreatorDashboard/CreatorDashboard';
import Header from '../../components/Header/Header';

const Dashboard = props => {
  const { role, history } = props;
  return (
    <>
      <Header />
      {role === undefined ? (
        history.replace('./login')
      ) : role === CONSTANTS.CUSTOMER ? (
        <CustomerDashboard history={history} match={props.match} />
      ) : role === CONSTANTS.CREATOR ? (
        <CreatorDashboard history={history} match={props.match} />
      ) : (
        history.replace('./')
      )}
    </>
  );
};

const mapStateToProps = state => state.userStore.data;

export default connect(mapStateToProps)(Dashboard);
