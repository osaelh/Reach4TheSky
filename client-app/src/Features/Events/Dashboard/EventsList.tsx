import { observer } from "mobx-react-lite";
import React from "react";
import { SyntheticEvent } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../App/Stores/store";


export default observer(function EventsList(){

    const [target, setTarget] = useState('');
    const {eventStore} = useStore();
    const {deleteEvent, eventsByDate, loading} = eventStore;
    
    
    function handleEventDelete(e: SyntheticEvent<HTMLButtonElement>, id: string){
        setTarget(e.currentTarget.name);
        deleteEvent(id);
    }


    return (
        <Segment>
            <Item.Group divided>
                {eventsByDate.map(event =>
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
                                    <Button as={Link} to={`/events/${event.id}`} floated='right' color='blue'>View</Button>
                                    <Button name={event.id} loading={loading && target===event.id} onClick={(e)=>handleEventDelete(e,event.id)} floated='right' color='red'>Delete</Button>
                                    <Label basic content={event.categories}/>
                                </Item.Extra>
                            </Item.Content>
                        </Item>
    ))}
            </Item.Group>
        </Segment>

    )
}
)
