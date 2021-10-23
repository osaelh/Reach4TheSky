import { createContext, useContext } from "react";
import commonStore from "./CommonStore";
import eventStore from "./eventStore";
import UserStore from "./UserStore";

interface Store{
    eventStore: eventStore,
    commonStore: commonStore,
    userStore: UserStore
}

export const store : Store = {
    eventStore : new eventStore(),
    commonStore: new commonStore(),
    userStore: new UserStore()
}

export const eventContext = createContext(store);

export function useStore(){
    return useContext(eventContext);
}