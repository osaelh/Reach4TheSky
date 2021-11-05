import React from "react";
import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment, Image, Grid } from "semantic-ui-react";

export default function NotFound(){
    return (
        <Segment >
            <Image  size='large' centered  src='/assets/404.svg'></Image>
            <Header size='medium' textAlign='center' content='Oops, we have looked and could not found this'/>
            <Grid>
               <Grid.Column textAlign="center">
                  <Button as={Link} style={{position: 'center'}} to='events'  primary content='Return to events page'/>
               </Grid.Column>
            </Grid>
        </Segment>
    )
}