import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Image, List } from "semantic-ui-react";
import { Profile } from "../../../App/Models/Profile";

interface Props{
    interestees: Profile[];
}

export default observer(function EventListItemInterestee({interestees}: Props) {
    return (
        <List horizontal>
           {interestees.map(interestee => (
                <List.Item key={interestee.username} as={Link} to={`/profile/${interestee.username}`}>
                <Image size="mini" circular src={interestee.image || 'assets/user.png'}/>
            </List.Item>
           ))}
        </List>
    )
})