import React, { useEffect, useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header, List} from 'semantic-ui-react';

function App() {

  const [events, setEvents] = useState([]);

  useEffect(()=> {
    axios.get('http://localhost:5000/api/Events').then(response => {
      console.log(response);
      setEvents(response.data);
    })
  }, [])


  return (
    <div>
      <Header as='h2' icon='users' content='Reach4TheSky'/>
      <List>
      {events.map((event: any) => (
            <List.Item key={event.id}>{event.title}</List.Item>
          ))}
      </List>


    </div>
  );
}

export default App;
