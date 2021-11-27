import { format } from "date-fns";
import { makeAutoObservable, runInAction} from "mobx";
import agent from "../Api/agent";
import { EventFormValues, IEvent } from "../Models/Event";
import { Profile } from "../Models/Profile";
import { store } from "./store";


export default class EventStore{
    // events: IEvent[]= [];
    eventsRegistry = new Map<string, IEvent>();
    selectedEvent : IEvent | undefined = undefined;
    editMode = false;
    loading =false;
    loadingInitial= true;

    constructor(){
        makeAutoObservable(this)
    }

    get eventsByDate(){
      return Array.from(this.eventsRegistry.values()).sort((a, b) => 
      a.date!.getTime() - a.date!.getTime());
    }

    get groupedEvents(){
      return Object.entries(
        this.eventsByDate.reduce((events, event)=>{
          const date = format(event.date!, 'dd MMM yyyy') ;
          // events[date] = events[date] ? [...events[date], event] : [event];
          if (!events[date]) {
            events[date] = [event];
            
          }else{
            events[date].push(event);
          }

          return events
        }, {} as {[Key: string]: IEvent[]})
      )
    }

    loadEvents = async ()=>{
      this.setLoadingInitial(true);
      try {
        const events = await agent.events.list();

            events.forEach(event=> {
                this.setEvent(event);
                // this.events.push(event);
                runInAction(()=>{
                  this.eventsRegistry.set(event.id, event);
                });
              }) ;

              this.setLoadingInitial(false);

      } catch (error) {
          console.log(error);
          this.setLoadingInitial(false);
      }
    }

    loadEventById = async (id : string)=>{
      let event = this.getEvent(id);
      if(event){
        this.selectedEvent = event;
        return event;
      } else {
        this.loadingInitial = true;
        try {
          event = await agent.events.details(id);
          this.setEvent(event);
          runInAction(()=>{
            this.selectedEvent =event;
          });
          this.setLoadingInitial(false);
          return event;
          
        } catch (error) {
          console.log(error);
          this.setLoadingInitial(false);
        }
      }

    }

    private getEvent(id:string){
      return this.eventsRegistry.get(id);
    }

    private setEvent(event: IEvent){
      const user = store.userStore.user;
      if(user) {
        console.log(user.userName);
        event.isGoing = event.interestees!.some(
          a => a.username === user.userName
        );
        event.isHost = event.hostUsername === user.userName;
        event.host = event.interestees?.find(x => x.username === event.hostUsername)
      }
      event.date = new Date(event.date!);
      this.eventsRegistry.set(event.id, event);
    }

   setLoadingInitial = (state: boolean)=>{
     this.loadingInitial = state;
   }

  //  selectEvent = (id: string)=>{
  //   //  this.selectedEvent= this.events.find(a => a.id===id);
  //   this.selectedEvent = this.eventsRegistry.get(id);
  //  }

  //  cancelSelectedEvent=()=>{
  //     this.selectedEvent= undefined;
  //  }

  //  openForm = (id?: string)=>{
  //     id ? this.selectEvent(id) : this.cancelSelectedEvent();
  //     this.editMode=true
  //  }

  //  closeForm=()=>{
  //    this.editMode=false;
  //  }

   createEvent=async (event: EventFormValues)=>{
     const user = store.userStore.user;
     const interestee = new Profile(user!);
     try {
       await agent.events.create(event);
       const newEvent = new IEvent(event);
       newEvent.hostUsername = user!.userName;
       newEvent.interestees = [interestee];
       this.setEvent(newEvent);
       runInAction(()=>{
        //  this.events.push(event);
        this.selectedEvent = newEvent;
       })
       
     } catch (error) {
       console.log(error);
       runInAction(()=>{
         this.loading=false;
       })
     }
   }

   updateEvent= async (event: EventFormValues)=>{
     try {
       await agent.events.update(event);
       runInAction(()=>{
         if(event.id) {
           let updatedEvent = {...this.getEvent(event.id), ...event};
           this.eventsRegistry.set(updatedEvent.id!, updatedEvent as IEvent);
           this.selectedEvent=event as IEvent;
         }
        //  this.events=[...this.events.filter(x=>x.id!== event.id), event];
        //  this.events.forEach(element => {
        //    console.log(element);
        //  })   
       })
     } catch (error) {
       console.log(error);
       runInAction(()=>{
         this.loading=false
       })
     }
   }

   deleteEvent = async (id: string)=>{
     this.loading=true;
     try {
       await agent.events.delete(id);
       runInAction(()=>{
        this.eventsRegistry.delete(id);
        this.loading= false;
       })

       
     } catch (error) {
       console.log(error);
       runInAction(()=>{
         this.loading= false;
       })
     }
   }

   updateInterest = async () => {
     const user = store.userStore.user;
     this.loading = true;
     try {
       await agent.events.interest(this.selectedEvent!.id);
       runInAction(() => {
         if (this.selectedEvent?.isGoing) {
           this.selectedEvent.interestees = this.selectedEvent.interestees?.filter(a => a.username !== user?.userName);
           this.selectedEvent.isGoing = false;
         } else {
           const interestee = new Profile(user!);
           this.selectedEvent?.interestees?.push(interestee);
           this.selectedEvent!.isGoing = true;
         }
         this.eventsRegistry.set(this.selectedEvent!.id, this.selectedEvent!);
       })
     } catch (error) {
       console.log(error);
     } finally {
       runInAction(()=> {
         this.loading = false;
       })
     }
   }

   cancelEventToggel = async () => {
     this.loading = true;
     try {
       await agent.events.interest(this.selectedEvent!.id);
       runInAction(() => {
         this.selectedEvent!.isCancelled = !this.selectedEvent?.isCancelled;
         this.eventsRegistry.set(this.selectedEvent!.id, this.selectedEvent!);
       })
     } catch (error) {
       console.log(error);
     } finally {
       runInAction(() => {
         this.loading = false;
       })
     }
   }

   clearSelectedEvent = () => {
     this.selectedEvent = undefined;
   }

}