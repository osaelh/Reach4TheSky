import { createContext, useContext } from "react";
import commonStore from "./CommonStore";
import eventStore from "./eventStore";
import ModalStore from "./ModalStore";
import UserStore from "./UserStore";

interface Store{
    eventStore: eventStore,
    commonStore: commonStore,
    userStore: UserStore,
    modalStore: ModalStore
}

export const store : Store = {
    eventStore : new eventStore(),
    commonStore: new commonStore(),
    userStore: new UserStore(),
    modalStore : new ModalStore()
}

export const eventContext = createContext(store);

export function useStore(){
    return useContext(eventContext);
}