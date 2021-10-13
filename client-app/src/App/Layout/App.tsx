import React from 'react';
import NavBar from './NavBar';
import EventDashboard from '../../Features/Events/Dashboard/EventDashboard';
import {  Container } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Route } from 'react-router';
import HomePage from '../../Features/Home/HomePage';
import EventForm from '../../Features/Events/Form/EventForm';
import EventDetails from '../../Features/Events/Details/EventDetails';

function App() {


  return (
    
    <>
      <NavBar/>
     <div style={{marginTop: '5em'}}></div>
     <Container>
     <Route exact path='/' component={HomePage} />
     <Route exact path='/events' component={EventDashboard} />
     <Route path='/events/:id' component={EventDetails} />
     <Route path='/createEvent' component={EventForm} />
     </Container>

    </>
  );
}

export default observer(App) ;
