import { makeAutoObservable, runInAction} from "mobx";
import agent from "../Api/agent";
import { IEvent } from "../Models/Event";
import { v4 as uuid } from "uuid";

export default class EventStore{
    events: IEvent[]= []
    selectedEvent : IEvent | undefined = undefined;
    editMode = false;
    loading =false;
    loadingInitial= false

    constructor(){
        makeAutoObservable(this)
    }

    loadEvents = async ()=>{
      this.loadingInitial= true;
      try {

        const events = await agent.events.list();

            events.forEach(event=> {
                event.date = event.date.split('T')[0];
                this.events.push(event);
              }) 

              this.setLoadingInitial(false);

      } catch (error) {
          console.log(error);
          this.setLoadingInitial(false);
      }
    }

   setLoadingInitial = (state: boolean)=>{
     this.loadingInitial = state;
   }

   selectEvent = (id: string)=>{
     this.selectedEvent= this.events.find(a => a.id===id);
   }

   cancelSelectedEvent=()=>{
      this.selectedEvent= undefined;
   }

   openForm = (id?: string)=>{
      id ? this.selectEvent(id) : this.cancelSelectedEvent();
      this.editMode=true
   }

   closeForm=()=>{
     this.editMode=false;
   }

   createEvent=async (event: IEvent)=>{
     this.loading=true;
     event.id=uuid();
     try {
       await agent.events.create(event);
       runInAction(()=>{
         this.events.push(event);
         this.selectedEvent= event;
         this.editMode=false;
         this.loading=false;
       })
       
     } catch (error) {
       console.log(error);
       runInAction(()=>{
         this.loading=false;
       })
     }
   }

   updateEvent= async (event: IEvent)=>{
     this.loading=true;
     try {
       await agent.events.update(event);
       runInAction(()=>{
         this.events=[...this.events.filter(x=>x.id!== event.id), event];
         this.events.forEach(element => {
           console.log(element);
         });
         this.events.push(event);
         this.selectedEvent=event; 
         this.editMode= false;
         this.loading=false;
       })
     } catch (error) {
       console.log(error);
       runInAction(()=>{
         this.loading=false
       })
     }
   }

}