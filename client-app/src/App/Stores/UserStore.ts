import { makeAutoObservable, runInAction } from "mobx";
import { History } from "../..";
import agent from "../Api/agent";
import { User, UserFormValues } from "../Models/User";
import { store } from "./store";

export default class UserStore {
    user: User | null = null;
<<<<<<< HEAD
=======
    fbAccessToken: string | null = null;
    fbLoading = false;
>>>>>>> FbLogin

    constructor(){
        makeAutoObservable(this);
    }

    get isLoggedIn() {
        return !!this.user
    }

    login = async (creds: UserFormValues) => {
        try{
            const user = await agent.accounts.login(creds);
            store.commonStore.setToken(user.token);
            runInAction(()=>{
                this.user = user;
            });
            console.log(user);
            History.push('/events');
            store.modalStore.closeModal();
        } catch(error) {
            throw (error);
        }
    }

    logout = async () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user =null;
        History.push('/');
    }

    getUser = async () => {
        try {
            const user = await agent.accounts.current();
            runInAction(
                () => this.user = user
            )
        } catch(error) {
            console.log(error);
            
        }
    }

    register = async (creds: UserFormValues) => {
        try{
            const user = await agent.accounts.register(creds);
            store.commonStore.setToken(user.token);
            runInAction(()=>{
                this.user = user;
            });
            console.log(user);
            History.push('/events');
            store.modalStore.closeModal();
        } catch(error) {
            throw (error);
        }
    }

    setImage = (image: string) => {
        if (this.user) {
            this.user.image = image
        }
    }

    setDisplayName = (displayName: string) => {
        if(this.user) {
            this.user.displayName = displayName;
        }
    }
<<<<<<< HEAD
=======

    getfacebookLoginStatus = async () => {
        window.FB.getLoginStatus(response => {
            if(response.status === "connected") {
                this.fbAccessToken = response.authResponse.accessToken;
            }
        })
    }

    // facebookLogin = () => {
    //     this.fbLoading = true;
    //     const apiLogin = (accessToken: string) => {
    //         agent.accounts.fbLogin(accessToken).then(user => {
    //             store.commonStore.setToken(user.token);
    //             runInAction(() => {
    //                 this.user = user;
    //                 this.fbLoading = false;
    //             })
    //             History.push("/events")
    //         }).catch(error => {
    //             console.log(error);
    //             runInAction(() => {
    //                 this.fbLoading = false;
    //             })
    //         })
    //         if(this.fbAccessToken) {
    //             apiLogin(this.fbAccessToken);
    //         } else {
    //             window.FB.login(response => {
    //                 apiLogin(response.authResponse.accessToken);
    //             }, {scope: "public_profile, email"})
    //         }
    //     }
    // }

    facebookLogin = () => {
        this.fbLoading = true;
        const apiLogin = (accessToken: string) => {
            agent.accounts.fbLogin(accessToken).then(user => {
                store.commonStore.setToken(user.token);
                runInAction(() => {
                    this.user = user;
                    this.fbLoading = false;
                })
                History.push('/events');
            }).catch(error => {
                console.log(error);
                runInAction(() => this.fbLoading = false);
            })
        }
        if (this.fbAccessToken) {
            apiLogin(this.fbAccessToken);
        } else {
            window.FB.login(response => {
                apiLogin(response.authResponse.accessToken);
            }, {scope: 'public_profile,email'})
        }
    }
>>>>>>> FbLogin
}