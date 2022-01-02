import { createMedia } from "@artsy/fresnel";
import { observer } from "mobx-react-lite";
import React from "react";
import { Tab } from "semantic-ui-react";
import { Profile } from "../../App/Models/Profile";
import ProfileAbout from "./ProfileAbout";
import ProfileEvents from "./ProfileEvents";
import ProfilePhotos from "./ProfilePhotos";

interface Props {
    profile: Profile
}

const { MediaContextProvider, Media } = createMedia({
    breakpoints: {
        mobile: 0,
        tablet: 768,
        computer: 1024,
    },
})

export default observer( function ProfileContent({profile}: Props){
    const panes = [
        {menuItem: "About", render: () => <ProfileAbout/>},
        {menuItem: "Photos", render: () => <ProfilePhotos profile={profile}/>},
        {menuItem: "Events", render: () => <ProfileEvents/>}
        // {menuItem: "Followers", render: () => <Tab.Pane>Followers Content</Tab.Pane>},
        // {menuItem: "Following", render: () => <Tab.Pane>Following Content</Tab.Pane>}   
    ];
    return (
        <MediaContextProvider>
            <Media greaterThanOrEqual="tablet">
        <Tab
           menu={{fluid: true, vertical: true}}
           menuPosition='right'
           panes={panes}
        />
        </Media>
        <Media at="mobile">
        <Tab
           
           menu={{ borderless: true, attached: false, tabular: false }}
           panes={panes}
        />
        </Media>
        </MediaContextProvider>
    )
}
)