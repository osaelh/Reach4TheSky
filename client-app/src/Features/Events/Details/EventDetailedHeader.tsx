import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
import { IEvent } from '../../../App/Models/Event';

const eventImageStyle = {
    filter: 'brightness(30%)'
};

const eventImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    event: IEvent;
}

export default observer (function EventDetailedHeader({event}: Props) {
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src={`/assets/categoryImages/${event.categories}.jpg`} fluid style={eventImageStyle}/>
                <Segment style={eventImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={event.title}
                                    style={{color: 'white'}}
                                />
                                <p>{format(event.date!, 'dd MMM yyyy') }</p>
                                <p>
                                    Added by <strong><Link to={`/profile/${event.host?.username}`}>{event.host?.displayName}</Link></strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                {event.isHost ? (
                     <Button as={Link} to={`/manage/${event.id}`} color='orange' floated='right'>
                        Manage Event
                     </Button>
                ) : event.isGoing ? (
                    <Button>Cancel </Button>
                ) : (
                    <Button color='teal'>Join Event</Button>
                )}
            </Segment>
        </Segment.Group>
    )
})