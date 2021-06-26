import React, { useEffect, useState } from 'react';
// import logo from './logo.svg';
import axios from 'axios';
import { IEvent } from '../Models/Event';
import NavBar from './NavBar';
import EventDashboard from '../../Features/Events/Dashboard/EventDashboard';
import { Container } from 'semantic-ui-react';

function App() {

  const [events, setEvents] = useState<IEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<IEvent | undefined>(undefined);



  useEffect(()=> {
    axios.get<IEvent[]>('http://localhost:5000/api/Events').then(response => {
      console.log(response);
      setEvents(response.data);
    })
  }, [])

  function handleSelectEvent(id: string){
    setSelectedEvent(events.find(x => x.id == id));
  }

  function handleCancelSelectEvent(){
    setSelectedEvent(undefined);
  }


  return (
    
    <>
      <NavBar/>
     <div style={{marginTop: '5em'}}></div>
     <Container>
     <EventDashboard
      events={events}
      selectedEvent={selectedEvent}
      selectEvent={handleSelectEvent}
      cancelSelectEvent={handleCancelSelectEvent}
      ></EventDashboard>
     </Container>



    </>
  );
}

export default App;
