import { Segment, List, Label, Item, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { IEvent } from '../../../App/Models/Event'

interface Props {
    event: IEvent;
}

export default observer(function ActivityDetailedSidebar ({event : {interestees, host}}: Props) {
    if(!interestees) return null;
    return (
        <>
            <Segment
                textAlign='center'
                style={{ border: 'none' }}
                attached='top'
                secondary
                inverted
                color='teal'
            >
                {interestees.length} {interestees.length === 1 ? 'Person' : 'People'} interested
            </Segment>
            <Segment attached>
                <List relaxed divided>
                    {interestees.map(interestee => (
                        <Item key={interestee.username} style={{ position: 'relative' }}>
                            {interestee.username === host?.username && 
                        <Label
                            style={{ position: 'absolute' }}
                            color='orange'
                            ribbon='right'
                        >
                            Host
                        </Label>}
                        <Image size='tiny' src={interestee.image || '/assets/user.png'} />
                        <Item.Content verticalAlign='middle'>
                            <Item.Header as='h3'>
                                <Link to={`/profiles/${interestee.username}`}>{interestee.displayName}</Link>
                            </Item.Header>
                            <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>
                        </Item.Content>
                    </Item>
                    ))}
                </List>
            </Segment>
        </>

    )
})