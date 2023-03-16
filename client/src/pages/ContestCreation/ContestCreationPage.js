import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './ContestCreationPage.module.sass';
import { saveContestToStore, clearDataForContest } from '../../actions/actionCreator';
import NextButton from '../../components/NextButton/NextButton';
import ContestForm from '../../components/ContestForm/ContestForm';
import BackButton from '../../components/BackButton/BackButton';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import CONSTANTS from '../../constants';


const ContestCreationPage = (props) => {
  const { contestName } = useParams()
  const contestType = contestName === 'nameContest' ? CONSTANTS.NAME_CONTEST : contestName === 'logoContest' ? CONSTANTS.LOGO_CONTEST : CONSTANTS.TAGLINE_CONTEST
  const formRef = useRef();
  const contestData = props.contestStore.contests[contestType] ? props.contestStore.contests[contestType] : { contestType: contestType };

  const handleSubmit = (values) => {
    props.saveContest({ type: contestType, info: values });
    const route = props.bundleStore.bundle[contestType] === 'payment' ? '/payment' : `${props.bundleStore.bundle[contestType]}Contest`;
    props.history.push(route);
  };

  const submitForm = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  !props.bundleStore.bundle && props.history.replace('/startContest');

  return (
    <div>
      <Header />
      <div className={styles.startContestHeader}>
        <div className={styles.startContestInfo}>
          <h2>
            {props.bundleStore.title}
          </h2>
          <span>
            Tell us a bit more about your business as well as your preferences so that creatives get a better idea about what you are looking for
          </span>
        </div>
        <ProgressBar currentStep={2} />
      </div>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <ContestForm
            contestType={contestType}
            handleSubmit={handleSubmit}
            formRef={formRef}
            defaultData={contestData}
          />
        </div>
      </div>
      <div className={styles.footerButtonsContainer}>
        <div className={styles.lastContainer}>
          <div className={styles.buttonsContainer}>
            <BackButton />
            <NextButton submit={submitForm} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  const { contestStore, bundleStore } = state;
  return { contestStore, bundleStore };
};

const mapDispatchToProps = (dispatch) => (
  {
    saveContest: (data) => dispatch(saveContestToStore(data)),
    clearDataForContest: () => dispatch(clearDataForContest()),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(ContestCreationPage);
