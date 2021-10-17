import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Grid, Header, Image, Segment } from "semantic-ui-react";

export default function HomePage(){
    return (
       <Segment centered textAlign='center' vertical className="mainHeader">
           {/* <Container> */}
              <Grid >
                  <Grid.Column width={'5'} >
                      <img style={{marginLeft: '50px',height:"400px"}}  src='/assets/counting-stars.svg'></img>
                  </Grid.Column>
                  <Grid.Column width={'6'} >
                      <Header as='h1' content='Reach for the sky'/>
                      <h2 style={{color: 'GrayText'}}>Join us so you can stay up to date and never miss an event</h2>
                      <h2 style={{color: 'GrayText'}}></h2>
                      <Button style={{marginTop: '2em'}} as={Link} to='/events' size='massive' color='blue'>Take me to events</Button>
                  </Grid.Column>
                  <Grid.Column width={'5'} >
                      <img style={{marginRight: '50px',height:"400px"}}  src='/assets/space.svg'></img>
                  </Grid.Column>
              </Grid>
           {/* </Container> */}

       </Segment>
    )
}