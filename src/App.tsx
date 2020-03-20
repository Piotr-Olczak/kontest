import { notification } from 'antd';
import { AppContext, initialState } from 'components/AppState/AppState';
import SampleFormElements from 'components/FormElements/SampleFormElements';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';
import SampleApiConnector from 'components/SampleApiConnector/SampleApiConnector';
import StatusHandler from 'components/StatusHandler/StatusHandler';
import SystemSettings from 'components/SystemSettings/SystemSettings';
import { APP_URLS } from 'helpers/url.helper';
import ChangePasswordPage from 'pages/ChangePasswordPage/ChangePasswordPage';
import { ContactPage } from 'pages/ContactPage/ContactPage';
import { DepositPage } from 'pages/DepositPage/DepositPage';
import NotFoundPage from 'pages/NotFoundPage/NotFoundPage';
import LoginPage from 'pages/LoginPage/LoginPage';
import { PlayInstructionPage } from 'pages/PlayInstructionsPage/PlayInstructionPage';

import RacesPage from 'pages/RacesPage/RacesPage';
import RegisterPage from 'pages/RegisterPage/RegisterPage';
import RegisterConfirmationPage from 'pages/RegisterConfirmationPage/RegisterConfirmationPage';
import RemindPasswordPage from 'pages/RemindPasswordPage/RemindPasswordPage';
import ConfirmEmailPage from 'pages/ConfirmEmailPage/ConfirmEmailPage';
import { ResponsibleGamePage } from 'pages/ResponsibleGamePage/ResponsibleGamePage';
import SampleFormGroup from 'pages/SampleFormGroup/SampleFormGroup';
import SampleStatuses from 'pages/SampleStatuses/SampleStatuses';
import { SettingsPage } from 'pages/SettingsPage/SettingsPage';
import SingleRaceBetPage from 'pages/SingleRaceBetPage/SingleRaceBetPage';
import MultiRaceBetPage from 'pages/MultiRaceBetPage/MultiRaceBetPage';
import { TransactionPage } from 'pages/TransactionPage/TransactionPage';
import UnlockAccountPage from 'pages/UnlockAccountPage/UnlockAccountPage';
import { UserBetsPage } from 'pages/UserBetsPage/UserBetsPage';
import { UserSettingsPage } from 'pages/UserSettingsPage/UserSettingsPage';
import { UserVerificationPage } from 'pages/UserVerificationPage/UserVerificationPage';
import { WithdrawPage } from 'pages/WithdrawPage/WithdrawPage';
import PayoutForecastsPage from 'pages/PayoutForecastsPage/PayoutForecastsPage';
import VideoFeedPage from 'pages/VideoFeedPage/VideoFeedPage';
import React, { useReducer, useContext } from 'react';
import { Router, Redirect, Route, Switch } from 'react-router-dom';

import { rootReducer } from 'reducers/reducer';
import { AppContextShape } from 'interfaces/interfaces';
import { ChangePasswordModal } from 'components/ChangePasswordModal/ChangePasswordModal';
import ProgramPage from 'pages/ProgramPage/ProgramPage';

import { createBrowserHistory } from 'history';
import { ai } from 'helpers/appInsightService.helper';

const history = createBrowserHistory({
  basename: process.env.REACT_APP_BASE_PATH
});

// Application Insights initialization
ai.init({ history });

const App: React.FC = () => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  // global notification config
  notification.config({
    placement: 'topRight',
    top: 100
  });

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <StatusHandler />
      <SystemSettings>
        <Router history={history}>
          <Globals />
          <Switch>
            <Route
              exact
              path="/"
              component={() => <Redirect to={APP_URLS.homepage} />}
            />
            <Route path={APP_URLS.login} component={LoginPage} />
            <Route path={APP_URLS.confirmEmail} component={ConfirmEmailPage} />
            <Route
              path={APP_URLS.passwordReminder}
              component={RemindPasswordPage}
            />
            <Route
              path={APP_URLS.unlockAccount}
              component={UnlockAccountPage}
            />
            <Route
              path={APP_URLS.changePassword}
              component={ChangePasswordPage}
            />
            <Route path={APP_URLS.register} component={RegisterPage} />
            <Route
              path={APP_URLS.registerConfirmation}
              component={RegisterConfirmationPage}
            />

            <PrivateRoute
              exact
              path={APP_URLS.racesList}
              component={RacesPage}
            />
            <PrivateRoute
              path={APP_URLS.singleRaceBet}
              component={SingleRaceBetPage}
            />
            <PrivateRoute
              path={APP_URLS.multiRaceBet}
              component={MultiRaceBetPage}
            />
            <PrivateRoute path={APP_URLS.userBets} component={UserBetsPage} />
            <PrivateRoute
              path={APP_URLS.playIntructions}
              component={PlayInstructionPage}
            />

            <PrivateRoute
              exact
              path={APP_URLS.settings}
              component={SettingsPage}
            />
            <PrivateRoute path={APP_URLS.deposit} component={DepositPage} />
            <PrivateRoute path={APP_URLS.withdraw} component={WithdrawPage} />
            <PrivateRoute
              path={APP_URLS.transactions}
              component={TransactionPage}
            />
            <PrivateRoute
              path={APP_URLS.userSettings}
              component={UserSettingsPage}
            />
            <PrivateRoute
              path={APP_URLS.responsibleGame}
              component={ResponsibleGamePage}
            />
            <PrivateRoute path={APP_URLS.program} component={ProgramPage} />
            <PrivateRoute path={APP_URLS.contact} component={ContactPage} />
            <PrivateRoute
              path={APP_URLS.userVerification}
              component={UserVerificationPage}
            />

            <Route path="/sampleformgroup" component={SampleFormGroup} />
            <Route path="/samplestatuses" component={SampleStatuses} />
            <Route
              path="/sample-form-elements"
              component={SampleFormElements}
            />
            <Route
              path="/sample-api-connector"
              component={SampleApiConnector}
            />
            <PrivateRoute
              path={APP_URLS.payoutForecasts}
              component={PayoutForecastsPage}
            />
            <PrivateRoute path={APP_URLS.videoFeed} component={VideoFeedPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Router>
      </SystemSettings>
    </AppContext.Provider>
  );
};

const Globals: React.FC = () => {
  const { state } = useContext<AppContextShape>(AppContext);

  return (
    <>
      {state.user.details && state.user.details.temporaryPassword && (
        <ChangePasswordModal />
      )}
    </>
  );
};

export default App;
