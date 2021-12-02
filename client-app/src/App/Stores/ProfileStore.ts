import { makeAutoObservable, runInAction } from "mobx";
import agent from "../Api/agent";
import { Photo, Profile, UserEvent } from "../Models/Profile";
import { store } from "./store";

export default class ProfileStore {
    profile: Profile | null = null;
    loadingProfile: boolean = false;
    uploading: boolean = false;
    loading: boolean = false;
    userEvents: UserEvent[] = [];
    loadingEvents: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    get isCurrentUser() {
        if(store.userStore.user && this.profile) {
            return store.userStore.user.userName === this.profile.username;
        }

        return false;
    }


    loadProfile = async (username: string) => {
        this.loadingProfile = true;

        try {
            const profile = await agent.profiles.get(username);
            runInAction(() => {
                this.profile = profile;
                    this.loadingProfile = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingProfile = false)
        }
    }

    uploadPhoto = async (file: Blob) => {
        this.uploading = true;
        try {
            const response = await agent.profiles.uploadPhoto(file);
            const photo = response.data;
            runInAction(() => {
                if (this.profile) {
                    this.profile.photos?.push(photo);
                    if (photo.isMain && store.userStore.user) {
                        store.userStore.setImage(photo.url);
                        this.profile.image = photo.url
                    }
                }
                this.uploading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(()=>{
                this.uploading = false;
            })
        }
    }

    setMainPhoto = async (photo: Photo) => {
        this.loading = true;
        try {
            await agent.profiles.setMainPhoto(photo.id);
            store.userStore.setImage(photo.url);
            runInAction(() => {
                if (this.profile && this.profile.photos) {
                    this.profile.photos.find(p => p.isMain)!.isMain = false; 
                    this.profile.photos.find(p => p.id === photo.id)!.isMain = true;
                    this.profile.image = photo.url;
                    this.loading = false;
                }
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false)
        }
    }

    deletePhoto = async (photo: Photo) => {
        this.loading = true;
        try {
            await agent.profiles.deletePhoto(photo.id);
            runInAction(() => {
                if(this.profile) {
                    this.profile.photos = this.profile.photos?.filter(p => p.id !== photo.id);
                    this.loading = false;
                }
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false)
        }
    }

    loadUserEvents = async (username: string, predicate?: string) => {
        this.loadingEvents = true;
        try {
            const events = await agent.profiles.listEvents(username, predicate!);
            runInAction(()=> {
                this.userEvents = events;
                this.loadingEvents = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loadingEvents = false;
            })
        }
    }

    loadAllUserEvents = async (username: string) => {
        this.loadingEvents = true;
        try {
            const events = await agent.profiles.listAllEvents(username)
            runInAction(()=> {
                this.userEvents = events;
                this.loadingEvents = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loadingEvents = false;
            })
        }
    }
}