import React from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { IEvent } from "../../../App/Models/Event";

interface IProps{
   events: IEvent[];
   selectEvent: (id: string) => void;
   deleteEvent: (id: string) => void;
}

export default function EventsList({events,selectEvent,deleteEvent}: IProps){
    return (
        <Segment>
            <Item.Group divided>
                {events.map(event =>
                    (
                        <Item key={event.id}>
                            <Item.Content>
                                <Item.Header as='a'>{event.title}</Item.Header>
                                <Item.Meta>{event.date}</Item.Meta>
                                <Item.Description>
                                    <div>
                                        {event.description}
                                    </div>
                                    <div>
                                        {event.categories}, {event.region}
                                    </div>
                                </Item.Description>
                                <Item.Extra>
                                    <Button onClick={()=>selectEvent(event.id)} floated='right' color='blue'>View</Button>
                                    <Button onClick={()=>deleteEvent(event.id)} floated='right' color='red'>Delete</Button>
                                    <Label basic content={event.categories}/>
                                </Item.Extra>
                            </Item.Content>
                        </Item>
    ))}
            </Item.Group>
        </Segment>

    )
}

