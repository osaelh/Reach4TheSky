import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { History } from "../..";
import { EventFormValues, IEvent } from "../Models/Event";
import { PaginatedResult } from "../Models/Pagination";
import { Photo, Profile } from "../Models/Profile";
import { User, UserFormValues } from "../Models/User";
import { store } from "../Stores/store";

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
        return config
    }else{
        return config;
    }
})

axios.interceptors.response.use(async response=>{
        await sleep(1000);
        const pagination = response.headers["pagination"];
        if(pagination) {
            response.data = new PaginatedResult(JSON.parse(pagination), response.data);
            return response as AxiosResponse<PaginatedResult<any>>
        }
        return response;
},(error: AxiosError)=>{
    const {data, status,config} = error.response!;
    switch (status) {
        case 400:
            if (typeof data === 'string') {
                toast.error(data);
            }

            if(config.method === "get" && data.errors.hasOwnProperty('id') ){
                History.push('/NotFound');
            }
            if (data.errors) 
            {
                console.log(data.errors);
                const modelStateErrors = [];
                for(const key in data.errors){
                    if (data.errors[key]) {
                        modelStateErrors.push(data.errors[key]);
                    }
                }
                throw modelStateErrors.flat();
            } 
            break;
        case 401:
            toast.error("unauthorized");          
            break;
        case 404:
             History.push('/NotFound')
             break;
         case 500:
            console.log(data);
            store.commonStore.setServerError(data);
            History.push('/server-error')       
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
    list: (params: URLSearchParams)=> axios.get<PaginatedResult<IEvent[]>>('/Events', {params}).then(responseBody),
    details: (id: string) => requests.get<IEvent>(`/Events/${id}`),
    create: (event: EventFormValues) => requests.post<void>(`/Events`,event),
    update: (event: EventFormValues) => requests.put<void>(`/Events/${event.id}`, event),
    delete: (id: string) => requests.delete<void>(`/Events/${id}`),
    interest: (id: string) => requests.post<void>(`/Events/${id}/interest`, {})
}

const accounts = {
    current: () => requests.get<User>(`/account`),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/account/register', user)
}

const profiles = {
    get: (username: string) => requests.get<Profile>(`/profiles/${username}`),
    uploadPhoto : (file: Blob) => {
        let formData = new FormData();
        formData.append('File', file);
        return axios.post<Photo>('photos', formData, {
            headers: {'Content-type': 'multipart/form-data'}
        })
    },
    setMainPhoto: (id: string) => requests.post(`/photos/${id}/setmain`, {}),
    deletePhoto: (id: string) => requests.delete(`/photos/${id}`)
}

const agent = {
    events,
    accounts,
    profiles
}

export default agent;