export interface IEvent {
    id: string;
    title: string;
    description: string;
    date: Date | null;
    region: string;
    categories: string;
}