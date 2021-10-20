import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { History } from "../..";
import { IEvent } from "../Models/Event";

axios.defaults.baseURL = "http://localhost:5000/api";
axios.interceptors.response.use(async response=>{
        await sleep(1000);
        return response;
},(error: AxiosError)=>{
    const {data, status} = error.response!;
    switch (status) {
        case 400:
            if (data.errors) 
            {
                const modelStateErrors = [];
                for(const key in data.errors){
                    if (data.errors[key]) {
                        modelStateErrors.push(data.errors[key]);
                    }
                }
                throw modelStateErrors.flat();
            } else {
                toast.error(data);
            }
            break;
        case 401:
            toast.error("unauthorized");          
            break;
        case 404:
             History.push('/NotFound')
             break;
         case 500:
            toast.error("server error");          
            break;
    }
    return Promise.reject(error);
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