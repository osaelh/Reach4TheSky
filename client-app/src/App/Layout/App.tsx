import React from 'react';
import NavBar from './NavBar';
import EventDashboard from '../../Features/Events/Dashboard/EventDashboard';
import {  Container } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router';
import HomePage from '../../Features/Home/HomePage';
import EventForm from '../../Features/Events/Form/EventForm';
import EventDetails from '../../Features/Events/Details/EventDetails';
import TestErrors from '../../Features/errors/TestErrors';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../Features/errors/NotFound';


function App() {

  const location = useLocation();

  return (
    
    <>
    <ToastContainer position="bottom-right" hideProgressBar></ToastContainer>
    <Route exact path='/' component={HomePage} />
    <Route
    path={'/(.+)'}
    render={()=>(
      <>      <NavBar/>
      <div style={{marginTop: '5em'}}></div>
      <Container>
      <Switch>
      <Route exact path='/events' component={EventDashboard} />
      <Route path='/events/:id' component={EventDetails} />
      <Route key={location.key} path={['/createEvent','/manage/:id']} component={EventForm} />
      <Route path='/errors' component={TestErrors}/>
      <Route component={NotFound}/>
      </Switch>

      </Container></>
  )} 
    />


    </>
  );
}

export default observer(App) ;
