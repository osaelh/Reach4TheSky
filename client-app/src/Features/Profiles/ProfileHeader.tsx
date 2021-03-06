import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Divider, Grid, Header, Item, Reveal, Segment, Statistic } from "semantic-ui-react";
import { Profile } from "../../App/Models/Profile";

interface Props {
    profile: Profile
}

export default observer( function ProfileHeader({profile}: Props){
    return (
        <Segment>
            <Grid>
                <Grid.Column computer={12} mobile={10}>
                    <Item.Group>
                        <Item>
                            <Item.Image avatar size='small' src={profile.image || "/assets/user.png"}/>
                            <Item.Content verticalAlign='middle'>
                                <Header as='h1' content={profile.displayName}/>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>
                <Grid.Column computer={4} mobile={6}>
                    <Statistic.Group>
                        <Statistic label='Followers' value='5' />
                        <Statistic label='Following' value='42' />
                    </Statistic.Group>
                    <Divider/>
                    <Reveal animated='move'>
                        <Reveal.Content visible style={{width: '100%'}}>
                           <Button fluid color='purple' content='Following'/>
                        </Reveal.Content>
                        <Reveal.Content hidden style={{width: '100%'}}>
                           <Button basic fluid color={true ? 'red' : 'green'} content={true ? 'Unfollow' : 'Follow'}/>
                        </Reveal.Content>
                    </Reveal>
                </Grid.Column>
            </Grid>
        </Segment>
    )
}
)