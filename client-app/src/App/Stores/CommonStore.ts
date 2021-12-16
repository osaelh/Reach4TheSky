import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../Models/ServerError";

export default class commonStore{
    error: ServerError | null = null;
    token: string | null = window.localStorage.getItem('jwt');
    appLoaded: boolean = false;

    constructor(){
        makeAutoObservable(this);

        reaction(
            () => this.token,
            token => {
                if(token) {
                    window.localStorage.setItem('jwt' ,token);
                } else {
                    window.localStorage.removeItem('jwt');
                }
            }
        )
    }

    setServerError=(ServerError: ServerError)=>{
        this.error = ServerError;

    }

    setToken = (token: string | null) => {
        if (token) {
            this.token = token;
        }
    }

    setAppLoaded = () => {
        this.appLoaded = true;
    }
}