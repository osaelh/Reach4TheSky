import React from "react";
import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

export default function NotFound(){
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name="search"/>
                Oops, we have looked and could not found this
            </Header>
            <Segment.Inline>
                <Button as={Link} to='events' primary content='Return to events page'/>
            </Segment.Inline>
        </Segment>
    )
}