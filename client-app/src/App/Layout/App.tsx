import React, { useEffect } from 'react';
import NavBar from './NavBar';
import EventDashboard from '../../Features/Events/Dashboard/EventDashboard';
import { Container } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router';
import HomePage from '../../Features/Home/HomePage';
import EventForm from '../../Features/Events/Form/EventForm';
import EventDetails from '../../Features/Events/Details/EventDetails';
import TestErrors from '../../Features/errors/TestErrors';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../Features/errors/NotFound';
import ServerError from '../../Features/errors/ServerError';
import { useStore } from '../Stores/store';
import LoadingComponent from './LoadingComponent';
import ModelContainer from '../Common/Modals/ModelContainer';
import ProfilePage from '../../Features/Profiles/ProfilePage';
import PrivateRoute from './PrivateRoute';
import RegisterSuccess from '../../Features/Users/RegisterSuccess';
import ConfirmEmail from '../../Features/Users/ConfirmEmail';


function App() {

  const location = useLocation();
  const { commonStore, userStore } = useStore();
  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded())
    } else {
      userStore.getfacebookLoginStatus().then(() => commonStore.setAppLoaded())
    }
  }, [commonStore, userStore])

  if (!commonStore.appLoaded) return <LoadingComponent content='Loading App ...' />

  return (

    <>
      <ToastContainer position="bottom-right" hideProgressBar></ToastContainer>
      <ModelContainer />
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>      <NavBar />
            <div style={{ marginTop: '5em' }}></div>
            <Container>
              <Switch>
                <PrivateRoute exact path='/events' component={EventDashboard} />
                <PrivateRoute path='/events/:id' component={EventDetails} />
                <PrivateRoute key={location.key} path={['/createEvent', '/manage/:id']} component={EventForm} />
                <PrivateRoute path='/Profiles/:username' component={ProfilePage} />
                <PrivateRoute path='/errors' component={TestErrors} />
                <Route path='/server-error' component={ServerError} />
                <Route path='/account/registerSuccess' component={RegisterSuccess} />
                <Route path='/account/verifyEmail' component={ConfirmEmail} />
                <Route component={NotFound} />
              </Switch>

            </Container></>
        )}
      />


    </>
  );
}

export default observer(App);
