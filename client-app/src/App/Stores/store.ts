import { createContext, useContext } from "react";
import eventStore from "./eventStore";

interface Store{
    eventStore: eventStore
}

export const store : Store = {
    eventStore : new eventStore()
}

export const eventContext = createContext(store);

export function useStore(){
    return useContext(eventContext);
}