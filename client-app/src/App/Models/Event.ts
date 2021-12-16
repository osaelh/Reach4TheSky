import { Profile } from "./Profile";

export interface IEvent {
    id: string;
    title: string;
    description: string;
    date: Date | null;
    region: string;
    categories: string;
    hostUsername: string;
    isCancelled: boolean;
    isGoing: boolean;
    isHost: Boolean;
    host?: Profile;
    interestees: Profile[];
}

export class IEvent implements IEvent {
    constructor(init?: EventFormValues) {
        Object.assign(this, init);
    }
} 

export class EventFormValues {
    id? : string = undefined;
    title: string = '';
    categories: string = '';
    description : string = '';
    date: Date | null = null;
    region: string = '';
    
    constructor(event?: EventFormValues) {
        if(event) {
            this.id = event.id;
            this.title = event.title;
            this.categories = event.categories;
            this.date = event.date;
            this.description = event.description;
            this.region = event.region;
        }
    }
}