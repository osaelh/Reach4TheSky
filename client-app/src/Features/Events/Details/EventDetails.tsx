import React from "react";
import { Button, Card, Icon, Image } from "semantic-ui-react";
import { IEvent } from "../../../App/Models/Event";

interface IProps{
    event : IEvent
    cancelSelectEvent: ()=> void;
}

export default function ActivityDetails({event, cancelSelectEvent}: IProps){
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
          <Button color='blue' content='Edit'/>
          <Button onClick={cancelSelectEvent} color='grey' content='Cancel'/>
      </Button.Group>
    </Card.Content>
  </Card>
    )
}