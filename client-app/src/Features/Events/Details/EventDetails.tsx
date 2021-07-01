import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../App/Layout/LoadingComponent";
import { useStore } from "../../../App/Stores/store";


export default function ActivityDetails(){
  const {eventStore} = useStore();
  const {selectedEvent: event} = eventStore;
  if(!event) return <LoadingComponent/>;
    return (
        <Card fluid>
    <Image src={`/assets/categoryImages/${event.categories}.jpg`}  />
    <Card.Content>
      <Card.Header>{event.title}</Card.Header>
      <Card.Meta/>
      <Card.Description>
      <span >{event.description}</span>
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Button.Group widths='2'>
          <Button onClick={()=> eventStore.openForm(event.id)} color='blue' content='Edit'/>
          <Button onClick={eventStore.cancelSelectedEvent} color='grey' content='Cancel'/>
      </Button.Group>
    </Card.Content>
  </Card>
    )
}