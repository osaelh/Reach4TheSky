import axios, { AxiosResponse } from "axios";
import { IEvent } from "../Models/Event";

axios.defaults.baseURL = "http://localhost:5000/api";
axios.interceptors.response.use(async response=>{
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})
const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const sleep = (delay: number)=>{
    return new Promise((resolve)=>{
        setTimeout(resolve, delay)
    })
}

const requests = {
    get:<T> (url: string) => axios.get<T>(url).then(responseBody),
    post:<T> (url: string, body: {}) => axios.post<T>(url,body).then(responseBody),
    put:<T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete:<T> (url: string) => axios.delete<T>(url).then(responseBody)

}

const events = {
    list: ()=> requests.get<IEvent[]>('/Events'),
    details: (id: string) => requests.get<IEvent>(`/Events/${id}`),
    create: (event: IEvent) => requests.post<void>(`/Events`,event),
    update: (event: IEvent) => requests.put<void>(`/Events/${event.id}`, event),
    delete: (id: string) => requests.delete<void>(`/Events/${id}`)

}

const agent = {
    events
}

export default agent;