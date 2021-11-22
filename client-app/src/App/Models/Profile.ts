import { User } from "./User";

export interface Profile {
    username: string;
    displayName: string;
    image?: string;
    bio?: string;
    photos?: Photo[]
}


export class Profile implements Profile {
    constructor(user: User) {
        this.username = user.userName;
        this.displayName = user.userName;
        this.image = user.image;
    }
}

export interface Photo {
    id: string;
    url: string;
    isMain: boolean;
}