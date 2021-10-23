export interface User{
    username: string,
    displayName: string,
    image? : string,
    token: string
}

export interface UserFormValues{
    username: string,
    password: string,
    displayName?: string,
    image? : string
}