import { format } from "date-fns/esm";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button, Grid, Icon, Item, Label, Segment } from "semantic-ui-react";
import { IEvent } from "../../../App/Models/Event";
import EventListItemInterestee from "./EventListItemInterestee";

interface IProps {
    event : IEvent;
}

export default observer( function EventListItem({event}: IProps){

    return(
        <Segment.Group>
            <Segment>
                {event.isCancelled &&
                  <Label attached='top'color='red' content='Cancelled' style={{textAlign: 'center'}}/>
                }
                <Item.Group>
                    <Item>
                    <Item.Image style={{marginBottom: 3}} size='tiny' circular src={event.host?.image || '/assets/user.png'}></Item.Image>
                    <Item.Content>
                        <Item.Header as={Link} to={`events/${event.id}`}>
                            {event.title}
                        </Item.Header>
                        <Item.Description>
                            {/* Created by {event.host?.displayName} */}
                            <Link to={`profiles/${event.hostUsername}`}>{event.host?.displayName}</Link>
                        </Item.Description>
                        {event.isHost && (
                            <Item.Description>
                                <Label basic color='purple'>
                                    You are hosting this event
                                </Label>
                            </Item.Description>
                        )}
                       {!event.isHost && event.isGoing &&(
                            <Item.Description>
                                <Label basic color='green'>
                                    You are interested in this event
                                </Label>
                            </Item.Description>
                        )}
                    </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Grid>
                        <Grid.Column width='6'>
                            <Icon name='clock'/> {format(event.date!,'dd MMM yyy h:mm aa') }
                        </Grid.Column>
           
                        <Grid.Column width='6'>
                            <Icon name='map marker'/> {event.region}
                        </Grid.Column>
                    </Grid>
                </span>
            </Segment>
            <Segment secondary>
                <EventListItemInterestee interestees={event.interestees!}/>
            </Segment>
            <Segment clearing>
                <span>
                    {event.description}
                </span>
                <Button as={Link} to={`/events/${event.id}`} color='teal' floated='right' content='View'></Button>
            </Segment>
        </Segment.Group>
    )}
)