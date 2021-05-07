import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import H2 from 'components/H2';
import ReposList from 'components/ReposList';
import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import { getToken } from './actions';
import reducer from './reducer';
import saga from './saga';

const key = 'navbar';

export function NavBar({
  onGetToken,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    onGetToken();
  }, []);

  return (
    <div>
      <CenteredSection>
        <H2>
          <FormattedMessage {...messages.startProjectHeader} />
        </H2>
        <p>
          <FormattedMessage {...messages.startProjectMessage} />
        </p>
      </CenteredSection>
    </div>
  );
}

NavBar.propTypes = {
  onGetToken: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onGetToken: () => dispatch(getToken()),
  };
}

const withConnect = connect(
  undefined,//mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(NavBar);
