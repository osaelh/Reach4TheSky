export interface User{
    userName: string,
    displayName: string,
    image? : string,
    token: string
}

export interface UserFormValues{
    email: string;
    username: string,
    password: string,
    displayName?: string,
    image? : string
}