import { format } from "date-fns/esm";
import { Link } from "react-router-dom";
import { Button, Grid, Icon, Item, Segment } from "semantic-ui-react";
import { IEvent } from "../../../App/Models/Event";

interface IProps {
    event : IEvent;
}

export default function EventListItem({event}: IProps){

    return(
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                    <Item.Image size='tiny' circular src='/assets/user.png'></Item.Image>
                    <Item.Content>
                        <Item.Header as={Link} to={`events/${event.id}`}>
                            {event.title}
                        </Item.Header>
                        <Item.Description>
                            Created by
                        </Item.Description>
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
            <Icon name='users'/> Interested people
            </Segment>
            <Segment clearing>
                <span>
                    {event.description}
                </span>
                <Button as={Link} to={`/events/${event.id}`} color='teal' floated='right' content='View'></Button>
            </Segment>
        </Segment.Group>
    )}