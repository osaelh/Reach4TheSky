import React, { useEffect} from 'react';
import NavBar from './NavBar';
import EventDashboard from '../../Features/Events/Dashboard/EventDashboard';
import {  Container } from 'semantic-ui-react';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../Stores/store';
import { observer } from 'mobx-react-lite';

function App() {

  const {eventStore} = useStore();


  
  useEffect(()=>{
    eventStore.loadEvents();
  }, [eventStore])

  

  if(eventStore.loadingInitial) return <LoadingComponent content="loading app" />
  return (
    
    <>
      <NavBar/>
     <div style={{marginTop: '5em'}}></div>
     <Container>

     <EventDashboard></EventDashboard>
     </Container>

    </>
  );
}

export default observer(App) ;
