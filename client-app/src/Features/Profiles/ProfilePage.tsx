import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../App/Layout/LoadingComponent";
import { useStore } from "../../App/Stores/store";
import ProfileContent from "./ProfileContent";
import ProfileHeader from "./ProfileHeader";

export default observer( function ProfilePage(){
    const {username} = useParams<{username: string}>();
    const {profileStore: {loadProfile, profile, loadingProfile}} = useStore();

    useEffect(() => {
        loadProfile(username);
    }, [loadProfile, username])

    if(loadingProfile) return <LoadingComponent content='Loading componnent'/>
    return (
       <Grid>
           <Grid.Column width={16} stretched>
               {profile &&
               <>
                <ProfileHeader profile={profile}/>    
                <ProfileContent profile={profile}/>
               </>}
           </Grid.Column>
       </Grid>
    )
}
)