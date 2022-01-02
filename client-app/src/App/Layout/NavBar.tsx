import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Container, Dropdown, Image, Menu, Segment, Sidebar, Visibility } from "semantic-ui-react";
import { useStore } from "../Stores/store";
import { createMedia } from "@artsy/fresnel";



const { MediaContextProvider, Media } = createMedia({
    breakpoints: {
        mobile: 0,
        tablet: 768,
        computer: 1024,
    },
})

export default observer(function NavBar({ children }) {

    const { userStore: { user, logout, isLoggedIn } } = useStore();
    const [navState, setNavState] = useState(false);

    return (
        <MediaContextProvider>
            <Media greaterThan="tablet">
                <Visibility
                    once={false}
                >
                    <Menu inverted fixed="top">
                        <Container>
                        <Menu.Item exact as={NavLink} to='/' header>
                            <img src="/assets/logo.png" alt="Logo" style={{ marginRight: '50px' }}></img>
                        </Menu.Item>
                        {isLoggedIn &&
                            <>
                                <Menu.Item as={NavLink} to='/events' name="Events" />
                                <Menu.Item as={NavLink} to='/errors' name="Test errors" />
                                <Menu.Item>
                                    <Button as={NavLink} to='/createEvent' positive content='Create Event' />
                                </Menu.Item>
                                <Menu.Item position='right'>
                                    <Image src={user?.image || 'assets/user.png'} avatar spaced='right' />
                                    <Dropdown inverted='true' pointing='top left' text={user?.displayName}>
                                        <Dropdown.Menu>
                                            <Dropdown.Item as={Link} to={`/profiles/${user?.userName}`} text='My profile' icon='user' />
                                            <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Menu.Item>  
                            </>
                             
                        }
                    </Container>
                    </Menu>
                    
                </Visibility>
                <div style={{ marginTop: '5em' }}></div>
                {children}
            </Media>
            <Media at='tablet'>
                
                <Sidebar.Pushable>
                    <Sidebar
                        as={Menu}
                        animation='overlay'
                        icon='labeled'
                        inverted
                        onHide={() => setNavState(false)}
                        vertical
                        visible={navState}
                        width='thin'
                        style={{height: '100vh'}}
                    >
                        {/* <Menu.Item onClick={()=> setNavState(true)}>
                    <Icon name='sidebar' />
                  </Menu.Item>
                        <Menu.Item as='a'>
                            <Icon name='home' />
                            Home
                        </Menu.Item>
                        <Menu.Item as='a'>
                            <Icon name='gamepad' />
                            Games
                        </Menu.Item>
                        <Menu.Item as='a'>
                            <Icon name='camera' />
                            Channels
                        </Menu.Item> */}
                        
                        <Menu.Item exact as={NavLink} to='/' header >
                            <img src="/assets/logo.png" alt="Logo" style={{ width: '50px', margin:"auto"}}></img>
                        </Menu.Item>
                        {isLoggedIn &&
                            <>
                                <Menu.Item as={NavLink} to='/events' name="Events" />
                                <Menu.Item as={NavLink} to='/errors' name="Test errors" />
                                <Menu.Item>
                                    <Button as={NavLink} to='/createEvent' positive content='Create Event' />
                                </Menu.Item>
                                <Menu.Item position='right'>
                                    <Image src={user?.image || 'assets/user.png'} avatar spaced='right' />
                                    <Dropdown inverted='true' pointing='top left' text={user?.displayName}>
                                        <Dropdown.Menu>
                                            <Dropdown.Item as={Link} to={`/profiles/${user?.userName}`} text='My profile' icon='user' />
                                            <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Menu.Item>  
                            </>
                             
                        }
                  
                    </Sidebar>

                    <Sidebar.Pusher>
                    <Button  color="purple" icon='sidebar' onClick={()=> setNavState(true)} ></Button>
                        {children}
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </Media>
            <Media at='mobile'>
                
                <Sidebar.Pushable as={Segment}>
                    <Sidebar
                        as={Menu}
                        animation='overlay'
                        icon='labeled'
                        inverted
                        onHide={() => setNavState(false)}
                        vertical
                        visible={navState}
                        width='thin'                       
                    >
                       <Container>
                        <Menu.Item exact as={NavLink} to='/' header >
                            <img src="/assets/logo.png" alt="Logo" style={{ width: '50px', margin:"auto"}}></img>
                        </Menu.Item>
                        {isLoggedIn &&
                            <>
                                <Menu.Item as={NavLink} to='/events' name="Events" />
                                <Menu.Item as={NavLink} to='/errors' name="Test errors" />
                                <Menu.Item>
                                    <Button as={NavLink} to='/createEvent' positive content='Create Event' />
                                </Menu.Item>
                                <Menu.Item position='right'>
                                    <Image src={user?.image || 'assets/user.png'} avatar spaced='right' />
                                    <Dropdown inverted='true' pointing='top left' text={user?.displayName}>
                                        <Dropdown.Menu>
                                            <Dropdown.Item as={Link} to={`/profiles/${user?.userName}`} text='My profile' icon='user' />
                                            <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Menu.Item>  
                            </>
                             
                        }
                    </Container>
                    </Sidebar>

                    <Sidebar.Pusher dimmed={navState}>
                    <Button  color="purple" icon='sidebar' onClick={()=> setNavState(true)}></Button>
                        {children}
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </Media>
        </MediaContextProvider>
        
    )
}
)


