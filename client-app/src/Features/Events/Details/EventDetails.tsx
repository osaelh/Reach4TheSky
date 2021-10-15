import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../App/Layout/LoadingComponent";
import { useStore } from "../../../App/Stores/store";


export default observer(function ActivityDetails(){
  const {eventStore} = useStore();
  const {selectedEvent: event, loadEventById, loadingInitial} = eventStore;
  const {id} = useParams<{id: string}>();

  useEffect(()=> {
    if (id) loadEventById(id);
  },[id, loadEventById]);

  if(!event || loadingInitial) return <LoadingComponent/>;
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
          <Button as={Link} to={`/manage/${event.id}`} color='blue' content='Edit'/>
          <Button as={Link} to='/events' color='grey' content='Cancel'/>
      </Button.Group>
    </Card.Content>
  </Card>
    )
}
)