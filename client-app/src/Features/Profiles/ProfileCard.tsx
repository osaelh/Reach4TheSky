import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Card, Icon, Image } from 'semantic-ui-react';
import { Profile } from '../../App/Models/Profile';

interface Props {
    profile: Profile;
}

export default observer( function ProfileCard({profile}: Props) {
    return (
        <Card as={Link} to={`/profiles/${profile.username}`}>
            <Image src={profile.image || '/assets/user.png'}/>
            <Card.Content>
                <Card.Header>
                    {profile.displayName}
                </Card.Header>
                <Card.Description>
                    {profile.bio || 'Bio'}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Icon name='user'/>
                Followers
            </Card.Content>
        </Card>
    )
}
)