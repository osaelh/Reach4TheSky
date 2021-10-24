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
            History.push('/events')
            console.log(user);
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
}