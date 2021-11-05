import { Profile } from "./Profile";

export interface IEvent {
    id: string;
    title: string;
    description: string;
    date: Date | null;
    region: string;
    categories: string;
    hostUsername?: string;
    isCancelled?: boolean;
    isGoing?: boolean;
    isHost?: Boolean;
    host?: Profile;
    interestees?: Profile[];
}