import { makeAutoObservable, runInAction } from "mobx";
import { History } from "../..";
import agent from "../Api/agent";
import { User, UserFormValues } from "../Models/User";
import { store } from "./store";

export default class UserStore {
    user: User | null = null;

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
}