import React from "react";
import { SyntheticEvent } from "react";
import { useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { IEvent } from "../../../App/Models/Event";
import { useStore } from "../../../App/Stores/store";

interface IProps{
   events: IEvent[];
   deleteEvent: (id: string) => void;
   submitting: boolean;
}

export default function EventsList({events,deleteEvent, submitting}: IProps){

    const [target, setTarget] = useState('');
    
    function handleEventDelete(e: SyntheticEvent<HTMLButtonElement>, id: string){
        setTarget(e.currentTarget.name);
        deleteEvent(id);
    }

    const {eventStore} = useStore();

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
                                    <Button onClick={()=>eventStore.selectEvent(event.id)} floated='right' color='blue'>View</Button>
                                    <Button name={event.id} loading={submitting && target===event.id} onClick={(e)=>handleEventDelete(e,event.id)} floated='right' color='red'>Delete</Button>
                                    <Label basic content={event.categories}/>
                                </Item.Extra>
                            </Item.Content>
                        </Item>
    ))}
            </Item.Group>
        </Segment>

    )
}

