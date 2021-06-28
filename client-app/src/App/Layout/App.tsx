import React, { useEffect, useState } from 'react';
// import logo from './logo.svg';
import axios from 'axios';
import { IEvent } from '../Models/Event';
import NavBar from './NavBar';
import EventDashboard from '../../Features/Events/Dashboard/EventDashboard';
import { Button, Container } from 'semantic-ui-react';
import {v4 as uuid} from 'uuid';
import agent from '../Api/agent';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../Stores/store';
import { observer } from 'mobx-react-lite';

function App() {

  const {eventStore} = useStore();

  const [events, setEvents] = useState<IEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<IEvent | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  
  useEffect(()=>{
    eventStore.loadEvents();
  }, [eventStore])

  function handleSelectEvent(id: string){
    setSelectedEvent(events.find(x => x.id === id));
  }

  function handleCancelSelectEvent(){
    setSelectedEvent(undefined);
  }
 
  function handleFormOpen(id?: string){
    id ? handleSelectEvent(id) : handleCancelSelectEvent();
    setEditMode(true);
  }

  function handleFormClose(){
    setEditMode(false);
  }

  function handleCreateOrEditEvent(event: IEvent){
    setSubmitting(true)
    if(event.id){
      agent.events.update(event).then(()=>{
        setEvents([...events.filter(x=> x.id !== event.id), event]);
        setSelectedEvent(event);
        setEditMode(false);
        setSubmitting(false);
      })
    }else{
      event.id= uuid();
      agent.events.create(event).then(()=> {
        setEvents([...events, event]);
        setSelectedEvent(event);
        setEditMode(false);
        setSubmitting(false);
      })
    }

  }

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
      <NavBar openForm={handleFormOpen}/>
     <div style={{marginTop: '5em'}}></div>
     <Container>

     <EventDashboard
      events={eventStore.events}
      selectedEvent={selectedEvent}
      selectEvent={handleSelectEvent}
      cancelSelectEvent={handleCancelSelectEvent}
      editMode={editMode}
      openForm={handleFormOpen}
      closeForm={handleFormClose}
      createOrEditEvent={handleCreateOrEditEvent}
      deleteEvent={handleDeleteEvent}
      submitting={submitting}
      ></EventDashboard>
     </Container>



    </>
  );
}

export default observer(App) ;
