import { makeAutoObservable } from "mobx";
import { ServerError } from "../Models/ServerError";

export default class commonStore{
    error: ServerError | null = null;
    token: string | null = null;
    appLoaded: boolean = false;

    constructor(){
        makeAutoObservable(this);
    }

    setServerError=(ServerError: ServerError)=>{
        this.error = ServerError;

    }

    setToken = (token: string | null) => {
        if (token) {
            window.localStorage.setItem('jwt', token);
            this.token = token;
        }
    }

    setAppLoaded = () => {
        this.appLoaded = true;
    }
}