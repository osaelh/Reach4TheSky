import { makeAutoObservable } from "mobx";
import agent from "../Api/agent";
import { IEvent } from "../Models/Event";

export default class EventStore{
    events: IEvent[]= []
    selectedEvent : IEvent | null = null;
    editMode = false;
    loading =false;
    loadingInitial= false

    constructor(){
        makeAutoObservable(this)
    }

    loadEvents= async ()=>{
      this.loadingInitial= true;
      try {

        const events = await agent.events.list();
        events.forEach(event=> {
            event.date = event.date.split('T')[0];
            this.events.push(event);
          }) 
          this.loadingInitial=false;
          
      } catch (error) {
          console.log(error);
          this.loadingInitial=false;
      }
    }



}