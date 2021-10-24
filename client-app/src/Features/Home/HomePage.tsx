import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Grid, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../App/Stores/store";

export default observer( function HomePage(){

    const {userStore} = useStore()

    return (
       <Segment textAlign='center' vertical className="mainHeader">
           {/* <Container> */}
              <Grid >
                  <Grid.Column width={'5'} >
                      <img style={{marginLeft: '50px',height:"400px"}} alt='counting stars img'  src='/assets/counting-stars.svg'></img>
                  </Grid.Column>
                  <Grid.Column width={'6'} >
                      <Header as='h1' content='Reach for the sky'/>
                      <Header as='h2' style={{color: 'GrayText'}}>Join us so you can stay up to date and never miss an event</Header>
                      
                      {userStore.isLoggedIn ? (
                          <>
                          <Header as='h2' style={{color: 'GrayText'}}></Header>
                          <Button style={{marginTop: '2em'}} as={Link} to='/events' size='massive' color='blue'>Go to events</Button>
                          </>
                      ):(
                        <Button style={{marginTop: '2em'}} as={Link} to='/login' size='massive' color='blue'>Login</Button>

                      )}
                      
                  </Grid.Column>
                  <Grid.Column width={'5'} >
                      <img style={{marginRight: '50px',height:"400px"}} alt='space img'  src='/assets/space.svg'></img>
                  </Grid.Column>
              </Grid>
           {/* </Container> */}

       </Segment>
    )
}
)