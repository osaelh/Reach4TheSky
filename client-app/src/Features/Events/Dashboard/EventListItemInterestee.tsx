import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Image, List, Popup } from "semantic-ui-react";
import { Profile } from "../../../App/Models/Profile";
import ProfileCard from "../../Profiles/ProfileCard";

interface Props{
    interestees: Profile[];
}

export default observer(function EventListItemInterestee({interestees}: Props) {
    return (
        <List horizontal>
           {interestees.map(interestee => (
                <Popup hoverable key={interestee.username} trigger={
                    <List.Item key={interestee.username} as={Link} to={`/profiles/${interestee.username}`}>
                       <Image size="mini" circular src={interestee.image || 'assets/user.png'}/>
                    </List.Item>
                }>
                    <Popup.Content>
                        <ProfileCard profile={interestee}/>
                    </Popup.Content>
                </Popup>
           ))}
        </List>
    )
})