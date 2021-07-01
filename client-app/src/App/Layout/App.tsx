import React, { useEffect, useState } from 'react';
import { IEvent } from '../Models/Event';
import NavBar from './NavBar';
import EventDashboard from '../../Features/Events/Dashboard/EventDashboard';
import {  Container } from 'semantic-ui-react';
import agent from '../Api/agent';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../Stores/store';
import { observer } from 'mobx-react-lite';

function App() {

  const {eventStore} = useStore();

  const [events, setEvents] = useState<IEvent[]>([]);
  const [submitting, setSubmitting] = useState(false);

  
  useEffect(()=>{
    eventStore.loadEvents();
  }, [eventStore])

  

  function handleDeleteEvent(id: string){
    setSubmitting(true);
    agent.events.delete(id).then(()=>{
    setEvents([...events.filter(x=> x.id !== id)]);
    setSubmitting(false);
    })
 
  }
  if(eventStore.loadingInitial) return <LoadingComponent content="loading app" />
  return (
    
    <>
      <NavBar/>
     <div style={{marginTop: '5em'}}></div>
     <Container>

     <EventDashboard
      events={eventStore.events}
      deleteEvent={handleDeleteEvent}
      submitting={submitting}
      ></EventDashboard>
     </Container>

    </>
  );
}

export default observer(App) ;
