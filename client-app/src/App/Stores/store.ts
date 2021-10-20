import { createContext, useContext } from "react";
import commonStore from "./CommonStore";
import eventStore from "./eventStore";

interface Store{
    eventStore: eventStore,
    commonStore: commonStore
}

export const store : Store = {
    eventStore : new eventStore(),
    commonStore: new commonStore()
}

export const eventContext = createContext(store);

export function useStore(){
    return useContext(eventContext);
}