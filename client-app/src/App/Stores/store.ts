import { createContext, useContext } from "react";
import commonStore from "./CommonStore";
import eventStore from "./eventStore";
import ModalStore from "./ModalStore";
import ProfileStore from "./ProfileStore";
import UserStore from "./UserStore";

interface Store{
    eventStore: eventStore,
    commonStore: commonStore,
    userStore: UserStore,
    modalStore: ModalStore,
    profileStore: ProfileStore
}

export const store : Store = {
    eventStore : new eventStore(),
    commonStore: new commonStore(),
    userStore: new UserStore(),
    modalStore : new ModalStore(),
    profileStore: new ProfileStore()
}

export const eventContext = createContext(store);

export function useStore(){
    return useContext(eventContext);
}